import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { db } from "@src/firebase.config";
import { Cart } from "@zustand/cartSlice";

interface Order {
  id: string;
  title: string;
  price: number;
  friendPhone?: string;
  createdAt: Date;
}

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
    return orders as Order[];
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
    if (data.uid) {
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
    }
    data.cart.forEach(async (item) => {
      const almostDoneRef = doc(db, "almostDone", item.id);
      const almostDoneSnap = await getDoc(almostDoneRef);
      const constructionRef = doc(db, "construction", item.id);
      const constructionSnap = await getDoc(constructionRef);
      if (almostDoneSnap.exists()) {
        await updateDoc(almostDoneRef, {
          collected: almostDoneSnap.data().collected + item.price,
          donors: almostDoneSnap.data().donors + 1,
        });
      }
      if (constructionSnap.exists()) {
        await updateDoc(constructionRef, {
          collected: constructionSnap.data().collected + item.price,
          donors: constructionSnap.data().donors + 1,
        });
      }
    });

    return data.cart;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
