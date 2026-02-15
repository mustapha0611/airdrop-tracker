// src/stores/auth.store.ts
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null')
  }),

  actions: {
    async signInWithGoogle() {
      await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
    },

    async initAuth() {
      const { data } = await supabase.auth.getUser();
      this.user = data.user;
      localStorage.setItem('user', JSON.stringify(data.user));
    },

    async logout() {
      await supabase.auth.signOut();
      this.user = null;
      localStorage.removeItem('user');
      router.push('/login');
    }
  }
});
