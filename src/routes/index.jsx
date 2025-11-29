import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import BlogsPage from '../components/pages/BlogsPage';
import BlogDetailPage from '../components/pages/BlogDetailPage';
import CreateBlogPage from '../components/pages/CreateBlogPage';
import EditBlogPage from '../components/pages/EditBlogPage';
import MyBlogsPage from '../components/pages/MyBlogsPage';
import LoginPage from '../components/pages/LoginPage';
import RegisterPage from '../components/pages/RegisterPage';
import NotFoundPage from '../components/pages/NotFoundPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/blogs/:id" element={<BlogDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/edit-blog/:id" element={<EditBlogPage />} />
        <Route path="/my-blogs" element={<MyBlogsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
