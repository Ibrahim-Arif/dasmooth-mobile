import { doc, getFirestore, updateDoc } from "firebase/firestore";

export const handleUpdateBaton = async (batonId, data) => {
  try {
    const db = getFirestore();
    const batonRef = doc(db, "batons", batonId);
    await updateDoc(batonRef, data);
  } catch (ex) {
    throw new Error(ex);
  }
};
