import { createPublicClient } from '@/lib/supabase/server';

// Always run on request; never cache.
export const dynamic = 'force-dynamic';

/**
 * Daily ping from Vercel Cron (see vercel.json). Supabase pauses free-tier
 * projects after about a week without activity, which breaks the contact
 * form; one small read a day keeps the project awake.
 *
 * Vercel sends `Authorization: Bearer $CRON_SECRET` when CRON_SECRET is set,
 * so nobody else can trigger it.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const supabase = createPublicClient();
  if (!supabase) return Response.json({ ok: false, reason: 'Supabase is not configured' }, { status: 500 });

  const { error } = await supabase.from('projects').select('id').limit(1);
  if (error) {
    console.error('[keep-alive] Supabase did not respond:', error.message);
    return Response.json({ ok: false, reason: error.message }, { status: 503 });
  }
  return Response.json({ ok: true });
}
