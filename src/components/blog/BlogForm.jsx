import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import Card, { CardContent, CardHeader } from '../ui/Card';

const schema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  content: yup
    .string()
    .required('Content is required')
    .min(10, 'Content must be at least 10 characters'),
}).required();

const BlogForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  error,
  submitButtonText = 'Submit',
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          content: initialData.content,
        }
      : undefined,
  });

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900">
          {initialData ? 'Edit Blog' : 'Create New Blog'}
        </h2>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            placeholder="Enter blog title"
            error={errors.title?.message}
            {...register('title')}
          />

          <TextArea
            label="Content"
            placeholder="Write your blog content here..."
            rows={10}
            error={errors.content?.message}
            {...register('content')}
          />

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="mt-4"
          >
            {submitButtonText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;
