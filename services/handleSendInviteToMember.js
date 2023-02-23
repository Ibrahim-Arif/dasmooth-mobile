import {
  collection,
  getFirestore,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

export const handleSendInviteToMember = async (data) => {
  try {
    const db = getFirestore();
    console.log("data", data);
    // await addDoc(collection(db, "invites"), data);
    await setDoc(doc(db, "invites", data.inviteId), data);
  } catch (ex) {
    throw new Error(ex);
  }
};
