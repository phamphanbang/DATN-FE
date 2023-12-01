import { LocalStorageKeys } from 'common/enums';
import { RouteProps } from 'react-router';
import { Navigate } from 'react-router-dom';
import { getItem, setItem } from 'utils';

const PrivateRoute = ({ children }: RouteProps) => {
  const accessToken: string | null = getItem(LocalStorageKeys.accessToken);
  const isUnauthorized = accessToken === null;
  const isAdmin = getItem(LocalStorageKeys.isAdmin) === 'true' ? true : false;
  if (isUnauthorized || !isAdmin) {
    setItem(LocalStorageKeys.prevURL, window.location.href);
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
