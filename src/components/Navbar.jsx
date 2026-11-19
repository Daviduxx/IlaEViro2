import { useAuth } from '../context/Authcontext.jsx'
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

    const { session, logout } = useAuth()
    return (
        <nav className="navbar">

            <Link to="/" className="navbar-logo">
                <img src="/logo.png" alt="" className='logo' />
            </Link>

            <div className="navbar-links">
                <button onClick={logout} className={`${session ? '' : 'notVisible'}`}>Logout</button>
            </div>

        </nav>
    );
}

export default Navbar;
