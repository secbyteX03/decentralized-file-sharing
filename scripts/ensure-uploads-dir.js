const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '..', 'backend', 'uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOADS_DIR)) {
  try {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    console.log(`✅ Created uploads directory at: ${UPLOADS_DIR}`);
  } catch (err) {
    console.error(`❌ Failed to create uploads directory: ${err.message}`);
    process.exit(1);
  }
} else {
  console.log(`ℹ️ Uploads directory already exists at: ${UPLOADS_DIR}`);
}

// Verify write permissions
try {
  const testFile = path.join(UPLOADS_DIR, '.permission-test');
  fs.writeFileSync(testFile, 'test');
  fs.unlinkSync(testFile);
  console.log('✅ Verified write permissions in uploads directory');
} catch (err) {
  console.error(`❌ No write permissions in uploads directory: ${err.message}`);
  console.error('Please ensure the application has write permissions to the uploads directory.');
  process.exit(1);
}

console.log('✅ Uploads directory is ready for use');
