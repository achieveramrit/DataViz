import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

const FileUpload = ({ onUploadComplete, setError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json']
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        handleFile(acceptedFiles[0]);
      }
    }
  });

  const handleFile = async (file) => {
    setIsLoading(true);
    setError(null);
    
    // Create preview for CSV/JSON
    if (file.type === 'text/csv') {
      const text = await file.text();
      setPreview({
        type: 'csv',
        content: text.split('\n').slice(0, 5).join('\n')
      });
    } else if (file.type === 'application/json') {
      const text = await file.text();
      setPreview({
        type: 'json',
        content: JSON.stringify(JSON.parse(text).slice(0, 5), null, 2)
      });
    }

    // Mock upload for demo
    setTimeout(() => {
      const mockResponse = {
        dataPreview:
        
        
        Array(10).fill().map((_, i) => ({
          id: i + 1,
          category: `Category ${i % 3 + 1}`,
          value: Math.floor(Math.random() * 100) + 1,
          date: `2023-01-${i < 9 ? '0' + (i + 1) : i + 1}`
        })),
        metadata: {
          columns: [
            { name: 'id', type: 'number' },
            { name: 'category', type: 'category' },
            { name: 'value', type: 'number' },
            { name: 'date', type: 'date' }
          ],
          stats: {
            value: {
              min: 1,
              max: 100,
              mean: 50.5,
              median: 50,
              stdDev: 28.87
            }
          },
          correlations: [
            { columns: ['id', 'value'], value: 0.05, strength: 'weak' }
          ],
          suggestedCharts: ['bar', 'line', 'pie']
        },
        chartImage: 'https://via.placeholder.com/800x400/6C5CE7/ffffff?text=Sample+Chart+Visualization'
      };
      onUploadComplete(mockResponse);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <motion.div
      {...getRootProps()}
      className={`upload-container ${isDragActive ? 'dragging' : ''} ${isLoading ? 'loading' : ''}`}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <input {...getInputProps()} />
      
      <motion.div 
        className="upload-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="loading-spinner"
          />
        ) : (
          <>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="upload-icon"
            >
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </motion.div>
            
            <h3>Drag & drop your data file</h3>
            <p>Supports CSV and JSON files</p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="browse-button"
            >
              Browse Files
            </motion.button>
          </>
        )}
      </motion.div>

      {preview && (
        <motion.div 
          className="file-preview"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
        >
          <h4>File Preview:</h4>
          <pre>{preview.content}</pre>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FileUpload;