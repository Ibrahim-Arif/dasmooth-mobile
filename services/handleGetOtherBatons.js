import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
export const handleGetOtherBatons = async (
  uid,
  data,
  setData,
  setLoading = () => null
) => {
  try {
    const db = getFirestore();

    const q = query(collection(db, "batons"), where("memberId", "==", uid));
    onSnapshot(q, (querySnapshot) => {
      let tempData = [];
      querySnapshot.forEach((doc) => {
        tempData.push({ docId: doc.id, ...doc.data() });
      });
      setData(tempData);
      setLoading(false);
    });
  } catch (ex) {
    throw new Error(ex);
  }
};
