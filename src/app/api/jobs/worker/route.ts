import { NextRequest, NextResponse } from 'next/server';
import { executeScrapeJob } from '@/lib/scrapers/orchestrator';

// Vercel Serverless maximum execution duration limit (60s for hobby/pro)
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const jobId = body.job_id;

    if (!jobId) {
      return NextResponse.json({ error: 'job_id is required' }, { status: 400 });
    }

    // Execute job asynchronously in worker context
    await executeScrapeJob(jobId);

    return NextResponse.json({ success: true, job_id: jobId });
  } catch (error) {
    console.error('Worker job execution error:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Worker execution failed' },
      { status: 500 }
    );
  }
}
