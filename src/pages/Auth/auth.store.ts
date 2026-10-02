import { create } from "zustand";

type TAuthStore = {
  apiKey: string | null;
  setApiKey: (apiKey: string) => void;
  clearApiKey: () => void;
};

export const authStore = create<TAuthStore>((set) => ({
  apiKey: null,
  setApiKey: (apiKey) => set({ apiKey }),
  clearApiKey: () => set({ apiKey: null }),
}));
