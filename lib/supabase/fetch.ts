/**
 * fetch with a time limit, for Supabase calls made while rendering or
 * handling the form. Without it, an unreachable database (for example a
 * paused free-tier project) holds every page request until the network
 * gives up.
 */
export function fetchWithTimeout(ms: number): typeof fetch {
  return (input, init) => fetch(input, { ...init, signal: init?.signal ?? AbortSignal.timeout(ms) });
}
