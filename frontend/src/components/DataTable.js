import React from 'react';

const DataTable = ({ data }) => {
  if (!data || data.length === 0) return <p>No data to display</p>;

  const columns = Object.keys(data[0]);

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map(col => (
              <td key={`${i}-${col}`}>{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;