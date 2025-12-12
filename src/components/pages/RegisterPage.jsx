import React from 'react';
import Register from '../auth/Register';
import MainLayout from '../../layout/MainLayout';

const RegisterPage = () => {
  return (
    <MainLayout>
      <div className="py-10">
        <div className="max-w-md mx-auto">
          <Register />
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
