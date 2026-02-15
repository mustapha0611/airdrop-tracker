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
  <div class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl w-[90%] max-w-sm p-6 shadow-lg">
      <h2 class="text-base font-semibold text-slate-800 mb-2">
        Delete airdrop?
      </h2>

      <p class="text-sm text-slate-500 mb-6">This action can’t be undone.</p>

      <div class="flex justify-end gap-3">
        <button
          @click="$emit('close')"
          class="text-sm text-slate-500 hover:text-slate-700 cursor-pointer"
        >
          Cancel
        </button>

        <button
          @click="confirm"
          :disabled="isloading"
          class="bg-red-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-500 cursor-pointer disabled:bg-red-300 disabled:cursor-not-allowed"
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
