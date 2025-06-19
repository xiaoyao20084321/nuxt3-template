export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = getToken()
  // 如果路由不需要认证，直接放行
  if (to.meta.auth !== true) return
  // if (!token) return navigateTo(`/login?redirect=${to.fullPath}`)
  
})
