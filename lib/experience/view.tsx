import { isValidElement, type CSSProperties, type ReactNode } from 'react';

/**
 * Values the engine hands to the section components on every render: refs,
 * event handlers and computed style fragments. The engine is untyped (see
 * engine.ts), so this boundary is deliberately loose.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ViewModel = Record<string, any>;

const camel = (s: string) => s.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

/** Turns a CSS declaration string into a React style object. */
export function css(text: string): CSSProperties {
  const out: Record<string, string> = {};
  for (const decl of text.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    out[prop.startsWith('--') ? prop : camel(prop)] = decl.slice(i + 1).trim();
  }
  return out as CSSProperties;
}

/** Renders a dynamic text value; empty values render nothing. */
export function txt(value: unknown): ReactNode {
  if (value === undefined || value === null || typeof value === 'boolean') return null;
  if (isValidElement(value) || Array.isArray(value)) return value as ReactNode;
  return <span>{String(value)}</span>;
}

/** Guards loops against missing lists. */
export function list(value: unknown): ViewModel[] {
  return Array.isArray(value) ? (value as ViewModel[]) : [];
}
