<!-- src/components/AirdropCard.vue -->
<script setup>
import { ref } from 'vue';
import { useAirdropStore } from '@/stores/airdropStore';
import editAirdropModal from './editAirdropModal.vue';
import deleteAirdropModal from './deleteAirdropModal.vue';

const props = defineProps({ airdrop: Object });
const store = useAirdropStore();
const newTag = ref('');

const showEdit = ref(false);
const showDelete = ref(false);
function addTag() {
  if (!newTag.value) return;
  store.updateTags(
    props.airdrop.id,
    [...(props.airdrop.tags || []), newTag.value]
  );
  newTag.value = '';
}

function removeTag(tag) {
  store.updateTags(
    props.airdrop.id,
    props.airdrop.tags.filter(t => t !== tag)
  );
}
</script>

<template>
  <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
    <!-- Actions -->
    <div class="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        @click="showEdit = true"
        class="text-xs text-slate-400 dark:text-slate-500 border dark:border-slate-700 h-8 w-8 cursor-pointer rounded-full hover:bg-slate-700 hover:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-slate-200 transition-all duration-200"
      >
        <i class="pi pi-pencil "></i>
      </button>

      <button
        @click="showDelete = true"
        class="text-xs text-red-500 border dark:border-slate-700 h-8 w-8 cursor-pointer rounded-full hover:bg-red-700 hover:text-red-200"
      >
        <i class="pi pi-trash"></i>
      </button>
    </div>

    <h3 class="font-medium text-slate-800 dark:text-slate-100 mb-1 transition-colors duration-300">
      {{ airdrop.name }}
    </h3>

    <p class="text-sm text-slate-600 dark:text-slate-400 mb-3 transition-colors duration-300">
      {{ airdrop.description }}
    </p>
 <div>
  <span class="ml-2 text-xs font-medium capitalize px-2 py-0.5 rounded-xl inline-block mb-3"   :class="{
          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100': airdrop.status === 'active',
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100': airdrop.status === 'completed',
          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100': airdrop.status === 'expired',
          'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200': airdrop.status === 'pending' || airdrop.status === 'claimed'
        }">{{ airdrop.status }}</span>
 </div>
    <a
      v-if="airdrop.reference_link"
      :href="airdrop.reference_link"
      target="_blank"
      class="text-xs text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300 flex items-center gap-1 w-fit"
    >
      View <i class="pi pi-link "></i>
    </a>

    <div class="flex flex-wrap gap-2 mt-4">
      <span
        v-for="tag in airdrop.tags"
        :key="tag"
        class="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-600 dark:text-slate-400 transition-colors duration-300"
      >
        #{{ tag }}
      </span>
    </div>



    <editAirdropModal
      v-if="showEdit"
      :airdrop="airdrop"
      @close="showEdit = false"
    />

    <deleteAirdropModal
      v-if="showDelete"
      :airdropId="airdrop.id"
      @close="showDelete = false"
    />
  </div>
</template>
