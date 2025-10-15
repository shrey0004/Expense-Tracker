// src/components/TransactionList.jsx - Minor Style Change

import React from 'react';
import { Trash2 } from 'lucide-react'; 

// ... (formatINR helper function remains the same) ...
const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    }).format(Math.abs(amount));
};
// ...

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  return (
    // 🌟 STYLE CHANGE: Removed 'p-6 rounded-xl shadow-xl' from here, 
    // and applied a white background for better visual separation.
    <div className="bg-white p-6 rounded-xl shadow-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Filtered Transactions
      </h2>
      {transactions.length === 0 && (
        <p className="text-gray-500 italic">No transactions found for this category.</p>
      )}
      <ul className="space-y-3 max-h-96 overflow-y-auto">
        {/* ... (List rendering logic remains the same) ... */}
        {transactions.map(transaction => {
            // ... (rest of the map function)
            // ... (your existing <li> code)
            const isExpense = transaction.amount < 0;
            const amountSign = isExpense ? '-' : '+';
            const amountClass = isExpense ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50';

            return (
              <li 
                key={transaction.id}
                className={`flex items-center justify-between p-4 rounded-lg shadow-sm border-l-4 ${isExpense ? 'border-red-500' : 'border-green-500'} transition hover:shadow-md`}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{transaction.text}</span>
                  <span className="text-xs text-gray-400 mt-0.5">{transaction.date}</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className={`text-lg font-bold px-3 py-1 rounded-full ${amountClass}`}>
                    {amountSign}{formatINR(transaction.amount)}
                  </span>
                  
                  <button 
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition duration-150 rounded-full hover:bg-red-50"
                    aria-label={`Delete transaction ${transaction.text}`}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default TransactionList;