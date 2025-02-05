document.querySelector<HTMLHeadElement>("footer")!.innerHTML = `
<!--  First section in footer -->
<section id="first">
  <p><i>Photos library</i></p>
  <span>&#169;</span>
  <p>2025</p> <br>
   <p>
    <a href="https://unsplash.com/developers" target="_blank" rel="noopener">Unsplash documention</a>
  </p>
</section>

<!--     Second section in footer -->
<section id="second">
  <p>
    <a
      href="https://github.com/Mustaf-Said/slutProjektApi"
      target="_blank"
      rel="noopener"
      ><i class="fa-brands fa-github"></i> Github</a
    >
  </p>
  <p>
    <a
      href="https://www.figma.com/design/nyuygJbzvF0Bq7R2li3PUW/SlutProjectApi?node-id=0-1&p=f&t=D7C7sA7FWwLjjw7t-0"
      target="_blank"
      rel="noopener"
    >
      <i class="fa-brands fa-figma"></i>Figma</a
    >
  </p>
  <p>
    <a
      href="https://docs.google.com/document/d/1fWSA3XzsK1HcD0sp9Ap9AVXOSWmHKrXGWGSrZBHuaiY/edit?tab=t.0"
      target="_blank"
      rel="noopener"
    >
      <i class="fa-solid fa-table-list"></i>Google-Docs</a
    >
  </p>
</section>
<!--  Thered section in footer -->
<section id="thered">
  <h3><a href="https://unsplash.com/about" target="_blank" rel="noopener">About</a></h3>
  <p>
    The project is the final project for the course Web Programming with
    JavaScript in-depth. The project has used Unsplash's API to retrieve
    data from there.
  </p>
</section>
`;
