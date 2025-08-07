import React, { useEffect } from "react";

const FileList = ({ files }) => {
  // Debug: Log the files prop when it changes
  useEffect(() => {
    console.log('FileList received files:', files);
  }, [files]);

  if (!files) {
    return <p>Loading files...</p>;
  }

  if (!Array.isArray(files)) {
    console.error('Files prop is not an array:', files);
    return <p className="error">Error: Invalid file data format</p>;
  }

  if (files.length === 0) {
    return <p>No files uploaded yet.</p>;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Stored Files</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {files.map((file, idx) => {
          // Safely get file ID and name with fallbacks
          const fileId = file?.id || file?.fileName || '';
          const fileName = file?.fileName || file?.name || 'Unnamed file';
          
          // Skip rendering if we don't have a valid file ID
          if (!fileId) {
            console.warn('Skipping invalid file entry:', file);
            return null;
          }

          return (
            <li 
              key={`${fileId}-${idx}`}
              style={{
                padding: '10px',
                margin: '5px 0',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{fileName}</span>
              <a
                href={`http://localhost:3000/api/file/${fileId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '0.9em',
                  transition: 'background-color 0.3s',
                  whiteSpace: 'nowrap',
                  marginLeft: '10px'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
              >
                Download
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FileList;
