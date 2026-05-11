import { create } from "zustand";
import { persist } from "zustand/middleware";

type Tool = {
  name: string;
  plan: string;
  spend: number;
  seats: number;
};

type Store = {
  tools: Tool[];
  teamSize: number;
  useCase: string;

  setTools: (tools: Tool[]) => void;
  setTeamSize: (size: number) => void;
  setUseCase: (useCase: string) => void;
};

export const useFormStore = create<Store>()(
  persist(
    (set) => ({
      tools: [],
      teamSize: 1,
      useCase: "coding",

      setTools: (tools) => set({ tools }),

      setTeamSize: (teamSize) =>
        set({ teamSize }),

      setUseCase: (useCase) =>
        set({ useCase }),
    }),
    {
      name: "stackaudit-storage",
    }
  )
);