import { createRouter, createWebHistory } from 'vue-router';
import login from '@/views/login.vue';
import dashboard from '@/views/dashboard.vue';
import authCallback from '@/views/authCallBack.vue';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  { path: '/login', component: login },
  { path: '/', component: dashboard },
  { path: '/auth/callback', component: authCallback }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route guard
router.beforeEach(async (to) => {
  const auth = useAuthStore();

  // Skip initAuth on the callback page — let it handle the token exchange itself
  if (to.path === '/auth/callback') {
    return;
  }

  // Ensure initAuth runs once (idempotent due to _initialized flag)
  await auth.initAuth();

  // Protect dashboard and other pages
  if (!auth.user && to.path !== '/login') {
    return '/login';
  }

  // Redirect logged-in user away from login
  if (auth.user && to.path === '/login') {
    return '/';
  }
});

export default router;
