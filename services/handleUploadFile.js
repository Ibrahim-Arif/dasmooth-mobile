import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const handleUploadFile = async (file, fileName, batonId) => {
  try {
    // console.log(file);
    const url = await uploadFileAsync(file, fileName, batonId);
    return url;
  } catch (ex) {
    throw new Error(ex);
  }
};

// this is the method that will upload the local file to fireStorage
const uploadFileAsync = async (file, fileName, batonId) => {
  try {
    // let uri = URL.createObjectURL(file);
    // const blob = await fetch(uri).then((res) => {
    //   return res.blob();
    // });
    const storage = getStorage();
    const storageRef = ref(storage, `/batonAttachments/${batonId}/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (ex) {
    ex.message = "Upload File Error: " + ex.message;
    throw new Error(ex);
  }
};
