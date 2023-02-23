import {
  getFirestore,
  query,
  where,
  collection,
  getDoc,
} from "firebase/firestore";

export const handleGetTeamMember = async (uid) => {
  try {
    const db = getFirestore();
    const q = query(
      collection(db, "teamMembers"),
      where("inviteBy", "==", uid),
      where("status", "==", "pending")
    );
    const docSnap = await getDoc(q);
    if (docSnap.exists) {
      return docSnap.data();
    } else {
      return false;
    }
  } catch (ex) {
    throw new Error(ex);
  }
};
