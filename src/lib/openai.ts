import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

const openaiKey = process.env.OPENAI_API_KEY;
const geminiKey = process.env.GEMINI_API_KEY;

export const openai = new OpenAI({
  apiKey: openaiKey || 'placeholder-key',
});

const ai = new GoogleGenAI({
  apiKey: geminiKey || 'placeholder-key',
});

/**
 * Generate embeddings for text content using Gemini or OpenAI with retry logic.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  if (geminiKey) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await ai.models.embedContent({
          model: 'text-embedding-004',
          contents: text.slice(0, 8000),
        });
        const resAny = response as unknown as { embedding?: { values?: number[] }; embeddings?: Array<{ values?: number[] }> };
        const values = resAny.embedding?.values || resAny.embeddings?.[0]?.values || [];
        if (values.length === 768) {
          return [...values, ...values]; // Duplicate to match 1536 vector dimension in Supabase
        }
        if (values.length > 0) return values;
      } catch (err) {
        console.warn(`Gemini embedding attempt ${attempt} failed:`, err);
        if (attempt < 3) await new Promise(res => setTimeout(res, 500 * attempt));
      }
    }
  }

  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.slice(0, 8000),
  });
  return response.data[0].embedding;
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const results: number[][] = [];
  for (const text of texts) {
    const emb = await generateEmbedding(text);
    results.push(emb);
  }
  return results;
}

/**
 * Clean JSON strings from markdown ticks (e.g. ```json ... ```)
 */
function cleanJsonString(raw: string): string {
  return raw.replace(/```json\s*/gi, '').replace(/```\s*$/gi, '').trim();
}

/**
 * Score a lead against an ICP profile using Gemini (or OpenAI fallback) with 3 retries.
 */
export async function enrichLeadWithAI(
  leadContext: string,
  icpDescription: string,
): Promise<{
  icp_score: number;
  ai_summary: string;
  intent_signals: Array<{
    type: string;
    signal: string;
    strength: string;
    source: string;
  }>;
  pain_points: string[];
  outreach_message: string;
}> {
  const systemPrompt = `You are an expert B2B sales intelligence analyst. Analyze a lead's social media profile and score them against an Ideal Customer Profile (ICP).

Return a JSON object with these exact keys:
- icp_score: number from 0-100 (how well this lead matches the ICP)
- ai_summary: string (2-3 sentences explaining WHY this lead is or isn't a fit)
- intent_signals: array of objects with {type, signal, strength, source}
- pain_points: array of strings
- outreach_message: string (personalized, non-generic cold DM/email — max 150 words)`;

  const userPrompt = `## ICP Criteria:
${icpDescription}

## Lead Data:
${leadContext}`;

  if (geminiKey) {
    const geminiModels = ['gemini-2.0-flash', 'gemini-1.5-flash'];
    for (const modelName of geminiModels) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: `${systemPrompt}\n\n${userPrompt}`,
            config: {
              responseMimeType: 'application/json',
              temperature: 0.3,
            },
          });

          const rawText = response.text;
          if (rawText) {
            const cleaned = cleanJsonString(rawText);
            const parsed = JSON.parse(cleaned);
            return {
              icp_score: parsed.icp_score ?? 50,
              ai_summary: parsed.ai_summary || 'Lead analyzed with Gemini RAG engine.',
              intent_signals: Array.isArray(parsed.intent_signals) ? parsed.intent_signals : [],
              pain_points: Array.isArray(parsed.pain_points) ? parsed.pain_points : [],
              outreach_message: parsed.outreach_message || 'Hey! Noticed your profile...',
            };
          }
        } catch (err) {
          console.warn(`Gemini model ${modelName} attempt ${attempt} failed:`, err);
          if (attempt < 3) await new Promise(res => setTimeout(res, 500 * attempt));
        }
      }
    }
  }

  // Fallback to OpenAI GPT-4o-mini
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
    max_tokens: 1000,
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('Empty response from AI engine');
  }

  const parsed = JSON.parse(cleanJsonString(content));
  return {
    icp_score: parsed.icp_score ?? 50,
    ai_summary: parsed.ai_summary || 'Lead analyzed by AI engine.',
    intent_signals: Array.isArray(parsed.intent_signals) ? parsed.intent_signals : [],
    pain_points: Array.isArray(parsed.pain_points) ? parsed.pain_points : [],
    outreach_message: parsed.outreach_message || 'Hey! Noticed your profile...',
  };
}

export async function embedICPDescription(description: string): Promise<number[]> {
  const enhancedDescription = `
    Ideal Customer Profile: ${description}
    This person would be relevant for business outreach and lead generation.
  `.trim();
  
  return generateEmbedding(enhancedDescription);
}

export function buildLeadContext(lead: {
  username?: string | null;
  full_name?: string | null;
  bio?: string | null;
  company?: string | null;
  title?: string | null;
  location?: string | null;
  website?: string | null;
  follower_count?: number;
  engagement_rate?: number | null;
  recent_posts?: Array<{ text: string; date?: string; likes?: number }>;
  platform?: string;
}): string {
  const parts: string[] = [];

  if (lead.full_name) parts.push(`Name: ${lead.full_name}`);
  if (lead.username) parts.push(`Username: @${lead.username}`);
  if (lead.platform) parts.push(`Platform: ${lead.platform}`);
  if (lead.title && lead.company) {
    parts.push(`Role: ${lead.title} at ${lead.company}`);
  } else if (lead.title) {
    parts.push(`Title: ${lead.title}`);
  } else if (lead.company) {
    parts.push(`Company: ${lead.company}`);
  }
  if (lead.location) parts.push(`Location: ${lead.location}`);
  if (lead.bio) parts.push(`Bio: ${lead.bio}`);
  if (lead.website) parts.push(`Website: ${lead.website}`);
  if (lead.follower_count) parts.push(`Followers: ${lead.follower_count.toLocaleString()}`);
  if (lead.engagement_rate) parts.push(`Engagement Rate: ${(lead.engagement_rate * 100).toFixed(1)}%`);

  if (lead.recent_posts && lead.recent_posts.length > 0) {
    parts.push('\nRecent Posts/Tweets:');
    lead.recent_posts.slice(0, 5).forEach((post, i) => {
      const postText = post.text.slice(0, 500);
      parts.push(`${i + 1}. "${postText}" ${post.likes ? `(${post.likes} likes)` : ''}`);
    });
  }

  return parts.join('\n');
}
