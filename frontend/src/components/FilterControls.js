import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FilterControls = ({ columns, onFilter, isLoading }) => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (column, type, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: { type, ...value }
    }));
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  const resetFilters = () => {
    setFilters({});
    onFilter({});
  };

  return (
    <motion.div 
      className="filter-controls"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2>Filter Data</h2>
      
      <div className="filter-inputs">
        {columns.map((column) => {
          if (column.type === 'number') {
            return (
              <div key={column.name} className="filter-group">
                <label>{column.name}</label>
                <div className="range-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    onChange={(e) => handleFilterChange(
                      column.name,
                      'range',
                      { min: parseFloat(e.target.value) }
                    )}
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    onChange={(e) => handleFilterChange(
                      column.name,
                      'range',
                      { max: parseFloat(e.target.value) }
                    )}
                  />
                </div>
              </div>
            );
          } else if (column.type === 'category') {
            return (
              <div key={column.name} className="filter-group">
                <label>{column.name}</label>
                <select
                  multiple
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, option => option.value);
                    handleFilterChange(
                      column.name,
                      'category',
                      { values: options }
                    );
                  }}
                >
                  <option value="Category 1">Category 1</option>
                  <option value="Category 2">Category 2</option>
                  <option value="Category 3">Category 3</option>
                </select>
              </div>
            );
          }
          return null;
        })}
      </div>
      
      <div className="filter-buttons">
        <button 
          onClick={applyFilters} 
          disabled={isLoading}
          className="button primary"
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Applying...
            </>
          ) : 'Apply Filters'}
        </button>
        <button onClick={resetFilters} className="button secondary">
          Reset
        </button>
      </div>
    </motion.div>
  );
};

export default FilterControls;