import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';
import Navbar from '../components/Navbar';
import { supabase } from '../utils/supabase'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, password)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            console.error(error)
            return
        }

        navigate("/admin")
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
                                    id="password"
                                    placeholder="Inserisci la password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <button
                                    type="button"
                                    className="toggle-password"
                                >
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="login-button">
                            Accedi
                        </button>

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
