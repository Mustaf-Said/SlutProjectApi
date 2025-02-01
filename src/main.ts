import "./style.scss";
import "./access_key";
const access_key: string =
  "Client-ID 5f8zX0jzSeoN_-oYZu6-f4OSV8SvrucmOhL8IkPIyCY";

const form = document.querySelector<HTMLFormElement>("form");
const inputQuery = document.querySelector<HTMLInputElement>(".inp1");
const inputPerPage = document.querySelector<HTMLInputElement>(".inp2");
const photoList = document.querySelector<HTMLUListElement>("ul");
const favoriteListPhoto =
  document.querySelector<HTMLButtonElement>(".favoriteButton");
const searchPhotoLista = document.querySelector<HTMLDivElement>(".wrapper");
const myPhotos = document.querySelector<HTMLElement>("aside");

// Favorite list
let favoriteList: any[] = [];
let myphotosVisible: boolean = false;

document.addEventListener("DOMContentLoaded", () => {
  const savedFavorites = localStorage.getItem("favorites");
  if (savedFavorites) {
    favoriteList = JSON.parse(savedFavorites);
  }
});

// Render favorite list
const renderLightbox = (photos: any[], index: number) => {
  let currentIndex = index;
  let lightbox = document.getElementById("lightbox") as HTMLDivElement | null;

  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    document.body.appendChild(lightbox);
  }

  lightbox.classList.add("active");
  lightbox.innerHTML = "";

  const img = document.createElement("img");
  const left = document.createElement("span");
  const description = document.createElement("p");
  const created_at = document.createElement("p");
  const right = document.createElement("span");

  const updateLightbox = () => {
    img.src = photos[currentIndex].urls.small;
    description.textContent = `Description: ${photos[currentIndex].slug}`;
    created_at.innerHTML = `Created: ${photos[currentIndex].created_at} <br> By: ${photos[currentIndex].user.name}`;
  };

  left.innerHTML = "<";
  right.innerHTML = ">";

  lightbox.append(img, description, created_at, left, right);
  left.classList.add("left");
  right.classList.add("right");

  left.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    updateLightbox();
  });

  right.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % photos.length;
    updateLightbox();
  });

  lightbox.addEventListener("click", (e: MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    lightbox?.classList.remove("active");
  });

  updateLightbox();
};

// Render photos after search
function renderPhotos(getPhotos: any[]) {
  if (!photoList) return;
  photoList.innerHTML = "";

  getPhotos.forEach((photo, index) => {
    const li = document.createElement("li");
    const saveButton = document.createElement("button");
    saveButton.textContent = "Add to Favorites";

    const img = document.createElement("img");
    img.src = photo.urls.small;

    li.append(img, saveButton);
    photoList.appendChild(li);

    saveButton.addEventListener("click", () => {
      renderLightbox(getPhotos, index);
      if (!favoriteList.some((fav) => fav.id === photo.id)) {
        favoriteList.push(photo);
        localStorage.setItem("favorites", JSON.stringify(favoriteList));
      } else {
        alert("This photo is already in your favorites");
      }
    });
  });
}

favoriteListPhoto?.addEventListener("click", () => {
  if (!myPhotos || !searchPhotoLista || !favoriteListPhoto) return;

  myPhotos.innerHTML = "";
  myphotosVisible = !myphotosVisible;
  favoriteListPhoto.textContent = myphotosVisible
    ? "Back to Search"
    : "My Photos";
  searchPhotoLista.style.display = myphotosVisible ? "none" : "block";
  myPhotos.style.display = myphotosVisible ? "block" : "none";

  if (myphotosVisible) {
    favoriteList.forEach((photo, index) => {
      const divPhotoList = document.createElement("div");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "x";

      const img = document.createElement("img");
      img.src = photo.urls.small;
      divPhotoList.append(img, deleteButton);
      myPhotos.appendChild(divPhotoList);

      img.addEventListener("click", () => {
        renderLightbox(favoriteList, index);
      });

      deleteButton.addEventListener("click", () => {
        favoriteList.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favoriteList));
        divPhotoList.remove();
      });
    });
  }
});

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

form?.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  if (!inputQuery || !inputPerPage) return;

  const query = inputQuery.value.trim();
  const perPage = parseInt(inputPerPage.value, 10);

  if (!query || isNaN(perPage) || perPage <= 0) {
    alert("Please enter a valid search term and number of photos per page.");
    return;
  }

  searchPhotos(query, perPage);
  inputQuery.value = "";
  inputPerPage.value = "";

  myphotosVisible = false;
  if (searchPhotoLista && myPhotos && favoriteListPhoto) {
    searchPhotoLista.style.display = "block";
    myPhotos.style.display = "none";
    favoriteListPhoto.textContent = "My Photos";
  }
});
