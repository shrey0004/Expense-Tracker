// src/components/FilterButtons.jsx - NEW FILE

import React from 'react';

const FilterButtons = ({ currentFilter, setFilter }) => {
  const filters = [
    { label: 'All Entries', value: 'all' },
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ];

  return (
    <div className="flex justify-start space-x-3 mb-4 p-3 bg-white rounded-xl shadow-xl">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 
            ${currentFilter === f.value
              ? 'bg-blue-600 text-white shadow-md' // Active state
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200' // Inactive state
            }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;