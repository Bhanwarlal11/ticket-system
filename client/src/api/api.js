import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Adjust to your backend route

const api = axios.create({
  baseURL: API_URL || process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Allows cookies =>
  credentials: "include",
});

// API functions
export const registerUser = (name, email, password) =>
  api.post("/auth/register", { name, email, password });

export const loginUser = (email, password) =>
  api.post("/auth/login", { email, password });

export const signWithGoogle = (idToken) =>
  api.post("/auth/login/google", { idToken });

export const logoutUser = () => api.post("/auth/logout");

export const getUserProfile = () => api.get("/auth/profile");

// category
export const createCategory = (name) =>
  api.post("/categories/create", { name });

export const getCategories = () => api.get("/categories");

// subcategory
export const createSubCategory = (name, categoryId, riskLevel) =>
  api.post("/categories/subcategory/create", { name, categoryId, riskLevel });

export const getSubCategoriesByCategory = (categoryId) =>
  api.get(`/categories/${categoryId}/subcategories`);

// tickets
export const createTicket = (query, category, subCategory) =>
  api.post("/tickets/create", {
    query,
    category,
    subCategory,
  });

export const getUserTickets = () => api.get("/tickets");

export const getAllTickets = () => api.get("/tickets/all");

export const getTicketById = (ticketId) => api.get(`/tickets/${ticketId}`);

export const updateTicketStatus = (ticketId, status) =>
  api.put(`/tickets/${ticketId}/status`, { status });

export const escalateTicket = (ticketId) =>
  api.put(`/tickets/${ticketId}/escalate`);

export const closeTicket = (ticketId) => api.put(`/tickets/${ticketId}/close`);

// solution
export const createSolution = (subCategoryId, solutionText) =>
  api.post("/solutions/create", { subCategoryId, solutionText });

export const getSolutionsBySubCategory = (subCategoryId) =>
  api.get(`/solutions/subcategory/${subCategoryId}`);

export const getSolutionById = (solutionId) =>
  api.get(`/solutions/${solutionId}`);

export const updateSolution = (solutionId, solutionText) =>
  api.put(`/solutions/${solutionId}`, { solutionText });

export const deleteSolution = (solutionId) =>
  api.delete(`/solutions/${solutionId}`);

// New API functions for adding queries and solutions to tickets

// Function to add a query to a ticket
export const sendQueryToTicket = (ticketId, query) =>
  api.post(`/tickets/${ticketId}/query`, { query });

// Function to add a solution to a ticket
export const sendSolutionToTicket = (ticketId, solutionText) =>
  api.post(`/tickets/${ticketId}/solution`, { solutionText });

export default api;
