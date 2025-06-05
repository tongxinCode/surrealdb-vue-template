<script setup lang="ts">
import { AuthStore } from './stores/auth'
import { authenticate } from './api/auth'
import { useRouter, useRoute } from 'vue-router'
import TopNavbar from './components/TopNavbar.vue'
import { computed } from 'vue'

const authStore = AuthStore()
const router = useRouter()
const route = useRoute()

// 根据路由元信息判断是否显示导航栏
const showNavbar = computed(() => route.meta.showNavbar !== false)

router.beforeEach(async () => {
  const isAuthenticated = await authenticate(authStore.token || '')

  if (!isAuthenticated) {
    authStore.clearStore()
  }
})
</script>

<template>
  <TopNavbar v-if="showNavbar" />
  <main :class="['main-content', { 'no-navbar': !showNavbar }]">
    <router-view />
  </main>
</template>

<style>
.main-content {
  padding-top: 60px; /* 与导航栏高度相同 */
}

.main-content.no-navbar {
  padding-top: 0; /* 没有导航栏时不需要顶部padding */
}

/* 确保body没有默认边距 */
body {
  margin: 0;
  padding: 0;
}
</style>