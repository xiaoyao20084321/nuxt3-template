// 创建轮询控制器
function createPollingController() {
  let intervalId = null
  let count = 0

  // 停止轮询
  function stopPolling() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  // 启动轮询
  function startPolling(interval) {
    stopPolling() // 确保先停止现有轮询

    intervalId = setInterval(() => {
      count++
      globalThis.postMessage({ type: 'tick', count })
    }, interval || 1000 * 5)
  }

  return {
    startPolling,
    stopPolling,
  }
}

// 创建控制器实例
const pollingController = createPollingController()

// 处理主线程消息
globalThis.onmessage = function (e) {
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
