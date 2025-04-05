import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onUploadComplete }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => onUploadComplete({
        dataPreview: Array(10).fill().map((_, i) => ({
          id: i + 1,
          category: `Category ${i % 3 + 1}`,
          value: Math.floor(Math.random() * 100) + 1,
        })),
        columns: [
          { name: 'id', type: 'number' },
          { name: 'category', type: 'category' },
          { name: 'value', type: 'number' },
        ],
        chartImage: 'mock-base64-image',
      });
      reader.readAsText(file);
    },
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>Drag & drop a CSV/JSON file here, or click to select</p>
    </div>
  );
};

export default FileUpload;