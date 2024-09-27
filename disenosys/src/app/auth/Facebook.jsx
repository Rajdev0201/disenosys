"use client";

import dynamic from 'next/dynamic';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { handleLogin } from "../Redux/action/auth.js";

// Dynamically import LoginSocialFacebook and disable SSR
const LoginSocialFacebook = dynamic(
  () => import("reactjs-social-login").then((mod) => mod.LoginSocialFacebook),
  { ssr: false }
);

const Facebook = () => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure the code only runs on the client side
    setIsClient(typeof window !== "undefined");
  }, []);

  const handleLoginSuccess = async (response) => {
    dispatch(handleLogin(response));
  };

  const handleLoginError = (error) => {
    console.error("Facebook Login Failed:", error);
  };

  // Render nothing until we confirm the component is client-side
  if (!isClient) {
    return null;
  }

  return (
    <div>
      <LoginSocialFacebook
        appId="907005314629771"
        onResolve={handleLoginSuccess}
        onReject={handleLoginError}
      >
        Continue with Facebook
      </LoginSocialFacebook>
    </div>
  );
};

export default Facebook;
