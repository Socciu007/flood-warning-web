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

// Get all exam
export const getAllExam = async (accessToken) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/api/exams`, {
    headers: { token: `Bearer ${accessToken}` },
  });
  return res.data;
};

// Get standard data
export const getStandardData = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/api/standard-data`);
  return res.data;
};

// Update standard data
export const updateStandardData = async (data, id) => {
  const res = await axios.patch(`${process.env.REACT_APP_API_KEY}/api/standard-data/update/${id}`, data);
  return res.data;
};
