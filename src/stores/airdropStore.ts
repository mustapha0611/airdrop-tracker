// src/stores/airdrop.store.ts
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "./authStore";

interface Airdrop {
  id: string;
  name: string;
  status: string;
  tags?: string[];
  created_at: string;
  user_id: string;
}

export const useAirdropStore = defineStore("airdrops", {
  state: () => ({
    airdrops: [] as Airdrop[],
    search: "",
    status: "all",
    tag: "",
  }),

  getters: {
    filteredAirdrops(state) {
      return state.airdrops.filter((a) => {
        const s = state.search.toLowerCase();
        return (
          a.name.toLowerCase().includes(s) &&
          (state.status === "all" || a.status === state.status) &&
          (!state.tag || a.tags?.includes(state.tag))
        );
      });
    },
  },

  actions: {
    async fetchAirdrops() {
      try {
        const auth = useAuthStore();

        const { data, error } = await supabase
          .from("airdrops")
          .select("*")
          .eq("user_id", auth.user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Failed to fetch airdrops:", error);
          this.airdrops = [];
          return;
        }

        this.airdrops = data || [];
      } catch (error) {
        console.error("Error in fetchAirdrops:", error);
        this.airdrops = [];
      }
    },

    async updateStatus(id: string, status: string) {
      await supabase.from("airdrops").update({ status }).eq("id", id);
      const a = this.airdrops.find((a) => a.id === id);
      if (a) a.status = status;
    },

    async updateTags(id: string, tags: string[]) {
      await supabase.from("airdrops").update({ tags }).eq("id", id);
      const a = this.airdrops.find((a) => a.id === id);
      if (a) a.tags = tags;
    },

    async updateAirdrop(id: string, payload: any) {
      const { data } = await supabase
        .from("airdrops")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

      const index = this.airdrops.findIndex((a) => a.id === id);
      if (index !== -1 && data) {
        this.airdrops[index] = data;
      }
    },

    async deleteAirdrop(id: string) {
      await supabase.from("airdrops").delete().eq("id", id);

      this.airdrops = this.airdrops.filter((a) => a.id !== id);
    },

    async addAirdrop(payload: any) {
      try {
        const auth = useAuthStore();

        const { data, error } = await supabase
          .from("airdrops")
          .insert([
            {
              ...payload,
              user_id: auth.user.id,
            },
          ])
          .select()
          .single();

        if (error) {
          console.error("Failed to add airdrop:", error);
          throw error;
        }

        if (data) {
          this.airdrops.unshift(data);
        }

      } catch (error) {

        console.error("Error in addAirdrop:", error);
        throw error;
      }
    },
  },
});
