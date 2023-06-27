import { StateCreator } from "zustand";

export interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const createThemeSlice: StateCreator<ThemeState> = (set) => ({
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
});
