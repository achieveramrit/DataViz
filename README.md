# DataViz Pro 📊  
**Automated Data Visualization Tool**  

## ✨ Features
- **Easy File Upload**  
  📂 Drag & drop CSV/JSON files with client-side parsing
- **Smart Visualization**  
  📊 Auto-detects best chart types (Bar/Line/Pie/Scatter)
- **Real-Time Filtering**  
  🔍 Apply dynamic filters to refine datasets
- **Responsive Design**  
  📱 Works on desktop & mobile devices

## 🛠 Tech Stack
| Component       | Technology                |
|-----------------|---------------------------|
| **Frontend**    | React, Chart.js, Material-UI |
| **Backend**     | Node.js, Express.js       |
| **Data Parsing**| Papa Parse (CSV), JSON.parse |
| **Deployment**  | Vercel (Frontend), Render (Backend) |

## 🚀 Quick Start  
1. Clone repo:  
   ```bash
   git clone https://github.com/achieveramrit/DataViz.git

🔧 How It Works

File Processing

Client-side parsing using Papa Parse (CSV) and JSON.parse

Extracts column types and sample data

Chart Selection

Rule-based chart recommendation:

1-2 numeric columns → Bar/Line chart

2+ numeric columns → Scatter plot

Categorical data → Pie chart

Filtering

Client-side filtering with JavaScript array methods

