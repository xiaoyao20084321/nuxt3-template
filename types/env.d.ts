/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 是否需要配置代理前缀 */
  readonly NUXT_PUBLIC_API_BASE_PREFIX: string
  /** 接口请求 */
  readonly NUXT_PUBLIC_API_BASE_URL: string
  /** 文件资源访问 */
  readonly NUXT_PUBLIC_PREVIEW_BASE_URL: string
  /** console 和 debugger */
  readonly NUXT_PUBLIC_DELETE_CONSOLE: string

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
