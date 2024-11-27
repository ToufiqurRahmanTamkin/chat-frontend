import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getChatHistory = async (roomId: string) => {
  const response = await axios.get(`${API_URL}/chat/history/${roomId}`);
  return response.data;
};
