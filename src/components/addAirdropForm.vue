<script setup>
import { ref } from "vue";
import { useAirdropStore } from "@/stores/airdropStore";
import { useToast } from "primevue/usetoast";


const emit = defineEmits(["close"]);

const store = useAirdropStore();
const isLoading = ref(false);
const toast = useToast();

const form = ref({
  name: "",
  description: "",
  reference_link: "",
  status: "pending",
  tags: "",
});
const showStatusDropdown = ref(false);
const options = ["pending", "active", "completed", "claimed"];

const updateOptions = (opt) => {
  form.value.status = opt;
  showStatusDropdown.value = false;
};
const errors = ref({
  name: "",
});

async function submit() {
  // Validation
  if (!form.value.name.trim()) {
    errors.value.name = "Airdrop name is required";
    return;
  }
  if (form.invalid) return;
  isLoading.value = true;

  try {
    await store.addAirdrop({
      name: form.value.name.trim(),
      description: form.value.description.trim(),
      reference_link: form.value.reference_link.trim(),
      status: form.value.status,
      tags: form.value.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "New Airdrop has been added",
      life: 3000,
    });

    emit("close");
  } finally {
    isLoading.value = false;
  }
}

function clearError(field) {
  errors.value[field] = "";
}
</script>

<template>
  <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-colors duration-300">
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md p-6 shadow-lg w-[90%] transition-colors duration-300">
      <h2 class="text-base font-semibold text-slate-800 dark:text-slate-100 mb-4 transition-colors duration-300">
        Add New Airdrop
      </h2>

      <div class="space-y-3">
        <!-- Name Input -->
        <div>
          <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">
            Airdrop Name *
          </label>
          <input
            v-model="form.name"
            @focus="clearError('name')"
            type="text"
            placeholder="enter airdrop name (excluding union.. lol)"
            class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
          />
          <p v-if="errors.name" class="mt-1 text-xs text-red-500">
            {{ errors.name }}
          </p>
        </div>

        <!-- Status Select -->
        <div class="relative">
          <button
            @click="showStatusDropdown = !showStatusDropdown"
            class="w-full px-3 flex items-center justify-between py-2 text-sm border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
          >
            {{ form.status.charAt(0).toUpperCase() + form.status.slice(1) }}
            <i class="pi pi-angle-down text-slate-500 dark:text-slate-400"></i>
          </button>
          <div
            v-if="showStatusDropdown"
            class="absolute top-full mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg bg-white dark:bg-slate-800 z-10 overflow-hidden"
          >
            <button
              v-for="opt in options"
              :key="opt"
              @click.stop="updateOptions(opt)"
              class="w-full text-left px-3 py-2 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition-colors duration-200"
            >
              {{ opt.charAt(0).toUpperCase() + opt.slice(1) }}
            </button>
          </div>
        </div>

        <!-- Description Textarea -->
        <div>
          <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">
            Description
          </label>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Add details about this airdrop..."
            class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-colors duration-300"
          />
        </div>

        <!-- Reference Link -->
        <div>
          <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">
            Reference Link
          </label>
          <input
            v-model="form.reference_link"
       
            type="url"
            placeholder="https://example.com"
            class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
          />
        </div>

        <!-- Tags Input -->
        <div>
          <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">
            Tags (comma-separated)
          </label>
          <input
            v-model="form.tags"
            type="text"
            placeholder="e.g., defi, polygon, eth"
            class="w-full px-3 py-2 text-sm border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            @click="submit"
            :disabled="isLoading"
            class="flex-1 px-4 py-2 text-sm font-medium cursor-pointer bg-slate-800 dark:bg-blue-600 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              class="pi pi-spin pi-spinner cursor-not-allowed"
              v-if="isLoading"
            ></span>
            <span v-else>Add Airdrop</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
