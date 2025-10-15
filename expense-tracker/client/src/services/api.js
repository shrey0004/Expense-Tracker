const API_URL = "http://localhost:4001/api/expenses";

// Named export for getting all expenses
export const getExpenses = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

// Named export for adding an expense
export const addExpense = async (expense) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  return res.json();
};

// Named export for deleting an expense
export const deleteExpense = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
