<script setup lang="ts">
import { onMounted } from 'vue';
import { useThemeStore } from './stores/themeStore';
import { useAuthStore } from './stores/authStore';

import Toast from 'primevue/toast';

const authStore = useAuthStore();
const themeStore = useThemeStore();

onMounted(() => {
  themeStore.apply();

});
</script>

<template>
  <Toast />
  <router-view />
</template>

<style scoped></style>
