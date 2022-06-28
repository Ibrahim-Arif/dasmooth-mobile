import { doc, getFirestore, updateDoc } from "firebase/firestore";

export const handleUpdateTeamMemberStatus = async (batonId, status) => {
  try {
    const db = getFirestore();
    const batonRef = doc(db, "teamMembers", batonId);
    await updateDoc(batonRef, { status: status });
  } catch (ex) {
    throw new Error(ex);
  }
};
