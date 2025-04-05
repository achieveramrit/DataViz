// Recommends chart types based on data
exports.recommendCharts = (columns) => {
    const numericCols = columns.filter(c => c.type === 'number').length;
    const categoricalCols = columns.filter(c => c.type === 'category').length;
    const dateCols = columns.filter(c => c.type === 'date').length;
  
    const recommendations = new Set();
  
    // Rule-based recommendations
    if (dateCols >= 1 && numericCols >= 1) recommendations.add('line');
    if (categoricalCols >= 1 && numericCols >= 1) recommendations.add('bar');
    if (numericCols >= 2) recommendations.add('scatter');
    if (categoricalCols === 1 && numericCols === 1) recommendations.add('pie');
  
    // Default fallbacks
    if (recommendations.size === 0) {
      recommendations.add('bar');
      recommendations.add('line');
    }
  
    return Array.from(recommendations);
  };