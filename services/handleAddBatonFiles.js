import { collection, addDoc, setDoc,getFirestore, doc } from "firebase/firestore";

export const handleAddBatonFiles = async (data) => {
  try {
    let temp = data;
    delete temp["docId"];
    const db = getFirestore();
    const docRef = await addDoc(collection(db, "batonImages"), temp);
    console.log("Document written with ID: ", docRef.id);
  } catch (ex) {
    throw new Error(ex);
  }
};
