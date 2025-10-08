import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
import type { User, LoginCredentials, UpdateProfilePayload } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  
  const isSuperAdmin = computed(() => user.value?.isSuperAdmin === true)
  
  const isAdmin = computed(() => {
    if (!user.value) return false;
    return user.value.isSuperAdmin || user.value.roles.includes('org_admin');
  })

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    try {
      const response = await authService.login(credentials)
      
      token.value = response.access_token
      user.value = response.user
      
      localStorage.setItem('token', response.access_token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      return response
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }

  const fetchUser = async () => {
    loading.value = true;
    try {
      const userData = await userService.getProfile();
      user.value = userData;
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user:", error);
      // Handle error, maybe logout user
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (payload: UpdateProfilePayload) => {
    loading.value = true;
    try {
      const updatedUser = await userService.updateProfile(payload);
      user.value = updatedUser;
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error; // Re-throw to be caught in the component
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    token,
    loading,
    isAuthenticated,
    isSuperAdmin,
    isAdmin,
    login,
    logout,
    checkAuth,
    fetchUser,
    updateProfile
  }
})
