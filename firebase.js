import { initializeApp } from "firebase/app";
import { orderByChild, onChildAdded, query, set, ref, get, getDatabase } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getPostcardUrl } from "./firebase.storage.js";
import { getRandomRotation, getRandomBetween } from "./utils";
 


const firebaseConfig = {
  apiKey: "AIzaSyDXQu4yijaT5E_B4rf2PA4ksngr6ylFHBk",
  authDomain: "sazen-city.firebaseapp.com",
  databaseURL:
    "https://sazen-city-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sazen-city",
  storageBucket: "sazen-city.appspot.com",
  messagingSenderId: "469750682222",
  appId: "1:469750682222:web:c08779b99734c3ae668c7f",
  measurementId: "G-JNVJ9C53RF",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);


signInAnonymously(auth)
  .then(() => console.log('Signed in anonymously.'))
  .catch(error => console.error('Anonymous sign-in failed:', error));

export { app, db, auth };

export async function getPostcardInfos(postcardId) {
  const postcardRef = ref(db, `postcards/${postcardId}`);
  const snap = await get(postcardRef);
  const data = snap.val();

  return data;
}


export async function getAllPostcards() {

  const postcardsRef = ref(db, "postcards/");
  const snapshot = await get(postcardsRef);
  if (snapshot.exists()) {
    return Object.keys(snapshot.val());  
  } 
}

// async function getPostcardTimes(postcardId) {
//   const postcardsTimeRef = ref(db, `postcards/${postcardId}/time`);
//   const snapshot = await get(postcardsTimeRef);
//   if (snapshot.exists()) {
//     return Object.keys(snapshot.val());  
//   } 
// }

export async function setPostcardPosition(postcardId, x, y, time) {
  const db = getDatabase(app);
  const positionRef = ref(db, `postcard-wall/${postcardId}`);

  await set(positionRef, { x, y, time });
}

export async function getPostcardPosition(postcardId) {
  const db = getDatabase(app);
  const positionRef = ref(db, `postcard-wall/${postcardId}`);
  const snapshot = await get(positionRef);
  if (snapshot.exists()) {
      return snapshot.val();
  } else {
      return null;
  }
}

export async function onNewPostcard() {
  const db = getDatabase(app);
  const postcardsRef = query(ref(db, "postcards/"), orderByChild('time'));


  onChildAdded(postcardsRef, async (snapshot) => {
    const postcard = await snapshot.val();
    setTimeout(async ()=>{
      const imageUrl = await getPostcardUrl(postcard.id)
      console.log(imageUrl)
  
      let cardWidth = (3840 / 143.9) * 15.3 /2
      let cardHeight = cardWidth * ( 10.16 /15.3 )
  
      let position =   {
        x: getRandomBetween(0, window.innerWidth - cardWidth),
        y: getRandomBetween(0, window.innerHeight - cardHeight)
      }
  
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.style.position = 'absolute';
      imgElement.style.width = cardWidth+"px";
      imgElement.style.height = cardHeight+"px";
      imgElement.style.left = `${position.x}px`;
      imgElement.style.top = `${position.y}px`;
      imgElement.style.transform = `rotate(${getRandomRotation()}deg)`;
      imgElement.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)";
      document.body.appendChild(imgElement);
    },2000)
    
      })
    }