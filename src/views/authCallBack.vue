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
    // Check for PKCE flow (code in query params) or implicit flow (tokens in hash)
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    let session = null;

    if (code) {
      // PKCE flow: exchange the authorization code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error;
      session = data.session;
    } else {
      // Implicit flow fallback: tokens are in the URL hash fragment
      // Supabase SDK parses them automatically during getSession()
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      session = data.session;
    }

    if (session) {
      auth.user = session.user;
      localStorage.setItem('user', JSON.stringify(session.user));
      // Mark auth as initialized and set up the listener for future auth events
      auth._initialized = true;
      auth._setupAuthListener();
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
