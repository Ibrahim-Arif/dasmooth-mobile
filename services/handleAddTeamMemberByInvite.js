import { collection, getFirestore, addDoc } from "firebase/firestore";

export const handleAddTeamMemberByInvite = async (data) => {
  try {
    const db = getFirestore();
    await addDoc(collection(db, "teamMembers"), data);
  } catch (ex) {
    throw new Error(ex);
  }
};
