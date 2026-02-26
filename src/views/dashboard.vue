<!-- src/views/Dashboard.vue -->
<script setup>
import { onMounted, ref } from "vue";
import { useAirdropStore } from "@/stores/airdropStore";
import Filters from "@/components/filters.vue";
import AirdropCard from "@/components/airdrop-cards.vue";
import AppHeader from "@/components/appheader.vue";
import AddAirdropForm from "@/components/addAirdropForm.vue";

const store = useAirdropStore();
const showAddForm = ref(false);

onMounted(() => {
  store.fetchAirdrops();
});
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <AppHeader />

    <div class="flex items-center justify-between gap-4 px-4 py-4">
      <filters />
      <button
        @click="showAddForm = true"
        class="px-4 py-2 text-sm font-medium cursor-pointer text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300 whitespace-nowrap"
      >
        + Add Airdrop
      </button>
    </div>
    <div
      v-if="store.airdrops.length === 0"
      class="py-20 flex flex-col items-center justify-center"
    >
      <img src="@/assets/empty.png" alt="" />
      <p class="text-sm text-slate-500 dark:text-slate-400 mb-6 transition-colors duration-300">Add Your airdrop List</p>
    </div>
<section v-else>
      <div
        v-if="store.filteredAirdrops.length === 0"
        class="py-20 flex flex-col items-center justify-center"
      >
        <img src="@/assets/empty.png" alt="" />
      </div>
 <div
      class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:px-4 px-[5%]"
    >
      <AirdropCard
      v-if="store.filteredAirdrops.length !== 0"
        v-for="airdrop in store.filteredAirdrops"
        :key="airdrop.id"
        :airdrop="airdrop"
      />
    </div>
</section>
   

    <!-- Add Airdrop Form Modal -->
    <AddAirdropForm v-if="showAddForm" @close="showAddForm = false" />
  </div>
</template>
