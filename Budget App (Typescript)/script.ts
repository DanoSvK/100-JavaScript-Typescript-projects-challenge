const mainListContainer = document.querySelector(".items-list") as HTMLUListElement; // prettier-ignore
const createItemBtn = document.querySelector(".expenses-btn") as HTMLButtonElement; // prettier-ignore

const saveItemsToStorage = (): void => {
  localStorage.setItem("items", JSON.stringify(allItems));
};

interface Item {
  text: string;
  value: number;
}
const allItems: Item[] = JSON.parse(localStorage.getItem("items") || "[]");

createItemBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();

  const itemName = (document.querySelector(".expenses-title") as HTMLInputElement).value; // prettier-ignore
  const amount = +(document.querySelector(".expenses-amount") as HTMLInputElement).value; // prettier-ignore

  const NewItem: Item = {
    text: itemName,
    value: amount,
  };

  createItem(NewItem);
  allItems.push(NewItem);
  saveItemsToStorage();
});

const createItem = (item: Item) => {
  const listItemContainer = document.createElement("li");
  mainListContainer.appendChild(listItemContainer);

  const listGridContainer = document.createElement("div");
  listGridContainer.classList.add("item");
  listItemContainer.appendChild(listGridContainer);

  const itemName = document.createElement("p");
  itemName.classList.add("item-name");
  itemName.textContent = item.text;
  listGridContainer.appendChild(itemName);

  const itemValue = document.createElement("p");
  itemValue.classList.add("item-value");
  itemValue.textContent = `${item.value}`;
  listGridContainer.appendChild(itemValue);

  const editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  listGridContainer.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  listGridContainer.appendChild(deleteButton);
};

window.addEventListener("load", () => {
  allItems.forEach((item) => createItem(item));
});
