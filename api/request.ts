type FetchType = typeof $fetch
export type FetchOptions = Parameters<FetchType>[1]

interface HttpMeta {
  auth?: boolean
  toast?: boolean
  catch?: boolean
}

const http = $fetch.create({
  credentials: 'omit', // 不携带 cookie 字段
})

let isRefreshToken = false

export function useHttpRequest(url: string, config?: FetchOptions, meta?: HttpMeta): Promise<any> {
  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  const token = getToken()
  
  const baseURL = runtimeConfig.public.apiBasePrefix || runtimeConfig.public.apiBaseUrl

  const onRequest = ({ options }) => {
    // 正确判断绝对URL
    const isAbsoluteURL = url.startsWith('http://') || url.startsWith('https://')

    options.baseURL = isAbsoluteURL ? undefined : config?.baseURL || baseURL

    options.headers = new Headers(options.headers)
    if (appConfig.saasId) options.headers.set('saasId', appConfig.saasId)

    // 仅在Token存在且需要认证时添加
    if (meta?.auth !== false && token) {
      options.headers.set('token', token)
      options.headers.set('Authorization', `Bearer ${token}`)
    }
  }

  const onResponse = ({ response, options }) => {
    if (config.responseType && ['arrayBuffer', 'blob'].includes(config.responseType)) {
      const contentDisposition = response.headers.get('Content-Disposition')
      response._data = { code: 200, data: { file: response._data, name: getFilenameFromDisposition(contentDisposition) }, msg: null }
    }

    if (response._data.statusCode === 502) {
      throw createError({
        statusCode: response._data.code,
        message: response._data.msg,
        data: response._data,
      })
    }

    if ([200].includes(response._data.code)) return response._data

    if ([401].includes(response._data.code)) {
      handleResponseAuth()
      throw createError({
        statusCode: response._data.code,
        message: response._data.msg,
        data: response._data,
      })
    }

    if (meta?.toast !== false) handleResponseError(url, response, options)

    // 抛出错误或自定义错误处理
    if (import.meta.client && meta?.catch === false) return new Promise(() => { })

    throw createError({
      statusCode: response._data.code,
      message: response._data.msg,
      data: response._data,
    })
  }


  return http(url, { ...config, onRequest, onResponse })
}

function handleResponseError(url, response, options) {
  console.groupCollapsed('🚀 file: request.ts:80 🚀')
  console.error('错误提示', url, JSON.stringify(response))
  console.groupEnd()

  import.meta.client && ElMessage.error(response._data.msg || '服务器错误')
}

async function handleResponseAuth() {
  // const userPinia = useUserPinia()
  if (!isRefreshToken) {
    isRefreshToken = true
    if (!import.meta.client) return navigateTo(`/`)
    try {
      // await ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', {
      //   title: '温馨提示',
      //   type: 'warning',
      //   draggable: true,
      //   confirmButtonText: '重新登录',
      //   cancelButtonText: '取消',
      // })
      // userPinia.ClearUserAuth()
      // clearError({ redirect: `/login?redirect=${location.pathname}${location.search}${location.hash}` })
    }
    catch {
      // userPinia.ClearUserAuth()
      // clearError({ redirect: '/' })
    }
    finally {
      isRefreshToken = false
    }
  }
}
