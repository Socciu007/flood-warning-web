import axios from "axios";

// Get all regions
export const getAllRegion = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/api/regions/get-regions`);
  return res.data;
};

// Get region by id
export const getRegionById = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/api/regions/${id}`);
  return res.data;
};

// Create area
export const createArea = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_KEY}/api/regions/create-region`, data);
  return res.data;
};
