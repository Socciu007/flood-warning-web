import axios from "axios";

// Get all regions
export const getAllRegion = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/regions/get-regions`);
  return res.data;
};
