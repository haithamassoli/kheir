import { create } from "zustand";
import { createThemeSlice, ThemeState } from "./themeSlice";
import { createSnackbarSlice, SnackbarState } from "./snackbarSlice";
import { createAuthSlice, AuthState } from "./authSlice";

export const useStore = create<ThemeState & AuthState & SnackbarState>()(
  (...a) => ({
    ...createThemeSlice(...a),
    ...createAuthSlice(...a),
    ...createSnackbarSlice(...a),
  })
);
