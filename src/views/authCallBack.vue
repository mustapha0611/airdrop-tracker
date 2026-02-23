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

onMounted(async () => {
  try {
    // Supabase automatically parses the hash fragment (#access_token=...)
    // and exchanges it for a session when getSession() is called.
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) throw error;

    if (session) {
      auth.user = session.user;
      localStorage.setItem('user', JSON.stringify(session.user));
      router.push('/');
    } else {
      console.error('No session found after OAuth callback');
      router.push('/login');
    }
  } catch (err) {
    console.error('OAuth callback error:', err);
    router.push('/login');
  }
});
</script>
