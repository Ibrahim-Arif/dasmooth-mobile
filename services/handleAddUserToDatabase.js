import { collection, getFirestore, addDoc } from "firebase/firestore";

export const handleAddUserToDatabase = async (data) => {
  try {
    const db = getFirestore();
    await addDoc(collection(db, "users"), {
      uid: data.uid,
      email: data.email,
      name: data.displayName,
      photoURL: data.photoURL,
    });
  } catch (ex) {
    throw new Error(ex);
  }
};
