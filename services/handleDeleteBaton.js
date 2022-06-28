import { getFirestore, doc, updateDoc } from "firebase/firestore";

export const handleDeleteBaton = async (docId) => {
  try {
    const db = getFirestore();
    const updateDocRef = doc(db, "batons", docId);
    await updateDoc(updateDocRef, {
      authorPostStatus: "deleted",
      memberPostStatus: "deleted",
      deletedOn: Date.now(),
    });
    // await addDoc(collection(db, "deletedBatons"), { docId: docId });
  } catch (ex) {
    throw new Error(ex);
  }
};
