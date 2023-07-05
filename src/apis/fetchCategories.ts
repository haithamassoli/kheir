import { db } from "@src/firebase.config";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@utils/helper";
import { collection, getDocs, query } from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

const fetchCategories = async () => {
  const categoriesRef = collection(db, "categories");
  const categoriesSnapshot = await getDocs(categoriesRef);
  const categories = categoriesSnapshot.docs.map((doc) => doc.data());
  return categories;
};
