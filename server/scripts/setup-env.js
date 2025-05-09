const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.join(__dirname, '..', '.env');

// Check if .env already exists
if (fs.existsSync(envPath)) {
  console.log('\x1b[33m%s\x1b[0m', '⚠️  .env file already exists. Delete it first if you want to create a new one.');
  process.exit(0);
}

console.log('\x1b[36m%s\x1b[0m', '🛠️  Setting up your .env file for AI Resume Screener');
console.log('\x1b[36m%s\x1b[0m', '-----------------------------------------------');

let envContent = '';

// Ask for MongoDB URI
rl.question('\n📦 Enter your MongoDB connection string (default: mongodb://localhost:27017/resume-screener): ', (mongoUri) => {
  const finalMongoUri = mongoUri || 'mongodb://localhost:27017/resume-screener';
  envContent += `MONGO_URI=${finalMongoUri}\n`;
  
  // Ask for PORT
  rl.question('\n🌐 Enter the port for your server (default: 5000): ', (port) => {
    const finalPort = port || '5000';
    envContent += `PORT=${finalPort}\n`;
    
    // Write to .env file
    fs.writeFileSync(envPath, envContent);
    
    console.log('\n\x1b[32m%s\x1b[0m', '✅ .env file created successfully!');
    console.log('\x1b[36m%s\x1b[0m', `📁 Location: ${envPath}`);
    console.log('\x1b[36m%s\x1b[0m', '📝 Content:');
    console.log('\x1b[33m%s\x1b[0m', envContent);
    console.log('\n\x1b[32m%s\x1b[0m', '🚀 You can now run the server with: npm run dev or npm start');
    
    rl.close();
  });
});

// Handle closing
rl.on('close', () => {
  process.exit(0);
}); 