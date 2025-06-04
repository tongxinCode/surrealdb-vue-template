<script setup lang="ts">
import { AuthStore } from './stores/auth'
import { authenticate } from './api/auth'
import { useRouter } from 'vue-router'

const authStore = AuthStore()
const router = useRouter()

router.beforeEach(async () => {
  const isAuthenticated = await authenticate(authStore.token || '')

  if (!isAuthenticated) {
    authStore.clearStore()
  }
})
</script>

<template>
  <main>
    <router-view />
  </main>
</template>