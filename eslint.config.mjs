import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'next-env.d.ts']),
  {
    // Sections receive refs and handlers from the animation engine through one
    // view-model object. This rule cannot tell that apart from reading a ref's
    // value during render, and flags every such prop.
    files: ['components/**/*.tsx'],
    rules: { 'react-hooks/refs': 'off' },
  },
  {
    // The animation engine is carried over from the design prototype and is
    // excluded from type-checking (see the note at the top of the file).
    files: ['lib/experience/engine.ts'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      'prefer-const': 'off',
    },
  },
]);
