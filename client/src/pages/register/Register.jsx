import React, { useState, useContext } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { storage, database } from "../../firebase";
import Alert from '@mui/material/Alert';

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useContext(AuthContext);
    const history = useNavigate();

    const handleChange = async () => {

        if (file === null) {

            setError('Please upload a profile image!');

            setTimeout(() => {
                setError('');
            }, 3000);


            return;
        }

        try {

            setError('');
            setLoading(true);

            const userObj = await signup(email, password);
            let uid = userObj.user.uid;

            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3);

            function fn1(snapshot) {

                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} done.`);
            }

            function fn2(err) {

                setError('Please upload a profile image!');

                setTimeout(() => {
                    setError('');
                }, 3000);

                setLoading(false);
            }

            function fn3() {

                uploadTask.snapshot.ref.getDownloadURL().then((url) => {

                    database.users.doc(uid).set({

                        email: email,
                        userId: uid,
                        fullname: name,
                        profileUrl: url,
                        countryName: country,
                        createdAt: database.getTimeStamp()
                    })

                    console.log(url);
                })

                setLoading(false);
                history('/');
            }

        } catch (err) {
            setError(err);

            setTimeout(() => {
                setError('');
            }, 3000);
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
                <button type="submit" onClick={handleChange}>Register</button>
            </div>
        </div>
    );
}

export default Register;
