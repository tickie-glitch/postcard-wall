import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "./firebase.js";  

const storage = getStorage(app);

export async function getPostcardUrl(postcardId) {
  const storageRef = ref(storage, "postcards/" + postcardId);
  const url = await getDownloadURL(storageRef);

  return url;
}

