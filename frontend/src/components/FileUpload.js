import React, { useState, useEffect } from "react";
import { uploadFile, fetchFiles } from "../services/api";
import FileList from "./FileList";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setMessage({ text: "Please select a file first", type: "error" });
      return;
    }

    setIsUploading(true);
    setMessage({ text: "Uploading file...", type: "info" });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadFile(formData);
      setMessage({ 
        text: `File "${file.name}" uploaded successfully!`, 
        type: "success" 
      });
      setFile(null);
      document.getElementById("file-upload").value = ""; // Reset file input
      loadFiles();
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({ 
        text: error.response?.data?.error || "Error uploading file. Please try again.", 
        type: "error" 
      });
    } finally {
      setIsUploading(false);
    }
  };

  const loadFiles = async () => {
    try {
      const res = await fetchFiles();
      // The backend returns { success: true, files: [...] }
      if (res.data && res.data.success && Array.isArray(res.data.files)) {
        setFiles(res.data.files);
      } else {
        console.error("Unexpected response format:", res.data);
        setMessage({
          text: "Unexpected response format from server",
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error loading files:", error);
      setMessage({ 
        text: error.response?.data?.error || "Error loading file list. Please refresh the page.",
        type: "error"
      });
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const messageStyle = {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    backgroundColor: message.type === 'error' ? '#ffebee' : 
                    message.type === 'success' ? '#e8f5e9' : '#e3f2fd',
    color: message.type === 'error' ? '#c62828' : 
           message.type === 'success' ? '#2e7d32' : '#1565c0',
    border: `1px solid ${message.type === 'error' ? '#ef9a9a' : 
                                     message.type === 'success' ? '#a5d6a7' : '#90caf9'}`
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h2 style={{ marginTop: 0, color: '#333' }}>Upload File</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <input 
            id="file-upload"
            type="file" 
            onChange={(e) => setFile(e.target.files[0] || null)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <button 
            onClick={handleUpload}
            disabled={!file || isUploading}
            style={{
              backgroundColor: file && !isUploading ? '#4CAF50' : '#cccccc',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: file && !isUploading ? 'pointer' : 'not-allowed',
              fontSize: '16px',
              transition: 'background-color 0.3s',
              width: '100%'
            }}
            onMouseOver={(e) => {
              if (file && !isUploading) {
                e.target.style.backgroundColor = '#45a049';
              }
            }}
            onMouseOut={(e) => {
              if (file && !isUploading) {
                e.target.style.backgroundColor = '#4CAF50';
              }
            }}
          >
            {isUploading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>

        {message.text && (
          <div style={messageStyle}>
            {message.text}
          </div>
        )}
      </div>

      <FileList files={files} />
    </div>
  );
};

export default FileUpload;
