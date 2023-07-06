import { auth } from "@src/firebase.config";
import { storeDataToStorage } from "@utils/helper";
import { collection, addDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { db } from "@src/firebase.config";
import { useStore } from "@zustand/store";

interface ILoginData {
  email: string;
  password: string;
}

export const loginMutation = () => {
  const { setSnackbarText, setUser } = useStore((state) => state);
  return useMutation({
    mutationFn: (data: ILoginData) => login(data.email, data.password),
    onSuccess: (data: any) => {
      console.log("data", data);
      setSnackbarText("تم تسجيل الدخول بنجاح");
      setUser(data);
    },
    onError: (error: any) => {
      console.log("error", error);
      setSnackbarText(error.message);
    },
  });
};
const login = async (email: string, password: string) => {
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
    throw new Error(error.message);
  }
};

export const registerMutation = () => {
  const { setSnackbarText, setUser } = useStore((state) => state);
  return useMutation({
    mutationFn: (data: ILoginData) => register(data.email, data.password),
    onSuccess: (data: any) => {
      console.log("data", data);
      setSnackbarText(
        "تم تسجيل الدخول بنجاح، تم إرسال رسالة تأكيد إلى بريدك الإلكتروني"
      );
      setUser(data);
    },
    onError: (error: any) => {
      console.log("error", error);
      setSnackbarText(error.message);
    },
  });
};
const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendEmailVerification(user);
    await addDoc(collection(db, "users"), {
      email: user.email,
      uid: user.uid,
      createdAt: new Date(),
    });
    await storeDataToStorage("user", user);
    return user;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const logoutMutation = () => {
  const { setSnackbarText, setUser } = useStore((state) => state);
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      setSnackbarText("تم تسجيل الخروج بنجاح");
      setUser(null);
    },
    onError: (error: any) => {
      console.log("error", error);
      setSnackbarText(error.message);
    },
  });
};
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  } finally {
    await storeDataToStorage("user", null);
  }
};
