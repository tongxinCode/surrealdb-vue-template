<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { User, Lock, Check, Close} from '@element-plus/icons-vue'
import { login } from '../api/auth'
import { AuthStore } from '../stores/auth'

const router = useRouter()
const authStore = AuthStore()

const loginForm = ref({
  email: '',
  password: ''
})

const loading = ref(false)

const handleLogin = async () => {
  if (!loginForm.value.email || !loginForm.value.password) {
    ElNotification({
      title: '错误',
      message: '请填写完整的登录信息',
      type: 'error',
    })
    return
  }

  loading.value = true
  try {
    const token = await login(loginForm.value.email, loginForm.value.password)
    if (token) {
      authStore.setToken(token)
      ElNotification({
        title: '成功',
        message: '登录成功',
        type: 'success',
      })
      router.push('/')
    } else {
      ElNotification({
        title: '错误',
        message: '登录失败，请检查邮箱和密码',
        type: 'error',
      })
    }
  } catch (error) {
    ElNotification({
      title: '错误',
      message: error instanceof Error ? error.message : '登录过程中发生错误',
      type: 'error',
    })
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  router.back()
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      
      <img src="/vite.svg" alt="Vite logo" />
      
      <el-form 
        :model="loginForm"
        label-position="left"
        label-width="80px"
        size="large"
        @submit.prevent="handleLogin"
        class="login-form"
      >
        <el-form-item label="Email" class="form-item">
          <el-input
            v-model="loginForm.email"
            type="email"
            placeholder="test@test.com"
            :prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item label="Password" class="form-item">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="123456"
            :prefix-icon="Lock"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <div class="button-group">
          <el-button
            type="primary"
            :loading="loading"
            :icon="Check"
            class="login-button"
            @click="handleLogin"
          >
          </el-button>
          <el-button
            class="cancel-button"
            :icon="Close"
            @click="handleCancel"
          >
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 60vh;
}

.login-card {
  width: 100%;
  max-width: 360px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.login-title {
  text-align: center;
  color: #409EFF;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 30px 0;
}

.login-form {
  margin-top: 20px;
}

.form-item {
  margin-bottom: 25px;
}

.form-item :deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
  padding-right: 20px;
}

.form-item :deep(.el-input__wrapper) {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

.form-item :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #409EFF inset;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-top: 35px;
}

.login-button,
.cancel-button {
  flex: 1;
  padding: 12px 20px;
  font-size: 16px;
}

.login-button {
  background-color: #409EFF;
}

.login-button:hover {
  background-color: #66b1ff;
}

.cancel-button {
  border-color: #dcdfe6;
  color: #606266;
}

.cancel-button:hover {
  color: #409EFF;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

:deep(.el-card__body) {
  padding: 0;
}
</style>
