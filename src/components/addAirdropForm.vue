<script setup>
import { ref } from 'vue';
import { useAirdropStore } from '@/stores/airdropStore';
import { useToast } from 'primevue/usetoast';

const emit = defineEmits(['close']);

const store = useAirdropStore();
const isLoading = ref(false);
const toast = useToast();

const form = ref({
  name: '',
  description: '',
  reference_link: '',
  status: 'pending',
  tags: ''
});

const errors = ref({
  name: ''
});

async function submit() {
  // Validation
  if (!form.value.name.trim()) {
    errors.value.name = 'Airdrop name is required';
    return;
  }

  isLoading.value = true;
  
  try {
    await store.addAirdrop({
      name: form.value.name.trim(),
      description: form.value.description.trim(),
      reference_link: form.value.reference_link.trim(),
      status: form.value.status,
      tags: form.value.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
    });
    
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'New Airdrop has been added',
      life: 3000
    });

    emit('close');
  } finally {
    isLoading.value = false;
  }
}

function clearError(field) {
  errors.value[field] = '';
}
</script>

<template>
  <div class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
      <h2 class="text-base font-semibold text-slate-800 mb-4">
        Add New Airdrop
      </h2>

      <form @submit.prevent="submit" class="space-y-3">
        <!-- Name Input -->
        <div>
          <label class="block text-xs font-medium text-slate-700 mb-1">
            Airdrop Name *
          </label>
          <input
            v-model="form.name"
            @focus="clearError('name')"
            type="text"
            placeholder="enter airdrop name (excluding union.. lol)"
            class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <p v-if="errors.name" class="mt-1 text-xs text-red-500">
            {{ errors.name }}
          </p>
        </div>

        <!-- Status Select -->
        <div class="relative">
          <button
            @click="showStatusDropdown = !showStatusDropdown"
            class="w-full px-3 flex items-center justify-between py-2 text-sm border rounded-lg border-slate-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {{ form.status.charAt(0).toUpperCase() + form.status.slice(1) }} <i class="pi pi-angle-down"></i>
          </button>
          <div
            v-if="showStatusDropdown"
            class="absolute top-full mt-1 w-full border border-slate-200 rounded-lg shadow-lg bg-white z-10"
          >
            <button
              v-for="opt in ['pending', 'active', 'completed', 'claimed']"
              :key="opt"
              @click="form.status = opt; showStatusDropdown = false"
              class="w-full text-left px-3 py-2 text-sm cursor-pointer hover:bg-slate-100"
            >
              {{ opt.charAt(0).toUpperCase() + opt.slice(1) }}
            </button>
          </div>
        </div>

        <!-- Description Textarea -->
        <div>
          <label class="block text-xs font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Add details about this airdrop..."
            class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
          />
        </div>

        <!-- Reference Link -->
        <div>
          <label class="block text-xs font-medium text-slate-700 mb-1">
            Reference Link
          </label>
          <input
            v-model="form.reference_link"
            type="url"
            placeholder="https://example.com"
            class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <!-- Tags Input -->
        <div>
          <label class="block text-xs font-medium text-slate-700 mb-1">
            Tags (comma-separated)
          </label>
          <input
            v-model="form.tags"
            type="text"
            placeholder="e.g., defi, polygon, eth"
            class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2 text-sm font-medium text-slate-700 cursor-pointer bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isLoading"
            class="flex-1 px-4 py-2 text-sm font-medium cursor-pointer  bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
          <span class="pi pi-spin pi-spinner cursor-not-allowed" v-if="isLoading"></span>
            <span v-else>Add Airdrop</span>
            
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
