// src/components/TransactionForm.jsx - UPDATED LABEL

import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [isExpense, setIsExpense] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) {
      alert("Please enter both a description and an amount.");
      return; 
    }

    // Apply negative sign for expenses before passing to parent
    const newAmount = isExpense ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount));

    // Call the handler function passed down from Dashboard
    onAddTransaction({
      text,
      amount: newAmount,
      type: isExpense ? 'expense' : 'income',
      date: new Date().toISOString().split('T')[0], // Automatically set current date
    });

    // Reset form fields for next entry
    setText('');
    setAmount('');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl sticky top-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Toggle Income/Expense (Interactive Feature) */}
        <div className="flex items-center space-x-4 mb-4">
          <label className="text-gray-600 font-medium">Type:</label>
          <button 
            type="button" 
            onClick={() => setIsExpense(false)} 
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              !isExpense 
                ? 'bg-green-100 text-green-700 ring-2 ring-green-500' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            Income
          </button>
          <button 
            type="button" 
            onClick={() => setIsExpense(true)} 
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              isExpense 
                ? 'bg-red-100 text-red-700 ring-2 ring-red-500' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            Expense
          </button>
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input 
            type="text" 
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., Dinner with friends"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          {/* 🌟 THE CHANGE IS HERE: Amount ($) changed to Amount (₹) */}
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
          <input 
            type="number" 
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-150 shadow-md hover:shadow-lg"
        >
          Add {isExpense ? 'Expense' : 'Income'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;