const recipeContainer = document.querySelector(".recipe") as HTMLDivElement;
const recipeInstructionsContainer = document.querySelector(
  ".recipe-detail"
) as HTMLDivElement;
const recipeInstructionsText = document.querySelector(
  ".recipe-instructions-text"
) as HTMLDivElement;
const searchInput = document.querySelector(".search-input") as HTMLInputElement;
const form = document.querySelector(".search-form") as HTMLButtonElement;
const overlay = document.querySelector(".overlay") as HTMLDivElement;
const closeBtn = document.querySelector(".close-btn") as HTMLImageElement;

class Recipe {
  ingredientsArr: any[][] = [];
  measuresArr: string[] = [];
  newArr: string[][] = [];
  data;
  constructor() {
    form.addEventListener("submit", async (e: Event) => {
      e.preventDefault();

      this.dynamicStyles();
      await this.getData(searchInput.value);
    });

    // Attach event listener for viewInstructionsBtn outside the form submission event listener
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("view-instructions-btn")) {
        this.renderRecipeInstructions();
      }
    });
    closeBtn.addEventListener("click", this.closeRecipeInstructions);
  }
  async getData(meal: string) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
    );
    const data: any = await res.json();
    this.data = data;
    const recipe: { [key: string]: string } = data.meals[0];

    for (const [key, value] of Object.entries(recipe)) {
      if (key.includes("Ingredient") && value != null && value != "") {
        if (!this.ingredientsArr[0]) {
          this.ingredientsArr[0] = [];
        }
        this.ingredientsArr[0].push(value);
      }
      if (key.includes("Measure") && value != null && value != "") {
        if (!this.ingredientsArr[1]) {
          this.ingredientsArr[1] = [];
        }
        this.ingredientsArr[1].push(value);
      }
    }
    const transpose = (array: any[][]) =>
      array[0].map((_, colIndex) => array.map((row) => row[colIndex]));

    // Transpose the array and map each row to pairs
    this.newArr = transpose(this.ingredientsArr).map((pair) => pair);
    const markup: any = this.markup(recipe, this.newArr);
    recipeContainer.innerHTML = markup;
  }

  renderRecipeInstructions() {
    recipeInstructionsText.innerHTML = "";
    this.data.meals[0].strInstructions
      .split(".")
      .map((el) => (recipeInstructionsText.innerHTML += `<p>${el}</p></br>`));
    recipeInstructionsContainer.style.display = "block";
    overlay.style.display = "block";
  }

  closeRecipeInstructions() {
    overlay.style.display = "block";
    recipeInstructionsContainer.style.display = "none";
    overlay.style.display = "none";
  }

  markup(recipe: any, ingredientsArr: any[][]) {
    return `<div class="header">
        <h3>${recipe.strMeal}</h3>
        <p>${recipe.strArea}</p>
      </div>
      <img src="${recipe.strMealThumb}" alt="" />
      <div class="ingredients">
        <h3 class="ingredients-header">Ingredients</h3>
        <ul class="ingredients-list">
        ${ingredientsArr.map(this.itemMarkup).join("")}
        </ul>
      </div>
      <div class="button-wrapper">
        <button class="btn view-instructions-btn">View Instructions</button>
      </div>`;
  }
  itemMarkup(ing: any) {
    return `<li>${ing[1]} of ${ing[0]}</li>`;
  }

  dynamicStyles() {
    form.style.display = "none";
  }
}

new Recipe();
