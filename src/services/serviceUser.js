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

// Get information user
export const getUserInfo = async (userId, accessToken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/users/${userId}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error getting user info: ", error);
    return false;
  }
};

// Refresh token
export const handleRefreshToken = async () => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/users/refresh-token`, {}, 
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error refreshing token: ", error);
    return false;
  }
};
