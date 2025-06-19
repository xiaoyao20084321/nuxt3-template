export async function setToken(value) {
  const appConfig = useAppConfig() as any
  const token = useCookie('token', {
    maxAge: appConfig.maxAge,
    // secure: !import.meta.env.DEV, // 生产环境启用
    // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 过期日期
    // httpOnly: true, // 仅HTTP访问(浏览器JS无法读取)
    sameSite: appConfig.sameSite, // 或 'lax'/'none'
    path: appConfig.path, // cookie路径
    domain: appConfig.domain, // 域名
    // 其他选项...
  })
  token.value = value
  return await nextTick()
}

export function getToken() {
  return useCookie('token').value
}

export function removeToken() {
  const token = useCookie('token')
  token.value = null
}