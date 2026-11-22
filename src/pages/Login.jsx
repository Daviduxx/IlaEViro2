import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Login.scss'
import Navbar from '../components/Navbar';
import { supabase } from '../utils/supabase'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const validate = () => {
        if (email.length > 0 && password.length > 0) {
            return true;
        } else {
            setErrorMessage('Le credenziali inserite non sono valide!')
            return false
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = validate()

        console.log(email, password)

        if (validation) {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) {
                setErrorMessage("Le credenziali inserite non sono valide!")
                return
            }

            setErrorMessage('')
            navigate("/admin")
        }

    };

    return (
        <>
            <Navbar></Navbar>

            <div className="login-container">

                <div className="login-card">

                    <div className="login-header">
                        <h2>Giulio & Ilaria</h2>
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
                                    type="password"
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

                        <p className='errorMessage'>{errorMessage}</p>

                    </form>

                </div>

            </div>
        </>
    );
}

export default Login;
