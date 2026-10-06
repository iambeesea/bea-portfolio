import 'server-only';
import { site } from '@/lib/site';
import type { ContactInput } from '@/lib/validation/contact';

const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

/**
 * Emails a copy of a new contact message through Resend. Optional: without
 * RESEND_API_KEY it does nothing. It never throws — the message is already
 * stored in Supabase, so a failed email must not fail the form.
 */
export async function notifyNewMessage(message: ContactInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const to = process.env.CONTACT_NOTIFY_EMAIL ?? site.email;
  // Resend's shared sender works without a verified domain, but only delivers
  // to the Resend account's own address. Set CONTACT_FROM_EMAIL once a domain is verified.
  const from = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: message.email,
        subject: oneLine(`New portfolio message from ${message.name}${message.subject ? ` — ${message.subject}` : ''}`),
        // Plain text only, so nothing a visitor types is ever rendered as HTML.
        text: `${message.message}\n\n—\nFrom: ${message.name} <${message.email}>\nReply to this email to answer directly.\nSent from the contact form on ${site.url}`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) console.error('[contact] notification email failed:', response.status, await response.text());
  } catch (error) {
    console.error('[contact] notification email failed:', error);
  }
}
