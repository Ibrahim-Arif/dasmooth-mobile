import { getFirestore, doc, updateDoc } from "firebase/firestore";

export const handleDeleteTeamMember = async (docId) => {
  try {
    const db = getFirestore();
    const updateDocRef = doc(db, "teamMembers", docId);
    await updateDoc(updateDocRef, {
      status: "deleted",
    });
  } catch (ex) {
    throw new Error(ex);
  }
};
