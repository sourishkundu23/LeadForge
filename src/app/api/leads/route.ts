/**
 * LeadForge — API: Get Leads for a Job
 * GET /api/leads?job_id=xxx&page=1&min_score=50&has_email=true
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();

    const authHeader = request.headers.get('Authorization');
    let userId: string | null = null;
    if (authHeader && authHeader !== 'Bearer dev-token') {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      if (user) userId = user.id;
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('job_id');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const minScore = parseInt(searchParams.get('min_score') || '0');
    const hasEmail = searchParams.get('has_email') === 'true';
    const platform = searchParams.get('platform');
    const sortBy = searchParams.get('sort_by') || 'icp_score';
    const sortOrder = searchParams.get('sort_order') || 'desc';
    const search = searchParams.get('search');

    let query = supabase
      .from('leads')
      .select('*', { count: 'exact' });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    // Filters
    if (jobId) query = query.eq('job_id', jobId);
    if (minScore > 0) query = query.gte('icp_score', minScore);
    if (hasEmail) query = query.not('email', 'is', null);
    if (platform && platform !== 'all') query = query.eq('platform', platform);
    if (search) {
      query = query.or(
        `full_name.ilike.%${search}%,username.ilike.%${search}%,company.ilike.%${search}%,bio.ilike.%${search}%`
      );
    }

    // Sorting
    const ascending = sortOrder === 'asc';
    switch (sortBy) {
      case 'icp_score':
        query = query.order('icp_score', { ascending: false, nullsFirst: false });
        break;
      case 'followers':
        query = query.order('follower_count', { ascending, nullsFirst: false });
        break;
      case 'engagement':
        query = query.order('engagement_rate', { ascending: false, nullsFirst: false });
        break;
      case 'name':
        query = query.order('full_name', { ascending: true });
        break;
      default:
        query = query.order('icp_score', { ascending: false, nullsFirst: false });
    }

    // Pagination
    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: leads, count, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Remove embedding from response (too large)
    const sanitizedLeads = (leads || []).map(lead => {
      const copy = { ...lead };
      delete copy.embedding;
      return copy;
    });

    return NextResponse.json({
      leads: sanitizedLeads,
      total: count || 0,
      page,
      per_page: limit,
      filters: {
        min_score: minScore,
        has_email: hasEmail,
        platform: platform || 'all',
      },
    });

  } catch (error) {
    console.error('Leads API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
