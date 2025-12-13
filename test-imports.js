// Test if imports work
try {
  const { cartAPI } = require('./src/services/api');
  console.log('✅ cartAPI import successful');
} catch (error) {
  console.error('❌ cartAPI import failed:', error.message);
}

try {
  const { menuAPI } = require('./src/services/api');
  console.log('✅ menuAPI import successful');
} catch (error) {
  console.error('❌ menuAPI import failed:', error.message);
}