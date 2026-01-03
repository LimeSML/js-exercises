import globals from 'globals';
import js from '@eslint/js';
import google from 'eslint-config-google';

export default [
  js.configs.recommended,
  {
    ignores: ['ex01/format_sample.js'],
  },
  {
    files: ['**/*.js'],
    languageOptions: { globals: { ...globals.browser, ...globals.node, ...globals.jest } },
    ...google,
    rules: {
      // Prettier が担当するフォーマット系はすべて無効化
      'max-len': 'off',
      indent: 'off',
      semi: 'off',
      quotes: 'off',
      'comma-dangle': 'off',
      'object-curly-spacing': 'off',
      'arrow-parens': 'off',
    },
  },
];
