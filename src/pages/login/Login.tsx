import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';


function Login() {
    const url = "http://localhost:8080/api/auth/signin";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const image = `${process.env.PUBLIC_URL}/LoginImage.webp`;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [response, setResponse] = useState("");

    const handleLogin = async () => {
        let loginRequest = {
            username: username,
            password: password
        };

        // Create an axios instance with the tokenType and token
        const instance = axios.create({
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });

        try {
            const result = await axios.post(url, loginRequest);
            console.log(result);
            if (result.data && result.data.token) {
                Cookies.set("token", result.data.token, { domain: 'localhost', path: '/' });
                Cookies.set("refreshToken", result.data.refreshToken, { domain: 'localhost', path: '/' });
                Cookies.set("id", result.data.id, { domain: 'localhost', path: '/' });
                Cookies.set('test', 'test value', { expires: 7, path: '/' });
                setResponse(result.data);
                console.log(result);
                navigate("/chat");
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Invalid username or password");
        }
    };
    const goToRegister = () => {
        navigate("/register");
    };


    return (
        <div className={styles['login-container']}>
            <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
                <img src={image} alt="Login" className={styles["LoginRegisterImage"]}/>
                <h1 className={styles["LoginRegisterHeader"]}> Login</h1>
                <TextField
                    className={styles["TextFieldInputBoxes"]}
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    className={styles["TextFieldInputBoxes"]}
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleLogin();
                        }
                    }}
                />
                {errorMessage && <p className={styles["Text"]}>{errorMessage}</p>}
                <div className={"registerLoginChoice"}>
                    <Button className={styles["Button"]} variant="contained" color="primary" onClick={handleLogin}>
                        Login
                    </Button>
                    <Button className={styles["Button"]} variant="contained" color="primary" onClick={goToRegister}>
                        Register
                    </Button>

                </div>

            </Stack>
        </div>
    );
}

export default Login;