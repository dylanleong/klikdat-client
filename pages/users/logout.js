import { useEffect } from 'react'
import { useAuth } from '../../providers/Auth'
import withAuth from '../../hocs/withAuth'
import cookie from 'js-cookie'

function Logout() {
  const { setAuthenticated } = useAuth()

  useEffect(() => {
    async function doLogout() {
      setAuthenticated(false)
      cookie.remove('token')
      cookie.remove('first_name')
    }
    doLogout()
  }, [setAuthenticated])

  return <p>Logging out...</p>
}

export default withAuth(Logout, '/')