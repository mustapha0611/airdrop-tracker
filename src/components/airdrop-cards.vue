<!-- src/components/AirdropCard.vue -->
<script setup>
import { ref } from 'vue';
import { useAirdropStore } from '@/stores/airdropStore';
import EditAirdropModal from './EditAirdropModal.vue';
import DeleteAirdropModal from './DeleteAirdropModal.vue';

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
  <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition relative overflow-hidden">
    <!-- Actions -->
    <div class="absolute top-3 right-3 flex gap-2">
      <button
        @click="showEdit = true"
        class="text-xs text-slate-400  border h-8 w-8 cursor-pointer rounded-full hover:bg-slate-700 hover:text-slate-200 transition-all duration-200"
      >
        <i class="pi pi-pencil "></i>
      </button>

      <button
        @click="showDelete = true"
        class="text-xs text-red-500 border h-8 w-8 cursor-pointer rounded-full hover:bg-red-700 hover:text-red-200"
      >
        <i class="pi pi-trash"></i>
      </button>
    </div>

    <h3 class="font-medium text-slate-800 mb-1">
      {{ airdrop.name }}
    </h3>

    <p class="text-sm text-slate-600 mb-3">
      {{ airdrop.description }}
    </p>
 <div>
  <span class="ml-2 text-xs font-medium capitalize px-2 py-0.5 rounded-xl inline-block mb-3"   :class="{
          'bg-green-100 text-green-800': airdrop.status === 'active',
          'bg-yellow-100 text-yellow-800': airdrop.status === 'completed',
          'bg-red-100 text-red-800': airdrop.status === 'expired'
        }">{{ airdrop.status }}</span>
 </div>
    <a
      v-if="airdrop.reference_link"
      :href="airdrop.reference_link"
      target="_blank"
      class="text-xs text-slate-500 border border-slate-300 rounded-md px-2 py-2 hover:bg-slate-100 transition flex items-center gap-1 w-fit"
    >
      View <i class="pi pi-link "></i>
    </a>

    <div class="flex flex-wrap gap-2 mt-4">
      <span
        v-for="tag in airdrop.tags"
        :key="tag"
        class="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-600"
      >
        #{{ tag }}
      </span>
    </div>



    <EditAirdropModal
      v-if="showEdit"
      :airdrop="airdrop"
      @close="showEdit = false"
    />

    <DeleteAirdropModal
      v-if="showDelete"
      :airdropId="airdrop.id"
      @close="showDelete = false"
    />
  </div>
</template>
