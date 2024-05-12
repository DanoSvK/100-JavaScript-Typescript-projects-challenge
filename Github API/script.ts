const card = document.querySelector(".card") as HTMLDivElement;

const getData = async (): Promise<void> => {
  const res = await fetch("https://api.github.com/users/DanoSvK");
  const data = await res.json();
  console.log(data);

  const markup = `
  <img
          src="${data.avatar_url}"
          alt="" />
        <div class="details">
          <h2 class="name">${data.name}</h2>
          <p class="nickname">@${data.login}</p>
          <p class="bio">Bio</p>
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
          <div class="smth">
            <p>Not available</p>
            <p>Not available</p>
            <p>Not available</p>
            <p>Not available</p>
          </div>
        </div>`;

  card.insertAdjacentHTML("afterbegin", markup);
};

getData();
