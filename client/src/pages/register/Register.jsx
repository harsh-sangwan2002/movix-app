import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";

import Alert from '@mui/material/Alert';
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = async () => {

        if (file === null) {

            setError('Please upload a profile image!');

            setTimeout(() => {
                setError('');
            }, 3000);


            return;
        }


        const url = await upload(file);
        setLoading(true);

        try {

            const user = {
                email,
                password,
                name,
                country,
                img:url
            }

            await newRequest.post("/auth/register", user);
            localStorage.setItem("currentUser", JSON.stringify(user));
            navigate("/");

            setLoading(false);

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    return (
        <div className="register">
            <div className="left">
                <h1>Create a new account</h1>
                <label htmlFor="">Username</label>
                <input
                    name="name"
                    type="text"
                    placeholder="johndoe"
                    onChange={(e) => setName(e.target.value)}
                />
                {error !== '' && <Alert severity="error">{error}</Alert>}
                <label htmlFor="">Email</label>
                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="">Password</label>
                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="">Profile Picture</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <label htmlFor="">Country</label>
                <input
                    name="country"
                    type="text"
                    placeholder="Usa"
                    onChange={(e) => setCountry(e.target.value)}
                />
                <button type="submit" onClick={handleChange} disabled={loading}>Register</button>
            </div>
        </div>
    );
}

export default Register;
