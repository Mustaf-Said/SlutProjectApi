import "/styles/main.scss";

document.querySelector<HTMLHeadElement>("main")!.innerHTML = `
   <section>
          <h3>How to search photos</h3>
          <hr />
          <ul>
            <li>Type in the first field the name of pictures you want.</li>
            <li>
              In the second field, write how many images per page you want.
            </li>
            <li>Then click on the search button or press enter keyboard</li>
            <li></li>
            <li></li>
          </ul>
        </section>
        <section>
          <h3>How to save photos</h3>
          <hr />
          <ul>
            <li>Click the save button under image you want to save.</li>
            <li>
              Se information about your image then close image or continue check
              other one.
            </li>
          </ul>
        </section>
        <section>
          <h3>How to check your save photos</h3>
          <hr />
          <ul>
            <li>In the header up to right click on my photos button.</li>
            <li>
              Then you can click on image to zoom it or you can delete it
              through delete button..
            </li>
            <li>In the header up to left click on web name to update page.</li>
          </ul>
        </section>
`;
