import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const uploadFile = async (roomId: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("roomId", roomId);

  const response = await axios.post(`${API_URL}/file/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
