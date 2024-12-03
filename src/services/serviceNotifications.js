import axios from "axios";

// Get all alerts
export const getAlerts = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/api/notifications/get-alerts/${id}`);
  return res.data;
};

// Update status of alert
export const updateAlertStatus = async (id) => {
  const res = await axios.patch(`${process.env.REACT_APP_API_KEY}/api/notifications/${id}`);
  return res.data;
};

// Update status of many alerts
export const updateManyAlerts = async (id) => {
  const res = await axios.post(`${process.env.REACT_APP_API_KEY}/api/notifications/update-many-alerts/${id}`);
  return res.data;
};