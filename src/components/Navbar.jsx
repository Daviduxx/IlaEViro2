import { useAuth } from '../context/Authcontext.jsx'
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

function Navbar() {

    const { session, logout } = useAuth()
    return (
        <nav className="navbar">

            <Link to="/" className="navbar-logo">
                <img src="/logo.png" alt="" className='logo' />
            </Link>

            <div className='buttonContainer'>

                <div className="navbar-links">
                    <Link to="/admin" >
                        <button className={`${session ? '' : 'notVisible'}`}>Admin</button>
                    </Link>
                </div>
                <div className="navbar-links">
                    <button onClick={logout} className={`${session ? '' : 'notVisible'}`}>Logout</button>
                </div>
            </div>


        </nav>
    );
}

export default Navbar;
