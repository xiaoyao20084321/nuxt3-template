import antfu from '@antfu/eslint-config'
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    jsonc: false,
    yaml: false,
    unocss: true,
  }),
  // Your custom configs here
  {
    ignores: ['**/*.d.ts', '**/public'],
    rules: {
      'no-console': 'off',
      'no-alert': 'off',
      'unused-imports/no-unused-vars': 'off',
      'antfu/if-newline': 'off',
      'jsdoc/require-returns-description': 'off',
      'regexp/no-unused-capturing-group': 'off',
      'regexp/no-dupe-disjunctions': 'off',
      'node/prefer-global/process': 'off',
      'no-else-return': 'error',
      'vue/no-lone-template': 'off',
      'no-case-declarations': 'off',
    },
  },
)
