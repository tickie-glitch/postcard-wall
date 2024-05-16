import './style.css';
import { getPostcardUrl } from "./firebase.storage.js";
import { getRandomRotation, getRandomBetween } from "./utils";
import { getAllPostcards, getPostcardPosition, onNewPostcard, setPostcardPosition } from "./firebase";


let cardWidth = (3840 / 143.9) * 15.3 /2
let cardHeight = cardWidth * ( 10.16 /15.3 )


async function displayPostcards() {

  await onNewPostcard()

  const postcardIds = await getAllPostcards();

  if (postcardIds) {
    postcardIds.forEach(async (postcardId) => {

    });
  }
}

window.onload = displayPostcards;