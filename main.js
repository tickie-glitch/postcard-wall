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
      const imageUrl = await getPostcardUrl(postcardId);

      if (imageUrl) {
        let position = await getPostcardPosition(postcardId);

        // If no position saved, generate and save one
        if (!position) {
          position = {
            x: getRandomBetween(0, window.innerWidth - cardWidth),
            y: getRandomBetween(0, window.innerHeight - cardHeight)
          };
          await setPostcardPosition(postcardId, position.x, position.y);
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
      }
    });
  }
}

window.onload = displayPostcards;