const mainListContainer = document.querySelector(".items-list") as HTMLUListElement; // prettier-ignore
const createItemBtn = document.querySelector(".expenses-btn") as HTMLButtonElement; // prettier-ignore
const deleteBtn = document.querySelector(".delete") as HTMLButtonElement;
const setBudgetBtn = document.querySelector('.budget-btn') as HTMLButtonElement; // prettier-ignore
const totalBalance = document.querySelector('.overview-container__balance__value') as HTMLParagraphElement; // prettier-ignore
const totalExpenses = document.querySelector('.overview-container__expenses__value') as HTMLParagraphElement; // prettier-ignore
const totalBudget = document.querySelector('.overview-container__total-budget__value') as HTMLParagraphElement; // prettier-ignore

// Variables for dynamic calculations and local storage
let budget: number = 0;
let balance: number = 0;
let expenses: number = 0;

// Handling storage
const saveItemsToStorage = (): void => {
  localStorage.setItem("items", JSON.stringify(allItems));
};

// Decided to create local storage fro budget, as setting a budget and reloading the page will not save it (as its triggered only by adding item)
const saveAMountsToStorage = (): void => {
  localStorage.setItem("amounts", JSON.stringify(allAmounts));
};

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

  // Get value from budget input, save as a variable and display it
  const budgetValue = +budgetInput.value;
  budget = budgetValue;
  totalBudget.textContent = `${budget.toFixed(2)}€`;

  // Update the balance amount (by decrementing it by expenses) in case a new budget is added with already existing expenses, save to variable and display it
  balance = +budgetInput.value - expenses;
  totalBalance.textContent = `${(budget - expenses).toFixed(2)}€`;

  budgetInput.value = "";
  Amounts.budget = budget;
  Amounts.balance = balance;
  Amounts.expenses = expenses;
  allAmounts[0] = { ...Amounts };
  saveAMountsToStorage();
});

// Handling items
interface Item {
  text: string;
  value: number;
  id: number;
}

const allItems: Item[] = JSON.parse(localStorage.getItem("items") || "[]");

createItemBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();

  const itemNameInput = document.querySelector(".expenses-title") as HTMLInputElement; // prettier-ignore
  const itemValueInput = document.querySelector(".expenses-amount") as HTMLInputElement; // prettier-ignore

  const itemName = itemNameInput.value;
  const amount = +itemValueInput.value;

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
  Amounts.balance = balance;
  Amounts.expenses = expenses;
  Amounts.budget = budget;
  allAmounts[0] = { ...Amounts };
  saveAMountsToStorage();
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
  itemValue.textContent = `${item.value}`;
  listGridContainer.appendChild(itemValue);

  const editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  listGridContainer.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  listGridContainer.appendChild(deleteButton);
};

// Deleting items
mainListContainer.addEventListener("click", (e: Event) => {
  console.log(budget);
  const target = e.target as HTMLButtonElement;
  const isDeleteBtn = target.classList.contains("delete");
  if (isDeleteBtn) {
    console.log(budget);
    const item = target.closest(".item") as HTMLDivElement;
    const itemId = item.dataset.id;
    const index = allItems.map((item) => item.id).indexOf(Number(itemId));

    const itemValueElement = item.querySelector(".item-value") as HTMLParagraphElement; // prettier-ignore
    const valueOfItemText = itemValueElement.textContent;
    const valueOfItem = Number(valueOfItemText);

    balance += valueOfItem;
    expenses -= valueOfItem;

    Amounts.balance = balance;
    Amounts.expenses = expenses;
    Amounts.budget = budget;
    allAmounts[0] = { ...Amounts };
    saveAMountsToStorage();

    totalExpenses.textContent = `${expenses.toFixed(2)}€`;
    totalBalance.textContent = `${(budget - expenses).toFixed(2)}€`;

    allItems.splice(index, 1);
    item.remove();
    saveItemsToStorage();
    console.log(budget);
  }
});

window.addEventListener("load", () => {
  // Fetching budget from its local storage
  // const storedBudget = JSON.parse(localStorage.getItem("budget") || "0");
  // budget = storedBudget;
  allItems.forEach((item) => {
    createItem(item);
  });

  balance = allAmounts[0].balance;
  budget = allAmounts[0].budget;
  expenses = allAmounts[0].expenses;

  //Setting budget inside NewItem object to the value of the budget
  // item.budget = budget;

  // // Updating variables from local storage so they are not 0 (as declared at the beginning of the code)
  // budget = item.budget;
  // expenses = item.budget - item.expenses;
  // balance = item.balance;
  totalBudget.textContent = `${budget.toFixed(2)}€`;
  totalExpenses.textContent = `${expenses.toFixed(2)}€`;
  totalBalance.textContent = `${(budget - expenses).toFixed(2)}€`;

  saveAMountsToStorage();
});
