import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { db } from "@src/firebase.config";

type Construction = {
  id: string;
  desc: string;
  beneficiaries: number;
  collected: number;
  image: string;
  donors: number;
  executor: string;
  goal: number;
};

export const fetchConstructionByIdQuery = (id: string) =>
  useQuery(["construction", id], () => fetchConstructionById(id));

const fetchConstructionById = async (id: string) => {
  try {
    const docRef = doc(db, "construction", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id } as Construction;
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.log(e);
  }
};

export const fetchConstructionQuery = () => {
  return useQuery(["construction"], fetchConstruction);
};

const fetchConstruction = async () => {
  try {
    const constructionRef = collection(db, "construction");
    const querySnapshot = await getDocs(constructionRef);
    const construction: Construction[] = [];
    querySnapshot.forEach((doc) => {
      construction.push({
        id: doc.id,
        beneficiaries: doc.data().beneficiaries,
        collected: doc.data().collected,
        desc: doc.data().desc,
        image: doc.data().image,
        donors: doc.data().donors,
        executor: doc.data().executor,
        goal: doc.data().goal,
      });
    });
    return construction;
  } catch (e) {
    console.log(e);
  }
};
