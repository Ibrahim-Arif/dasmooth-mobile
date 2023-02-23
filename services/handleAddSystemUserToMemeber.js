import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { handleAddTeamMemberByInvite } from "./handleAddTeamMemberByInvite";

export const handleAddSystemUserToMember = async (data) => {
  try {
    const db = getFirestore();

    const docRef = doc(db, "users", data.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      handleAddTeamMemberByInvite({
        receiverId: docSnap.data().uid,
        receiverEmail: data.email,
        status: "accepted",
        ...data,
      });
    } else {
      console.log("No such document!");
    }

    // const q = query(collection(db, "users"), where("email", "==", data.email));
    // console.log(data);
    // onSnapshot(q, (querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    // console.log(
    //   "Adding member to team calling: handleAddTeamMemberByInvite"
    // );
    // handleAddTeamMemberByInvite({
    //   receiverId: doc.data().uid,
    //   receiverEmail: data.email,
    //   status: "accepted",
    //   ...data,
    // });
    //   });
    // });
  } catch (ex) {
    throw new Error(ex);
  }
};
