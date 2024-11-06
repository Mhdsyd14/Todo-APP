import { Navigate } from 'react-router-dom';

interface PrivateRootProps {
    children: JSX.Element;
}

function PrivateRoot({ children }: PrivateRootProps) {
  const token = localStorage.getItem('token');

  if (!token || token === undefined) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoot;
