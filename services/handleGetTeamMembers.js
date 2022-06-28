import {  onSnapshot, getFirestore,query,where,collection } from "firebase/firestore";

export const handleGetTeamMembers = async (uid, setData) => {
  try {
    const db = getFirestore();
    const q = query(
      collection(db, "teamMembers"),
      where("inviteBy", "==", uid),
      where("status", "!=", "deleted")
    );
    onSnapshot(q, (querySnapshot) => {
      let items = []
      querySnapshot.forEach(async (document) => {
        items.push({docId:document.id, ...document.data()})
         
      });
      setData(items);
    });
  
  } catch (ex) {
    throw new Error(ex);
  }
};
