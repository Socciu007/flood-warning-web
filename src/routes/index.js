import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import DetailsRegionPage from "../pages/DetailsRegionPage/DetailsRegionPage";
import ManagerPage from "../pages/ManagerPage/ManagerPage";
import AlertPage from "../pages/AlertPage/AlertPage";
import DetailsAlertPage from "../pages/DetailsAlertPage/DetailsAlertPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import WishlistPage from "../pages/WishlistPage/WishlistPage";
import DetailsWishlistPage from "../pages/DetailsRegionPage/DetailsWishlistPage";

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
    path: "/area/:slug/:id",
    page: DetailsRegionPage,
  },
  {
    path: "/manager",
    page: ManagerPage,
    isPrivate: true,
    role: "manager",
  },
  {
    path: "/admin",
    page: AdminPage,
    isPrivate: true,
    role: "admin",
  },
  {
    path: "*",
    page: NotFoundPage,
  },
  {
    path: "/notifications",
    page: AlertPage,
  },
  {
    path: "/notifications/:id",
    page: DetailsAlertPage,
  },
  {
    path: "/wishlist",
    page: WishlistPage,
  },
  {
    path: "/wishlist/:id",
    page: DetailsWishlistPage,
  },
];
