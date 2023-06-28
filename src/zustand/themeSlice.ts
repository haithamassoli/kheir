import { StateCreator } from "zustand";
import { storeDataToStorage } from "@utils/helper";

export interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const createThemeSlice: StateCreator<ThemeState> = (set) => ({
  isDark: false,
  toggleTheme: () => {
    set((state) => {
      storeDataToStorage("isDark", !state.isDark);
      return { isDark: !state.isDark };
    });
  },
});
