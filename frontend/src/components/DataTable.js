import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DataTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  if (!data || data.length === 0) {
    return (
      <motion.div 
        className="no-data"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        No data to display
      </motion.div>
    );
  }

  const columns = Object.keys(data[0]);

  const sortedData = [...data];
  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <motion.div 
      className="data-table-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th 
                key={col}
                onClick={() => requestSort(col)}
                className={sortConfig.key === col ? `sorted-${sortConfig.direction}` : ''}
              >
                {col}
                {sortConfig.key === col && (
                  <span className="sort-icon">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <motion.tr 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              whileHover={{ scale: 1.01 }}
            >
              {columns.map((col) => (
                <td key={`${index}-${col}`}>
                  {row[col]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default DataTable;