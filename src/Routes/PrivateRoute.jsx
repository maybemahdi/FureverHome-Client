import { Navigate, useLocation } from 'react-router-dom'
import Skeleton from '../Components/Skeleton'
import useAuth from '../Hooks/useAuth'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation();

  if (loading) return <Skeleton/>
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}


export default PrivateRoute