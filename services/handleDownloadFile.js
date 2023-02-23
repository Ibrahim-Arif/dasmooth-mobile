import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const handleDownloadFile = async (filePath) => {
  try {
    const storage = getStorage();
    getDownloadURL(ref(storage, filePath))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        console.log(url);
        // This can be downloaded directly:
        // const xhr = new XMLHttpRequest();
        // xhr.responseType = "blob";
        // xhr.onload = (event) => {
        //   const blob = xhr.response;
        // };
        // xhr.open("GET", url);
        // xhr.send();

        // // Or inserted into an <img> element
        // const img = document.getElementById("myimg");
        // img.setAttribute("src", url);
      })
      .catch((error) => {
        // Handle any errors
      });
  } catch (ex) {
    throw new Error(ex);
  }
};
