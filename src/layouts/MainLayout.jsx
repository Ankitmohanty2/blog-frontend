import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function MainLayout({ children }) {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">
                  BlogApp
                </Link>
              </div>

              <nav className="ml-6 flex space-x-4 items-center">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>

                <Link
                  to="/blogs"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Blogs
                </Link>

                {user && (
                  <Link
                    to="/my-blogs"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    My Blogs
                  </Link>
                )}
              </nav>
            </div>

            <div className="flex items-center">
              {isLoading ? (
                <div className="animate-pulse h-8 w-20 bg-gray-200 rounded"></div>
              ) : user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    Welcome, {user.name}
                  </span>

                  <Link
                    to="/create-blog"
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Create Blog
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="/login"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
