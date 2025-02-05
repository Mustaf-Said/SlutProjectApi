import "../styles/app.scss";
import { access_key } from "../components/access_key";
import { searchPhotoLista } from "../components/favoriteListPhoto";
import { favoriteListPhoto } from "../components/favoriteListPhoto";
import { renderPhotos } from "../components/renderPhotos";
import { apiType } from "../components/apiTypes";

const form = document.querySelector<HTMLFormElement>("form");
const inputQuery = document.querySelector<HTMLInputElement>(".inp1");
const inputPerPage = document.querySelector<HTMLInputElement>(".inp2");
export const photoList = document.querySelector<HTMLUListElement>("ul");
export const myPhotos = document.querySelector<HTMLElement>("aside");

// Favorite list
export let favoriteList: apiType[] = [];
//Loadad Myphtos after pages refersh
document.addEventListener("DOMContentLoaded", () => {
  const savedFavorites = localStorage.getItem("favorites");
  if (savedFavorites) {
    favoriteList = JSON.parse(savedFavorites);
  }
});
//Fetch data från url and accesses_key
const searchPhotos = async (photos: string, pages: number) => {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${photos}&per_page=${pages}`,
      {
        headers: {
          Authorization: `${access_key}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    renderPhotos(data.results);
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    if (photoList) {
      photoList.innerHTML = `<li>Error loading photos. Please try again later.</li>`;
    }
  }
};
//Hämta data by click submint button
form?.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  if (!inputQuery || !inputPerPage) return;

  const query = inputQuery.value.trim();
  const perPage = parseInt(inputPerPage.value, 10);
  //If input felt empty or wrong filed
  if (!query || isNaN(perPage) || perPage <= 0) {
    alert("Please enter a valid search term and number of photos per page.");
    return;
  }

  //Clear both input field
  searchPhotos(query, perPage);
  inputQuery.value = "";
  inputPerPage.value = "";

  //To make visibility myphotos button after another search
  if (searchPhotoLista && myPhotos && favoriteListPhoto) {
    searchPhotoLista.style.display = "block";
    myPhotos.style.display = "none";
    favoriteListPhoto.textContent = "My Photos";
  }
});
