import { createRouter, createWebHistory } from 'vue-router';
import login from '@/views/login.vue';
import dashboard from '@/views/dashboard.vue';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  { path: '/login', component: login },
  { path: '/', component: dashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  await auth.initAuth();

  if (!auth.user && to.path !== '/login') {
    return '/login';
  }

  if (auth.user && to.path === '/login') {
    return '/';
  }
});

export default router;
