
import { useEffect } from 'react';
import { useAuth } from '../../providers/Auth';
import withAuth from '../../hocs/withAuth';
import cookie from 'js-cookie'

export default withAuth(function Logout() {
  const { setAuthenticated } = useAuth();
  useEffect(() => {
    async function doLogout() {
      setAuthenticated(false)
      cookie.remove('user')
    }
    doLogout();
  }, [setAuthenticated]);
  return <p>Logging out...</p>;
}, '/');