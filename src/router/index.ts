import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Dashboard }
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
