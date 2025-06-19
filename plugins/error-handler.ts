export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.log('global error handler', JSON.stringify(error), info)
  }

  nuxtApp.hook('vue:error', (error, instance, info) => {
    console.log('vue:error', JSON.stringify(error), info)
  })

  nuxtApp.hook('app:error', (error) => {
    console.log('app:error', JSON.stringify(error))
  })
})
