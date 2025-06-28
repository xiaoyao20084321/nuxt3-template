/**
 * 全局路由权限中间件
 * 实现路由拦截和权限控制
 */
export default defineNuxtRouteMiddleware(async (to) => {
  // 跳过服务端渲染时的检查，避免水合不匹配
  if (import.meta.server) return

  const userStore = useUserStore()
  const token = userStore.userInfo.accessToken

  // 获取用户权限
  const userPermissionKeys = userStore.getUserPermissionKeys

  // 获取页面所需权限（从路由meta中获取）
  const requiredPermissions = (to.meta.permissions as string[]) || []

  // 检查是否需要登录
  const needAuth = to.meta.auth === true

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
