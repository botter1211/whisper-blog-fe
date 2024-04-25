import React from "react";
import { Route, Routes, redirect } from "react-router-dom";
import Layout from "../layouts/Layout";
import HomePage from "../pages/HomePage";

import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";

import CreateBlogPage from "../pages/CreateBlogPage";
import AccountPage from "../pages/AccountPage";
import Dashboard from "../pages/Dashboard";
import AuthRequire from "./AuthRequire";
import UserProfilePage from "../pages/UserProfilePage";
import BlogDetailPage from "../pages/BlogDetailPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import SubscriptionPage from "../pages/SubscriptionPage";
import GuestPage from "../pages/GuestPage";
import useAuth from "../hooks/useAuth";

function Router() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/guest" element={<GuestPage />} />
      </Route>
      <Route
        path="/"
        element={
          <AuthRequire>
            <Layout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="create" element={<CreateBlogPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="account-setting" element={<AccountPage />} />
        <Route path="subscription" element={<SubscriptionPage />} />
        <Route path="user/:slug" element={<UserProfilePage />} />
        <Route path="blog/:slug" element={<BlogDetailPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
