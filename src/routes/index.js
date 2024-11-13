import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import DetailsRegionPage from "../pages/DetailsRegionPage/DetailsRegionPage";
import ManagerPage from "../pages/ManagerPage/ManagerPage";

// Define routes for the application. Each route should have a path, a page component, and an optional isShowHeader property.
export const route = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/login",
    page: LoginPage,
  },
  {
    path: "/register",
    page: RegisterPage,
  },
  {
    path: "/region",
    page: DetailsRegionPage,
  },
  {
    path: "/manager",
    page: ManagerPage,
    isPrivate: true,
    role: "manager",
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
