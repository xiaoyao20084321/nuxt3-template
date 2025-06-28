/**
 * 权限相关工具函数
 */

/**
 * 根据路由路径获取页面权限配置
 * @param path 路由路径
 * @returns 权限数组
 */
export function getPermissionKeysByPath(path: string): string[] {
  // 在Nuxt3中，我们通过路由获取meta信息
  const router = useRouter()
  // 尝试查找匹配的路由
  const matchedRoute = router.resolve(path)
  if (matchedRoute && matchedRoute.meta) {
    // 获取路由meta中的权限信息
    const auth = matchedRoute.meta.auth === true
    const permissions = matchedRoute.meta.permissions as string[] || []
    // 如果需要登录但permissions中没有logined，添加它
    if (auth && !permissions.includes('logined')) {
      return ['logined', ...permissions]
    }
    return permissions
  }
  return []
}

/**
 * 检查用户是否有指定权限
 * @param userPermissions 用户权限数组
 * @param requiredPermissions 需要的权限数组
 * @returns 是否有权限
 */
export function hasPermission(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true // 没有权限要求，直接通过
  }

  // 检查用户是否拥有所有必需的权限
  return requiredPermissions.every(permission =>
    userPermissions.includes(permission),
  )
}

/**
 * 获取缺少的权限
 * @param userPermissions 用户权限数组
 * @param requiredPermissions 需要的权限数组
 * @returns 缺少的权限数组
 */
export function getMissingPermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): string[] {
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return []
  }

  return requiredPermissions.filter(
    permission => !userPermissions.includes(permission),
  )
}

/**
 * 检查按钮权限
 * @param btnPermissions 按钮需要的权限数组
 * @returns 是否有权限
 */
export function checkBtnPermission(btnPermissions: string[]): boolean {
  const userStore = useUserStore()
  const userBtnPermissions = userStore.getUserBtnPermission

  if (!btnPermissions || btnPermissions.length === 0) {
    return true
  }

  // 检查用户是否拥有所有必需的按钮权限
  return btnPermissions.every(permission =>
    userBtnPermissions.includes(permission),
  )
}

/**
 * 权限指令的检查函数
 * @param el DOM元素
 * @param binding 指令绑定对象
 * @param binding.value 权限值，可以是字符串或字符串数组
 */
export function handlePermissionDirective(
  el: HTMLElement,
  binding: { value: string | string[] },
) {
  const permissions = Array.isArray(binding.value)
    ? binding.value
    : [binding.value]
  const hasAuth = checkBtnPermission(permissions)

  if (!hasAuth) {
    // 没有权限，隐藏元素
    el.style.display = 'none'
    // 或者移除元素
    // el.parentNode?.removeChild(el)
  }
  else {
    // 有权限，显示元素
    el.style.display = ''
  }
}
