import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Alerts } from "./errors/Alerts";
import axios from "axios";
import {
  UserCredentials,
  useRegisterUserMutation,
} from "../redux/slices/authslices";
import Router from "next/router";
export interface RegisterError {
  status: number;
  data: string;
}

export interface LoginProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

// use yup to handle errors
const SignUpErrorSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name Too Short!")
    .max(50, "First name Too Long!")
    .required("First name Required"),
  lastName: Yup.string()
    .min(2, "Last name Too Short!")
    .max(50, "Last name Too Long!")
    .required("Last name Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password must contain 6 or more characters with at least one of each: uppercase, lowercase, number and special character"
    )

    .required("Password Required"),
});
const LoginErrorSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string().required("Password Required"),
});

export const LoginCard = ({ isSignUp, setIsSignUp }: LoginProps) => {
  const [reveal, setReveal] = useState(false);
  const [loginErr, setLoginErr] = useState("");

  const handleSignUpToggle = useCallback(() => {
    setIsSignUp(!isSignUp);
  }, [setIsSignUp, isSignUp]);
  const { data: session, status } = useSession();
  const [register, { isLoading, isError, error, isSuccess }] =
    useRegisterUserMutation();

  const registerationErr = (error as RegisterError)?.data;


  const handleRedirect = () => {
    const { pathname } = Router;
    if (pathname === "/auth") {
      // TODO: redirect to a success register page
      Router.push("/");
    }
  };

  const handleLogin = async (values: UserCredentials) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/Chatroom",
    });

    res?.error ? setLoginErr(res.error) : handleRedirect();
  };

  const handleRegister = async (values: UserCredentials) => {
    try {
      await register(values).unwrap();
      handleLogin(values);
    } catch (error) {}
  };

  //formik to handle form state
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: isSignUp
      ? async (values) => handleRegister(values)
      : async (values) => handleLogin(values),
    validationSchema: isSignUp ? SignUpErrorSchema : LoginErrorSchema,
  });

  return (
    <div className="absolute left-0 right-0 top-20 sm:top-28 bg-[#1B2430] shadow-2xl h-fit pb-7 pt-5 w-80 md:w-10/12  lg:w-8/12 rounded-lg ml-auto mr-auto flex flex-col md:flex-row  px-10 md:gap-5 ">
      <section className=" w-10/11 md:w-[50%] items-center flex flex-col justify-center">
        <div className="flex flex-row gap-3 mb-5 w-64">
          <p className="tracking-wider text-violet-300 mb-3">
            Login with Social
          </p>
        </div>

        <>
          <button
            onClick={() => signIn("google", { callbackUrl: "/Chatroom" })}
            className=" border-slate-100 border-2 rounded w-64 h-10 flex-row justify-center gap-4 flex items-center mb-5"
          >
            <p className="tracking-[5px] text-white">Google </p>
            <FcGoogle size={"30px"} />
          </button>
          <button
            onClick={() => signIn("facebook", { callbackUrl: "/Chatroom" })}
            className=" border-slate-100 border-2 rounded w-64 h-10 flex-row justify-center gap-4 flex items-center"
          >
            <p className="tracking-[5px] text-white">Facebook</p>
            <BsFacebook size={"30px"} className="text-blue-600" />
          </button>
        </>
      </section>
      <section className=" w-10/11 md:w-[50%] items-center flex flex-col justify-center md: mt-10">
        <form onSubmit={formik.handleSubmit}>
          <div className="w-64  mb-3 flex flex-row gap-0">
            <button
              type="button"
              className={
                isSignUp
                  ? "w-[50%]  border-violet-300 border-2 py-2 rounded-l-md text-violet-300"
                  : "w-[50%]  bg-violet-300  py-2 rounded-l-md"
              }
              onClick={handleSignUpToggle}
            >
              Login
            </button>
            <button
              type="button"
              className={
                isSignUp
                  ? "w-[50%]  bg-violet-300  py-2 rounded-r-md"
                  : "w-[50%]  border-violet-300 border-2 py-2 rounded-r-md text-violet-300"
              }
              onClick={handleSignUpToggle}
            >
              Sign Up
            </button>
          </div>
          {isSignUp ? (
            <p className="tracking-wider text-violet-300 mb-3">
              Sign Up with Email
            </p>
          ) : (
            <p className="tracking-wider text-violet-300 mb-3">
              Login with Email
            </p>
          )}
          {isError && <Alerts>{registerationErr}</Alerts>}
          {loginErr && <Alerts>{loginErr}</Alerts>}
          {isSignUp && (
            <input
              value={formik.values.firstName}
              className="rounded w-64 my-2 py-[7px] px-2 bg-inherit border-[1px] text-white border-white"
              onChange={formik.handleChange("firstName")}
              onBlur={formik.handleBlur("firstName")}
              type="text"
              placeholder="First Name"
            />
          )}
          {/* Err */}
          <Alerts>{formik.touched.firstName && formik.errors.firstName}</Alerts>
          {isSignUp && (
            <input
              className="rounded w-64 my-2 py-[7px] px-2 bg-inherit border-[1px] text-white border-white"
              value={formik.values.lastName}
              onChange={formik.handleChange("lastName")}
              onBlur={formik.handleBlur("lastName")}
              type="text"
              placeholder="Last Name"
            />
          )}
          {/* Err */}
          <Alerts>{formik.touched.lastName && formik.errors.lastName}</Alerts>
          <input
            value={formik.values.email}
            className="rounded w-64 my-2 py-[7px] px-2 bg-inherit border-[1px] text-white border-white"
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            type="email"
            placeholder="E-mail address"
          />
          {/* Err */}
          <Alerts>{formik.touched.email && formik.errors.email}</Alerts>
          <input
            value={formik.values.password}
            className="rounded w-64 my-2 py-[7px] px-2 bg-inherit border-[1px] text-white border-white"
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            type={reveal ? "text" : "password"}
            placeholder="Password"
          />
          <div className="toggle-icon">
            <i
              className={reveal ? "bi bi-eye-slash " : "bi bi-eye "}
              id="togglePassword"
              onClick={() => setReveal(!reveal)}
            ></i>
          </div>
          {/* Err */}
          <Alerts>{formik.touched.password && formik.errors.password}</Alerts>

          <button
            type="submit"
            className="mt-5 py-2 px-20 border-solid bg-sky-600 rounded w-64"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
      </section>
    </div>
  );
};
