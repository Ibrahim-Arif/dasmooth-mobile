import { doc, getFirestore, updateDoc } from "firebase/firestore";

export const handleUpdateTeamMember = async (docId, data) => {
  try {
    const db = getFirestore();
    const batonRef = doc(db, "teamMembers", docId);
    await updateDoc(batonRef, { ...data });
  } catch (ex) {
    throw new Error(ex);
  }
};
