<script setup lang="ts">
const route = useRoute()
useHead({ title: route.meta.title })
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style lang="scss"></style>
