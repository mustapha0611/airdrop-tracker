<template>
  <div>Logging you in, please wait...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

onMounted(async () => {
  const data = await auth.handleOAuthCallback();
  if (data) {
    router.push('/'); // go to dashboard after login
  } else {
    router.push('/login'); // fallback on error
  }
});
</script>
