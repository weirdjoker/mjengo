// src/pages/AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userData = params.get('user');
        
        if (!token || !userData) {
          throw new Error('Missing authentication data');
        }

        const user = JSON.parse(decodeURIComponent(userData));

        // Store authentication data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role
        }));

        // Always redirect to main page after login
        navigate('/');
      } catch (err) {
        console.error('OAuth callback error:', err);
        navigate('/login', { 
          state: { error: 'Google authentication failed. Please try again.' } 
        });
      }
    };

    handleCallback();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing your authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;