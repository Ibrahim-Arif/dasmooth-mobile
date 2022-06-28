import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
export const handleCheckIsFirstLogin = async (uid) => {
  try {
    const db = getFirestore();
    const q = query(
      collection(db, "teamMembers"),
      where(uid, "==", uid)
    );
  } catch (ex) {
    throw new Error(ex);
  }
};
