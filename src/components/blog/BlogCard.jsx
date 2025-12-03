import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardFooter } from '../ui/Card';

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (!content) return "";
    if (content.length <= maxLength) return content;
    return `${content.substring(0, maxLength)}...`;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-grow">
        <Link to={`/blogs/${blog._id}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {blog.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mb-4">
          By {blog.author?.name || 'Unknown'} • {formatDate(blog.createdAt)}
        </p>

        <p className="text-gray-700">
          {truncateContent(blog.content)}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Link 
          to={`/blogs/${blog._id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          Read more →
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
