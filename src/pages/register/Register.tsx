import React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';
import styles from './Register.module.css';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const image = `${process.env.PUBLIC_URL}/LoginImage.webp`;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const handleRegister = () => {
        // Add your registration logic here
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
                />
                <TextField
                    className={styles["TextFieldInputBoxes"]}
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    className={styles["TextFieldInputBoxes"]}
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
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