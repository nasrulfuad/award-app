import { message } from "antd";
import AdminRoute from "infrastructure/common/router/AdminRoute";
import { useAppDispatch, useAppSelector } from "infrastructure/hooks/useStore";
import LoginPage from "infrastructure/pages/auth/Login.page";
import { getUser, setUser } from "infrastructure/store/user.reducer";
import jwt from "jsonwebtoken";
import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router";

const CardPage = lazy(() => import("infrastructure/pages/admin/Card.page"));
const ProfilePage = lazy(
  () => import("infrastructure/pages/admin/Profile.page")
);
const HomePage = lazy(() => import("infrastructure/pages/admin/Home.page"));

export const App = () => {
  const { isAuthenticated } = useAppSelector(getUser);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const credentials = localStorage.getItem("credentials");

  if (credentials && !isAuthenticated) {
    try {
      const credentialParsed = JSON.parse(atob(credentials));
      const tokenDecoded: any = jwt.decode(credentialParsed.token);

      if (tokenDecoded.exp * 1000 <= new Date().getTime()) {
        throw new Error("Token Expired");
      }

      dispatch(setUser.login(credentialParsed));
    } catch (error: any) {
      setTimeout(() => message.warn("Your Session Has Expired"));

      localStorage.removeItem("credentials");
    }
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="admin" element={<AdminRoute path={pathname} />}>
        <Route path="home" element={<HomePage />} />
        <Route path="cards" element={<CardPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};
