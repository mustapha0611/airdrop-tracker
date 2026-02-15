<script setup lang="ts">
import { onMounted } from 'vue';
import { useThemeStore } from './stores/themeStore';

import Toast from 'primevue/toast';


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
