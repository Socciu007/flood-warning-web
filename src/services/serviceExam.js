import axios from "axios";

// Test area farm
export const testAreaFarm = async (data, accessToken) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/api/exams/check-quality-area`, data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    return false;
  }
};

// Get exam of farm area
export const getExamOfFarmArea = async (farmAreaId, accessToken) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/api/exams/get-exam/${farmAreaId}`, {
    headers: { token: `Bearer ${accessToken}` },
  });
  return res.data;
};

// Get exam of user
export const getExamOfUser = async (userId, accessToken) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/api/exams/get-exam-by-user/${userId}`, {
    headers: { token: `Bearer ${accessToken}` },
  });
  return res.data;
};

