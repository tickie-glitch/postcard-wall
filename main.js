import './style.css';
import { getPostcardUrl } from "firebase.storage.js";
import { getRandomRotation, getRandomBetween } from "./utils";
import { getAllPostcards, getPostcardPosition, setPostcardPosition } from "./firebase";

async function displayPostcards() {
  const postcardIds = await getAllPostcards();

  if (postcardIds) {
    postcardIds.forEach(async (postcardId) => {
      const imageUrl = await getPostcardUrl(postcardId);

      if (imageUrl) {
        let position = await getPostcardPosition(postcardId);

        // If no position saved, generate and save one
        if (!position) {
          position = {
            x: getRandomBetween(0, window.innerWidth - 621),
            y: getRandomBetween(0, window.innerHeight - 382)
          };
          await setPostcardPosition(postcardId, position.x, position.y);
        }

        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.style.position = 'absolute';
        imgElement.style.width = "621px";
        imgElement.style.height = "382px";
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