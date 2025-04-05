const { analyzeData } = require('../services/analysisService');
const { generateChart } = require('../services/chartService');

// In-memory storage (no DB)
const sessions = {};

exports.analyzeData = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const { data, columns } = await analyzeData(file.buffer, file.mimetype);
    const sessionId = Date.now().toString();

    // Generate a chart (example: bar chart)
    const numericCol = columns.find(col => col.type === 'number')?.name;
    const categoryCol = columns.find(col => col.type === 'category')?.name;
    const chartImage = await generateChart(
      data.map(row => row[categoryCol || columns[0].name]),
      numericCol || columns[1].name,
      data.map(row => row[numericCol || columns[1].name])
    );

    // Store in memory
    sessions[sessionId] = { data, columns };

    res.json({
      sessionId,
      dataPreview: data.slice(0, 50), // First 50 rows
      columns,
      chartImage: chartImage.toString('base64'),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.filterData = (req, res) => {
  const { sessionId, filters } = req.body;
  const session = sessions[sessionId];
  if (!session) return res.status(404).json({ error: 'Session expired' });

  // Apply filters
  const filteredData = session.data.filter(row => {
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

  res.json({ filteredData });
};