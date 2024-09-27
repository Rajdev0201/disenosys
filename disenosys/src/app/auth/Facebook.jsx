"use client";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FacebookLog } from "../Redux/features/authSlice.js";

const Facebook = () => {
  const dispatch = useDispatch();

  const handleLoginSuccess = async (response) => {
    console.log("Facebook Login Success:", response);

    const { first_name, last_name, userID } = response.data;
    const userName = `${first_name} ${last_name}`;

    try {
   
      const result = await axios.post("https://disenosys-1.onrender.com/api/v1/user/facebook", {
        userEmail: userID,
        userName,
      });

      console.log("User data saved:", result.data);

      // Dispatch to Redux store
      dispatch(FacebookLog(result.data));

      // Save to localStorage
      localStorage.setItem("profile", JSON.stringify({ userName, userEmail: userID }));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleLoginError = (error) => {
    console.error("Facebook Login Failed:", error);
  };

  return (
    <div>
      <LoginSocialFacebook
        appId="907005314629771"
        onResolve={handleLoginSuccess}
        onReject={handleLoginError}
      >
           Continue with facebook
      </LoginSocialFacebook>
    </div>
  );
};

export default Facebook;
