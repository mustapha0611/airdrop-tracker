<!-- src/views/Dashboard.vue -->
<script setup>
import { onMounted, ref } from 'vue';
import { useAirdropStore } from '@/stores/airdropStore';
import Filters from '@/components/Filters.vue';
import AirdropCard from '@/components/airdrop-cards.vue';
import AppHeader from '@/components/appheader.vue';
import AddAirdropForm from '@/components/addAirdropForm.vue';

const store = useAirdropStore();
const showAddForm = ref(false);

onMounted(() => {
  store.fetchAirdrops();
});
</script>

<template>
  <div class="max-w-6xl mx-auto ">
    <AppHeader />

    <div class="flex items-center justify-between gap-4 px-4 py-4">
      <Filters />
      <button
        @click="showAddForm = true"
        class="px-4 py-2 text-sm font-medium cursor-pointer text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors whitespace-nowrap"
      >
        + Add Airdrop
      </button>
    </div>

    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:px-4
    
    px-[2%]">
      <AirdropCard
        v-for="airdrop in store.filteredAirdrops"
        :key="airdrop.id"
        :airdrop="airdrop"
      />
    </div>

    <!-- Add Airdrop Form Modal -->
    <AddAirdropForm
      v-if="showAddForm"
      @close="showAddForm = false"
    />
  </div>
</template>
