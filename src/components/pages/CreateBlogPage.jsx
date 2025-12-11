import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogService from '../../service/blog.service';
import BlogForm from '../blog/BlogForm';
import MainLayout from '../../layout/MainLayout';

const CreateBlogPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await BlogService.createBlog(data);

      if (response.success) {
        const blog = response.data;
        navigate(`/blogs/${blog._id}`);
      } else {
        setError(response.message || 'Failed to create blog');
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
          <BlogForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            error={error}
            submitButtonText="Create Blog"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateBlogPage;
