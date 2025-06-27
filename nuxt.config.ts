const {
  NUXT_PUBLIC_DELETE_CONSOLE,
  NUXT_PUBLIC_API_BASE_PREFIX,
  NUXT_PUBLIC_API_BASE_URL,
  NUXT_PUBLIC_PREVIEW_BASE_URL,
} = import.meta.env

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: [
    '@nuxt/eslint',
    'dayjs-nuxt',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'nuxt-svgo',
    '@nuxtjs/i18n',
    '@unocss/nuxt',
    'nuxt-lodash',
    'nuxt-typed-router',
  ],
  imports: { dirs: ['types', 'stores', 'constants', 'apis'] },
  devtools: { enabled: true },
  typescript: { strict: false, shim: false },
  css: [
    '@unocss/reset/tailwind.css',
    '@unocss/reset/tailwind-compat.css',
    '~/assets/scss/element/index.scss',
    '~/assets/scss/index.scss',
  ],

  runtimeConfig: {
    public: {
      apiBasePrefix: NUXT_PUBLIC_API_BASE_PREFIX || '/api',
      apiBaseUrl: NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
      previewBaseUrl: NUXT_PUBLIC_PREVIEW_BASE_URL || 'http://localhost:3001',
      deleteConsole: NUXT_PUBLIC_DELETE_CONSOLE === 'true',
    },
  },

  nitro: {
    compressPublicAssets: true,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  dayjs: {
    plugins: ['duration', 'relativeTime'],
    locales: ['en', 'zh-cn'],
    defaultLocale: [
      'zh-cn',
      {
        relativeTime: {
          future: '刚刚',
          past: '%s前',
          s: '几秒',
          m: '1 分钟',
          mm: '%d 分钟',
          h: '1 小时',
          hh: '%d 小时',
          d: '1 天',
          dd: '%d 天',
          M: '1 个月',
          MM: '%d 个月',
          y: '1 年',
          yy: '%d 年',
        },
      },
    ],
  },

  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    defaultLocale: 'zh-cn',
    installMethods: [
      'ElLoading',
      'ElMessage',
      'ElMessageBox',
      'ElNotification',
    ],
  },

  i18n: {
    // 基础配置
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'zh', iso: 'zh-CN', name: '中文', file: 'zh.json' },
    ],
    defaultLocale: 'zh', // 默认语言
    strategy: 'no_prefix', // 路由策略：no_prefix / prefix_except_default / prefix
    detectBrowserLanguage: {
      // 自动检测浏览器语言
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    lazy: true, // 延迟加载语言文件（推荐）
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  svgo: {
    autoImportPath: './assets/svgs/',
    customComponent: 'NuxtIcon',
    // 强制所有导入通过组件方式
    defaultImport: 'component',
    explicitImportsOnly: true,
  },

  unocss: {
    nuxtLayers: true,
  },

  // 忽略特定模式
  ignore: ['~/**/components/**'],

  build: {
    analyze: true,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/scss/element/theme-chalk/index.scss" as element;`,
        },
      },
    },
    build: {
      sourcemap: import.meta.env.DEV,
      // chunkSizeWarningLimit: 2000,
      commonjsOptions: { transformMixedEsModules: true },
    },
    esbuild: {
      drop:
        NUXT_PUBLIC_DELETE_CONSOLE === 'true' ? ['console', 'debugger'] : [],
    },
  },
})
