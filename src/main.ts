import "./style.scss";
import "../componanse/lightBox.scss";

const access_key = "Client-ID 5f8zX0jzSeoN_-oYZu6-f4OSV8SvrucmOhL8IkPIyCY";

const form = document.querySelector("form") as HTMLFormElement;
const inp1 = document.querySelector(".inp1") as HTMLInputElement;
const inp2 = document.querySelector(".inp2") as HTMLInputElement;
const ul_photos = document.querySelector("ul") as HTMLUListElement;

interface Photo {
  urls: {
    small: string;
  };
  
}

function photosLoop(getPhotos: Photo[]): void {
  ul_photos.innerHTML = "";

  let currentIndex: number= 0;
  getPhotos.forEach((photo) => {
    const li: HTMLLIElement = document.createElement("li");
    li.innerHTML = `<img src="${photo.urls.small}">`;
    ul_photos.appendChild(li);
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    document.body.appendChild(lightbox);

    li.addEventListener("click", () => {
      lightbox.classList.add("active");
      const left = document.createElement("p");
      const img = document.createElement("img");
      const right = document.createElement("span");

      img.src = `${photo.urls.small}`;

      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild);
      }

      lightbox.appendChild(img);
      left.innerHTML = "<";
      right.innerHTML = ">";
      lightbox.appendChild(left);
      lightbox.appendChild(right);
      left.classList.add("left");
      right.classList.add("right");

      left.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + getPhotos.length) % getPhotos.length;
        img.src = getPhotos[currentIndex].urls.small;
      });

      right.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % getPhotos.length;
        img.src = getPhotos[currentIndex].urls.small;
      });

      lightbox.addEventListener("click", (e) => {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove("active");
      });
    });
  });
}

const searchPhotos = async (photos: string, pages: string): Promise<void> => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${photos}&per_page=${pages}`,
    {
      headers: {
        Authorization: access_key,
      },
    }
  );

  const data = await res.json();
  console.log(data.results);
  photosLoop(data.results);
  console.log(data.results);
};

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  searchPhotos(inp1.value, inp2.value);
  inp1.value = "";
  inp2.value = "";
});
