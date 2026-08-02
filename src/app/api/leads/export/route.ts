/**
 * LeadForge — API: Export Leads
 * POST /api/leads/export
 * 
 * Export leads as CSV or JSON.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();

    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { job_id, lead_ids, format = 'csv', include_fields } = body;

    // Fetch leads
    let query = supabase
      .from('leads')
      .select('*')
      .eq('user_id', user.id);

    if (lead_ids && lead_ids.length > 0) {
      query = query.in('id', lead_ids);
    } else if (job_id) {
      query = query.eq('job_id', job_id);
    } else {
      return NextResponse.json(
        { error: 'Provide either job_id or lead_ids' },
        { status: 400 }
      );
    }

    query = query.order('icp_score', { ascending: false, nullsFirst: false });

    const { data: leads, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!leads || leads.length === 0) {
      return NextResponse.json({ error: 'No leads found' }, { status: 404 });
    }

    // Mark leads as exported
    const leadIds = leads.map(l => l.id);
    await supabase
      .from('leads')
      .update({ is_exported: true })
      .in('id', leadIds);

    // Default export fields
    const defaultFields = [
      'full_name', 'username', 'platform', 'email', 'email_verified',
      'phone', 'company', 'title', 'location', 'website',
      'follower_count', 'engagement_rate', 'icp_score',
      'ai_summary', 'outreach_message', 'profile_url',
    ];

    const fields = include_fields || defaultFields;

    if (format === 'json') {
      const jsonData = leads.map(lead => {
        const filtered: Record<string, unknown> = {};
        for (const field of fields) {
          if (field in lead) {
            filtered[field] = lead[field];
          }
        }
        return filtered;
      });

      return new NextResponse(JSON.stringify(jsonData, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="leadforge-export-${Date.now()}.json"`,
        },
      });
    }

    // CSV export
    const csvRows: string[] = [];
    
    // Header row
    csvRows.push(fields.join(','));
    
    // Data rows
    for (const lead of leads) {
      const row = fields.map((field: string) => {
        const value = lead[field];
        if (value === null || value === undefined) return '';
        if (typeof value === 'string') {
          // Escape CSV special characters
          return `"${value.replace(/"/g, '""').replace(/\n/g, ' ')}"`;
        }
        if (typeof value === 'object') {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return String(value);
      });
      csvRows.push(row.join(','));
    }

    const csvContent = csvRows.join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="leadforge-export-${Date.now()}.csv"`,
      },
    });

  } catch (error) {
    console.error('Export API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
