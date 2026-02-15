<script setup>
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore();
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="bg-white border border-slate-200 rounded-xl p-8 w-full max-w-sm shadow-sm text-center">
      <h1 class="text-lg font-semibold text-slate-800 mb-2">
        Airdrop Tracker
      </h1>

      <p class="text-sm text-slate-500 mb-6">
        Sign in to track and manage your airdrops
      </p>

      <button
        @click="auth.signInWithGoogle()"
        class="w-full flex items-center justify-center gap-3 border cursor-pointer border-slate-200 rounded-lg py-2.5 text-sm text-slate-700 hover:bg-slate-100 transition"
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
