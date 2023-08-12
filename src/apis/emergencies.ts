import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { db } from "@src/firebase.config";

type Emergency = {
  id: string;
  title: string;
  desc: string;
  beneficiaries: number;
  collected: number;
  image: string;
  donors: number;
  executor: string;
  goal: number;
  loc?: string;
};

export const fetchEmergencyQuery = (id: string) =>
  useQuery(["emergency", id], () => fetchEmergency(id));

const fetchEmergency = async (id: string) => {
  const docRef = doc(db, "emergencies", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id } as Emergency;
  } else {
    console.log("No such document!");
  }
};

export const fetchEmergenciesQuery = () => {
  return useQuery(["emergencies"], fetchEmergencies);
};

const fetchEmergencies = async () => {
  const emergenciesRef = collection(db, "emergencies");
  const querySnapshot = await getDocs(emergenciesRef);
  const emergencies: Emergency[] = [];
  querySnapshot.forEach((doc) => {
    emergencies.push({
      id: doc.id,
      beneficiaries: doc.data().beneficiaries,
      collected: doc.data().collected,
      desc: doc.data().desc,
      image: doc.data().image,
      donors: doc.data().donors,
      executor: doc.data().executor,
      goal: doc.data().goal,
      title: doc.data().title,
    });
  });
  return emergencies;
};
