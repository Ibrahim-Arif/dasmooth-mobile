import { doc, getFirestore, updateDoc } from "firebase/firestore";

export const handleUpdateInviteStatus = async (docId, status) => {
  try {
    const db = getFirestore();
    const inviteRef = doc(db, "invites", docId);
    await updateDoc(inviteRef, { status: status });
  } catch (ex) {
    throw new Error(ex);
  }
};
