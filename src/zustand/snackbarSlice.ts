import { StateCreator } from "zustand";

export interface SnackbarState {
  snackbarText: string;
  setSnackbarText: (snackbarText: string) => void;
}

export const createSnackbarSlice: StateCreator<SnackbarState> = (set) => ({
  snackbarText: "",
  setSnackbarText: (snackbarText: string) => set({ snackbarText }),
});
