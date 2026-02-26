<script setup>
import { ref } from 'vue';
import { useAirdropStore } from '@/stores/airdropStore';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
  airdrop: Object
});
const emit = defineEmits(['close']);

const store = useAirdropStore();

const toast = useToast();

const name = ref(props.airdrop.name);
const description = ref(props.airdrop.description);
const reference_link = ref(props.airdrop.reference_link);
const status = ref(props.airdrop.status);
const tags = ref(props.airdrop.tags?.join(', ') || '');

const statusOptions = ['active', 'completed', 'expired'];
let isLoading = ref(false);
const showEditDropdown = ref(false);

async function submit() {
  isLoading.value = true;
  await store.updateAirdrop(props.airdrop.id, {
    name: name.value,
    description: description.value,
    reference_link: reference_link.value,
    status: status.value,
    tags: tags.value
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
  });
  
isLoading.value = false;
toast.add({
  severity: 'success',
  summary: 'Success',
  detail: 'Airdrop has been updated',
  life: 3000
})
  emit('close');
}
</script>

<template>
  <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-colors duration-300">
    <div class="bg-white dark:bg-slate-900 rounded-xl w-[90%] max-w-md p-6 shadow-lg border border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <h2 class="text-base font-semibold text-slate-800 dark:text-slate-100 mb-4 transition-colors duration-300">
        Edit Airdrop
      </h2>

      <div class="space-y-3">
        <input v-model="name" class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300" />
        <textarea v-model="description" rows="3" class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-colors duration-300" />
        <input v-model="reference_link" class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300" />
        <div class="relative">
          <button
            @click="showEditDropdown = !showEditDropdown"
            class="w-full px-3 flex items-center justify-between py-2 text-sm border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
          >
            {{ status }} <i class="pi pi-angle-down text-slate-500 dark:text-slate-400"></i>
          </button>
          <div
            v-if="showEditDropdown"
            class="absolute top-full mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg bg-white dark:bg-slate-800 z-10 overflow-hidden"
          >
            <button
              v-for="opt in statusOptions"
              :key="opt"
              @click="status = opt; showEditDropdown = false"
              class="w-full text-left px-3 py-2 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition-colors duration-200"
            >
              {{ opt.charAt(0).toUpperCase() + opt.slice(1) }}
            </button>
          </div>
        </div>
        <input v-model="tags" class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300" />
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button @click="$emit('close')" class="text-sm py-2 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-100 cursor-pointer transition-colors duration-300">
          Cancel
        </button>
        <button @click="submit" :disabled="isLoading" class="bg-slate-800 dark:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-blue-700 cursor-pointer disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed transition-colors duration-300">
          <span
            class="pi pi-spin pi-spinner cursor-not-allowed"
            v-if="isLoading"
          ></span>
          <span v-else>Save changes</span>
        </button>
      </div>
    </div>
    </div>
  </template>
