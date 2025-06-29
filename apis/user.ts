// 用户相关API接口
import { useHttp } from '~/hooks/useHttp'

export interface LoginParams {
  username: string
  password: string
  captcha?: string
}

export interface UserInfo {
  id?: number
  userName?: string
  userId?: string
  email?: string
  avatar?: string
  isVip?: boolean // VIP用户，可以使用更高级的功能
  userBtnPermission?: string[] // 用户按钮权限
  accessToken?: string
  refreshToken?: string
}

export interface RegisterParams {
  username: string
  password: string
  email: string
  captcha: string
}

// 新增的认证相关接口类型
export interface LoginResponse {
  accessToken: string
  refreshToken: string
  userInfo: UserInfo
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}

// 用户登录
export async function postLogin(params: LoginParams) {
  return useHttp.post<LoginResponse>('/auth/login', params)
}

// 用户注册
export async function postRegister(params: RegisterParams) {
  return useHttp.post<{ message: string }>('/auth/register', params)
}

// 获取用户信息
export async function getUserInfo() {
  return useHttp.get<UserInfo>('/user/info')
}

// 更新用户信息
export async function putUserInfo(params: Partial<UserInfo>) {
  return useHttp.put<UserInfo>('/user/info', params)
}

// 修改密码
export async function putPassword(params: {
  oldPassword: string
  newPassword: string
}) {
  return useHttp.put<{ message: string }>('/user/password', params)
}

// 用户登出
export async function postLogout() {
  return useHttp.post<{ message: string }>('/auth/logout')
}

// 刷新token
export async function postRefreshToken(data?: RefreshTokenRequest) {
  const userStore = useUserStore()
  const refreshToken = data?.refreshToken || userStore.userInfo.refreshToken

  return useHttp.post<RefreshTokenResponse>('/auth/refresh', {
    refreshToken,
  })
}

// 验证token接口
export async function verifyToken() {
  return useHttp.get('/auth/verify')
}
