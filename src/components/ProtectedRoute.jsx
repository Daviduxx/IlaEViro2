import useAuth from '../context/Authcontext'
import Loader from '../pages/Loader.jsx'
import Navigate from 'react-router-dom'

function ProtectedRoute({ childred }) {

    const { session, loading } = useAuth();

    if (loading) {
        return <Loader></Loader>
    }

    if (!session) {
        return <Navigate to="/login" />
    }

    return childred
}

export default ProtectedRoute;