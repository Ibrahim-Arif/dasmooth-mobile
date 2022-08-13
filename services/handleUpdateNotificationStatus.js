import { doc, getFirestore, updateDoc } from "firebase/firestore";

export const handleUpdateNotificationStatus = async (batonId, status) => {
  try {
    const db = getFirestore();
    const batonRef = doc(db, "notifications", batonId);
    await updateDoc(batonRef, { seen: status });
  } catch (ex) {
    throw new Error(ex);
  }
};
