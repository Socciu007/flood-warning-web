import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { route } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  return (
    <div style={{ height: "100vh" }}>
      <Router>
        <Routes>
          {route.map((route) => {
            const Page = route.page;
            const isCheckAuth = !route.isPrivate ||
              (isAuthenticated && currentUser?.role === route.role);
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  isCheckAuth ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;