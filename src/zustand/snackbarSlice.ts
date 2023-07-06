import { StateCreator } from "zustand";

export interface ISnackbarState {
  snackbarText: string;
  setSnackbarText: (snackbarText: string) => void;
}

export const createSnackbarSlice: StateCreator<ISnackbarState> = (set) => ({
  snackbarText: "",
  setSnackbarText: (snackbarText: string) => set({ snackbarText }),
});
