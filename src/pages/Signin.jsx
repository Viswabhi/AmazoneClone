import React, { useState } from 'react';
import { darkLogo } from '../assets/index';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/amazonSlice';

const Signin = () => {
  const auth = getAuth();
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrEmail('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrPassword('');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let isValid = true;

    // Email validation
    if (!email) {
      setErrEmail('Enter your email');
      isValid = false;
    } else if (!emailValidation(email)) {
      setErrEmail('Enter a valid email address');
      isValid = false;
    }

    // Password validation
    if (!password) {
      setErrPassword('Enter your password');
      isValid = false;
    }

    if (isValid) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(setUserInfo({
            _id:user.uid,
            userName:user.displayName,
            email:user.email,
            image:user.photoURL
          }))
          // console.log(user);
          setSuccessMsg("Logged in successfully! Welcome back!");
          setLoading(false);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode === "auth/invalid-email") {
            setErrEmail("Invalid Email");
          } else if (errorCode === "auth/wrong-password") {
            setErrPassword("Wrong password! Try again.");
          } else {
            setErrEmail("Something went wrong, please try again.");
          }
        });
    }
  };

  return (
    <div className='w-full '>
      <div className='w-full bg-gray-100 pb-10'>
        {
          successMsg ? (
            <div className='w-full flex justify-center items-center py-32'>
              <p className='border-[1px] border-green-600 text-green-500 font-titlefont text-lg font-semibold px-6 py-2'>
                {successMsg}
              </p>
            </div>
          ) : (
            <form className='w-[350px] mx-auto flex flex-col items-center' onSubmit={handleLogin}>
              {/* <img className='w-32 pt-3' src={darkLogo} alt="" /> */}
              <Link to="/">
        <img className="w-32 pt-3 cursor-pointer" src={darkLogo} alt="Logo" />
      </Link>
              <div className='w-full border border-gray-300 p-6'>
                <h2 className='font-titleFont text-3xl font-medium mb-4'>Sign in</h2>
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm font-medium'>Email or mobile phone number</p>
                    <input
                      className="w-full lowercase py-1 border-zinc-400 px-2 text-base rounded-sm outline-none 
                      focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {errEmail && (
                      <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                        <span className="italic font-titlefont font">!</span>
                        {errEmail}
                      </p>
                    )}
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm font-medium'>Password</p>
                    <input
                      className="w-full lowercase py-1 border-zinc-400 px-2 text-base rounded-sm outline-none 
                      focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    {errPassword && (
                      <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                        <span className="italic font-titlefont font">!</span>
                        {errPassword}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className='w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'
                  >
                    Continue
                  </button>
                  {loading && (
                    <div className='flex justify-center'>
                      <RotatingLines
                        strokeColor="#febd69"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="50"
                        visible={true}
                      />
                    </div>
                  )}
                </div>
                <p className='text-xs text-black leading-4 mt-4'>
                  By Continuing, you agree to Amazon's <span className='text-blue-600'>Conditions of Use{" "}</span>and <span className='text-blue-600'>Privacy Notice</span>
                </p>
                <p className='text-xs text-gray-600 mt-6 cursor-pointer group'>
                  <ArrowRightIcon />
                  <span className='text-blue-600 group-hover:text-red-700 group-hover:underline-offset-1'>Need help?</span>
                </p>
              </div>
              <p className='w-full text-xs text-gray-600 mt-4 flex items-center'>
                <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
                <span className='w-1/3 text-center'>New to Amazon</span>
                <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
              </p>
              <Link className="w-full" to="/registration">
                <button className='w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'>
                  Create Your Amazon Account
                </button>
              </Link>
            </form>
          )}
      </div>
      <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10'>
        <div className='flex items-center gap-6 '>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Conditions of use</p>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Privacy Notice</p>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Privacy Notice</p>
        </div>
        <p className='text-xs text-gray-600'>© 1996-2023, ReactBd.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
}

export default Signin;
