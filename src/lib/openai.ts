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
 * Generate embeddings for text content using Gemini or OpenAI.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  if (geminiKey) {
    try {
      const response = await ai.models.embedContent({
        model: 'text-embedding-004',
        contents: text.slice(0, 8000),
      });
      const resAny = response as unknown as { embedding?: { values?: number[] }; embeddings?: Array<{ values?: number[] }> };
      const values = resAny.embedding?.values || resAny.embeddings?.[0]?.values || [];
      // If 768 dims, repeat/pad to 1536 to match vector(1536) schema
      if (values.length === 768) {
        return [...values, ...values];
      }
      if (values.length > 0) return values;
    } catch (err) {
      console.warn('Gemini embedding failed, attempting OpenAI fallback:', err);
    }
  }

  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.slice(0, 8000),
  });
  return response.data[0].embedding;
}

/**
 * Generate embeddings for multiple texts in batch.
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const results: number[][] = [];
  for (const text of texts) {
    const emb = await generateEmbedding(text);
    results.push(emb);
  }
  return results;
}

/**
 * Score a lead against an ICP profile using Gemini (or OpenAI fallback).
 * Returns ICP score, summary, intent signals, and personalized outreach.
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
  const systemPrompt = `You are an expert B2B sales intelligence analyst. Your job is to analyze a lead's social media profile and content, then score them against an Ideal Customer Profile (ICP).

You must return a JSON object with these exact fields:
- icp_score: number from 0-100 (how well this lead matches the ICP)
- ai_summary: string (2-3 sentences explaining WHY this lead is or isn't a good fit)
- intent_signals: array of objects with {type, signal, strength, source}
  - type: one of "hiring", "fundraising", "scaling", "pain_point", "tech_adoption", "competitor_mention", "buying_intent"
  - signal: what you detected (1 sentence)
  - strength: "high", "medium", or "low"
  - source: which part of their profile/content revealed this
- pain_points: array of strings (specific pain points you detected from their content)
- outreach_message: string (a personalized, non-generic cold DM/email that references specific things about them — max 150 words)

Be precise. Don't make up information. Only score based on what's actually present in the data.
If there's insufficient data, score lower and say so in the summary.`;

  const userPrompt = `## ICP (Ideal Customer Profile):
${icpDescription}

## Lead Data:
${leadContext}

Analyze this lead against the ICP and return the JSON result.`;

  // Try Gemini 2.0 Flash / 1.5 Flash if key exists
  if (geminiKey) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `${systemPrompt}\n\n${userPrompt}`,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const text = response.text;
      if (text) {
        return JSON.parse(text);
      }
    } catch (err) {
      console.warn('Gemini LLM call failed, attempting OpenAI fallback:', err);
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

  return JSON.parse(content);
}

/**
 * Generate a natural language ICP embedding from user's description.
 */
export async function embedICPDescription(description: string): Promise<number[]> {
  const enhancedDescription = `
    Ideal Customer Profile: ${description}
    This person would be relevant for business outreach and lead generation.
  `.trim();
  
  return generateEmbedding(enhancedDescription);
}

/**
 * Build a rich text context string from lead data for RAG enrichment.
 */
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
