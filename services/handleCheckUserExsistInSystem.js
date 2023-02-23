import { doc, getDoc, getFirestore } from "firebase/firestore";
export const handleCheckUserExsistInSystem = async (email) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().uid;
    } else {
      return false;
    }
  } catch (ex) {
    throw new Error(ex);
  }
};
