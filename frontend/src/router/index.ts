import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import UploadPlanilla from '@/views/UploadPlanilla.vue'
import InventoryList from '@/views/InventoryList.vue'

declare module 'vue-router' {
    interface RouteMeta {
        requiresAuth?: boolean;
        requiresGuest?: boolean;
        requiresSuperAdmin?: boolean;
        roles?: string[];
    }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/upload',
    name: 'UploadPlanilla',
    component: UploadPlanilla,
    meta: { requiresAuth: true, roles: ['org_admin', 'data_entry'] }
  },
  {
    path: '/inventory',
    name: 'InventoryList',
    component: InventoryList,
    meta: { requiresAuth: true, roles: ['org_admin', 'supervisor'] }
  },
  {
    path: '/planillas/:id/validar',
    name: 'ValidarPlanilla',
    component: () => import('@/views/ValidarPlanilla.vue'),
    meta: { requiresAuth: true, roles: ['org_admin', 'supervisor', 'data_entry'] }
  }
  ,
  {
    path: '/users',
    name: 'UserManagement',
    component: () => import('@/views/UserManagement.vue'),
    meta: { requiresAuth: true, roles: ['org_admin', 'super_admin'] }
  },
  {
    path: '/organizations',
    name: 'OrganizationManagement',
    component: () => import('@/views/OrganizationManagement.vue'),
    meta: { requiresAuth: true, requiresSuperAdmin: true }
  },
  {
    path: '/analytics/orgs',
    name: 'AnalyticsOrgs',
    component: () => import('@/views/AnalyticsOrgs.vue'),
    meta: { requiresAuth: true, requiresSuperAdmin: true }
  },
  {
    path: '/analytics/orgs/:id',
    name: 'OrganizationAnalytics',
    component: () => import('@/views/OrganizationAnalytics.vue'),
    meta: { requiresAuth: true, requiresSuperAdmin: true }
  },
  {
    path: '/locations',
    name: 'LocationManagement',
    component: () => import('@/views/LocationManagement.vue'),
    meta: { requiresAuth: true, roles: ['org_admin', 'super_admin'] }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/my-planillas',
    name: 'MyPlanillas',
    component: () => import('@/views/MyPlanillas.vue'),
    meta: { requiresAuth: true, roles: ['data_entry'] }
  },
  {
    path: '/categories',
    name: 'CategoryManagement',
    component: () => import('@/views/CategoryManagement.vue'),
    meta: { requiresAuth: true, roles: ['org_admin', 'super_admin'] }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to:any, _from:any, next:any) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/login');
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next('/dashboard');
  }

  // Role-based access control
  if (to.meta.roles) {
    const user = authStore.user;
    if (!user) {
      return next('/login');
    }

    const hasRole = user.roles.some((role:any) => to.meta.roles!.includes(role));

    if (authStore.isSuperAdmin || hasRole) {
      return next();
    } else {
      // Redirect to a "not authorized" page or dashboard
      return next('/dashboard');
    }
  }

  // Super admin specific routes
  if (to.meta.requiresSuperAdmin && !authStore.isSuperAdmin) {
    return next('/dashboard');
  }

  next();
});

export default router
