import { create } from "zustand";
import { createThemeSlice, ThemeState } from "./themeSlice";

export const useStore = create<ThemeState>()((...a) => ({
  ...createThemeSlice(...a),
}));
