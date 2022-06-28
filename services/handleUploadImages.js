import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
export const handleUploadImages = async (images = []) => {
  try {
    let urls = [];
    images.map(async (e) => {
      const url = await uploadImageAsync(e[0]);
      urls.push(url);
    });
    return urls;
  } catch (ex) {
    throw new Error(ex);
  }
};

// this is the method that will upload the local file to fireStorage
const uploadImageAsync = async (image) => {
  try {
    let uri = URL.createObjectURL(image);
    const blob = await fetch(uri).then((res) => {
      return res.blob();
    });
    const storage = getStorage();
    const storageRef = ref(storage, "/batonImages/" + uuidv4());
    const snapshot = await uploadBytes(storageRef, blob);
    return await getDownloadURL(snapshot.ref);
  } catch (ex) {
    ex.message = "Upload Image Error: " + ex.message;
    throw new Error(ex);
  }
};
