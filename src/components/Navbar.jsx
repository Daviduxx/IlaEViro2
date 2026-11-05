
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">

            <Link to="/" className="navbar-logo">
                IlaViro
            </Link>

            <div className="navbar-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/guestbook">Guestbook</NavLink>
                <NavLink to="/lista-nozze">Lista Nozze</NavLink>
                <NavLink to="/login">Login</NavLink>
            </div>

        </nav>
    );
}

export default Navbar;
