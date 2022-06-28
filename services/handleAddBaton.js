import { doc, setDoc, getFirestore } from "firebase/firestore";

export const handleAddBaton = async (data, uid) => {
  try {
    // console.log(uid);
    let temp = data;
    delete temp["docId"];
    const db = getFirestore();
    await setDoc(doc(db, "batons", `${uid}`), temp);
    // console.log("Document written with ID: ", docRef.id);
    return uid;
  } catch (ex) {
    console.log(ex);
    throw new Error(ex);
  }
};
