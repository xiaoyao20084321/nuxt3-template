import { createPollingWorker } from '~/utils/worker'

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

/** 文件预览 */
export function previewBaseUrl(url) {
  const appConfig = useAppConfig() as any
  if (!url) return ''
  const isAbsoluteURL = url.startsWith('http://') || url.startsWith('https://')
  const baseUrl = appConfig.upload_url
  return isAbsoluteURL ? url : `${baseUrl}/file/imagePreview${url}`
}

/** 轮询监听 */
export function usePollingModel() {
  // 使用 ref 来保持 worker 的引用，避免组件重新渲染时丢失
  const worker = ref<ReturnType<typeof createPollingWorker> | null>(null)

  // 停止当前 worker（如果有的话）
  const pollingStop = () => {
    if (worker.value) {
      worker.value.stop()
      worker.value = null
    }
  }

  function pollingInit(fn, intervalSeconds: number) {
    // 先停止之前的 worker
    pollingStop()

    // 创建新的 worker
    worker.value = createPollingWorker((count) => {
      // console.log('轮询计数:', count)
      fn()
    }, intervalSeconds * 1000)
  }

  onUnmounted(() => {
    pollingStop()
  })

  return {
    worker,
    pollingInit,
    pollingStop, // 暴露停止方法以便外部调用
  }
}
