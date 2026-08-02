import { createClient } from '@supabase/supabase-js';
import { createServerClient as createSSRServerClient, createBrowserClient as createSSRBrowserClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Client-side Supabase client for React components
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function createBrowserSupabaseClient() {
  return createSSRBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Server-side Supabase client for Server Actions & API routes (Cookie-based auth)
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  return createSSRServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Handled in middleware
        }
      },
    },
  });
}

// Admin Supabase client (Service Role key for background workers)
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
