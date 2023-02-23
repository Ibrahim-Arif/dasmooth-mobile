import { doc, getDoc, getFirestore } from "firebase/firestore";

export const handleGetInvite = async (inviteId) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "invites", inviteId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return {
        docId: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return false;
    }
  } catch (ex) {
    throw new Error(ex);
  }
};
