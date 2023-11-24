import React, { useState, useContext } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import Alert from '@mui/material/Alert';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const { login } = useContext(AuthContext);
    const history = useNavigate();


    const handleClick = async () => {

        try {

            setError('');
            setLoading(true);

            const res = await login(email, password);
            setLoading(false);
            history('/');

        } catch (err) {

            setError(err);

            setTimeout(() => {
                setError('');
            }, 3000);

            setLoading(false);
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                {error !== '' && <Alert severity="error">{error}</Alert>}
                <h1>Sign in</h1>
                <label htmlFor="">Email</label>
                <input
                    name="email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="">Password</label>
                <input
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" onClick={handleClick}>Login</button>
            </form>
        </div>
    );
}

export default Login;
