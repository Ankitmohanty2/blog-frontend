import React from 'react';
import Login from '../auth/Login';
import MainLayout from '../../layout/MainLayout';

const LoginPage = () => {
  return (
    <MainLayout>
      <div className="py-10">
        <div className="max-w-md mx-auto">
          <Login />
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
