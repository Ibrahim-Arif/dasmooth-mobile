import { doc, getFirestore, updateDoc } from "firebase/firestore";

export const handleUpdateNotificationStatus = async (docId, status) => {
  try {
    // console.log(docId);
    const db = getFirestore();
    const batonRef = doc(db, "notifications", docId);
    await updateDoc(batonRef, { seen: status });
  } catch (ex) {
    throw new Error(ex);
  }
};
