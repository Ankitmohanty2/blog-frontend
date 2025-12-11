import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogService from '../../service/blog.service';
import BlogForm from '../blog/BlogForm';
import MainLayout from '../../layout/MainLayout';

const EditBlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const response = await BlogService.getBlogById(id);
        if (response.success && response.data) {
          setBlog(response.data);
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

  const handleSubmit = async (data) => {
    if (!id) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await BlogService.updateBlog(id, data);
      if (response.success) {
        navigate(`/blogs/${id}`);
      } else {
        setError(response.message || 'Failed to update blog');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="py-6">
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-32 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            </div>
          ) : error && !blog ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : blog ? (
            <BlogForm
              initialData={blog}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              error={error}
              submitButtonText="Update Blog"
            />
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">Blog not found.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default EditBlogPage;
