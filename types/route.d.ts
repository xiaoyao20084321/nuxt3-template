declare module '#app' {
  interface PageMeta {
    /** 是否需要登录 */
    auth?: boolean
    /** 中间件验证 */
    middleware?: string[]
    /** 面包屑 */
    breadcrumbs?: any[]
  }
}

export {}
