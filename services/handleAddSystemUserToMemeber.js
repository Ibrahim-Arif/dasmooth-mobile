import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import { handleAddTeamMemberByInvite } from "./handleAddTeamMemberByInvite";
export const handleAddSystemUserToMember = async (data) => {
  try {
    const db = getFirestore();
    const q = query(collection(db, "users"), where("email", "==", data.email));

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        handleAddTeamMemberByInvite({
          receiverId: doc.data().uid,
          receiverEmail: data.email,
          status: "accepted",
          ...data,
        });
      });
    });
  } catch (ex) {
    throw new Error(ex);
  }
};
