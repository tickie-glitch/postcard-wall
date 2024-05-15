import './style.css';
import { getPostcardUrl } from "./firebase.storage.js";
import { getRandomRotation, getRandomBetween } from "./utils";
import { getAllPostcards, getPostcardPosition, setPostcardPosition, getSortedPostcards } from "./firebase";

async function displayPostcards() {
  const postcards = await getSortedPostcards();

  postcards.forEach(async (postcard) => {
    const imageUrl = await getPostcardUrl(postcard.id);

    if (imageUrl) {
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.style.position = 'absolute';
      imgElement.style.width = "621px";
      imgElement.style.height = "382px";
      imgElement.style.left = `${postcard.x}px`;
      imgElement.style.top = `${postcard.y}px`;
      imgElement.style.transform = `rotate(${getRandomRotation()}deg)`;
      imgElement.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)";

      document.body.appendChild(imgElement);
    }
  });
}

window.onload = displayPostcards;
