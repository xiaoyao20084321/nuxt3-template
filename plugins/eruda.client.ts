let erudaInstance: any = null

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.env.DEV) {
    import('eruda').then((module) => {
      erudaInstance = module.default
      // erudaInstance.init()
    })
  }
})
