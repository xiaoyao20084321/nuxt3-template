declare module '#app' {
  interface PageMeta {
    /** 是否需要登录 */
    auth?: boolean
    /** 中间件验证 */
    middleware?: string[]
    /** 面包屑 */
    breadcrumbs?: any[]
    /** 页面权限配置 */
    permissions?: string[]
    /** 页面标题 */
    title?: string
    /** 页面描述 */
    description?: string
  }
}

export {}
