import { collection, addDoc, getFirestore } from "firebase/firestore";

export const handleAddNotification = async (data) => {
  try {
    console.log(data);
    let temp = data;
    delete temp["docId"];
    const db = getFirestore();
    const docRef = await addDoc(collection(db, "notifications"), temp);

    console.log("Document written with ID: ", docRef.id);
  } catch (ex) {
    throw new Error(ex);
  }
};
