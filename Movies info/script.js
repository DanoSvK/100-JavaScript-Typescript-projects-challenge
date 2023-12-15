const searchBtn = document.querySelector(".search-btn");
const movieTitleEl = document.querySelector("input");
const card = document.querySelector(".card");
const renderDataEl = document.querySelector(".render-app");
const errorMsg = document.querySelector(".error-message");
const errorMsgWrapper = document.querySelector(".error-message-wrapper");
const errorMsgDelay = 3000;

class MovieApp {
  genres;
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

  getData = async () => {
    try {
      // Fetching data
      const apiKey = "3ede7446";
      const movieTitle = movieTitleEl.value;
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`
      );
      const data = await res.json();

      // Generating error
      if (data.Response === "False") throw new Error(`${data.Error}`);

      // Rendering markup
      const html = this.markup(data);

      renderDataEl.innerHTML = html;
    } catch (err) {
      // Catching and rendering error with error message
      errorMsg.innerHTML = `${err} Enter a correct movie or tv show name.`;
      errorMsgWrapper.classList.add("active");
      setTimeout(() => {
        errorMsgWrapper.classList.remove("active");
      }, errorMsgDelay);
    }
  };
  // Generating dynamic markup
  markup(data) {
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
