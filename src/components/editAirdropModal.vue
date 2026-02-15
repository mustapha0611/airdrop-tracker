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
const showEditDropdown = ref(false);

async function submit() {
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
  <div class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
      <h2 class="text-base font-semibold text-slate-800 mb-4">
        Edit Airdrop
      </h2>

      <div class="space-y-3">
        <input v-model="name" class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200" />
        <textarea v-model="description" rows="3" class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200" />
        <input v-model="reference_link" class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200" />
        <div class="relative">
          <button
            @click="showEditDropdown = !showEditDropdown"
            class="w-full px-3 flex items-center justify-between py-2 text-sm border rounded-lg border-slate-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-300"
          >
            {{ status }} <i class="pi pi-angle-down"></i>
          </button>
          <div
            v-if="showEditDropdown"
            class="absolute top-full mt-1 w-full border border-slate-200 rounded-lg shadow-lg bg-white z-10"
          >
            <button
              v-for="opt in statusOptions"
              :key="opt"
              @click="status = opt; showEditDropdown = false"
              class="w-full text-left px-3 py-2 text-sm cursor-pointer hover:bg-slate-100"
            >
              {{ opt.charAt(0).toUpperCase() + opt.slice(1) }}
            </button>
          </div>
        </div>
        <input v-model="tags" class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200" />
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button @click="$emit('close')" class="text-sm py-2  px-4 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-700 cursor-pointer">
          Cancel
        </button>
        <button @click="submit" class="bg-slate-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-700 cursor-pointer">
          Save changes
        </button>
      </div>
    </div>
    </div>
  </template>
