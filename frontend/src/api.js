import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // Change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Example helper functions
export const getTransactions = () => api.get("/transactions");
export const addTransaction = (data) => api.post("/transactions", data);
export const getGoals = () => api.get("/goals");
