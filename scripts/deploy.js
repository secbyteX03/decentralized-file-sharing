const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Deploying FileStorage contract...");

  // Get the contract factory
  const FileStorage = await ethers.getContractFactory("FileStorage");

  // Deploy the contract
  const fileStorage = await FileStorage.deploy();
  await fileStorage.waitForDeployment();

  const contractAddress = await fileStorage.getAddress();
  console.log(`📄 FileStorage deployed to: ${contractAddress}`);

  // Get the contract ABI
  const artifact = JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        "../artifacts/contracts/FileStorage.sol/FileStorage.json"
      ),
      "utf8"
    )
  );

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log(`🔑 Deployed with account: ${deployer.address}`);

  // Create configuration file for the backend
  const config = {
    address: contractAddress,
    abi: artifact.abi,
    privateKey:
      "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d", // Default Ganache key
    network: "ganache",
  };

  // Save configuration to file
  const configPath = path.join(__dirname, "../contract-config.json");
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  console.log("✅ Contract configuration saved to contract-config.json");
  console.log("\n📋 Deployment Summary:");
  console.log(`   Contract Address: ${contractAddress}`);
  console.log(`   Deployer: ${deployer.address}`);
  console.log(`   Network: Ganache (localhost:8545)`);
  console.log("\n🎉 Ready to start the application!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
