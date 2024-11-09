
let expenses = [];
let totalBudget = 0;

const budgetInput = document.getElementById('budgetInput');
const expenseForm = document.getElementById('expenseForm');
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const expenseCategoryInput = document.getElementById('expenseCategory');
const expenseTableBody = document.getElementById('expenseTableBody');
const totalSpentDisplay = document.getElementById('totalSpent');
const totalBudgetDisplay = document.getElementById('totalBudget');

budgetInput.addEventListener('input', (e) => {
  totalBudget = parseFloat(e.target.value) || 0;
  totalBudgetDisplay.textContent = totalBudget.toFixed(2);
  updateTotalSpent();
});

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = expenseNameInput.value;
  const amount = parseFloat(expenseAmountInput.value);
  const category = expenseCategoryInput.value;

  if (name && amount && category) {
    addExpense(name, amount, category);
    expenseForm.reset();
    updateTotalSpent();
  }
});

function addExpense(name, amount, category) {
  const expense = { name, amount, category };
  expenses.push(expense);
  renderExpenses();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
  updateTotalSpent();
}

function renderExpenses() {
  expenseTableBody.innerHTML = '';
  expenses.forEach((expense, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.name}</td>
      <td>$${expense.amount.toFixed(2)}</td>
      <td>${expense.category}</td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button></td>
    `;
    expenseTableBody.appendChild(row);
  });
}

function updateTotalSpent() {
  const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  totalSpentDisplay.textContent = totalSpent.toFixed(2);

  if (totalSpent > totalBudget) {
    totalSpentDisplay.style.color = 'red';
  } else {
    totalSpentDisplay.style.color = 'green';
  }
}
