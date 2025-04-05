const csv = require('csv-parser');
const { Readable } = require('stream');

// Detect column type (number, date, or category)
const detectType = (value) => {
  if (!isNaN(parseFloat(value))) return 'number';
  if (!isNaN(Date.parse(value))) return 'date';
  return 'category';
};

// Calculate basic stats for numeric columns
const calculateStats = (data, key) => {
  const nums = data.map(row => parseFloat(row[key])).filter(n => !isNaN(n));
  return {
    min: Math.min(...nums),
    max: Math.max(...nums),
    mean: nums.reduce((a, b) => a + b, 0) / nums.length,
  };
};

// Parse CSV/JSON
exports.analyzeData = async (fileBuffer, fileType) => {
  const data = fileType.includes('csv') 
    ? await parseCSV(fileBuffer) 
    : JSON.parse(fileBuffer.toString());

  const columns = Object.keys(data[0]).map(key => ({
    name: key,
    type: detectType(data[0][key]),
    stats: detectType(data[0][key]) === 'number' ? calculateStats(data, key) : null,
  }));

  return { data, columns };
};

// CSV parsing (streaming for large files)
const parseCSV = (buffer) => {
  return new Promise((resolve) => {
    const results = [];
    Readable.from(buffer.toString())
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', () => resolve(results));
  });
};