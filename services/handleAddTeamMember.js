import { doc, getFirestore, setDoc } from "firebase/firestore";

export const handleAddTeamMember = async (uid, data) => {
  try {
    // console.log(uid);
    const db = getFirestore();
    const teamMembersRef = doc(db, "teamMembers", uid);
    await setDoc(teamMembersRef, data);
  } catch (ex) {
    throw new Error(ex);
  }
};
