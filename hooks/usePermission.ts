/**
 * 权限相关的组合式函数
 */

/**
 * 使用权限检查的组合式函数
 */
export function usePermission() {
  const userStore = useUserStore()

  /**
   * 检查是否有指定的按钮权限
   * @param permissions 权限数组或单个权限
   * @returns 是否有权限
   */
  const hasPermission = (permissions: string | string[]): boolean => {
    const perms = Array.isArray(permissions) ? permissions : [permissions]
    return checkBtnPermission(perms)
  }

  /**
   * 检查是否有页面权限
   * @param permissions 权限数组或单个权限
   * @returns 是否有权限
   */
  const hasPagePermission = (permissions: string | string[]): boolean => {
    const perms = Array.isArray(permissions) ? permissions : [permissions]
    const userPermissions = userStore.getUserPermissionKeys
    // 检查用户是否拥有所有必需的权限
    return perms.every(permission => userPermissions.includes(permission))
  }

  /**
   * 检查是否已登录
   */
  const isLoggedIn = computed(() => userStore.isLoggedIn)

  /**
   * 检查是否为VIP用户
   */
  const isVip = computed(() => userStore.userInfo.isVip || false)

  /**
   * 获取用户权限列表
   */
  const userPermissions = computed(() => userStore.getUserPermissionKeys)

  /**
   * 获取用户按钮权限列表
   */
  const userBtnPermissions = computed(() => userStore.getUserBtnPermission)

  return {
    hasPermission,
    hasPagePermission,
    isLoggedIn,
    isVip,
    userPermissions,
    userBtnPermissions,
  }
}

/**
 * 权限守卫组合式函数
 * 用于在组件中进行权限检查和路由守卫
 */
export function usePermissionGuard() {
  const { hasPagePermission, isLoggedIn } = usePermission()
  const router = useRouter()

  /**
   * 检查页面权限，如果没有权限则跳转
   * @param permissions 需要的权限
   * @param redirectTo 没有权限时跳转的路径，默认为登录页
   */
  const checkPagePermission = async (
    permissions: string | string[],
    redirectTo = '/login',
  ) => {
    const perms = Array.isArray(permissions) ? permissions : [permissions]

    // 如果需要登录权限但用户未登录
    if (perms.includes('logined') && !isLoggedIn.value) {
      const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(router.currentRoute.value.fullPath)}`
      await navigateTo(redirectUrl as any)
      return false
    }

    // 检查其他权限
    if (!hasPagePermission(perms)) {
      throw createError({
        statusCode: 403,
        statusMessage: '权限不足，无法访问该页面',
      })
    }

    return true
  }

  return {
    checkPagePermission,
  }
}
