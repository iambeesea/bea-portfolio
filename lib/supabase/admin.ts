import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

/**
 * Service-role client. It bypasses Row Level Security, so it must only ever be
 * used in server code (the contact form action). `server-only` makes the build
 * fail if this file is imported from a Client Component.
 */
export function createAdminClient(): SupabaseClient<Database> | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  return createClient<Database>(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
}
