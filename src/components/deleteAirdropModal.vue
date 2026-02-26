<script setup>
import { ref } from "vue";
import { useAirdropStore } from "@/stores/airdropStore";
import { useToast } from "primevue/usetoast";

const props = defineProps({
  airdropId: String,
});
const emit = defineEmits(["close"]);

const toast = useToast();

const store = useAirdropStore();
const isloading = ref(false);

async function confirm() {
  isloading.value = true;
  await store.deleteAirdrop(props.airdropId);
  isloading.value = false;
  toast.add({
    severity: "success",
    summary: "Deleted",
    detail: "Airdrop has been deleted",
    life: 3000,
  });
  emit("close");
}
</script>

<template>
  <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-colors duration-300">
    <div class="bg-white dark:bg-slate-900 rounded-xl w-[90%] max-w-sm p-6 shadow-lg border border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <h2 class="text-base font-semibold text-slate-800 dark:text-slate-100 mb-2 transition-colors duration-300">
        Delete airdrop?
      </h2>

      <p class="text-sm text-slate-500 dark:text-slate-400 mb-6 transition-colors duration-300">This action can’t be undone.</p>

      <div class="flex justify-end gap-3">
        <button
          @click="$emit('close')"
          class="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer transition-colors duration-300"
        >
          Cancel
        </button>

        <button
          @click="confirm"
          :disabled="isloading"
          class="bg-red-600 dark:bg-red-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-500 dark:hover:bg-red-600 cursor-pointer disabled:bg-red-300 disabled:dark:bg-red-900 disabled:cursor-not-allowed transition-colors duration-300"
        >
          <span
            class="pi pi-spin pi-spinner cursor-not-allowed"
            v-if="isloading"
          ></span>
          <span v-else>Delete</span>
        </button>
      </div>
    </div>
  </div>
</template>
