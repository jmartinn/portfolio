import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import tailwindcss from 'eslint-plugin-tailwindcss'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    plugins: {
      tailwindcss,
    },
    settings: {
      // Tailwind CSS settings
      tailwindcss: {
        callees: ['cn', 'cva'],
        config: 'tailwind.config.ts',
      },
      // Import plugin settings for TypeScript resolution
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      // Next.js specific
      '@next/next/no-html-link-for-pages': 'off',

      // Tailwind CSS
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'error',

      // Import ordering and organization
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'error',
      'import/no-absolute-path': 'error',
    },
  },
  // TypeScript file-specific overrides
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'import/no-unresolved': [
        'error',
        {
          ignore: [
            '^geist/font/sans$',
            '^geist/font/mono$',
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Additional custom ignores:
    'node_modules/**',
    'pnpm-lock.yaml',
    '*.config.js',
    '*.config.mjs',
  ]),
])

export default eslintConfig
