import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector(state => state.user);
  
  // If not authenticated, redirect to login with the current path as redirect parameter
  if (!isAuthenticated) {
    // Create redirect URL with current location
    const currentPath = location.pathname + location.search;
    const redirectUrl = `/login?redirect=${encodeURIComponent(currentPath)}`;
    
    return <Navigate to={redirectUrl} replace />;
  }
  
  return children;
};

export default ProtectedRoute;