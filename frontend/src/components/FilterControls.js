import React, { useState } from 'react';

const FilterControls = ({ columns, onFilter }) => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (colName, type, value) => {
    setFilters(prev => ({
      ...prev,
      [colName]: { type, ...value },
    }));
  };

  const applyFilters = () => onFilter(filters);
  const resetFilters = () => {
    setFilters({});
    onFilter({});
  };

  return (
    <div className="filter-controls">
      <h3>Filter Data</h3>
      {columns.map(col => (
        <div key={col.name} className="filter-group">
          <label>{col.name}</label>
          {col.type === 'number' ? (
            <div className="range-filter">
              <input
                type="number"
                placeholder="Min"
                onChange={(e) => handleFilterChange(col.name, 'range', { min: +e.target.value })}
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                onChange={(e) => handleFilterChange(col.name, 'range', { max: +e.target.value })}
              />
            </div>
          ) : col.type === 'category' ? (
            <select
              multiple
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions, opt => opt.value);
                handleFilterChange(col.name, 'category', { values: options });
              }}
            >
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
          ) : null}
        </div>
      ))}
      <button onClick={applyFilters}>Apply Filters</button>
      <button onClick={resetFilters}>Reset</button>
    </div>
  );
};

export default FilterControls;