import axios from "axios";

const API_URL = "http://localhost:8093/api/organizations";

export const getOrganizations = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getOrganizationById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createOrganization = async (organization) => {
  const response = await axios.post(API_URL, organization);
  return response.data;
};

export const updateOrganization = async (id, organization) => {
  const response = await axios.put(`${API_URL}/${id}`, organization);
  return response.data;
};

export const deleteOrganization = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getOrganizationTree = async (rootId) => {
  const response = await axios.get(`${API_URL}/tree/${rootId}`);
  return response.data;
};