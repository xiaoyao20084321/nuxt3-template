/**
 * 认证相关的组合式函数
 */
import type { LoginParams } from '~/apis/user'

/**
 * 认证相关的组合式函数
 */
export function useAuth() {
  const userStore = useUserStore()
  const router = useRouter()

  /**
   * 登录
   */
  const login = async (params: LoginParams): Promise<void> => {
    try {
      // 调用登录API
      const response = await postLogin(params)

      if (response.code === 200 && response.data) {
        const { accessToken, refreshToken, userInfo } = response.data

        // 保存用户信息到store
        userStore.setUserInfo({
          ...userInfo,
          accessToken,
          refreshToken,
        })

        console.log('登录成功，用户信息已保存')
      }
      else {
        throw new Error(response.msg || '登录失败')
      }
    }
    catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  /**
   * 退出登录
   */
  const logout = async (): Promise<void> => {
    userStore.clearUserInfo()
  }

  /**
   * 刷新token
   */
  const refreshToken = async (): Promise<string | null> => {
    try {
      const currentRefreshToken = userStore.userInfo.refreshToken
      if (!currentRefreshToken) {
        throw new Error('没有refresh token')
      }

      // 调用刷新token API
      const response = await postRefreshToken({
        refreshToken: currentRefreshToken,
      })

      if (response.code === 200 && response.data) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken }
          = response.data

        // 更新store中的token
        userStore.setUserInfo({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        })

        console.log('Token刷新成功')
        return newAccessToken
      }
      throw new Error(response.msg || 'Token刷新失败')
    }
    catch (error) {
      console.error('Token刷新失败:', error)
      // 刷新失败，清除用户信息并跳转到登录页
      await logout()
      await router.push('/login')
      return null
    }
  }

  return {
    login,
    logout,
    refreshToken,
    isLoggedIn: computed(() => userStore.isLoggedIn),
    userInfo: computed(() => userStore.userInfo),
    userPermissions: computed(() => userStore.getUserPermissionKeys),
    userBtnPermissions: computed(() => userStore.getUserBtnPermission),
  }
}
