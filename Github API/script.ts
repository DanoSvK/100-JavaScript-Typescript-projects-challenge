const card = document.querySelector(".card") as HTMLDivElement;
const searchBtn = document.querySelector(".search-btn") as HTMLButtonElement;
const input = document.querySelector("input") as HTMLInputElement;

const getData = async (username: string): Promise<void> => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  console.log(data);

  card.innerHTML = "";
  const markup = `
  <img
          src="${data.avatar_url}"
          alt="" />
        <div class="details">
          <h2 class="name">${data.name}</h2>
          <p class="nickname">@${data.login}</p>
          <p class="bio">${data.bio ? data.bio : "Bio not available"}</p>
          <div class="stats">
            <div class="stats__repos">
              <p class="stats__repos-text">Public Repos</p>
              <p class="stats__repos-number">${data.public_repos}</p>
            </div>
            <div class="stats__followers">
              <p class="stats__followers-text">Followers</p>
              <p class="stats__followers-number">${data.followers}</p>
            </div>
            <div class="stats__following">
              <p class="stats__following-text">Following</p>
              <p class="stats__following-number">${data.following}</p>
            </div>
          </div>
          <div class="more-info">
            <p>Hireable: ${data.hireable ? data.hireable : "Not available"}</p>
            <p>Company: ${data.company ? data.company : "Not available"}</p>
            <p>Blog: ${data.blog ? data.blog : "Not available"}</p>
            <p>Twitter: ${
              data.twitter_username ? data.twitter_username : "Not available"
            }</p>
          </div>
        </div>`;

  card.insertAdjacentHTML("afterbegin", markup);
  card.style.display = "flex";
};

searchBtn.addEventListener("click", () => {
  getData(input.value);
});
