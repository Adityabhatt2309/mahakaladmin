"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token); // Get token from Redux state

  useEffect(() => {
    // Check if token exists in Redux or cookies
    const cookieToken = getCookie("authToken");
    if (token || cookieToken) {
      // Redirect to dashboard if token is present
      router.push("/");
    }
  }, [token, router]);

  return <LoginForm />;
};

export default Login;
