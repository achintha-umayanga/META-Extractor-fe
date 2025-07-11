import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/media";

export const uploadImage = async(file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const getSupportedFormats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/supported-formats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching supported formats:', error);
    throw error;
  }
};