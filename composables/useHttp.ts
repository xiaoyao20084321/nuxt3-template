import type { FetchResponse, SearchParameters } from 'ofetch'

export interface ResOptions<T> {
  data: T
  code: number
  msg: string
  success?: boolean
}

export interface HttpMeta {
  auth?: boolean
  toast?: boolean
  catch?: boolean
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
      err('登录状态已过期，需要重新登录')
      // 清除token并跳转到登录页
      removeToken()
      navigateTo('/')
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
    const token = getToken()

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
    if (token) {
      options.headers.set('token', token)
      options.headers.set('Authorization', `Bearer ${token}`)
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
        handleError(response)
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
  onResponseError({ response }) {
    handleError(response)
    return Promise.reject(response?._data ?? null)
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
