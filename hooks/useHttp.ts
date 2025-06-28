import type { FetchResponse, SearchParameters } from 'ofetch'

export interface ResOptions<T> {
  data: T
  code: number
  msg: string
}

// Token刷新相关状态
let isRefreshing = false // 是否正在刷新token
let failedQueue: Array<{
  resolve: (value: any) => void
  reject: (reason: any) => void
  config: any
}> = [] // 失败请求队列

// 处理队列中的请求
function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error)
    }
    else {
      // 更新请求头中的token
      if (token && config.headers) {
        config.headers.set('Authorization', `Bearer ${token}`)
      }
      resolve(config)
    }
  })

  failedQueue = []
}

// 参数序列化函数 - 处理GET请求的数组参数
function paramsSerializer(params?: SearchParameters) {
  if (!params) return

  const query = useCloneDeep(params)
  Object.entries(query).forEach(([key, val]) => {
    if (typeof val === 'object' && Array.isArray(val) && val !== null) {
      query[`${key}[]`] = toRaw(val).map((v: any) => JSON.stringify(v))
      delete query[key]
    }
  })
  return query
}

// 错误处理函数
function handleError<T>(
  response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>,
) {
  const err = (text: string) => {
    ElMessage.error(response?._data?.msg ?? text)
  }

  if (!response._data) {
    err('请求超时，服务器无响应！')
    return
  }

  const handleMap: { [key: number]: () => void } = {
    404: () => err('服务器资源不存在'),
    500: () => err('服务器内部错误'),
    403: () => err('没有权限访问该资源'),
    401: () => {
      // 401错误在响应拦截器中处理，这里不需要额外处理
      console.log('401 Unauthorized - 将在响应拦截器中处理token刷新')
    },
    502: () => err('网关错误'),
    503: () => err('服务不可用'),
  }

  handleMap[response.status] ? handleMap[response.status]() : err('未知错误！')
}

// 创建HTTP客户端实例
const fetch = $fetch.create({
  credentials: 'omit', // 不携带 cookie 字段

  // 请求拦截器
  onRequest({ request, options }) {
    // 处理GET方法的数组参数
    options.params = paramsSerializer(options.params)

    // 获取配置
    const runtimeConfig = useRuntimeConfig()
    const appConfig = useAppConfig()
    const userStore = useUserStore()
    const accessToken = userStore.userInfo.accessToken

    // 设置baseURL
    const baseURL
      = runtimeConfig.public.apiBasePrefix || runtimeConfig.public.apiBaseUrl

    // 判断是否为绝对URL
    const isAbsoluteURL
      = options.baseURL
        || (typeof request === 'string'
          && (request.startsWith('http://') || request.startsWith('https://')))

    if (!isAbsoluteURL) {
      options.baseURL = baseURL
    }

    // 设置请求头
    options.headers = new Headers(options.headers)

    // 添加saasId
    if (appConfig.saasId) {
      options.headers.set('saasId', appConfig.saasId.toString())
    }

    // 添加认证token
    if (accessToken) {
      options.headers.set('Authorization', `Bearer ${accessToken}`)
    }
  },

  // 响应拦截器
  onResponse({ response }) {
    // 处理文件下载响应
    if (
      response.headers
        .get('content-type')
        ?.includes('application/octet-stream')
        || response.headers.get('content-type')?.includes('application/vnd.ms-excel')
    ) {
      const contentDisposition = response.headers.get('Content-Disposition')
      response._data = {
        code: 200,
        data: {
          file: response._data,
          name: getFilenameFromDisposition(contentDisposition),
        },
        msg: null,
      }
      return response._data
    }

    // 处理404状态
    if (response.status === 404) return

    // 处理非200状态码
    if (response.status !== 200) {
      return handleError(response)
    }

    // 检查业务状态码
    if (response._data && typeof response._data === 'object') {
      if (response._data.code === 200) {
        return response._data
      }
      else if (response._data.code === 401) {
        // 401错误将在onResponseError中处理token刷新
        throw createError({
          statusCode: response._data.code,
          message: response._data.msg,
          data: response._data,
        })
      }
      else if (response._data.code !== 200) {
        handleError(response)
        throw createError({
          statusCode: response._data.code,
          message: response._data.msg,
          data: response._data,
        })
      }
    }

    return response._data
  },

  // 错误处理
  async onResponseError({ request, response, options }): Promise<void> {
    // 检查是否是401错误且有refresh token
    if (response?.status === 401 || response?._data?.code === 401) {
      const userStore = useUserStore()
      const refreshToken = userStore.userInfo.refreshToken

      // 将当前请求添加到队列
      const retryOriginalRequest = new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: config => resolve(config),
          reject: error => reject(error),
          config: options,
        })
      })

      // 如果有refreshToken且当前没有正在刷新的请求
      if (refreshToken && !isRefreshing) {
        isRefreshing = true

        try {
          // 调用刷新token的方法
          const { refreshToken: refreshTokenFn } = useAuth()
          const newToken = await refreshTokenFn()

          // 刷新token成功
          if (newToken) {
            // 处理队列中的请求
            processQueue(null, newToken)
          }
          else {
            // 刷新token失败
            processQueue(new Error('Token refresh failed'), null)
            handleError(response)
          }
        }
        catch (refreshError) {
          // 刷新失败，处理队列
          processQueue(refreshError, null)
          handleError(response)
        }
        finally {
          isRefreshing = false
        }

        // 返回原始请求的重试Promise
        return retryOriginalRequest.then((config) => {
          return $fetch(request, config as any)
        }).catch(() => {
          // 重试请求失败，继续处理错误
          handleError(response)
        }) as any
      }
      else if (refreshToken && isRefreshing) {
        // 如果正在刷新，将请求加入队列并返回重试Promise
        return retryOriginalRequest.then((config) => {
          return $fetch(request, config as any)
        }).catch(() => {
          // 重试请求失败，继续处理错误
          handleError(response)
        }) as any
      }
    }

    // 其他错误正常处理
    handleError(response)
  },
})

// 导出HTTP方法
export const useHttp = {
  get: <T>(url: string, params?: any) => {
    return fetch<ResOptions<T>>(url, { method: 'get', params })
  },

  post: <T>(url: string, body?: any) => {
    return fetch<ResOptions<T>>(url, { method: 'post', body })
  },

  put: <T>(url: string, body?: any) => {
    return fetch<ResOptions<T>>(url, { method: 'put', body })
  },

  delete: <T>(url: string, body?: any) => {
    return fetch<ResOptions<T>>(url, { method: 'delete', body })
  },

  patch: <T>(url: string, body?: any) => {
    return fetch<ResOptions<T>>(url, { method: 'patch', body })
  },
}
