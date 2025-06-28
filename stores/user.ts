import type { UserInfo } from '~/apis/user'
import { defineStore } from 'pinia'

// 初始用户数据
const initState: UserInfo = {
  userName: '',
  userId: '',
  avatar: '',
  accessToken: '',
  refreshToken: '',
  isVip: false,
  userBtnPermission: [],
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserInfo>({ ...initState })

    // 设置用户信息 可设置部分信息（比如更新 token）
    const setUserInfo = (val: Partial<UserInfo>): void => {
      userInfo.value = { ...userInfo.value, ...val }
    }

    // 清除用户信息
    const clearUserInfo = (): void => {
      userInfo.value = { ...initState }
    }

    // 获取页面权限信息
    const getUserPermissionKeys = computed(() => {
      const permissionKeys: string[] = []
      // 是否登录
      if (!!userInfo.value.accessToken && !!userInfo.value.refreshToken) {
        permissionKeys.push('logined')
      }
      // 是否为 vip
      if (userInfo.value.isVip) {
        permissionKeys.push('vip')
      }
      // 可以继续加你需要的权限判定 ...
      return permissionKeys
    })

    // 获取用户按钮权限
    const getUserBtnPermission = computed(() => {
      return userInfo.value.userBtnPermission || []
    })

    // 检查是否已登录
    const isLoggedIn = computed(() => {
      return !!(userInfo.value.accessToken && userInfo.value.refreshToken)
    })

    return {
      userInfo: readonly(userInfo),
      setUserInfo,
      clearUserInfo,
      getUserPermissionKeys,
      getUserBtnPermission,
      isLoggedIn,
    }
  },
  {
    persist: true, // 启用持久化
  },
)
