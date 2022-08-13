import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const handleUserInformationUpdate = async (
  email,
  displayName,
  photoURL = ""
) => {
  try {
    const auth = getAuth();
    if (photoURL == null) photoURL = "";
    if (!photoURL.includes("https://") && photoURL != "") {
      const url = await uploadImageAsync(photoURL);
      URL.revokeObjectURL(photoURL);
      photoURL = url;
    }
    // console.log(photoURL);
    await updateProfile(auth.currentUser, {
      email: email,
      displayName: displayName,
      photoURL: photoURL,
    });

    return photoURL;
  } catch (ex) {
    // console.log(ex);
    throw new Error(ex);
  }
};

// this is the method that will upload the local file to fireStorage
const uploadImageAsync = async (uri) => {
  try {
    const blob = await fetch(uri).then((res) => {
      return res.blob();
    });
    const storage = getStorage();
    const storageRef = ref(storage, "/images/" + uuidv4());
    const snapshot = await uploadBytes(storageRef, blob);
    return await getDownloadURL(snapshot.ref);
  } catch (ex) {
    ex.message = "Upload Image Error: " + ex.message;
    throw new Error(ex);
  }
};
