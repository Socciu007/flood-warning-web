import axios from "axios";

const api = axios.create();

// Register user
export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/api/users/create-user`, userData);
    return res.data;
  } catch (error) {
    console.log("Error registering user: ", error);
    return false;
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const res = await api.post(`${process.env.REACT_APP_API_KEY}/api/users/login`, userData);
    return res.data;
  } catch (error) {
    console.log("Error logging in: ", error);
    return false;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const res = await api.post(`${process.env.REACT_APP_API_KEY}/api/users/logout`);
    return res.data;
  } catch (error) {
    console.log("Error logging out: ", error);
    return false;
  }
};

// Get information user
export const getUserInfo = async (userId, accessToken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/api/users/${userId}`, {
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
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/api/users/refresh-token`, {},
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

// Favorited area
export const favoritedArea = async (data, accessToken) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/api/users/favorited-area`, data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error getting favorited area: ", error);
    return false;
  }
};

// Get favorited area by userID and areaID
export const getFavoritedArea = async (data, accessToken) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/api/users/get-favorited-area`, data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

// Get list user preferred
export const getListUserPreferred = async (body,accessToken) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/api/users/get-list-favorited-area`, body, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error getting list user preferred: ", error);
    return false;
  }
};
