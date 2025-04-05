import React from 'react';

const ChartDisplay = ({ chartImage }) => {
  return (
    <div className="chart-container">
      {chartImage ? (
        <img 
          src={`data:image/png;base64,${chartImage}`} 
          alt="Generated chart" 
          style={{ maxWidth: '100%' }}
        />
      ) : (
        <p>No chart generated yet</p>
      )}
    </div>
  );
};

export default ChartDisplay;