import axios from "axios";

// Get areas of manager
export const getAllArea = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/api/farm-areas/${id}`);
  return res.data;
};

// Get all areas
export const getAllFarmAreas = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/api/farm-areas`);
  return res.data;
};

// Update farm area
export const updateFarmArea = async (id, data) => {
  const res = await axios.patch(`${process.env.REACT_APP_API_KEY}/api/farm-areas/${id}`, data);
  return res.data;
};

// Delete farm area
export const deleteFarmArea = async (id) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_KEY}/api/farm-areas/${id}`);
  return res.data;
};

// Create farm area 
export const createFarmArea = async (regionId, data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_KEY}/api/farm-areas/create-area/${regionId}`, data);
  return res.data;
};

// Create farm area
export const createFarmAreaByAdmin = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_KEY}/api/farm-areas/add-area-by-admin`, data);
  return res.data;
};