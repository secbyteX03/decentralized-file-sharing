const express = require("express");
const router = express.Router();
const multer = require("multer");
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
const config = require("../../contract-config.json");

// Load contract
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const wallet = new ethers.Wallet(config.privateKey, provider);
const contract = new ethers.Contract(config.address, config.abi, wallet);

// Set up file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const fileName = file.originalname;
    const filePath = path.join(__dirname, "..", "uploads", file.filename);

    const fileBuffer = fs.readFileSync(filePath);
    const fileHash = ethers.keccak256(fileBuffer);

    const tx = await contract.addFile(fileName, fileHash);
    await tx.wait();

    res.status(200).json({
      message: "File uploaded and stored on blockchain!",
      fileName,
      fileHash,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

router.get("/files", async (req, res) => {
  try {
    const count = await contract.getFileCount();
    const files = [];

    for (let i = 0; i < count; i++) {
      const file = await contract.files(i);
      files.push({ name: file.name, hash: file.hash });
    }

    res.status(200).json(files);
  } catch (err) {
    console.error("Fetching files failed:", err);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

module.exports = router;
