import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-require-imports': 'off', 
      '@typescript-eslint/explicit-function-return-type': 'off', 
      '@typescript-eslint/no-explicit-any': 'warn', 
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'quotes': ['error', 'single'], 
      'semi': ['error', 'always'], 
      'indent': ['error', 2], 
      'max-len': ['error', { 'code': 100 }], 
      'no-multiple-empty-lines': ['error', { 'max': 1 }], 
      'object-curly-spacing': ['error', 'always'], 
      'no-unused-vars': 'off'
    },
  },
];
