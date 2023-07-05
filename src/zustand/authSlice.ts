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
  login: async (
    email: string,
    password: string,
    setSnackbarText: (snackbarText: string) => void
  ) => {
    const user = await login(email, password, setSnackbarText);
    set({ user });
  },
  register: async (
    email: string,
    password: string,
    setSnackbarText: (snackbarText: string) => void
  ) => {
    const user = await register(email, password, setSnackbarText);
    set({ user });
  },
  logout: async () => {
    await logout();
    set({ user: null });
  },
});
