const fs = require("fs");
const path = require("path");

console.log("🔧 Setting up Decentralized File Sharing App...\n");

// Check if required directories exist
const directories = ["public", "contracts", "scripts"];
directories.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Move frontend to public directory if needed
if (fs.existsSync("index.html") && !fs.existsSync("public/index.html")) {
  fs.renameSync("index.html", "public/index.html");
  console.log("✅ Moved index.html to public directory");
}

// Move contract to contracts directory if needed
if (
  fs.existsSync("FileStorage.sol") &&
  !fs.existsSync("contracts/FileStorage.sol")
) {
  fs.renameSync("FileStorage.sol", "contracts/FileStorage.sol");
  console.log("✅ Moved FileStorage.sol to contracts directory");
}

// Create .gitignore if it doesn't exist
const gitignoreContent = `node_modules/
.env
contract-config.json
cache/
artifacts/
coverage/
coverage.json
typechain/
dist/
build/
*.log
.DS_Store
`;

if (!fs.existsSync(".gitignore")) {
  fs.writeFileSync(".gitignore", gitignoreContent);
  console.log("✅ Created .gitignore file");
}

// Create README.md with instructions
const readmeContent = `# Decentralized File Sharing App

A secure decentralized file sharing application built with IPFS, Ethereum blockchain, and Node.js.

## Features

- 🔐 Client-side AES encryption
- 🌐 Decentralized storage using IPFS
- 📝 Blockchain metadata storage on Ethereum
- 🚀 Easy-to-use web interface
- 🔒 Password-based file encryption

## Prerequisites

1. **Node.js** (v16 or higher)
2. **IPFS** Desktop or daemon
3. **Ganache** or local Ethereum blockchain

## Quick Start

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Start IPFS
\`\`\`bash
# If using IPFS Desktop, just open the application
# If using IPFS CLI:
ipfs daemon
\`\`\`

### 3. Start Ganache
- Open Ganache and create a new workspace
- Set RPC server to HTTP://127.0.0.1:8545

### 4. Deploy Smart Contract
\`\`\`bash
npm run deploy
\`\`\`

### 5. Start the Application
\`\`\`bash
npm start
\`\`\`

Visit http://localhost:3000 and start sharing files!

## How It Works

1. **Upload**: Files are encrypted client-side, uploaded to IPFS, and metadata stored on blockchain
2. **Storage**: Encrypted files live on IPFS, metadata on Ethereum
3. **Download**: Files are retrieved from IPFS and decrypted with user password
4. **Security**: Only users with the correct password can decrypt files

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Storage**: IPFS
- **Blockchain**: Ethereum, Solidity
- **Encryption**: AES-256-GCM

## Troubleshooting

- Ensure IPFS daemon is running on port 5001
- Ensure Ganache is running on port 8545
- Check contract deployment succeeded
- Verify all dependencies are installed

## License

MIT License
`;

if (!fs.existsSync("README.md")) {
  fs.writeFileSync("README.md", readmeContent);
  console.log("✅ Created README.md with instructions");
}

console.log("\n🎉 Setup complete! Next steps:");
console.log("1. Run 'npm install' to install dependencies");
console.log("2. Start IPFS daemon");
console.log("3. Start Ganache blockchain");
console.log("4. Run 'npm run deploy' to deploy smart contract");
console.log("5. Run 'npm start' to start the application");
console.log("\nFor detailed instructions, see README.md");
