import React, { useState } from "react";
import { useRouter } from "next/router";

import { EnvelopeSimple, Lock, WarningCircle } from "phosphor-react";
import facebooklogo from "../../../assets/facebook.png";
import googlelogo from "../../../assets/google.png";
import linkedinlogo from "../../../assets/linkedin.png";
import Image from "next/image";
import {  RingLoader,  } from "react-spinners";
import { signIn } from "next-auth/react";
import { UserModel } from "@/pages/api/auth/[...nextauth]";
import createAxiosInstance from "@/axiosConfig";
import CustomTextField from "@/components/customtextfield";
interface Formdata {
  email: string;
  password: string;
}

export const LogInPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const axiosInstance = createAxiosInstance(router);
  const [formdata, setFormdata] = useState<Formdata>({
    email: "",
    password: "",
  });
  const [validationMessages, setValidationMessages] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);

  const validateEmail = (email: string) => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setValidationMessages({
        ...validationMessages,
        email: "Invalid email address",
      });
    } else {
      setValidationMessages({
        ...validationMessages,
        email: "",
      });
    }
  };

  const validatePassword = (password: string) => {
    if (!password || password.length < 6) {
      setValidationMessages({
        ...validationMessages,
        password: "Password must be at least 6 characters",
      });
    } else {
      setValidationMessages({
        ...validationMessages,
        password: "",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      validateEmail(e.target.value);
    } else if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  const handleLoginSuccess = async (user: UserModel, token: string) => {
    console.log(`Log In Success`);

    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/admin/dashboard",
      ...user,
      jwt: token,
    });
    router.replace("/admin/dashboard");
    
  };

  const handleLoginError = (error: { message: string }) => {
    console.log(`Log In error: ${error.message}`);
    setError(error.message);
  };

  const hanldeLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    validateEmail(formdata.email);
    validatePassword(formdata.password);

    // Check if any validation message exists
    if (Object.values(validationMessages).some((message) => message !== "")) {
      // Validation failed, return early
      setisLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/login", formdata);

      if (response.status === 200) {
        const { user, token } = response.data;
        handleLoginSuccess(user, token);
        console.log(token);
      }
    } catch (error: any) {
      if (error.response) {
        console.log("Response:", error.response);
        console.log("Status:", error.response.status);

        handleLoginError({
          message:
            error.response.status === 401
              ? "Invalid Email or Password"
              : error.response.status === 400
              ? "Email and Password required"
              : error.response.status === 500
              ? "Internal Server Error"
              : "An error occurred",
        });
      }
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="wholePage">
      <div className="right">
        {error ? (
          <div className="error-container">
            <WarningCircle width={30} height={30} />
            {error}
          </div>
        ) : null}
        <h1>Sign In to Foodie</h1>
        <div className="socialIcons">
          <Image src={facebooklogo} alt="fb" height={35} width={35} />
          <Image src={googlelogo} alt="google" height={35} width={35} />
          <Image src={linkedinlogo} alt="linkedin" height={35} width={35} />
        </div>
        <p>Or use your email account</p>
        <form onSubmit={hanldeLogin}>
          <CustomTextField
            name="email"
            icon={<EnvelopeSimple />}
            placeholder="Email"
            type="email"
            value={formdata.email}
            validationMessage={validationMessages.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(e);
              validateEmail(e.target.value);
            }}
          />
          <CustomTextField
            name="password"
            icon={<Lock />}
            placeholder="Password"
            type="password"
            value={formdata.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(e);
              validatePassword(e.target.value);
            }}
            validationMessage={validationMessages.password}
          />
          <p className="forgotpasswordtext">Forgot your password?</p>

          {isLoading ? (
            <div className="signin-container"><RingLoader size={20}/></div>
            
          ) : (
            <button type="submit" className="signin-container">
              Sign In
            </button>
          )}
        </form>
      </div>
      <div className="left">
        <h1>Welcome Back!</h1>
        <h3>Don't have an account?</h3>
        <div
          className="signup-container"
        onClick={() => {
          router.push("/auth/signup");
        }}
        >
          Sign Up
        </div>
        
      </div>
    </div>
  );
};
export default LogInPage;
