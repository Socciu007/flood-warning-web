import axios from "axios";

// Get all areas
export const getAllArea = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/api/farm-areas/${id}`);
  return res.data;
};
