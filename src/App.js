import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { route } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";

function App() {
  return (
    <div style={{ height: "100vh" }}>
        <Router>
          <Routes>
            {route.map((route) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                isCheckAuth && (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                )
              );
            })}
          </Routes>
        </Router>
    </div>
  );
}

export default App;