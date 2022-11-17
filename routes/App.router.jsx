import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Login.page";
import PageNotFound from "../pages/PageNotFound";
import RegisterPage from "../pages/Register.page";
import WelcomePage from "../pages/Welcome.page";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="" index element={<Navigate to={"login"} />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="welcome" element={<WelcomePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default AppRouter;
