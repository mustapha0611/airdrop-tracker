<template>
  <div class="flex items-center justify-center h-screen">
    <i class="pi pi-spin pi-spinner"></i>
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

onMounted(async () => {
  try {
    // Parse tokens from the hash fragment that Supabase/Google returns
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const access_token = hashParams.get('access_token');
    const refresh_token = hashParams.get('refresh_token');

    if (access_token && refresh_token) {
      // Manually set the session using the tokens from the URL
      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token
      });

      if (error) throw error;

      if (data.session) {
        auth.user = data.session.user;
        localStorage.setItem('user', JSON.stringify(data.session.user));
        auth._initialized = true;
        auth._setupAuthListener();
        // Clear the hash from the URL
        window.location.hash = '';
        router.push('/');
        return;
      }
    }

    // Fallback: check if SDK already has a session (e.g. from auto-detection)
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      auth.user = session.user;
      localStorage.setItem('user', JSON.stringify(session.user));
      auth._initialized = true;
      auth._setupAuthListener();
      router.push('/');
      return;
    }

    console.error('No session found after OAuth callback');
    router.push('/login');
  } catch (err) {
    console.error('OAuth callback error:', err);
    router.push('/login');
  }
});
</script>
