import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Read-only client for public portfolio content, used from Server Components.
 * It carries the anon key, so Row Level Security decides what it can see.
 * Returns null when Supabase is not configured, so callers can fall back.
 */
export function createPublicClient(): SupabaseClient<Database> | null {
  if (!url || !anonKey) return null;
  return createClient<Database>(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
}
