import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { db } from "@src/firebase.config";

type AlmostDone = {
  id: string;
  desc: string;
  beneficiaries: number;
  collected: number;
  image: string;
  donors: number;
  executor: string;
  goal: number;
};

export const fetchAlmostDoneByIdQuery = (id: string) =>
  useQuery(["almostDone", id], () => fetchAlmostDoneById(id));

const fetchAlmostDoneById = async (id: string) => {
  const docRef = doc(db, "almostDone", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id } as AlmostDone;
  } else {
    console.log("No such document!");
  }
};

export const fetchAlmostDoneQuery = () => {
  return useQuery(["almostDone"], fetchAlmostDone);
};

const fetchAlmostDone = async () => {
  const almostDoneRef = collection(db, "almostDone");
  const querySnapshot = await getDocs(almostDoneRef);
  const almostDone: AlmostDone[] = [];
  querySnapshot.forEach((doc) => {
    almostDone.push({
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
  return almostDone;
};
