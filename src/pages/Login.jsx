import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';
import Navbar from '../components/Navbar';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            email,
            password
        });
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="login-container">

                <div className="login-card">

                    <div className="login-header">
                        <h1>IlaViro</h1>
                        <p>Accedi alla tua area riservata</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>

                            <input
                                type="email"
                                id="email"
                                placeholder="Inserisci la tua email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>

                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Inserisci la password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Nascondi' : 'Mostra'}
                                </button>
                            </div>
                        </div>

                        <div className="login-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                Ricordami
                            </label>

                            <a href="#recupera-password">
                                Password dimenticata?
                            </a>
                        </div>

                        <Link to='/admin'>
                            <button type="submit" className="login-button">
                                Accedi
                            </button>
                        </Link>

                    </form>

                    <div className="login-footer">
                        <p>Area riservata IlaViro</p>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Login;
