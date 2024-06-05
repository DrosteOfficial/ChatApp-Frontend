import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';
import styles from './Register.module.css';
import axios from 'axios'; // Import axios directly

function Register() {
    const url = "http://localhost:8080/api/auth/signup"; // Update with your registration endpoint
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [genderError, setGenderError] = useState(""); // New state variable for gender error
    const image = `${process.env.PUBLIC_URL}/LoginImage.webp`;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const validateEmail = (email: string) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const validatePassword = (password: string) => {
        var re = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return re.test(password);
    }

    const handleRegister = async () => {
        setUsernameError("");
        setPasswordError("");
        setEmailError("");
        setGenderError(""); // Reset gender error

        if (!username) {
            setUsernameError("Username is required");
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Email is not valid");
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError("Password must contain at least one uppercase letter one number and be at least 8 characters long");
            return;
        }

        if (!gender) {
            setGenderError("Gender is required"); // Set gender error if no gender is selected
            return;
        }

        let registerRequest = {
            username: username,
            email: email,
            password: password,
            gender: gender
        };

        try {
            const result = await axios.post(url, registerRequest);
            console.log(result);
            if (result.data && result.data.message) {
                navigate('/login'); // Navigate to login page after successful registration
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Invalid response from server");
        }
    };

    return (
        <div className={styles['login-container']}>
            <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
                <img src={image} alt="Register" className={styles["LoginRegisterImage"]}/>
                <h1 className={styles["LoginRegisterHeader"]}> Register</h1>
                <TextField
                    className={styles["TextFieldInputBoxes"]}
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!usernameError}
                    helperText={usernameError}
                />
                <TextField
                    className={styles["TextFieldInputBoxes"]}
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!emailError}
                    helperText={emailError}
                />
                <TextField
                    className={styles["TextFieldInputBoxes"]}
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!passwordError}
                    helperText={passwordError}
                />
                <FormControl component="fieldset" error={!!genderError}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                    {genderError && <p className={styles["Text"]}>{genderError}</p>}
                </FormControl>
                {errorMessage && <p className={styles["Text"]}>{errorMessage}</p>}
                <Button className={styles["Button"]} variant="contained" color="primary" onClick={handleRegister}>
                    Register
                </Button>
            </Stack>
        </div>
    );
}

export default Register;