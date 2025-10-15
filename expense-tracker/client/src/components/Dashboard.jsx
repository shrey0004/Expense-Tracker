// src/components/Dashboard.jsx

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // ✨ IMPORT: For unique IDs
import TransactionList from './TransactionList';
import SummaryCard from './SummaryCard';
import TransactionForm from './TransactionForm';
import FilterButtons from './FilterButtons';

const STORAGE_KEY = 'expenseTrackerTransactions';
const INITIAL_TRANSACTIONS = [];

function Dashboard() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const storedTransactions = localStorage.getItem(STORAGE_KEY);
      return storedTransactions ? JSON.parse(storedTransactions) : INITIAL_TRANSACTIONS;
    } catch (e) {
      console.error("Could not load transactions from storage:", e);
      return INITIAL_TRANSACTIONS;
    }
  });
  
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (e) {
      console.error("Could not save transactions to storage:", e);
    }
  }, [transactions]); 

  // ✨ OPTIMIZED: Calculations now happen in a single efficient loop
  const { income, expense, balance } = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.amount > 0) {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      acc.balance = acc.income + acc.expense;
      return acc;
    }, { income: 0, expense: 0, balance: 0 });
  }, [transactions]);

  // ✨ IMPROVED: Uses uuid for robust unique IDs
  const addTransaction = useCallback((transaction) => {
    setTransactions(prevTransactions => [
      { ...transaction, id: uuidv4() },
      ...prevTransactions,
    ]);
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prevTransactions => 
      prevTransactions.filter(t => t.id !== id)
    );
  }, []);

  const filteredTransactions = useMemo(() => {
    if (filter === 'income') {
      return transactions.filter(t => t.amount > 0);
    }
    if (filter === 'expense') {
      return transactions.filter(t => t.amount < 0);
    }
    return transactions;
  }, [transactions, filter]);

  return (
    <div className="min-h-screen bg-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* ✨ UI: Centered heading for a cleaner look */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-8">
          💰 Finance Tracker
        </h1>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard title="Current Balance" amount={balance} color="blue" />
          <SummaryCard title="Total Income" amount={income} color="green" />
          <SummaryCard title="Total Expense" amount={expense} color="red" />
        </div>

        {/* MAIN CONTENT AREA: Form and List */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <TransactionForm onAddTransaction={addTransaction} />
          </div>

          <div className="lg:w-2/3">
            <FilterButtons currentFilter={filter} setFilter={setFilter} />
            <TransactionList 
              transactions={filteredTransactions} 
              onDeleteTransaction={deleteTransaction} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;