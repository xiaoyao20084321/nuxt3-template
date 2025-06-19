// public/polling.worker.js

let pollingInterval
let count = 0

globalThis.onmessage = function (e) {
  const { action, interval } = e.data
  if (action === 'start') {
    // 清除已有定时器
    if (pollingInterval) clearInterval(pollingInterval)
    // 设置新定时器
    pollingInterval = setInterval(() => {
      count++
      globalThis.postMessage({ action: 'poll', count })
    }, interval || 5000) // 默认5秒
  }
  else if (action === 'stop') {
    if (pollingInterval) {
      clearInterval(pollingInterval)
      pollingInterval = null
    }
  }
}
