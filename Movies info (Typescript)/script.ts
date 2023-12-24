const movieTitleEl = document.querySelector("input")!;
const card = document.querySelector(".card")!;
const renderDataEl = document.querySelector(".render-app")!;
const errorMsg = document.querySelector(".error-message")!;
const errorMsgWrapper = document.querySelector(".error-message-wrapper")!;
const searchBtn = document.querySelector('.search-btn') as HTMLButtonElement
const errorMsgDelay = 3000;

interface Data {
  Response: string,
  Error: string,
  Poster: string,
  Title: string,
  Rated: number,
  Released: string,
  Writer: string,
  Actors: string,
  Plot: string,
  Genre: string
}

class MovieApp {
  constructor() {
    searchBtn.addEventListener("click", () => {
      this.getData();
    });
    document.addEventListener("keydown", (e) => {
      // Check if enter is pressed and at the same time if input is active
      if (e.key === "Enter" && document.activeElement === movieTitleEl) {
        this.getData();
      }
    });
  }

  getData(): void {
    try {
      // Fetching data
      const apiKey = "ENTER_YOUR_API_KEY"
      const movieTitle = movieTitleEl.value;
      fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`)
        .then((res) => res.json())
        .then((data: Data) => {
          // Generating error
          if (data.Response === "False") throw new Error(`${data.Error}`);

          // Rendering markup
          const html: string = this.markup(data);
          renderDataEl.innerHTML = html;
        })
        .catch((err) => {
          // Catching and rendering error with error message
          errorMsg.innerHTML = `${err} Enter a correct movie or TV show name.`;
          errorMsgWrapper.classList.add("active");
          setTimeout(() => {
            errorMsgWrapper.classList.remove("active");
          }, errorMsgDelay);
        });
    } catch (err) {
      // Handle synchronous errors (e.g., syntax errors)
      console.error(err);
    }
  }
  // Generating dynamic markup
  markup(data: Data): string {
    //Splitting genres string into array to dynamically create <p> element per each genre in markup()
    const genres = data.Genre.split(",");
    return `
    
        <div class="main-content">
              <img class="poster" src=${data.Poster} alt="Movie poster" />
              <div class="movie-info">
                <h1>${data.Title}</h1>
                <p><img class="star" src="./star-icon.svg" alt="" /> 8.4</p>
                <div class="details">
                  <p class="age">${data.Rated}</p>
                  <p class="air-date">${data.Released}</p>
                </div>
                <div class="genres">
                ${genres.map((i) => `<p class="genre">${i}</p>`).join("")}
                </div>
              </div>
            </div>
            <div class="text-content">
            <p class="writers">
                <span>Writers:</span><br />
                ${data.Writer}
              </p>
              <p class="cast">
                <span>Cast:</span><br />
                ${data.Actors}
              </p>
              <p class="plot">
                <span>Plot:</span><br />
                ${data.Plot}
              </p>
            </div>`;
  }
}
new MovieApp();