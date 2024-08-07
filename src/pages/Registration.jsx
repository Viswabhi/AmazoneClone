import React, { useState } from "react";
import { darkLogo } from "../assets/index";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {RotatingLines} from "react-loader-spinner";
import { motion} from "framer-motion";

const Registration = () => {
  const navigate=useNavigate()
  const auth = getAuth();
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");

  const[Loading,setLoading]=useState(false);
  const[successMsg,setSuccessMsg]=useState("");
  


  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
    setFirebaseErr("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrClientName("");
    setErrEmail("");
    setErrPassword("");
    setErrCPassword("");
    setFirebaseErr("");

    let isValid = true;

    // Name validation
    if (!clientName) {
      setErrClientName("Enter your name");
      isValid = false;
    }

    // Email validation
    if (!email) {
      setErrEmail("Enter your email");
      isValid = false;
    } else if (!emailValidation(email)) {
      setErrEmail("Enter a valid email address");
      isValid = false;
    }

    // Password validation
    if (!password) {
      setErrPassword("Enter your password");
      isValid = false;
    } else if (password.length < 6) {
      setErrPassword("Password must be at least 6 characters");
      isValid = false;
    }

    // Confirm password validation
    if (!cPassword) {
      setErrCPassword("Re-enter your password");
      isValid = false;
    } else if (cPassword !== password) {
      setErrCPassword("Passwords do not match");
      isValid = false;
    }

    if (isValid) {
      setLoading(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
            photoURL: ""
          });
          const user = userCredential.user;
          // console.log(user);
          setLoading(false);
          setSuccessMsg("Account Created Successfully!");
          setTimeout(()=>{
            navigate("/signin")
          },3000)
          // Clear the fields after successful registration
          setClientName("");
          setEmail("");
          setPassword("");
          setCPassword("");
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email Already in use, try another one");
          } else {
            setFirebaseErr("Registration failed. Please try again.");
          }
        });
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form className="w-[350px] mx-auto flex flex-col items-center" onSubmit={handleRegistration}>
          {/* <img className="w-32 pt-3" src={darkLogo} alt="" /> */}
          <Link to="/">
        <img className="w-32 pt-3 cursor-pointer" src={darkLogo} alt="Logo" />
      </Link>
          <div className="w-full border border-gray-300 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">Create Account</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Your name</p>
                <input
                  className="w-full  py-1 border-zinc-400 px-2 text-base rounded-sm outline-none 
                  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  type="text"
                  value={clientName}
                  onChange={handleName}
                />
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titlefont font">!</span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">Email or phone number</p>
                <input
                  className="w-full lowercase py-1 border-zinc-400 px-2 text-base rounded-sm outline-none 
                  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  type="text"
                  value={email}
                  onChange={handleEmail}
                />
                {firebaseErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titlefont font">!</span>
                    {firebaseErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  className="w-full lowercase py-1 border-zinc-400 px-2 text-base rounded-sm outline-none 
                  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  type="password"
                  value={password}
                  onChange={handlePassword}
                />
                {errPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titlefont font">!</span>
                    {errPassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Re-enter Password</p>
                <input
                  className="w-full lowercase py-1 border-zinc-400 px-2 text-base rounded-sm outline-none 
                  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  type="password"
                  value={cPassword}
                  onChange={handleCPassword}
                />
                {errCPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titlefont font">!</span>
                    {errCPassword}
                  </p>
                )}
                <p className="text-sm text-gray-600">Passwords must be at least 6 characters.</p>
              </div>
              <button
                type="submit"
                className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                Continue
              </button>
              {
                Loading && (
                  <div className="flex justify-center">
                    <RotatingLines
                     strokeColor="#febd69"
                     strokeWidth="5"
                     animationDuration="0.75"
                     width="50"
                     visible={true}
                    />
                  </div>
                )
              }
              {
                successMsg && (
                  <div>
                    <motion.p
                    initial={{y:10,opacity:0}}
                    animate={{y:0,opacity:1}}
                    transition={{duration:0.5}}
                    className="text-base font-titlefont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center"
                    >{successMsg}</motion.p>
                  </div>
                )
              }
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              By Continuing, you agree to Amazon's{" "}
              <span className="text-blue-600">Conditions of Use </span>and{" "}
              <span className="text-blue-600">Privacy Notice</span>
            </p>
            <div>
              <p className="text-sm text-black">
                Already have an account?{" "}
                <Link to="/signin">
                  <span className="text-xs text-blue-600 hover:text-red-700 hover:underline underline-offset-1 cursor-pointer duration-100">
                    Sign in{" "}
                    <span>
                      <ArrowRightIcon />
                    </span>
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
        <div className="flex items-center gap-6 ">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Conditions of use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2023, ReactBd.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Registration;

