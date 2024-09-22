// src/utils/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch a single company by its ID
export const fetchCompanyById = async (companyId) => {
  try {
    const response = await axios.get(`${API_URL}/api/registeredCompanies/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch company:', error);
    throw error;
  }
};

// Fetch all companies
export const fetchAllCompanies = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/registeredCompanies`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch companies:', error);
    throw error;
  }
};

// Fetch modules of a specific company
export const fetchCompanyModules = async (companyId) => {
  try {
    const response = await axios.get(`${API_URL}/api/modules`);
    const companyResponse = await axios.get(`${API_URL}/api/registeredCompanies/${companyId}`);
    const moduleIds = companyResponse.data.modules;
    return response.data.filter(module => moduleIds.includes(module._id));
  } catch (error) {
    console.error('Failed to fetch modules:', error);
    throw error;
  }
};

// Fetch all modules
export const fetchAllModules = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/modules`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch all modules:', error);
    throw error;
  }
};

// Fetch company events
export const fetchCompanyEvents = async (companyId) => {
  try {
    const response = await axios.get(`${API_URL}/api/events/${companyId}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Add a company event
export const addCompanyEvent = async (companyId, eventDetails) => {
  try {
    const price = parseFloat(eventDetails.price);
    const endDate = eventDetails.isEndDateRequired ? eventDetails.endDate : null;
    const eventToAdd = { ...eventDetails, price, endDate };
    await axios.post(`${API_URL}/api/events/${companyId}/events`, eventToAdd);
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

// Fetch users by company
export const getUsersByCompany = async (companyId) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${companyId}/users`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

// Add user to a company
export const addUserToCompany = async (companyId, userDetails) => {
  try {
    await axios.post(`${API_URL}/api/users/${companyId}/users`, userDetails);
  } catch (error) {
    throw new Error('Failed to add user');
  }
};

// Fetch products for a company
export const fetchProducts = async (companyId) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/${companyId}/products`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Failed to fetch products');
  }
};

// Add a product to a company
export const addProduct = async (companyId, productDetails) => {
  try {
    await axios.post(`${API_URL}/api/products/${companyId}/products`, productDetails);
  } catch (error) {
    console.error('Failed to add product:', error);
    throw new Error('Failed to add product');
  }
};

// Create a new company
export const createCompany = async (companyData) => {
  try {
    const response = await axios.post(`${API_URL}/api/registeredCompanies`, companyData);
    return response.data;
  } catch (error) {
    console.error('Failed to create company:', error);
    throw error;
  }
};
