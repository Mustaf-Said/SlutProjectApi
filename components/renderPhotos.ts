import { photoList } from "../src/app.ts";
import { favoriteList } from "../src/app.ts";
import { renderLightbox, lightbox } from "./renderLightbox";

// Render photos after search
export function renderPhotos(getPhotos: any[]) {
  if (!photoList) return;
  photoList.innerHTML = "";
  getPhotos.forEach((photo, index) => {
    const li = document.createElement("li");
    const saveButton = document.createElement("button");
    saveButton.textContent = "Add to Favorites";
    const img = document.createElement("img");
    img.src = photo.urls.small;
    li.append(img, saveButton);
    if (photoList) {
      photoList.appendChild(li);
    }
    function handleClick() {
      alert("Add photo to se info about image");
    }
    li.addEventListener("click", handleClick);
    //Add ny photos
    saveButton.addEventListener("click", () => {
      li.removeEventListener("click", handleClick);
      renderLightbox(getPhotos, index);
      if (!favoriteList.some((fav) => fav.id === photo.id)) {
        favoriteList.push(photo);
        localStorage.setItem("favorites", JSON.stringify(favoriteList));
      } else {
        alert("This photo is already in your favorites");
        lightbox?.classList.remove("active");
      }
    });
  });
}
