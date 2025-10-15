import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addExpense = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
