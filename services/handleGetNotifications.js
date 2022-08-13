import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
export const handleGetNotifications = async (uid, setData) => {
  try {
    // console.log(uid);
    const db = getFirestore();
    const q = query(
      collection(db, "notifications"),
      where("uid", "==", uid),
      where("seen", "==", false)
    );

    // console.log(uid);
    onSnapshot(q, (querySnapshot) => {
      let tempData = [];
      querySnapshot.forEach((doc) => {
        tempData.push({ docId: doc.id, ...doc.data() });
      });
      //   console.log(tempData);
      setData(tempData);
    });
  } catch (ex) {
    throw new Error(ex);
  }
};
