<!-- src/components/Filters.vue -->
<script setup>
import { useAirdropStore } from '@/stores/airdropStore';
const store = useAirdropStore();
</script>

<template>
  <div class="py-2">
  <div class="flex flex-wrap gap-3 ">
    <input
      v-model="store.search"
      placeholder="Search airdrops"
      class="px-3 py-2 text-sm border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-300 dark:focus:ring-slate-600 transition-colors duration-300"
    />

    <div class="relative">
      <button
      @click="store.showStatusDropdown = !store.showStatusDropdown"
      class="px-3 flex items-center gap-2 py-2 text-sm border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-300 dark:focus:ring-slate-600 transition-colors duration-300"
      >
      {{ store.status === 'all' ? 'All status' : store.status }} <i class="pi pi-angle-down"></i>
      </button>
      <div
      v-if="store.showStatusDropdown"
      class="absolute top-full mt-1 w-40 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg bg-white dark:bg-slate-900 z-10 overflow-hidden"
      >
      <button
        v-for="option in ['all', 'active', 'completed', 'expired']"
        :key="option"
        @click="store.status = option; store.showStatusDropdown = false"
        class="w-full text-left px-3 py-2 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 transition-colors duration-200"
      >
        {{ option.charAt(0).toUpperCase() + option.slice(1) }}
      </button>
      </div>
    </div>

  </div></div>
</template>
