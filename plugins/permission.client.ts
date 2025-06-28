/**
 * 权限指令插件
 * 提供v-permission指令用于按钮级别的权限控制
 */

export default defineNuxtPlugin((nuxtApp) => {
  // 注册权限指令
  nuxtApp.vueApp.directive('permission', {
    mounted(el: HTMLElement, binding: any) {
      handlePermissionDirective(el, binding)
    },
    updated(el: HTMLElement, binding: any) {
      handlePermissionDirective(el, binding)
    },
  })

  // 注册权限指令的简写形式
  nuxtApp.vueApp.directive('perms', {
    mounted(el: HTMLElement, binding: any) {
      handlePermissionDirective(el, binding)
    },
    updated(el: HTMLElement, binding: any) {
      handlePermissionDirective(el, binding)
    },
  })

  // 提供全局权限检查方法
  nuxtApp.provide('checkPermission', checkBtnPermission)
  nuxtApp.provide('hasPermission', (permissions: string | string[]) => {
    const perms = Array.isArray(permissions) ? permissions : [permissions]
    return checkBtnPermission(perms)
  })
})
