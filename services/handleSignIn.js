import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
  doc,
  updateDoc,
} from "firebase/firestore";
import { handleAddNotification } from "./handleAddNotification";
import { handleAddTeamMember } from "./handleAddTeamMember";
import { handleUpdateBatonStatus } from "./handleUpdateBatonStatus";
export const handleSignIn = async (email, password) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const db = getFirestore();

    const q = query(
      collection(db, "teamMembers"),
      where("receiverId", "==", userCredential.user.uid)
    );

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(async (document) => {
        if (document.data().status == "pending") {
          // updating member status
          const inviteMembersRef = doc(db, "teamMembers", document.id);
          await updateDoc(inviteMembersRef, { status: "accepted" });

          // updating batons status
          const q = query(
            collection(db, "batons"),
            where("memberId", "==", document.data().receiverId),
            where("authorId", "==", document.data().inviteBy)
          );

          onSnapshot(q, (querySnapshot) => {
            // console.log("doc Size:", querySnapshot.size);
            querySnapshot.forEach(async (batonDocument) => {
              // updating member status
              await handleUpdateBatonStatus(
                batonDocument.id,
                "passed",
                "received"
              );
              // ! issue calling here
              // await handleAddNotification({
              //   seen: false,
              //   message: "Baton Passed",
              //   description: `${
              //     batonDocument.data().memberName
              //   } passed your baton`,
              //   type: "success",
              //   uid: batonDocument.data().authorId,
              //   date: Date.now(),
              //   batonId: batonDocument.id,
              // });
              // console.log("here");
            });
          });
        }
      });
    });
    return userCredential.user;
  } catch (ex) {
    if (ex.code == "auth/user-not-found")
      ex.message = "No user found with this email";
    else if (ex.code == "auth/wrong-password") ex.message = "Wrong password";
    // console.log(ex.code)
    throw new Error(ex.message);
  }
};
