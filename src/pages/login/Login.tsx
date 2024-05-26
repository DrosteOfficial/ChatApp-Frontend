import React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import styles from './Login.module.css';
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error; // Import the CSS Module
function Login() {
    const accessToken = '';
    const url = "http://localhost:8080/api/auth/signing";

    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${accessToken}`;
            return config;
        },
        error => {
            return Promise.reject(error);
            console.log(error)
        }
    );

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const image = `${process.env.PUBLIC_URL}/LoginImage.webp`;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [response, setResponse] = useState("");



    const handleLogin = async () => {
        let loginRequest = {
            username: 'exampleusername3',
            password: 'examplepassword3'
        };

        try {
            const result = await axios.post(`${url}`, loginRequest);
            if (result.data && result.data.accessToken) {
                // Store the JWT token in local storage
                localStorage.setItem("accessToken", result.data.accessToken);
                setResponse(result.data);
            } else {
                // Handle case when response does not contain an accessToken
                setErrorMessage("Invalid response from server");
            }
        } catch (error) {
            if (error instanceof Error) {
                // Now TypeScript knows that `error` is an instance of `Error`
                console.log(error.message);
            }
        }
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
                />
                {errorMessage && <p className={styles["Text"]}>{errorMessage}</p>}
                <Button className={styles["Button"]} variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Stack>
        </div>
    );
}

export default Login;