import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
export const handleGetBatonPostUpdates = async (id, setData) => {
  try {
    const db = getFirestore();
    const q = query(collection(db, "batonUpdates"), where("batonId", "==", id));

    onSnapshot(q, (querySnapshot) => {
      let tempData = [];
      querySnapshot.forEach((doc) => {
        tempData.push({ docId: doc.id, ...doc.data() });
      });
      tempData.sort(function(a,b){return   new Date(b.timestamp).getTime()-new Date(a.timestamp).getTime()});
      setData(tempData);
    });
  } catch (ex) {
    throw new Error(ex);
  }
};
