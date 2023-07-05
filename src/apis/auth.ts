import { auth } from "@src/firebase.config";
import { storeDataToStorage } from "@utils/helper";
import { collection, getDocs, query, addDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "@src/firebase.config";
import { UserType } from "@src/types/schema";

type AuthType = (
  email: string,
  password: string,
  setSnackbarText: (snackbarText: string) => void
) => Promise<UserType | any | null>;

export const login: AuthType = async (
  email: string,
  password: string,
  setSnackbarText: (snackbarText: string) => void
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await storeDataToStorage("user", user);
    return user;
  } catch (error: any) {
    console.log(error.message);
    setSnackbarText(error.message);
    return null;
  }
};

export const register: AuthType = async (
  email: string,
  password: string,
  setSnackbarText: (snackbarText: string) => void
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await storeDataToStorage("user", user);
    return user;
  } catch (error: any) {
    console.log(error.message);
    setSnackbarText(error.message);
    return null;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    await storeDataToStorage("user", null);
  } catch (error: any) {
    console.log(error.message);
  }
};
