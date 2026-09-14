import js from '@eslint/js';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  { ignores: ['dist/**', '.astro/**', 'node_modules/**', 'qa/**'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs.recommended,
  { languageOptions: { globals: { document: 'readonly', window: 'readonly', innerWidth: 'readonly', IntersectionObserver: 'readonly', matchMedia: 'readonly', console: 'readonly', process: 'readonly', URL: 'readonly', Buffer: 'readonly' } } },
];
