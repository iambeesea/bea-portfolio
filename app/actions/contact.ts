'use server';

import { createHash } from 'node:crypto';
import { headers } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';
import { parseContact } from '@/lib/validation/contact';
import { site } from '@/lib/site';
import type { ContactResult } from '@/types/content';

const RATE_WINDOW_MINUTES = 10;
const RATE_MAX_MESSAGES = 3;

const emailMe = `You can email me directly at ${site.email}.`;

/** Hashes the sender address so rate limiting works without storing raw IPs. */
function hashIp(ip: string): string {
  const salt = process.env.CONTACT_IP_SALT ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

/**
 * Contact form flow: form -> this server action -> validation -> Supabase.
 * The browser never talks to the database; the insert uses the service role
 * key, which exists only on the server.
 */
export async function sendContactMessage(form: FormData): Promise<ContactResult> {
  // Honeypot: a field hidden from people. Bots fill it; pretend it worked.
  if (form.get('company')) return { ok: true, message: 'Thank you — your message is on its way. I’ll reply soon.' };

  const parsed = parseContact(form);
  if (!parsed.ok) return { ok: false, message: parsed.message };

  const supabase = createAdminClient();
  if (!supabase) return { ok: false, message: `The contact form isn’t connected yet. ${emailMe}` };

  const requestHeaders = await headers();
  const ip = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() || requestHeaders.get('x-real-ip') || 'unknown';
  const ipHash = hashIp(ip);

  try {
    const since = new Date(Date.now() - RATE_WINDOW_MINUTES * 60_000).toISOString();
    const recent = await supabase
      .from('contact_messages')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', since);
    if (recent.error) throw recent.error;
    if ((recent.count ?? 0) >= RATE_MAX_MESSAGES) {
      return { ok: false, message: `You’ve sent a few messages already — please try again in a little while. ${emailMe}` };
    }

    const { error } = await supabase.from('contact_messages').insert({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject ?? null,
      message: parsed.data.message,
      ip_hash: ipHash,
      user_agent: requestHeaders.get('user-agent')?.slice(0, 400) ?? null,
    });
    if (error) throw error;
  } catch (error) {
    console.error('[contact] could not store message:', error);
    return { ok: false, message: `Something went wrong on my side. ${emailMe}` };
  }

  return { ok: true, message: 'Thank you — your message is on its way. I’ll reply soon.' };
}
