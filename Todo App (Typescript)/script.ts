let checkbox = document.querySelector("input[name=theme_switch]");
const btn = document.querySelector(".btn") as HTMLButtonElement;
const form = document.querySelector(".form") as HTMLFormElement;
const list = document.querySelector(".middle-list") as HTMLDivElement;
const addItem = document.querySelector(
  ".form__top-list__textarea"
) as HTMLInputElement;
const counter = document.querySelector(".footer__counter") as HTMLSpanElement;
const deleteAllCompleted = document.querySelector(
  ".footer__text"
) as HTMLParagraphElement;
const all = document.querySelector(".bottom-list__all") as HTMLParagraphElement;
const active = document.querySelector(
  ".bottom-list__active"
) as HTMLParagraphElement;
const completed = document.querySelector(
  ".bottom-list__completed"
) as HTMLParagraphElement;
const submit = document.querySelector(
  ".form__top-list__checkbox"
) as HTMLInputElement;
const states = document.querySelectorAll(
  ".state"
) as NodeListOf<HTMLParagraphElement>;

const themeToggle = (theme: string): void => {
  document.documentElement.setAttribute("data-theme", `${theme}`);
  document.body.classList.remove(`body-${theme === "dark" ? "light" : "dark"}`);
  document.body.classList.add(`body-${theme}`);
  btn.classList.remove(`${theme === "dark" ? "light" : "dark"}`);
  btn.classList.add(`${theme}`);
};

// Dark/light mode switcher
// Recognize default mode
let switcher: number;
function colorThemeRecognizer() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    themeToggle("dark");
    switcher = 0;
  } else {
    themeToggle("light");
    switcher = 1;
  }
}
colorThemeRecognizer();

btn.addEventListener("click", (): void => {
  if (switcher === 1) {
    themeToggle("dark");
  } else {
    themeToggle("light");
  }
  switcher = switcher === 0 ? 1 : 0;
});

// Load data from local storage
function loadItemsFromStorage(): void {
  const storedItems = localStorage.getItem("todoItems");
  if (storedItems) {
    list.innerHTML = storedItems;
    updateCounter();
  }
}

// Save data to local storage
function saveItemsToStorage(): void {
  localStorage.setItem("todoItems", list.innerHTML);
}

// Update counter based on the number of items
function updateCounter(): void {
  const itemCount = document.querySelectorAll(".middle-list__item").length;
  counter.textContent = `${itemCount} ${
    itemCount === 1 ? "item" : "items"
  } left`;
}

// Function to add a new item
function addItemToDOM(text: string): void {
  const html = `
    <div class="middle-list__item active" draggable="true">
      <div class="middle-list__item--text">
        <input class="checkbox" type="checkbox" />
        <p class="middle-list__text">${text}</p>
      </div>
      <img class="cross" src="./images/icon-cross.svg" alt="" />
    </div>`;
  list.innerHTML += html;
}

// Event listener for form submission
submit.addEventListener("click", (e: Event): void => {
  e.preventDefault();
  const newItemText = addItem.value.trim();
  if (newItemText !== "") {
    addItemToDOM(newItemText);
    saveItemsToStorage();
    addItem.value = ""; // Clear the input field
    updateCounter();
  }
});

// Event listener for delete button
list.addEventListener("click", (e: Event): void => {
  if ((e.target as HTMLElement).classList.contains("cross")) {
    (e.target as HTMLElement).closest(".middle-list__item")?.remove();
    saveItemsToStorage();
    updateCounter();
  }
});

// Event listener for checkbox
list.addEventListener("change", (e: Event): void => {
  if ((e.target as HTMLElement).classList.contains("checkbox")) {
    const itemText = (e.target as HTMLElement).nextElementSibling?.textContent;
    (e.target as HTMLElement)
      .closest(".middle-list__item")
      ?.classList.toggle("completed");
    saveItemsToStorage();
    updateCounter();
  }
});

// Event listener for drag and drop
list.addEventListener("dragend", (): void => {
  saveItemsToStorage();
});

// Event listener for "Delete All Completed" button
deleteAllCompleted.addEventListener("click", (): void => {
  document.querySelectorAll(".middle-list__item.completed").forEach((item) => {
    item.remove();
  });
  saveItemsToStorage();
  updateCounter();
});

// Initial load from local storage and update counter
loadItemsFromStorage();
updateCounter();

states.forEach((state) =>
  state.addEventListener("click", (): void => {
    for (let i = 0; i < states.length; i++) {
      states[i].classList.remove("active-btn");
    }
    state.classList.add("active-btn");
  })
);
