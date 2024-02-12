let checkbox = document.querySelector("input[name=theme_switch]");
const btn = document.querySelector(".btn") as HTMLButtonElement;
const form = document.querySelector(".form") as HTMLFormElement;
const list = document.querySelector(".middle-list") as HTMLDivElement;
const addItem = document.querySelector(".form__top-list__textarea") as HTMLInputElement; // prettier-ignore
const counter = document.querySelector(".footer__counter") as HTMLSpanElement;
const deleteAllCompleted = document.querySelector(".footer__text") as HTMLParagraphElement; // prettier-ignore
const all = document.querySelector(".bottom-list__all") as HTMLParagraphElement;
const active = document.querySelector(".bottom-list__active") as HTMLParagraphElement; // prettier-ignore
const completed = document.querySelector(".bottom-list__completed") as HTMLParagraphElement; // prettier-ignore
const submit = document.querySelector(".form__top-list__checkbox") as HTMLInputElement; // prettier-ignore
const states = document.querySelectorAll(".state") as NodeListOf<HTMLParagraphElement>; // prettier-ignore
const clearAllBtn = document.querySelector(".clear-all") as HTMLParagraphElement; // prettier-ignore

let switcher: number;

const themeToggle = (theme: string): void => {
  document.documentElement.setAttribute("data-theme", `${theme}`);
  document.body.classList.remove(`body-${theme === "dark" ? "light" : "dark"}`);
  document.body.classList.add(`body-${theme}`);
  btn.classList.remove(`${theme === "dark" ? "light" : "dark"}`);
  btn.classList.add(`${theme}`);
};

// Dark/light mode switcher
// Recognize default mode
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

states.forEach((state) =>
  state.addEventListener("click", (): void => {
    for (let i = 0; i < states.length; i++) {
      states[i].classList.remove("active-btn");
    }
    state.classList.add("active-btn");
  })
);

// Handling local storage
const saveItemsToStorage = (): void => {
  localStorage.setItem("items", JSON.stringify(allItems));
};

interface Item {
  text: string;
  completed: boolean;
  class: string;
  id: number;
}

const allItems: Item[] = JSON.parse(localStorage.getItem("items") || "[]");

submit.addEventListener("click", (e: Event) => {
  e.preventDefault();
  const newItem: Item = {
    text: addItem.value,
    completed: false,
    class: "active",
    id: new Date().getTime(),
  };

  createItem(newItem);
  allItems.push(newItem);
  saveItemsToStorage();
  addItem.value = "";
});

// Handling items creation
const createItem = (item: Item) => {
  // Creating main item wrapper
  const mainWrapper = document.createElement("div");
  mainWrapper.classList.add("middle-list__item");
  mainWrapper.classList.add(`${item.class}`);
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
    if (checkbox.checked) {
      item.class = "completed";
    } else {
      item.class = "active";
    }
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

// Recreate items from local storage on page load
window.addEventListener("load", () => {
  allItems.forEach((item) => createItem(item));
});

// Update counter based on the number of items
function updateCounter(): void {
  const itemCount = allItems.length;
  counter.textContent = `${itemCount} ${
    itemCount === 1 ? "item" : "items"
  } left`;
  console.log(itemCount);
}
updateCounter();

// Handling buttons

// Delete item
list.addEventListener("click", (e: Event): void => {
  if ((e.target as HTMLElement).classList.contains("cross")) {
    const item = (e.target as HTMLElement).closest(".middle-list__item");
    const itemId = item?.getAttribute("data-id");
    if (itemId) {
      const index = allItems.map((item) => item.id).indexOf(+itemId);
      allItems.splice(index, 1);
      item?.remove();
      saveItemsToStorage();
      updateCounter();
    }
  }
});

// Delete all items
clearAllBtn.addEventListener("click", (): void => {
  document.querySelectorAll(".middle-list__item").forEach((item) => {
    item?.remove();
  });
  allItems.length = 0;
  saveItemsToStorage();
  updateCounter();
});

// Change states in real time by toggling classes
const changeState = (e: Event, removeClass: string, addClass: string): void => {
  const target = (e.target as HTMLInputElement).closest(".middle-list__item");

  if (target) {
    target.classList.add(addClass);
    target.classList.remove(removeClass);
  }
};

list.addEventListener("click", (e: Event) => {
  const checkbox = (e.target as HTMLInputElement).classList.contains(
    "checkbox"
  );
  const item = (e.target as HTMLInputElement).closest(".middle-list__item");
  if (item) {
    const completedItem = item.classList.contains("completed");
    if (checkbox && completedItem) {
      changeState(e, "completed", "active");
    } else if (checkbox && !completedItem) {
      changeState(e, "active", "completed");
    }
  }
});

// Display|hide items based on class
const toggleItemsVisibility = (stateClass: string, display: string): void => {
  const state = document.querySelectorAll(stateClass) as NodeListOf<HTMLDivElement>; // prettier-ignore
  state.forEach((item) => (item.style.display = display));
};

active.addEventListener("click", () => {
  toggleItemsVisibility(".active", "flex");
  toggleItemsVisibility(".completed", "none");
});

completed.addEventListener("click", () => {
  toggleItemsVisibility(".active", "none");
  toggleItemsVisibility(".completed", "flex");
});

all.addEventListener("click", () => {
  const allItems = document.querySelectorAll(".middle-list__item") as NodeListOf<HTMLDivElement>; // prettier-ignore
  allItems.forEach((item) => (item.style.display = "flex"));
});
