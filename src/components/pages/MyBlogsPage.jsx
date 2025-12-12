import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogService from '../../service/blog.service';
import BlogCard from '../blog/BlogCard';
import Button from '../ui/Button';
import MainLayout from '../../layout/MainLayout';

const MyBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await BlogService.getMyBlogs();
        if (response.success && response.data) {
          setBlogs(response.data);
        } else {
          setError(response.message || 'Failed to fetch your blogs');
        }
      } catch {
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await BlogService.deleteBlog(id);
        if (response.success) {
          setBlogs(blogs.filter((blog) => blog._id !== id));
        } else {
          alert(response.message || 'Failed to delete blog');
        }
      } catch {
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <MainLayout>
      <div className="py-6">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Blogs</h1>
          <Link to="/create-blog">
            <Button variant="primary">Create New Blog</Button>
          </Link>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-lg shadow-md p-6 h-64">
                  <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600 mb-4">
              You haven't created any blogs yet.
            </p>
            <Link to="/create-blog">
              <Button variant="primary">Create Your First Blog</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog._id} className="relative">
                <BlogCard blog={blog} />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Link
                    to={`/edit-blog/${blog._id}`}
                    className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Link>

                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="p-2 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyBlogsPage;
