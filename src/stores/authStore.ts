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
        provider: 'google',
        options: {
          redirectTo: window.location.origin // your site URL
        }
      });
    },

    async initAuth() {
      // Check if user already has a session
      const { data: { session } } = await supabase.auth.getSession();
      this.user = session?.user || null;
      if (this.user) localStorage.setItem('user', JSON.stringify(this.user));

      // Listen for future auth changes (login, logout)
      supabase.auth.onAuthStateChange((_event, session) => {
        this.user = session?.user || null;
        if (this.user) localStorage.setItem('user', JSON.stringify(this.user));
        else localStorage.removeItem('user');
      });
    },

    async logout() {
      await supabase.auth.signOut();
      this.user = null;
      localStorage.removeItem('user');
      router.push('/login');
    }
  }
});
