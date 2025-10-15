// src/components/SummaryCard.jsx - UPDATED for INR

import React from 'react';

const colorClasses = {
  blue: 'bg-blue-600',   // Balance
  green: 'bg-green-600', // Income
  red: 'bg-red-600',     // Expense
};

const SummaryCard = ({ title, amount, color }) => {
  const bgClass = colorClasses[color] || 'bg-gray-700';
  
  // 🌟 CHANGE HERE: Changed 'USD' to 'INR'
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);

  return (
    <div className={`p-5 rounded-xl shadow-lg text-white transform hover:scale-[1.02] transition duration-300 ease-in-out ${bgClass}`}>
      <p className="text-lg font-medium opacity-80">{title}</p>
      <p className="text-4xl font-extrabold mt-1">{formattedAmount}</p>
    </div>
  );
};

export default SummaryCard;