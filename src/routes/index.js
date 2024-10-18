import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";


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
    path: "*",
    page: NotFoundPage,
  },
];
