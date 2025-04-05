import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import DataTable from './components/DataTable';
import ChartDisplay from './components/ChartDisplay';
import FilterControls from './components/FilterControls';
import FloatingActions from './components/FloatingActions';
import LoadingOverlay from './components/LoadingOverlay';
import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeChartType, setActiveChartType] = useState('bar');

  const handleUploadComplete = (data) => {
    setSession(data);
    setFilteredData(data.dataPreview);
    setError(null);
  };

  const handleFilter = (filters) => {
    if (!session) return;
    
    setIsLoading(true);
    setTimeout(() => {
      try {
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
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  const handleChartTypeChange = (type) => {
    setActiveChartType(type);
    // In a real app, regenerate chart here
  };

  const handleNewUpload = () => {
    setSession(null);
    setFilteredData(null);
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>DataViz Pro</h1>
          <p>Transform your data into beautiful insights</p>
        </div>
      </header>

      <main className="app-content">
        {error && (
          <div className="error-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}

        {!session ? (
          <div className="upload-section">
            <FileUpload 
              onUploadComplete={handleUploadComplete} 
              setError={setError}
            />
          </div>
        ) : (
          <div className="dashboard">
            <div className="controls-section">
              <FilterControls 
                columns={session.metadata.columns} 
                onFilter={handleFilter}
              />
            </div>
            
            <div className="visualization-section">
              <div className="chart-container">
                <ChartDisplay 
                  chartImage={session.chartImage} 
                  suggestions={session.metadata.suggestedCharts}
                  metadata={session.metadata}
                  onChartTypeChange={handleChartTypeChange}
                  activeChartType={activeChartType}
                />
              </div>
              
              <div className="data-container">
                <DataTable data={filteredData || session.dataPreview} />
              </div>
            </div>
          </div>
        )}

        {isLoading && <LoadingOverlay />}
      </main>

      {session && (
        <FloatingActions 
          onNewFile={handleNewUpload}
          onExport={() => alert('Export functionality would go here')}
        />
      )}
    </div>
  );
}

export default App;