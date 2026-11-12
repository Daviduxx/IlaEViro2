import { useAuth } from '../context/Authcontext.jsx'
import Loader from '../pages/Loader.jsx'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {

    const { session, loading } = useAuth();

    if (loading) {
        return <Loader></Loader>
    }

    if (!session) {
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute;