import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { route } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { useSelector, useDispatch } from "react-redux";
import storageService from "./services/storage.service";
import { setUser } from "./redux/slices/userSlice.ts";
import { getUserInfo, handleRefreshToken } from "./services/serviceUser.js";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoading(true);
    const { accessToken, decodedUser } = handleDecodedUser();
    // console.log("decodedUser", decodedUser);
    if (decodedUser?.id) {
      fetchUserInfo(decodedUser?.id, accessToken);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const currentTime = new Date();
          const accessToken = storageService.get("accessToken");
          const refreshToken = storageService.get("refreshToken");

          if (accessToken) {
            const decodedToken = jwtDecode(accessToken);

            if (decodedToken.exp < currentTime.getTime() / 1000) {
              if (refreshToken) {
                const decodedRefreshToken = jwtDecode(refreshToken);

                if (decodedRefreshToken.exp > currentTime.getTime() / 1000) {
                  const response = await handleRefreshToken(refreshToken);
                  if (response?.accessToken) {
                    storageService.set("accessToken", response.accessToken);
                    config.headers["token"] = `Bearer ${response.accessToken}`;
                  }
                } else {
                  handleLogout();
                }
              }
            }
            config.headers["token"] = `Bearer ${accessToken}`;
          }
          return config;
        } catch (error) {
          console.error("Interceptor error:", error);
          return Promise.reject(error);
        }
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.message === 'Network Error') {
          console.log("error", error);
        }
        return Promise.reject(error);
      }
    );

  }, []);

  // Handle decoded user from token
  const handleDecodedUser = () => {
    let accessToken = currentUser?.accessToken || storageService.get("accessToken");
    let decodedUser = {};
    if (accessToken || currentUser?.accessToken) {
      decodedUser = jwtDecode(accessToken);
    }
    return { decodedUser, accessToken };
  };

  // Fetch user info
  const fetchUserInfo = async (userId, accessToken) => {
    const res = await getUserInfo(userId, accessToken);
    const refreshToken = storageService.get("refreshToken");
    if (res.data) {
      dispatch(
        setUser({
          ...res.data,
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
      );
    }
  };
  // console.log("isAuthenticated", isAuthenticated);
  // console.log("currentUser", currentUser);
  return (
    <div style={{ height: "100vh" }}>
      <LoadingComponent isLoading={isLoading} >
        <Router>
          <Routes>
            {route.map((route) => {
              const Page = route.page;
              // const isCheckAuth = !route.isPrivate ||
              //   (isAuthenticated && currentUser?.role === route.role);
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </LoadingComponent>
    </div>
  );
}

export default App;