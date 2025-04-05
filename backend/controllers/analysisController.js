const { analyzeData, filterData, generateChart } = require('../services/analysisService');

exports.analyzeData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No file uploaded',
        suggestion: 'Please upload a CSV or JSON file'
      });
    }

    const analysis = await analyzeData(req.file.buffer, req.file.mimetype);
    
    res.json({
      success: true,
      dataPreview: analysis.rawData.slice(0, 10),
      metadata: analysis.metadata,
      chartImage: analysis.chartImage
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message,
      suggestion: 'Please check your file format and try again'
    });
  }
};

exports.filterData = async (req, res) => {
  try {
    const { datasetId, filters } = req.body;
    
    if (!datasetId || !filters) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields'
      });
    }

    const filteredData = await filterData(datasetId, filters);
    res.json({ success: true, filteredData });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

exports.generateChart = async (req, res) => {
  try {
    const { datasetId, chartType, customization } = req.body;
    
    const chartImage = await generateChart(datasetId, chartType, customization);
    res.json({ success: true, chartImage });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message,
      suggestion: 'Please check your chart configuration'
    });
  }
};