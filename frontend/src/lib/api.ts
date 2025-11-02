import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Helper to extract `.data` safely
const unwrap = (response: any) => {
  if (response?.data?.data) return response.data.data; // backend sends { success, data }
  return response.data;
};

// 📤 Send feedback request
export const sendFeedbackRequest = async (userEmail: string, hrEmail: string) => {
  const response = await api.post("/feedback/send-request", { userEmail, hrEmail });
  return unwrap(response);
};

// 🔍 Get feedback by token
export const getFeedbackByToken = async (token: string) => {
  const response = await api.get(`/feedback/${token}`);
  return unwrap(response);
};

// 📝 Submit feedback
export const submitFeedback = async (
  token: string,
  rating: number,
  message: string
) => {
  const response = await api.post(`/feedback/${token}/submit`, { rating, message });
  return unwrap(response);
};

// 📋 Get all feedback
export const getAllFeedback = async (status?: string, page: number = 1) => {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  params.append("page", page.toString());

  const response = await api.get(`/feedback?${params.toString()}`);
  return unwrap(response);
};

/// Get statistics
export const getStatistics = async () => {
  const response = await api.get('/feedback/stats/summary');
  return response.data;
};


export default api;
