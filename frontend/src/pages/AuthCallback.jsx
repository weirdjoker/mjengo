// src/pages/AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        if (!code) throw new Error('No OAuth code provided');

        const response = await axios.get(`${API_URL}/google/callback?code=${code}`);
        const { token, user } = response.data;
        if (!user?.role) throw new Error('User role not provided');

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ id: user.id, name: user.name, role: user.role }));
        navigate(
          user.role === 'owner'
            ? '/owner-dashboard'
            : user.role === 'builder'
            ? '/builder-dashboard'
            : '/supplier-dashboard'
        );
      } catch (err) {
        console.error('OAuth callback error:', err);
        navigate('/login', { state: { error: 'Google authentication failed' } });
      }
    };
    handleCallback();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      Processing...
    </div>
  );
};

export default AuthCallback;