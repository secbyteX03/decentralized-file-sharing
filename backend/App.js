const express = require("express");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Allow your HTML (served on 3000) to call your APIs
app.use(cors());

// Parse JSON bodies (if any)
app.use(express.json());

// Serve your GUI
app.use(express.static(path.join(__dirname, "../public")));

// Multer setup: save uploads into backend/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    // you could encrypt/rename here
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// POST /api/upload
app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log('File upload request received');
  
  if (!req.file) {
    console.error('No file received in upload request');
    return res.status(400).json({ 
      success: false, 
      error: "No file received. Please select a file to upload." 
    });
  }

  console.log('File uploaded successfully:', {
    originalName: req.file.originalname,
    savedAs: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype
  });

  try {
    const fileId = path.basename(req.file.filename);
    res.json({ 
      success: true, 
      fileId,
      fileName: req.file.originalname,
      fileSize: req.file.size
    });
  } catch (error) {
    console.error('Error processing file upload:', error);
    res.status(500).json({ 
      success: false, 
      error: "Error processing file upload",
      details: error.message 
    });
  }
});

// GET /api/files
app.get("/api/files", (req, res) => {
  const uploadsDir = path.join(__dirname, "uploads");
  console.log(`Reading files from directory: ${uploadsDir}`);
  
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error reading uploads directory:', err);
      return res.status(500).json({ 
        success: false, 
        error: "Cannot list files",
        details: err.message
      });
    }
    
    console.log(`Found ${files.length} files:`, files);
    
    try {
      const list = files.map((name) => {
        const filePath = path.join(uploadsDir, name);
        const stats = fs.statSync(filePath);
        return { 
          id: name, 
          fileName: name,
          fileSize: stats.size,  // Changed from 'size' to 'fileSize' to match frontend
          timestamp: Math.floor(stats.mtime.getTime() / 1000), // Convert to Unix timestamp
          owner: 'Admin',  // Default owner
          ipfsHash: 'Qm' + name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 44) // Generate a mock IPFS hash
        };
      });
      
      console.log('Sending file list:', JSON.stringify(list, null, 2));
      res.json({ 
        success: true, 
        files: list,
        count: list.length
      });
    } catch (mapError) {
      console.error('Error processing file list:', mapError);
      res.status(500).json({ 
        success: false, 
        error: "Error processing file list",
        details: mapError.message
      });
    }
  });
});

// GET /api/file/:id
app.get("/api/file/:id", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.id);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, error: "File not found" });
  }
  // Send raw file for download
  res.sendFile(filePath);
});

// Catch-all => serve index.html so front-end router works
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
