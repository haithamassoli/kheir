import { create } from "zustand";
import { createThemeSlice, IThemeState } from "./themeSlice";
import { createSnackbarSlice, ISnackbarState } from "./snackbarSlice";
import { createAuthSlice, IAuthState } from "./authSlice";
import { ICartState, createCartSlice } from "./cartSlice";

interface IStore extends IAuthState, IThemeState, ISnackbarState, ICartState {}

export const useStore = create<IStore>()((...a) => ({
  ...createThemeSlice(...a),
  ...createAuthSlice(...a),
  ...createSnackbarSlice(...a),
  ...createCartSlice(...a),
}));
