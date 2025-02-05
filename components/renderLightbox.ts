import "../styles/renderLightbox.scss";
export let lightbox = document.getElementById(
  "lightbox"
) as HTMLDivElement | null;
// Render favorite list
export const renderLightbox = (photos: any[], index: number) => {
  let currentIndex = index;
  /*  export let lightbox = document.getElementById("lightbox") as HTMLDivElement | null; */

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

  //Endpoend for Api
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
  // Se to next img
  left.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    updateLightbox();
  });
  //Se previous img
  right.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % photos.length;
    updateLightbox();
  });
  //Close lightbox on click around img
  lightbox.addEventListener("click", (e: MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    lightbox?.classList.remove("active");
  });

  updateLightbox();
};
