export default defineNuxtRouteMiddleware((to, from) => {
  const token = getToken()
  if (token) {
    // 登录后页面切换需要调用的
  }
})
