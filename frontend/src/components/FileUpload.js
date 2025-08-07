import React, { useState, useEffect } from "react";
import { uploadFile, fetchFiles } from "../services/api";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    try {
      const res = await uploadFile(file);
      setMessage(res.data.message);
      loadFiles();
    } catch (error) {
      setMessage("Error uploading file.");
    }
  };

  const loadFiles = async () => {
    const res = await fetchFiles();
    setFiles(res.data);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>

      <h3>Stored Files</h3>
      <ul>
        {files.map((f, idx) => (
          <li key={idx}>
            {f.name} - <code>{f.hash}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}
