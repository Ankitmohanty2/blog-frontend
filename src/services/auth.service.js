import api from './api';

const AuthService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  },

  login: async (userData) => {
    try {
      const response = await api.post('/auth/login', userData);
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get user',
      };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },
};

export default AuthService;

