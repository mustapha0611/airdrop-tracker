<script setup>
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore();
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 w-[80%] max-w-sm shadow-sm text-center transition-colors duration-300">
      <h1 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 transition-colors duration-300">
        Airdrop Tracker
      </h1>

      <p class="text-sm text-slate-500 dark:text-slate-400 mb-6 transition-colors duration-300">
        Sign in to track and manage your airdrops
      </p>

      <button
        @click="auth.signInWithGoogle()"
        class="w-full flex items-center justify-center gap-3 border cursor-pointer border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          class="w-4 h-4"
        />
        Continue with Google
      </button>
    </div>
  </div>
</template>
