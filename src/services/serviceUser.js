import axios from "axios";

// Register user
export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/users/create-user`, userData);
    return res.data;
  } catch (error) {
    console.log("Error registering user: ", error);
    return false;
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/users/login`, userData);
    return res.data;
  } catch (error) {
    console.log("Error logging in: ", error);
    return false;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/users/logout`);
    return res.data;
  } catch (error) {
    console.log("Error logging out: ", error);
    return false;
  }
};
