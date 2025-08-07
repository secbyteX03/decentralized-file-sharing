# 🚀 Complete Installation Guide

## System Requirements

- **Node.js** v16 or higher
- **npm** or **yarn** package manager
- **IPFS** (Desktop app or CLI)
- **Ganache** (for local blockchain)

## Step-by-Step Installation

### 1. Install Prerequisites

#### Install Node.js
```bash
# Download from https://nodejs.org/
# Or use package manager:

# macOS (using Homebrew)
brew install node

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows
# Download installer from nodejs.org
```

#### Install IPFS
```bash
# Option 1: IPFS Desktop (Recommended for beginners)
# Download from: https://docs.ipfs.tech/install/ipfs-desktop/

# Option 2: IPFS CLI
# Download from: https://docs.ipfs.tech/install/command-line/

# Initialize IPFS (CLI only)
ipfs init
```

#### Install Ganache
```bash
# Option 1: Ganache GUI (Recommended)
# Download from: https://trufflesuite.com/ganache/

# Option 2: Ganache CLI
npm install -g ganache-cli
```

### 2. Project Setup

#### Clone or Create Project Directory
```bash
mkdir decentralized-file-sharing
cd decentralized-file-sharing
```

#### Create Project Structure
```
decentralized-file-sharing/
├── contracts/
│   └── FileStorage.sol
├── scripts/
│   ├── deploy.js
│   └── setup.js
├── public/
│   └── index.html
├── server.js
├── package.json
├── hardhat.config.js
└── README.md
```

#### Initialize Project
```bash
# Create package.json and install dependencies
npm init -y
npm install express multer ipfs-http-client ethers cors
npm install --save-dev nodemon @nomicfoundation/hardhat-toolbox hardhat

# Or if you have the package.json file:
npm install
```

#### Run Setup Script
```bash
npm run setup
```

### 3. Start Required Services

#### Start IPFS
```bash
# Option 1: IPFS Desktop
# Just open the IPFS Desktop application

# Option 2: IPFS CLI
ipfs daemon

# You should see output like:
# API server listening on /ip4/127.0.0.1/tcp/5001
```

#### Start Ganache
```bash
# Option 1: Ganache GUI
# 1. Open Ganache
# 2. Click "Quick Start"
# 3. Ensure RPC Server is HTTP://127.0.0.1:8545

# Option 2: Ganache CLI
ganache-cli --host 0.0.0.0 --port 8545 --deterministic
```

### 4. Deploy Smart Contract

```bash
# Compile and deploy the contract
npx hardhat compile
npm run deploy

# You should see output like:
# 🚀 Deploying FileStorage contract...
# 📄 FileStorage deployed to: 0x...
# ✅ Contract configuration saved to contract-config.json
```

### 5. Start the Application

```bash
# Start the backend server
npm start

# Or for development with auto-reload:
npm run dev
```

The application will be available at: http://localhost:3000

## Verification Checklist

Before using the app, verify:

- [ ] IPFS daemon is running (check http://localhost:5001/webui)
- [ ] Ganache blockchain is running on port 8545
- [ ] Smart contract deployed successfully
- [ ] `contract-config.json` file exists
- [ ] Backend server started without errors
- [ ] Frontend loads at http://localhost:3000

## Common Issues & Solutions

### IPFS Issues
```bash
# Error: connect ECONNREFUSED 127.0.0.1:5001
# Solution: Start IPFS daemon
ipfs daemon

# Error: lock file exists
# Solution: Remove lock file
rm ~/.ipfs/repo.lock
ipfs daemon
```

### Blockchain Issues
```bash
# Error: could not detect network
# Solution: Ensure Ganache is running on port 8545

# Error: nonce too low
# Solution: Reset Ganache or use different account
```

### Contract Issues
```bash
# Error: Contract not configured
# Solution: Deploy contract first
npm run deploy

# Error: Contract call failed
# Solution: Check contract address in contract-config.json
```

### File Upload Issues
```bash
# Error: File too large
# Solution: Files must be under 10MB

# Error: Encryption failed
# Solution: Ensure password is provided
```

## Testing the Application

### Upload Test
1. Open http://localhost:3000
2. Enter a password
3. Select a small file (< 10MB)
4. Click "Upload to IPFS & Blockchain"
5. Note the File ID returned

### Download Test
1. Enter the File ID from upload
2. Enter the same password used for encryption
3. Click "Download & Decrypt File"
4. Verify the downloaded file matches original

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (auto-reload)
npm run dev

# Deploy contract
npm run deploy

# Compile contract only
npx hardhat compile

# Run setup script
npm run setup

# Start production server
npm start
```

## Project Structure Explained

```
├── contracts/FileStorage.sol      # Smart contract for metadata storage
├── scripts/deploy.js              # Contract deployment script
├── scripts/setup.js               # Project setup helper
├── public/index.html              # Frontend user interface
├── server.js                      # Backend API server
├── package.json                   # Dependencies and scripts
├── hardhat.config.js              # Blockchain configuration
├── contract-config.json           # Generated after deployment
└── README.md                      # Project documentation
```

## Security Considerations

1. **Private Keys**: Never commit private keys to version control
2. **Passwords**: Use strong passwords for file encryption
3. **IPFS**: Files are public on IPFS but encrypted
4. **Local Network**: This setup is for development only

## Production Deployment Notes

For production deployment:
1. Use a real Ethereum network (mainnet, polygon, etc.)
2. Secure private key management
3. HTTPS for all connections
4. Rate limiting and authentication
5. File size and type restrictions
6. IPFS pinning service

## Getting Help

1. Check the troubleshooting section above
2. Verify all services are running
3. Check browser console for errors
4. Review server logs for backend issues

Happy building! 🎉