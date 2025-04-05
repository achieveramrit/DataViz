import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import DataTable from './components/DataTable';
import ChartDisplay from './components/ChartDisplay';
import FilterControls from './components/FilterControls';
import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const handleUploadComplete = (data) => {
    setSession(data);
    setFilteredData(data.dataPreview);
  };

  const handleFilter = (filters) => {
    if (!session) return;
    const filtered = session.dataPreview.filter(row => {
      return Object.entries(filters).every(([key, condition]) => {
        if (condition.type === 'range') {
          return row[key] >= condition.min && row[key] <= condition.max;
        }
        if (condition.type === 'category') {
          return condition.values.includes(row[key]);
        }
        return true;
      });
    });
    setFilteredData(filtered);
  };

  return (
    <div className="app">
      <h1>DataViz Pro</h1>
      {!session ? (
        <FileUpload onUploadComplete={handleUploadComplete} />
      ) : (
        <>
          <FilterControls columns={session.columns} onFilter={handleFilter} />
          <ChartDisplay chartImage={session.chartImage} />
          <DataTable data={filteredData} />
        </>
      )}
    </div>
  );
}

export default App;