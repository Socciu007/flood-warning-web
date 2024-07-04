import axios from "axios";

export const createCode = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/store/create-code`,
    data
  );
  return res.data;
};
export const createStore = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/store/create-store`,
    data
  );
  return res.data;
};
