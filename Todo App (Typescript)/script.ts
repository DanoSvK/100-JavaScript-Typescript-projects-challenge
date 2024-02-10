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
const clearAllBtn = document.querySelector(
  ".clear-all"
) as HTMLParagraphElement;

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

// Update counter based on the number of items
function updateCounter(): void {
  const itemCount = document.querySelectorAll(".middle-list__item").length;
  counter.textContent = `${itemCount} ${
    itemCount === 1 ? "item" : "items"
  } left`;
}

// Event listener for delete button
list.addEventListener("click", (e: Event): void => {
  if ((e.target as HTMLElement).classList.contains("cross")) {
    const item = (e.target as HTMLElement).closest(".middle-list__item");
    const itemId = item?.getAttribute("data-id");
    if (itemId) {
      const index = items.map((item) => item.id).indexOf(+itemId);
      items.splice(index, 1);
      item?.remove();
      saveItemsToStorage();
      updateCounter();
    }
  }
});

clearAllBtn.addEventListener("click", (): void => {
  document.querySelectorAll(".middle-list__item").forEach((item) => {
    item?.remove();
  });
  items.length = 0;
  saveItemsToStorage();
  updateCounter();
});

states.forEach((state) =>
  state.addEventListener("click", (): void => {
    for (let i = 0; i < states.length; i++) {
      states[i].classList.remove("active-btn");
    }
    state.classList.add("active-btn");
  })
);

const saveItemsToStorage = (): void => {
  localStorage.setItem("items", JSON.stringify(items));
};

interface Item {
  text: string;
  completed: boolean;
  id: number;
}

const items: Item[] = JSON.parse(localStorage.getItem("items") || "[]");

submit.addEventListener("click", (e: Event) => {
  e.preventDefault();
  const newItem: Item = {
    text: addItem.value,
    completed: false,
    id: new Date().getTime(),
  };

  createItem(newItem);
  items.push(newItem);

  saveItemsToStorage();
  addItem.value = "";
});

const createItem = (item: Item) => {
  // Creating main item wrapper
  const mainWrapper = document.createElement("div");
  mainWrapper.classList.add("middle-list__item", "active");
  mainWrapper.draggable = true;
  mainWrapper.dataset.id = `${item.id}`;
  list.appendChild(mainWrapper);

  // Creating text wrapper of the item
  const textWrapper = document.createElement("div");
  textWrapper.classList.add("middle-list__item--text");
  mainWrapper.appendChild(textWrapper);

  // Creating checkbox element
  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = item.completed;
  checkbox.addEventListener("change", () => {
    item.completed = checkbox.checked;
    saveItemsToStorage();
  });

  textWrapper.appendChild(checkbox);

  // Creating p element for the text of the item
  const textElement = document.createElement("p");
  textElement.classList.add("middle-list__text");
  textElement.textContent = `${item.text}`;
  textWrapper.appendChild(textElement);

  // Adding image
  const imgElement = document.createElement("img");
  imgElement.classList.add("cross");
  imgElement.src = "./images/icon-cross.svg";
  mainWrapper.appendChild(imgElement);
};
items.forEach((item) => createItem(item));
