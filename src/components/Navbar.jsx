import { useAuth } from '../context/Authcontext.jsx'
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

    const { session, logout } = useAuth()
    return (
        <nav className="navbar">

            <Link to="/" className="navbar-logo">
                IlaViro
            </Link>

            <div className="navbar-links">
                <NavLink to="/login">Login</NavLink>
                <button onClick={logout} className={`${session ? '' : 'notVisible'}`}>Logout</button>
            </div>

        </nav>
    );
}

export default Navbar;
