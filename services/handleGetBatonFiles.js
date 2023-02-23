import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
  getDocs,
} from "firebase/firestore";

export const handleGetBatonFilesSnapshot = async (batonId, setData) => {
  try {
    const db = getFirestore();
    const q = query(
      collection(db, "batonAttachments"),
      where("batonId", "==", batonId)
    );

    onSnapshot(q, (querySnapshot) => {
      let tempData = [];
      querySnapshot.forEach((doc) => {
        tempData.push({ ...doc.data() });
      });
      // console.log(tempData);
      setData(tempData);
    });
  } catch (ex) {
    throw new Error(ex);
  }
};

export const handleGetBatonFiles = async (batonId) => {
  try {
    const db = getFirestore();
    const q = query(
      collection(db, "batonAttachments"),
      where("batonId", "==", batonId)
    );

    const querySnapshot = await getDocs(q);
    let tempData;
    querySnapshot.forEach((doc) => {
      tempData.push({ ...doc.data() });
    });
    // console.log(tempData);
    return tempData;
  } catch (ex) {
    throw new Error(ex);
  }
};
