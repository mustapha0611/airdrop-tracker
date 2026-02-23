<template>
  <div class="flex items-center justify-center h-screen">
    <p>Logging you in, please wait...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase';

const auth = useAuthStore();
const router = useRouter();

onMounted(() => {
  // Listen for the SIGNED_IN event that fires when the SDK
  // automatically exchanges the PKCE code from the URL
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      auth.user = session.user;
      localStorage.setItem('user', JSON.stringify(session.user));
      auth._initialized = true;
      subscription.unsubscribe();
      router.push('/');
    } else if (event === 'TOKEN_REFRESHED' && session) {
      auth.user = session.user;
      localStorage.setItem('user', JSON.stringify(session.user));
    }
  });

  // Safety timeout — if no auth event fires within 5 seconds, redirect to login
  setTimeout(() => {
    if (!auth.user) {
      subscription.unsubscribe();
      console.error('Auth callback timed out — no session received');
      router.push('/login');
    }
  }, 5000);
});
</script>
