import axios from "axios";

// Test area farm
export const testAreaFarm = async (data, accessToken) => {
  const res = await axios.post(`${process.env.REACT_APP_API_KEY}/api/exams/check-quality-area`, data, {
    headers: {
      token: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};