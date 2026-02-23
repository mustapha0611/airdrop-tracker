// src/stores/auth.store.ts
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    _initialized: false
  }),

  actions: {
    // Start Google OAuth login
    async signInWithGoogle() {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
    },

    // Initialize auth on app startup (call only once)
    async initAuth() {
      if (this._initialized) return;
      this._initialized = true;

      const { data: { session } } = await supabase.auth.getSession();
      this.user = session?.user || null;
      if (this.user) localStorage.setItem('user', JSON.stringify(this.user));
      else localStorage.removeItem('user');

      this._setupAuthListener();
    },

    // Set up the auth state change listener
    _setupAuthListener() {
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
