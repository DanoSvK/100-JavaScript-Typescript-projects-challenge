const container = document.querySelector(".container") as HTMLElement;

class Recipe {
  ingredientsArr: any[][] = [];
  measuresArr: string[] = [];
  constructor() {
    this.getData();
  }
  async getData() {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"
    );
    const data: any = await res.json();
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

    const markup: any = this.markup(recipe, this.ingredientsArr);

    container.insertAdjacentHTML("afterbegin", markup);
  }

  markup(recipe: any, ingredientsArr: any[][]) {
    let ingredientsList = ""; // Initialize an empty string to store the ingredients list HTML

    // Iterate over each set of ingredients in the two-dimensional array
    for (const ingSet of ingredientsArr) {
      // Generate list items for each ingredient set
      const ingredientSetItems = ingSet
        .map((ing) => `<li>${ing}</li>`)
        .join("");
      ingredientsList += ingredientSetItems; // Concatenate the list items for the current ingredient set
    }
    return `<div class="header">
        <h3>${recipe.strMeal}</h3>
        <p>${recipe.strArea}</p>
      </div>
      <img src="${recipe.strMealThumb}" alt="" />
      <div class="ingredients">
        <h3 class="ingredients-header">Ingredients</h3>
        <ul class="ingredients-list">
        ${ingredientsList}
        </ul>
      </div>
      <div class="button-wrapper">
        <button class="btn-view">View Recipe</button>
      </div>`;
  }
}

new Recipe();
