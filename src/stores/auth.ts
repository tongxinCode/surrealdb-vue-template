import { defineStore } from 'pinia'
import { ref } from 'vue'

export const AuthStore = defineStore(
  'auth', 
  () => {
    // 状态（State）
    const token = ref<string | null>(null)
    const userInfo = ref<{ name: string } | null>(null)

    // Getter（获取数据）
    const getToken = () => token.value
    const getUserInfo = () => userInfo.value

    // Setter（设置数据）
    const setToken = (newToken: string) => {
      token.value = newToken
    }
    const setUserInfo = (info: { name: string }) => {
      userInfo.value = info
    }
    
    // Clear（清除数据）
    const clearStore = () => {
      token.value = null
      userInfo.value = null
    }

    return {
      token,
      userInfo,
      getToken,
      getUserInfo,
      setToken,
      setUserInfo,
      clearStore
    }
  },
  {
    persist: true,
  },
)
