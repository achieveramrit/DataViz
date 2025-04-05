const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

// Generate a chart image (PNG)
exports.generateChart = async (labels, datasetLabel, dataPoints) => {
  const width = 800;
  const height = 500;
  const canvas = new ChartJSNodeCanvas({ width, height });

  const config = {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: datasetLabel,
        data: dataPoints,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      }],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `${datasetLabel} Distribution`,
        },
      },
    },
  };

  return canvas.renderToBuffer(config);
};