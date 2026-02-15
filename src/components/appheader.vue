<script setup>
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore();
const theme = useThemeStore();
</script>

<template>
  <header class="border-b border-slate-200">
    <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

      <!-- LEFT: LOGO -->
      <div class="font-semibold text-slate-800  tracking-tight">
        Airdrop Tracker
      </div>

      <!-- RIGHT -->
      <div class="flex items-center gap-4">

 
        <!-- GitHub -->
        <a
          href="https://github.com"
          target="_blank"
          class="text-slate-500 hover:text-slate-800  transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.6-1.4-1.4-1.7-1.4-1.7-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.2 2 3.1 1.4 3.9 1.1.1-.8.5-1.4.8-1.7-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.3-3.2-.1-.3-.6-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.1.8.9 1.3 1.9 1.3 3.2 0 4.4-2.7 5.4-5.3 5.7.5.4.9 1.1.9 2.3v3.4c0 .4.2.7.8.6A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/>
          </svg>
        </a>

        <!-- X (Twitter) -->
        <a
          href="https://x.com/MustaphaMS007"
          target="_blank"
          class="text-slate-500 hover:text-slate-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.9 2H22l-7.2 8.2L23 22h-6.7l-5.3-6.9L4.9 22H1.8l7.7-8.8L1 2h6.8l4.8 6.3L18.9 2z"/>
          </svg>
        </a>
        <button @click="auth.logout()" class="cursor-pointer text-slate-500 hover:text-slate-800 transition">
          <i class="pi pi-sign-out"></i>
        </button>
      </div>
    </div>
  </header>
</template>
