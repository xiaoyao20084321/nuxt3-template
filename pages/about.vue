<script setup lang="ts">
definePageMeta({
  auth: false,
})
</script>

<template>
  <div>
    <NuxtLayout>
      <div class="p-4">
        <h1 class="mb-4 text-2xl font-bold">
          关于我们
        </h1>
        <p>这是关于页面的内容。</p>
        <div class="mt-4">
          <NuxtLink to="/" class="text-blue-500 hover:underline">
            返回首页
          </NuxtLink>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
