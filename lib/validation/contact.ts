import { z } from 'zod';
import type { ContactResult } from '@/types/content';

/** Shared by the browser (instant feedback) and the server action (the real check). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100, 'That name is too long.'),
  email: z.string().trim().toLowerCase().max(254, 'That email is too long.').pipe(z.email('Please enter a valid email address.')),
  subject: z.string().trim().max(150, 'That subject is too long.').optional(),
  message: z
    .string()
    .trim()
    .min(10, 'Please write a slightly longer message.')
    .max(4000, 'That message is too long — please keep it under 4,000 characters.'),
});

export type ContactInput = z.infer<typeof contactSchema>;

type Parsed = { ok: true; data: ContactInput } | (ContactResult & { ok: false });

export function parseContact(form: FormData): Parsed {
  const text = (key: string) => {
    const value = form.get(key);
    return typeof value === 'string' ? value : '';
  };
  const result = contactSchema.safeParse({
    name: text('name'),
    email: text('email'),
    subject: text('subject') || undefined,
    message: text('message'),
  });
  if (result.success) return { ok: true, data: result.data };
  return { ok: false, message: result.error.issues[0]?.message ?? 'Please check the form and try again.' };
}

/** Browser-side pre-check used by the contact form before calling the server. */
export function validateContact(form: FormData): ContactResult {
  const parsed = parseContact(form);
  return parsed.ok ? { ok: true, message: '' } : { ok: false, message: parsed.message };
}
