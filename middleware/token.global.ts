/**
 * 全局路由权限中间件
 * 实现路由拦截和权限控制
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore()

  // 检查是否需要登录
  const needAuth = to.meta.auth === true
  const token = userStore.userInfo.accessToken

  // 在服务端渲染时，如果用户未登录且访问需要认证的页面，直接重定向
  if (import.meta.server) {
    if (needAuth && !token) {
      return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
    }
    return
  }

  // 获取用户权限
  const userPermissionKeys = userStore.getUserPermissionKeys

  // 获取页面所需权限（从路由meta中获取）
  const requiredPermissions = (to.meta.permissions as string[]) || []

  // 如果需要登录但用户未登录
  if (needAuth && !token) {
    console.log('需要登录，跳转到登录页')
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }

  // 如果有权限要求，检查用户权限
  if (requiredPermissions.length > 0) {
    const missingPermissions = getMissingPermissions(
      userPermissionKeys,
      requiredPermissions,
    )

    if (missingPermissions.length > 0) {
      // 如果缺少登录权限，跳转到登录页
      if (missingPermissions.includes('logined')) {
        console.log('缺少登录权限，跳转到登录页')
        return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
      }

      // 如果缺少其他权限，显示无权限页面或提示
      console.log('权限不足，缺少权限：', missingPermissions)
      throw createError({
        statusCode: 403,
        statusMessage: '权限不足，无法访问该页面',
      })
    }
  }

  console.log('权限检查通过')
})
