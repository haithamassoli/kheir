import { StateCreator } from "zustand";
import { login, register, logout } from "@apis/auth";
import { UserType } from "@src/types/schema";

export interface AuthState {
  user: UserType | null | undefined | any;
  setUser: (user: UserType) => void;
  login: (
    email: string,
    password: string,
    setSnackbarText: (snackbarText: string) => void
  ) => void;
  register: (
    email: string,
    password: string,
    setSnackbarText: (snackbarText: string) => void
  ) => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  login: (
    email: string,
    password: string,
    setSnackbarText: (snackbarText: string) => void
  ) => {
    const user = login(email, password, setSnackbarText);
    set({ user });
  },
  register: (
    email: string,
    password: string,
    setSnackbarText: (snackbarText: string) => void
  ) => {
    const user = register(email, password, setSnackbarText);
    set({ user });
  },
  logout: () => {
    logout();
    set({ user: null });
  },
});
