const express = require('express');
const multer = require('multer');
const cors = require('cors');
const analysisRoutes = require('./controllers/analysisController');

const app = express();
app.use(cors());
app.use(express.json());

// File upload setup
const upload = multer({ storage: multer.memoryStorage() });

// Routes
app.get('/', (req, res) => res.send('DataViz Pro Backend Running! 🚀'));  // <- Added
app.post('/api/analyze', upload.single('file'), analysisRoutes.analyzeData);
app.post('/api/filter', analysisRoutes.filterData);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));