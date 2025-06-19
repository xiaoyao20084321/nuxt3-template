import { mergeConfigs } from '@unocss/core'
import presetAttributify from '@unocss/preset-attributify'
import presetWind3 from '@unocss/preset-wind3'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
import transformerDirectives from '@unocss/transformer-directives'
import config from './.nuxt/uno.config.mjs'

export default mergeConfigs([config, {
  // your overrides
  presets: [
    presetAttributify({
      ignoreAttributes: [],
    }),
    presetWind3({
      important: 'html',
    }),
  ],
  transformers: [
    // { enforce: 'pre' }
    transformerDirectives(),
    transformerAttributifyJsx(),
  ],
}])
