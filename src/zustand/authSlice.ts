import { StateCreator } from "zustand";
import { IUser } from "@src/types/schema";

export interface IAuthState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const createAuthSlice: StateCreator<IAuthState> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});
