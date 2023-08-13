import { auth } from "@src/firebase.config";
import { storeDataToStorage } from "@utils/helper";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  getDoc,
  orderBy,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { db } from "@src/firebase.config";
import { Cart } from "@zustand/cartSlice";

export const fetchOrdersQuery = (uid: string) =>
  useQuery(["orders", uid], () => fetchOrders(uid));

const fetchOrders = async (uid: string) => {
  try {
    const userRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(userRef, where("uid", "==", uid))
    );

    let orders: any[] = [];
    let userId = "";
    querySnapshot.forEach((docItem) => {
      userId = docItem.id;
    });
    const ordersRef = collection(db, "users", userId, "orders");
    const ordersSnapshot = await getDocs(
      query(ordersRef, orderBy("createdAt", "desc"))
    );
    ordersSnapshot.forEach((docItem) => {
      orders.push({
        ...docItem.data(),
        id: docItem.id,
        createdAt: docItem.data().createdAt.toDate(),
      });
    });
    return orders;
  } catch (error) {
    console.log(error);
  }
};

export const addOrderMutation = () =>
  useMutation({
    mutationFn: (data: { cart: Cart[]; uid: string }) => addOrder(data),
  });

const addOrder = async (data: { cart: Cart[]; uid: string }) => {
  try {
    if (!data.uid) throw new Error("يجب تسجيل الدخول أولاً");
    const userRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(userRef, where("uid", "==", data.uid))
    );
    querySnapshot.forEach(async (docItem) => {
      const cartRef = doc(db, "users", docItem.id);
      await addDoc(collection(cartRef, "orders"), {
        ...data.cart,
        createdAt: new Date(),
      });
    });
    return data.cart;
  } catch (error: any) {
    throw new Error(error.message);
  }
};