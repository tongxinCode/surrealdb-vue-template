<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { User, SwitchButton } from '@element-plus/icons-vue'
import { AuthStore } from '../stores/auth'
import { authenticate } from '../api/auth'
import { ElMessage } from 'element-plus'

const router = useRouter()
const authStore = AuthStore()
const isScrolled = ref(false)
const isLoggedIn = ref(false)

// 检查登录状态
const checkAuthStatus = async () => {
  const token = authStore.getToken()
  if (!token) {
    isLoggedIn.value = false
    return
  }
  
  const isAuthenticated = await authenticate(token)
  if (!isAuthenticated) {
    authStore.clearStore()
    isLoggedIn.value = false
    return
  }
  
  isLoggedIn.value = true
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

const goToLogin = () => {
  router.push('/login')
}

const handleLogout = () => {
  authStore.clearStore()
  isLoggedIn.value = false
  ElMessage({
    type: 'success',
    message: '已成功登出'
  })
  router.push('/login')
}

// 监听路由变化，检查登录状态
watch(
  () => router.currentRoute.value,
  () => {
    checkAuthStatus()
  }
)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始检查登录状态
  checkAuthStatus()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="navbar-container">
      <div class="navbar-logo">
        <img src="/vite.svg" alt="Logo" />
        <span>SurrealDB Vue</span>
      </div>
      
      <el-button 
        v-if="!isLoggedIn"
        type="primary" 
        :icon="User"
        @click="goToLogin"
        class="auth-button"
      >
      </el-button>
      
      <el-button 
        v-else
        type="danger" 
        :icon="SwitchButton"
        @click="handleLogout"
        class="auth-button"
      >
      </el-button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.navbar-scrolled {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.navbar-logo img {
  height: 32px;
  width: auto;
}

.navbar-logo span {
  font-size: 18px;
  font-weight: 600;
  color: #409EFF;
}

.auth-button {
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 20px
}

</style> 