import axios from "axios";

const axiosJWT = axios.create();

export const createCode = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/store/create-code`,
    data
  );
  return res.data;
};
export const createStore = async (data, access_token) => {
  console.log(data, access_token);
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_KEY}/store/create-store`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
