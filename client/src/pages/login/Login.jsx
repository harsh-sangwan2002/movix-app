import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import newRequest from '../../utils/newRequest';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const navigate = useNavigate();


    const handleClick = async () => {

        try {

            const res = await newRequest.post("auth/login", { email, password });
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            console.log(res);
            navigate("/");

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
                <button type="submit" onClick={handleClick} disabled={loading}>Login</button>
            </form>

            <span>Don't have an account? <Link to="/register" style={{ color: 'white' }}>Register</Link></span>
        </div>
    );
}

export default Login;
