import axios from 'axios';
import Cookies from 'js-cookie';

export const handleLogin = async (username: string, password: string, navigate: Function, setErrorMessage: Function) => {
    const url = "http://localhost:8080/api/auth/signin";
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
            navigate("/chat");
        }
    } catch (error) {
        console.log(error);
        setErrorMessage("Invalid username or password");
    }
};