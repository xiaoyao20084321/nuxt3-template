// 用户相关API接口
import { useHttp } from '~/composables/useHttp'

export interface LoginParams {
  username: string
  password: string
  captcha?: string
}

export interface UserInfo {
  id: number
  username: string
  email: string
  avatar?: string
  roles: string[]
}

export interface RegisterParams {
  username: string
  password: string
  email: string
  captcha: string
}

// 用户登录
export async function postLogin(params: LoginParams) {
  return useHttp.post<{ token: string, userInfo: UserInfo }>(
    '/auth/login',
    params,
  )
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
export async function postRefreshToken() {
  return useHttp.post<{ token: string }>('/auth/refresh')
}

// 获取用户列表（管理员）
export async function getUserList(params: {
  page?: number
  pageSize?: number
  keyword?: string
}) {
  return useHttp.get<{
    list: UserInfo[]
    total: number
    page: number
    pageSize: number
  }>('/admin/users', params)
}

// 删除用户（管理员）
export async function deleteUser(id: number) {
  return useHttp.delete<{ message: string }>(`/admin/users/${id}`)
}
