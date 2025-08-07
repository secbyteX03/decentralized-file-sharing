# Decentralized File Sharing App

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
```bash
npm install
```

### 2. Start IPFS
```bash
# If using IPFS Desktop, just open the application
# If using IPFS CLI:
ipfs daemon
```

### 3. Start Ganache
- Open Ganache and create a new workspace
- Set RPC server to HTTP://127.0.0.1:8545

### 4. Deploy Smart Contract
```bash
npm run deploy
```

### 5. Start the Application
```bash
npm start
```

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

---

## 📚 More Documentation

- 📥 [Complete Installation & Troubleshooting Guide](docs/INSTALLATION.md)
