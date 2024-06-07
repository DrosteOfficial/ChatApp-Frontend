import React, { useState } from 'react';
import { Stack, TextField, Button, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Avatar } from '@mui/material';
import { useNavigate } from "react-router-dom";
import styles from './Register.module.css';
import axios from 'axios';

const Register = () => {
    const url = "http://localhost:8080/api/auth/signup";
    const navigate = useNavigate();
    const image = `${process.env.PUBLIC_URL}/LoginImage.webp`;

    const [form, setForm] = useState({
        username: '',
        password: '',
        email: '',
        gender: '',
        avatar: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        email: '',
        gender: '',
    });

    const [errorMessage, setErrorMessage] = useState("");

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const validatePassword = (password: string) => /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setForm(prev => ({ ...prev, avatar: imageUrl }));
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleRegister = async () => {
        setErrors({
            username: '',
            password: '',
            email: '',
            gender: '',
        });

        if (!form.username) {
            setErrors(prev => ({ ...prev, username: "Username is required" }));
            return;
        }

        if (!validateEmail(form.email)) {
            setErrors(prev => ({ ...prev, email: "Email is not valid" }));
            return;
        }

        if (!validatePassword(form.password)) {
            setErrors(prev => ({ ...prev, password: "Password must contain at least one uppercase letter one number and be at least 8 characters long" }));
            return;
        }

        if (!form.gender) {
            setErrors(prev => ({ ...prev, gender: "Gender is required" }));
            return;
        }

        try {
            const result = await axios.post(url, form);
            console.log(result);
            if (result.data && result.data.message) {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Invalid response from server");
        }
    };

    return (
        <div className={styles['login-container']}>
            <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
                <img src={image} alt="Register" className={styles["LoginRegisterImage"]} />
                <h1 className={styles["LoginRegisterHeader"]}> Register</h1>
                <TextField
                    className={styles["TextFieldInputBoxes"]}
                    label="Username"
                    variant="outlined"
                    name="username"
                    value={form.username}
                    onChange={handleInputChange}
                    error={!!errors.username}
                    helperText={errors.username}
                />
                <TextField
                    className={styles["TextFieldInputBoxes"]}
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    className={styles["TextFieldInputBoxes"]}
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <FormControl component="fieldset" error={!!errors.gender}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup row aria-label="gender" name="gender" value={form.gender} onChange={handleInputChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                    {errors.gender && <p className={styles["Text"]}>{errors.gender}</p>}
                </FormControl>
                {errorMessage && <p className={styles["Text"]}>{errorMessage}</p>}
                <Button className={styles["Button"]} variant="contained" color="primary" onClick={handleRegister}>
                    Register
                </Button>
                <label htmlFor="avatar-upload" >
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="avatar-upload"
                        type="file"
                        onChange={handleAvatarChange}
                    />
                    <Avatar
                        src={form.avatar}
                        sx={{ width: "80px", height: "80px", border: "2px solid #FFFFFF", cursor: "pointer" }}
                    />
                </label>
            </Stack>
        </div>
    );
}

export default Register;