import "../styles/favoriteListPhoto.scss";
import { myPhotos } from "../src/app";
import { favoriteList } from "../src/app";
import { renderLightbox } from "./renderLightbox";

export const searchPhotoLista =
  document.querySelector<HTMLDivElement>(".wrapper");
export const favoriteListPhoto =
  document.querySelector<HTMLButtonElement>(".favoriteButton");
let myphotosVisible: boolean = false;
//switch between myphoto and search page
favoriteListPhoto?.addEventListener("click", () => {
  if (!myPhotos || !searchPhotoLista || !favoriteListPhoto) return;
  myPhotos.innerHTML = "";
  myphotosVisible = !myphotosVisible;
  favoriteListPhoto.textContent = myphotosVisible
    ? "Back to Search"
    : "My Photos";
  searchPhotoLista.style.display = myphotosVisible ? "none" : "block";
  myPhotos.style.display = myphotosVisible ? "block" : "none";
  //create Div tag in myphto page and appand them delbutton and img
  if (myphotosVisible) {
    favoriteList.forEach((photo, index) => {
      const divPhotoList = document.createElement("div");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "x";
      const img = document.createElement("img");
      img.src = photo.urls.small;
      divPhotoList.append(img, deleteButton);
      if (myPhotos) {
        myPhotos.appendChild(divPhotoList);
      }
      //Click img in my favoriteList to make it lightbox
      img.addEventListener("click", () => {
        renderLightbox(favoriteList, index);
      });
      //Click del button to remove photo från my favoriteList
      deleteButton.addEventListener("click", () => {
        favoriteList.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favoriteList));
        divPhotoList.remove();
      });
    });
  }
});
