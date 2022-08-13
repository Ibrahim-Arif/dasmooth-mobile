import { doc, getFirestore, setDoc } from "firebase/firestore";

export const handleAddUserToDatabase = async (data) => {
  try {
    const db = getFirestore();
    await setDoc(doc(db, "users", data.email), {
      uid: data.uid,
      email: data.email,
      name: data.displayName,
      photoURL: data.photoURL,
    });
  } catch (ex) {
    console.log(ex);
    throw new Error(ex);
  }
};
