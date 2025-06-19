// ~/utils/worker.ts
export function createPollingWorker(
  onPoll: (count: number) => void,
  interval = 5000,
) {
  if (!import.meta.client) return { stop: () => {} } // SSR 兼容

  const worker = new Worker('/js/polling.worker.js', {
    type: 'module',
  })

  // 监听 Worker 返回的数据
  worker.onmessage = (e: MessageEvent<{ action: string, count: number }>) => {
    if (e.data.action === 'poll') {
      onPoll(e.data.count)
    }
  }

  // 启动轮询
  worker.postMessage({ action: 'start', interval })

  return {
    stop: () => {
      worker.postMessage({ action: 'stop' })
      worker.terminate() // 销毁 Worker
    },
  }
}
