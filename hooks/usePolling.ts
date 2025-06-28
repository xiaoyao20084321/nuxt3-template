// 示例
// const workerPoll = usePolling({
//   interval: 3000,
//   callback: (msg) => {
//     console.log('监听', msg);
//     msg.count === 10 && workerPoll.stop()
//   }
// })
// workerPoll.start()
export function usePolling(options: any = {}) {
  const {
    interval = 5000,
    callback = null,
  } = options
  const { data: workerData, post } = useWebWorker('/js/polling.worker.js')

  // 状态变量
  // const state = {
  //   data: ref(null),
  //   isPolling: ref(false),
  //   isLoading: ref(false),
  //   error: ref(null),
  //   pollCount: ref(0),
  //   isMaxReached: ref(false)
  // }

  // 处理worker消息
  watch(workerData, (msg) => {
    if (!msg) return
    callback(msg)
  })

  // 操作方法
  const methods = {
    start: () => {
      post({ action: 'start', interval })
    },
    stop: () => {
      post({ action: 'stop' })
    },
  }

  // 自动清理
  onScopeDispose(() => {
    methods.stop()
  })

  return { ...methods }
}
