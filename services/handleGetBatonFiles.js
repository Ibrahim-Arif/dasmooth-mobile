import {
    collection,
    query,
    where,
    onSnapshot,
    getFirestore,
  } from "firebase/firestore";
  export const handleGetBatonFiles = async (batonId, setData) => {
    try {
      const db = getFirestore();
      const q = query(collection(db, "batonImages"), where("batonId", "==", batonId));
  
      onSnapshot(q, (querySnapshot) => {
        let tempData = [];
        querySnapshot.forEach((doc) => {
          tempData.push({ ...doc.data() });
        });
        console.log(tempData);
        setData(tempData);
      });
    } catch (ex) {
      throw new Error(ex);
    }
  };
  