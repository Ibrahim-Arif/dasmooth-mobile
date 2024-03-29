import { doc, getFirestore, updateDoc } from "firebase/firestore";

export const handleUpdateTeamMemberStatus = async (docId, status) => {
  try {
    const db = getFirestore();
    const batonRef = doc(db, "teamMembers", docId);
    await updateDoc(batonRef, { status: status });
  } catch (ex) {
    throw new Error(ex);
  }
};
