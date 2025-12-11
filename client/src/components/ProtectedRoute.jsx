import { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ role }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || (role && user.role !== role)) {
      // Store the current location before redirecting
      localStorage.setItem('redirectAfterLogin', location.pathname);
      navigate('/login');
    }
  }, [user, role, navigate, location]);

  return user ? <Outlet /> : null;
}