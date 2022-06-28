import { doc, getFirestore, updateDoc } from "firebase/firestore";

export const handleUpdateBatonStatus = async (
  batonId,
  authorPostStatus,
  memberPostStatus
) => {
  try {
    const db = getFirestore();
    const batonRef = doc(db, "batons", batonId);
    await updateDoc(batonRef, { authorPostStatus, memberPostStatus });
  } catch (ex) {
    throw new Error(ex);
  }
};
