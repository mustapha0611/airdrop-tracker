// src/stores/auth.store.ts
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null')
  }),

  actions: {
    // Step 1: Start Google OAuth login
    async signInWithGoogle() {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // redirect to dedicated callback page
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
    },

    // Step 2: Handle redirect callback (consume tokens)
    async handleOAuthCallback() {
      try {
        // Get the session that was automatically stored on redirect
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        this.user = session?.user || null;
        if (this.user) localStorage.setItem('user', JSON.stringify(this.user));

        return session;
      } catch (err) {
        console.error('OAuth callback error:', err);
        return null;
      }
    },

    // Step 3: Initialize auth on normal page loads
    async initAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      this.user = session?.user || null;
      if (this.user) localStorage.setItem('user', JSON.stringify(this.user));

      // Listen for future login/logout events
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
    }
  }
});
