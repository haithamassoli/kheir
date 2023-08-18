import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { db } from "@src/firebase.config";

type Volunteer = {
  id: string;
  desc: string;
  loc: string;
  image: string;
};

export const fetchVolunteerByIdQuery = (id: string) =>
  useQuery(["volunteerItem", id], () => fetchVolunteerById(id));

const fetchVolunteerById = async (id: string) => {
  try {
    const docRef = doc(db, "volunteer", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id } as Volunteer;
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.log(e);
  }
};

export const fetchVolunteerQuery = () => {
  return useQuery(["volunteer"], fetchVolunteer);
};

const fetchVolunteer = async () => {
  try {
    const volunteerRef = collection(db, "volunteer");
    const querySnapshot = await getDocs(volunteerRef);
    const volunteer: Volunteer[] = [];
    querySnapshot.forEach((doc) => {
      volunteer.push({
        id: doc.id,
        loc: doc.data().loc,
        desc: doc.data().desc,
        image: doc.data().image,
      });
    });
    return volunteer;
  } catch (e) {
    console.log(e);
  }
};
