<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// import { setTheme } from '~/hooks/theme'

const { initTheme } = useTheme()

const runtimeConfig = useRuntimeConfig()
const appConfig = useAppConfig()
// const nuxtApp = useNuxtApp()

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: '/css/quill@1.3.6/index.css' },
  ],
  meta: [
    { charset: 'utf-8' },
    { name: 'naive-ui-style' },
  ],
})

useSeoMeta({
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
  title: runtimeConfig.public.title,
  keywords: '网站，后台，开发，外包，服务，公司，官网',
  description: '春花，秋月，夏日，冬雪。你若盛开，清风自来。心若浮沉，浅笑安然。',
  formatDetection: 'telephone=no',
})

const colors = computed(() => Object.values(appConfig.colors))

const themeColors = ref(Object.entries(appConfig.colors).map(item => ({ label: item[0], value: item[1] })))

const color = ref<string>(appConfig.colors.primary)

function themeRgbaChange(value = null, item) {
  if (!value) color.value = appConfig.colors.primary
  item.value = value
  initTheme(item.label, value)
}
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <el-config-provider size="default" :locale="zhCn" :message="{ max: 3 }">
      <NuxtPage />

      <div flex items-center class="fixed bottom-5vh left-5vw z-500 space-x-12px">
        <template v-for="(item, index) in themeColors" :key="index">
          <div flex flex-col items-center justify-center>
            <div>
              <el-color-picker :model-value="item.value" :predefine="colors" show-alpha @change="themeRgbaChange($event, item)" />
            </div>
            <div>{{ item.label }}</div>
          </div>
        </template>
      </div>
    </el-config-provider>
  </div>
</template>

<style lang="scss" scoped></style>
