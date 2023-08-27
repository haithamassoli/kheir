import { auth } from "@src/firebase.config";
import { storeDataToStorage } from "@utils/helper";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { db } from "@src/firebase.config";
import { useStore } from "@zustand/store";

interface ILoginData {
  email: string;
  password: string;
}

export const loginMutation = () => {
  return useMutation({
    mutationFn: (data: ILoginData) => login(data.email, data.password),
    onSuccess: (data: any) => {
      useStore.setState({ user: data, snackbarText: "تم تسجيل الدخول بنجاح" });
    },
    onError: (error: any) => {
      useStore.setState({ snackbarText: error.message });
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
    throw new Error(error.message);
  }
};

export const registerMutation = () => {
  return useMutation({
    mutationFn: (data: ILoginData) => register(data.email, data.password),
    onSuccess: (data: any) => {
      useStore.setState({
        user: data,
        snackbarText:
          "تم تسجيل الدخول بنجاح، تم إرسال رسالة تأكيد إلى بريدك الإلكتروني",
      });
    },
    onError: (error: any) => {
      useStore.setState({ snackbarText: error.message });
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
    throw new Error(error.message);
  }
};

export const logoutMutation = () => {
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      useStore.setState({ snackbarText: "تم تسجيل الخروج بنجاح", user: null });
    },
    onError: (error: any) => {
      useStore.setState({ snackbarText: error.message });
    },
  });
};
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  } finally {
    await storeDataToStorage("user", null);
  }
};

export const googleLoginMutation = () => {
  return useMutation({
    mutationFn: (token: string) => googleLogin(token),
    onSuccess: (data: any) => {
      useStore.setState({
        user: data,
        snackbarText: "تم تسجيل الدخول بنجاح",
      });
    },
    onError: (error: any) => {
      useStore.setState({ snackbarText: error.message });
    },
  });
};

const googleLogin = async (token: string) => {
  try {
    let isInDB = false;
    const credential = GoogleAuthProvider.credential(token);
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;
    const userRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(userRef, where("uid", "==", user.uid))
    );
    querySnapshot.forEach((doc) => {
      if (doc.data()) {
        isInDB = true;
      }
    });
    if (!isInDB) {
      await addDoc(collection(db, "users"), {
        email: user.email,
        uid: user.uid,
        createdAt: new Date(),
      });
    }
    await storeDataToStorage("user", user);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
