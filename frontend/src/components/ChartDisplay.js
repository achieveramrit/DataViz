import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ChartDisplay = ({ chartImage, suggestions, metadata, onChartTypeChange, activeChartType }) => {
  return (
    <motion.div 
      className="chart-display"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {suggestions && suggestions.length > 0 && (
        <div className="chart-tabs">
          {suggestions.map((type, index) => (
            <button
              key={index}
              className={`chart-tab ${activeChartType === type ? 'active' : ''}`}
              onClick={() => onChartTypeChange(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="chart-image-container">
        {chartImage ? (
          <motion.img
            src={chartImage}
            alt="Generated chart"
            className="chart-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="chart-placeholder">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Select data to visualize
            </motion.div>
          </div>
        )}
      </div>

      {metadata && (
        <motion.div 
          className="chart-metadata"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h4>Dataset Insights</h4>
          <ul>
            {metadata.columns.map((col, i) => (
              <li key={i}>
                <strong>{col.name}</strong>: {col.type}
                {col.type === 'number' && metadata.stats[col.name] && (
                  <span> (min: {metadata.stats[col.name].min}, max: {metadata.stats[col.name].max})</span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChartDisplay;