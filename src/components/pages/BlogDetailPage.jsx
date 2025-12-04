import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import BlogService from '../../service/blog.service';
import AuthService from '../../service/auth.service';
import Button from '../ui/Button';
import MainLayout from '../../layout/MainLayout';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const response = await BlogService.getBlogById(id);
        if (response.success && response.data) {
          setBlog(response.data);

          if (AuthService.isLoggedIn()) {
            const userResponse = await AuthService.getCurrentUser();
            if (userResponse.success && userResponse.user) {
              setIsOwner(userResponse.user.id === response.data.author._id);
            }
          }
        } else {
          setError(response.message || 'Failed to fetch blog');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !blog) return;

    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await BlogService.deleteBlog(id);
        if (response.success) {
          navigate('/my-blogs');
        } else {
          alert(response.message || 'Failed to delete blog');
        }
      } catch (err) {
        alert('An unexpected error occurred');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <MainLayout>
      <div className="py-6">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : blog ? (
          <article>
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {blog.title}
              </h1>
              <div className="flex items-center text-sm text-gray-500">
                <span>By {blog.author?.name || 'Unknown'}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            </header>

            {isOwner && (
              <div className="mb-8 flex space-x-4">
                <Link to={`/edit-blog/${blog._id}`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            )}

            <div className="prose prose-blue max-w-none">
              {blog.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">Blog not found.</p>
            <Link
              to="/blogs"
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Back to all blogs
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BlogDetailPage;
