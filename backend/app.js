const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const analysisRoutes = require('./controllers/analysisController');

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Better request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// File upload setup with better configuration
const storage = multer.memoryStorage({
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.mimetype === 'application/json') {
      cb(null, true);
    } else {
      cb(new Error('Only CSV and JSON files are allowed!'), false);
    }
  }
});

const upload = multer({ storage });

// API Documentation Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'api-docs.html'));
});

// API Routes
app.post('/api/analyze', upload.single('file'), analysisRoutes.analyzeData);
app.post('/api/filter', analysisRoutes.filterData);
app.post('/api/generate-chart', analysisRoutes.generateChart); // New endpoint for dynamic chart generation

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: err.message || 'Something broke!',
    suggestion: 'Please check your file format and try again'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    availableEndpoints: [
      'POST /api/analyze',
      'POST /api/filter',
      'POST /api/generate-chart'
    ]
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📄 API Docs at http://localhost:${PORT}/api-docs`);
});