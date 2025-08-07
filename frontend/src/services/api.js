import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token if available
API.interceptors.request.use(
  (config) => {
    // You can add authentication headers here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here (e.g., 401 Unauthorized)
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access - please login");
    }
    return Promise.reject(error);
  }
);

export const uploadFile = async (formData) => {
  try {
    const response = await API.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const fetchFiles = async () => {
  try {
    console.log('Fetching files from /api/files...');
    const response = await API.get("/files");
    console.log('Files API response:', response);
    
    // Ensure the response has the expected structure
    if (!response || !response.data) {
      throw new Error('Invalid response from server');
    }
    
    return response;
  } catch (error) {
    console.error("Error in fetchFiles:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    
    // Create a more descriptive error
    const apiError = new Error(error.response?.data?.error || 'Failed to fetch files');
    apiError.status = error.response?.status;
    apiError.data = error.response?.data;
    throw apiError;
  }
};

export const downloadFile = async (fileId) => {
  try {
    const response = await API.get(`/file/${fileId}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};
