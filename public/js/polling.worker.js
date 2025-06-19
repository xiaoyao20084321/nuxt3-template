// 创建轮询控制器
const createPollingController = () => {
  let intervalId = null
  let count = 0

  // 启动轮询
  const startPolling = (interval) => {
    stopPolling() // 确保先停止现有轮询

    intervalId = setInterval(() => {
      count++
      self.postMessage({ type: 'tick', count })
    }, interval || 1000 * 5)
  }

  // 停止轮询
  const stopPolling = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  return {
    startPolling,
    stopPolling,
  }
}

// 创建控制器实例
const pollingController = createPollingController()

// 处理主线程消息
self.onmessage = function (e) {
  const { action, interval } = e.data
  switch (action) {
    case 'start':
      console.log('startPolling', e.data)
      pollingController.startPolling(interval)
      break
    case 'stop':
      console.log('stopPolling', e.data)
      pollingController.stopPolling()
      break
    default:
      console.warn(`Unknown action: ${action}`)
  }
}