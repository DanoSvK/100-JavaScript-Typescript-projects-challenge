const mainListContainer = document.querySelector(".items-list") as HTMLUListElement; // prettier-ignore
const createItemBtn = document.querySelector(".expenses-btn") as HTMLButtonElement; // prettier-ignore
const deleteBtn = document.querySelector(".delete") as HTMLButtonElement;
const setBudgetBtn = document.querySelector('.budget-btn') as HTMLButtonElement; // prettier-ignore
const totalBalance = document.querySelector('.overview-container__balance__value') as HTMLParagraphElement; // prettier-ignore
const totalExpenses = document.querySelector('.overview-container__expenses__value') as HTMLParagraphElement; // prettier-ignore
const totalBudget = document.querySelector('.overview-container__total-budget__value') as HTMLParagraphElement; // prettier-ignore
const itemNameInput = document.querySelector(".expenses-title") as HTMLInputElement; // prettier-ignore
const itemValueInput = document.querySelector(".expenses-amount") as HTMLInputElement; // prettier-ignore

// Handling variables
let budget: number = 0;
let balance: number = 0;
let expenses: number = 0;
let isToEdit = false;
// Handling storages
const saveItemsToStorage = (): void => {
  localStorage.setItem("items", JSON.stringify(allItems));
};

// Needed, as it would be saved only on adding item
const saveAMountsToStorage = (): void => {
  Amounts.balance = balance;
  Amounts.expenses = expenses;
  Amounts.budget = budget;
  allAmounts[0] = { ...Amounts };
  localStorage.setItem("amounts", JSON.stringify(allAmounts));
};

// Handlig Amounts object
interface Amounts {
  budget: number;
  expenses: number;
  balance: number;
}

const Amounts: Amounts = {
  budget: budget,
  expenses: expenses,
  balance: balance,
};

const allAmounts: Amounts[] = JSON.parse(
  localStorage.getItem("amounts") || "[]"
);

// Handling budget
setBudgetBtn.addEventListener("click", () => {
  const budgetInput = document.querySelector("#budget") as HTMLInputElement;

  // Get value from budget input, save udpate the variable, and display it
  const budgetValue = +budgetInput.value;
  budget = budgetValue;
  totalBudget.textContent = `${budget.toFixed(2)}€`;

  // Update also the balance amount (by decrementing it by expenses) in case a new budget is added with already existing expenses, update the variable variable, and display it
  balance = +budgetInput.value - expenses;
  totalBalance.textContent = `${(budget - expenses).toFixed(2)}€`;

  budgetInput.value = "";

  saveAMountsToStorage();
});

// Handling Item object
interface Item {
  text: string;
  value: number;
  id: number;
}

const allItems: Item[] = JSON.parse(localStorage.getItem("items") || "[]");

// Saves local storage, if isToEdit is true, saving local storage (in case edit item button was clicked which leads to removing it only from array without saving to local storage).
createItemBtn.addEventListener("click", (e: Event) => {
  // If isToEdit is true,
  if (isToEdit == true) {
    saveItemsToStorage();
  }
  e.preventDefault();

  const itemName = itemNameInput.value;
  const amount = +itemValueInput.value;
  if (itemName.trim() == "" || !amount || amount < 1) return;
  // Get value from expenses input and display it
  expenses += amount;
  totalExpenses.textContent = `${expenses.toFixed(2)}€`;

  // Decrement balance by each item value to update the balance and display it
  balance -= amount;
  totalBalance.textContent = `${balance.toFixed(2)}€`;

  const NewItem: Item = {
    text: itemName,
    value: amount,
    id: Date.now(),
  };

  // Create item and save to local storage
  createItem(NewItem);
  allItems.push(NewItem);
  saveItemsToStorage();

  itemNameInput.value = "";
  itemValueInput.value = "";

  saveAMountsToStorage();
  isToEdit = false;
});

const createItem = (item: Item) => {
  const listGridContainer = document.createElement("div");
  listGridContainer.classList.add("item");
  mainListContainer.appendChild(listGridContainer);
  listGridContainer.dataset.id = `${item.id}`;

  const itemName = document.createElement("p");
  itemName.classList.add("item-name");
  itemName.textContent = item.text;
  listGridContainer.appendChild(itemName);

  const itemValue = document.createElement("p");
  itemValue.classList.add("item-value");
  itemValue.textContent = `${item.value}€`;
  listGridContainer.appendChild(itemValue);

  const editBtn = document.createElement("button");
  editBtn.classList.add("fa-solid", "fa-pen-to-square", "edit");
  listGridContainer.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("fa-solid", "fa-trash-can", "delete");
  listGridContainer.appendChild(deleteBtn);
};

// Getting, calculating, displaying values and deleting the specific item upon edit/delete
const getItem = (target: HTMLButtonElement): void => {
  const item = target.closest(".item") as HTMLDivElement;
  const itemId = item.dataset.id;
  const index = allItems.map((item) => item.id).indexOf(Number(itemId));

  const itemValueElement = item.querySelector(".item-value") as HTMLParagraphElement; // prettier-ignore
  const itemNameElement = item.querySelector(".item-name") as HTMLParagraphElement; // prettier-ignore
  const valueOfItemText = itemValueElement.textContent;
  const valueOfItem = Number(valueOfItemText?.replace("€", "") || "0");

  balance += valueOfItem;
  expenses -= valueOfItem;

  totalExpenses.textContent = `${expenses.toFixed(2)}€`;
  totalBalance.textContent = `${(budget - expenses).toFixed(2)}€`;

  allItems.splice(index, 1);
  item.remove();
  if (target.classList.contains("edit")) {
    console.log(valueOfItemText);
    itemNameInput.value = itemNameElement.textContent || "0";
    itemValueInput.value = valueOfItemText?.replace("€", "") || "0";
  }
};

// Deleting items
mainListContainer.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLButtonElement;
  const isDeleteBtn = target.classList.contains("delete");

  if (isDeleteBtn) {
    getItem(target);

    saveAMountsToStorage();
    saveItemsToStorage();
  }
});

// Editing items
/* Item gets deleted from UI and from arrasy, but cahgne is not saved into local storage
Instead, isToEdit is set to true and upon adding another item the local storage is saved (handled in createItemBtn),
removing the item from local storage and only one item would be added */
mainListContainer.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLButtonElement;
  const isEditBtn = target.classList.contains("edit");
  if (isEditBtn) {
    getItem(target);
    isToEdit = true;
  }
});

window.addEventListener("load", () => {
  allItems.forEach((item) => {
    createItem(item);
  });

  balance = allAmounts[0].balance;
  budget = allAmounts[0].budget;
  expenses = allAmounts[0].expenses;

  totalBudget.textContent = `${budget.toFixed(2)}€`;
  totalExpenses.textContent = `${expenses.toFixed(2)}€`;
  totalBalance.textContent = `${(budget - expenses).toFixed(2)}€`;

  saveAMountsToStorage();
});
