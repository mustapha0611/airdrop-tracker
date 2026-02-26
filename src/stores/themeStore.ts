import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    dark: localStorage.getItem('theme') === 'dark'
  }),

  actions: {
    toggle() {
      this.dark = !this.dark;
      localStorage.setItem('theme', this.dark ? 'dark' : 'light');
      this.apply();
    },

    apply() {
      if (this.dark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.add('my-app-dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.remove('my-app-dark');
      }
    }
  }
});
