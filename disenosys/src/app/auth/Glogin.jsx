"use client"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { GoogleLog } from "../Redux/features/authSlice.js";
import axios from 'axios';

const Login = () => {
    const dispatch = useDispatch();

    const handleLoginSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse?.credential);
        console.log("Login Success:", decoded);
    
        try {
            const response = await axios.post('http://localhost:8000/api/v1/user/google', {
                userEmail: decoded.email,
                userName: decoded.name, 
            });
    
            console.log('User data saved:', response.data);
            
           
            const { userName, userEmail } = response.data.user; 
    
            
            dispatch(GoogleLog(response.data));
    
       
            localStorage.setItem("profile", JSON.stringify({ userName, userEmail }));
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };
    
    const handleLoginError = () => {
        console.log("Login Failed");
    };

    return (
        <GoogleOAuthProvider clientId="983254091360-quqeguqb1f1kl5s3gmlljamv3rla3acr.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
                theme="outline"
                text="continue_with"
                size="large"
            />
        </GoogleOAuthProvider>
    );
};

export default Login;
