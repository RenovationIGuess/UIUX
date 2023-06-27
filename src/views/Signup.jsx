/* eslint-disable no-unused-vars */
import image from "../constant/image";
import { AiFillCheckCircle } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import "./styles/Login.scss";
import { Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { KrdStateContext } from "../contexts/ContextProvider";

const Login = () => {
  const navigate = useNavigate();

  const { users, setCurrentUser } = KrdStateContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    const findUserIndex = users.findIndex((u) => u.email === email);
    if (findUserIndex === -1) {
      if (password) {
        if (password === confirmPassword) {
          toast("Signup Successful!");
          setCurrentUser({});
          navigate(`/user/home`);
        } else toast("Password not match!");
      } else toast("Please enter a password!");
    } else toast("Invalid Email Address!");
  }

  return (
    <div className="max-w-[1208px] flex gap-4 items-center z-10">
      <div className="login-left-side">
        <h1 className="font-bold text-7xl mb-8 break-words">
          Make your life easier with Kurendar!
        </h1>
        <p className="font-semibold text-dark-gray text-base mb-4">Scheduling & Taking Note Modern App</p>
        <div className="flex items-center mb-4">
          <AiFillCheckCircle className="text-2xl text-bright-green border border-solid border-gray-300 rounded-full mr-4" />
          <p className="text-base text-dark-gray font-md">Optimize your work</p>
        </div>
        <div className="flex items-center mb-4">
          <AiFillCheckCircle className="text-2xl text-bright-green border border-solid border-gray-300 rounded-full mr-4" />
          <p className="text-base text-dark-gray font-md">???</p>
        </div>
        <div className="flex items-center">
          <AiFillCheckCircle className="text-2xl text-bright-green border border-solid border-gray-300 rounded-full mr-4" />
          <p className="text-base text-dark-gray font-md">Share your idea and plan with people</p>
        </div>
      </div>
      <div className="login-right-side">
        <img src={image.kuru} className="kuru-img" alt="spinning" />
        <h1 className="font-bold text-3xl mb-4">Join our community</h1>
        <p className="mb-4 text-dark-gray font-semibold text-base">Start your free trial</p>
        <form className="flex flex-col w-full gap-4" action="#">
          <label>
            <span>Email</span>
            <Input 
              className="mt-2 py-2 pl-4"
              // status="error" 
              placeholder="Enter your email address" 
              allowClear
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Password</span>
            <Input.Password
              className="mt-2 py-2 pl-4"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              allowClear
            />
          </label>
          <label>
            <span>Confirm Password</span>
            <Input.Password
              className="mt-2 py-2 pl-4"
              placeholder="Enter again your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              allowClear
            />
          </label>
          <button onClick={() => handleSignUp()} className="cursor-pointer flex items-center justify-center rounded-md w-full mt-3 bg-bright-green py-3 text-white font-medium hover:bg-less-bright-green">
            Sign Up
          </button>
        </form>
        <div className="w-full flex items-center mt-4">
          <div className="line"></div>
          <p className="mx-2 text-[#8896AB] font-medium text-sm">OR</p>
          <div className="line"></div>
        </div>
        <div className="w-full mt-4 flex items-center justify-center border border-solid border-[#D5DAE1] rounded-md py-3 hover:border-bright-green cursor-pointer">
          <div className="flex items-center gap-3">
            <FcGoogle className="text-2xl" />
            <p className="font-base text-dark-gray font-medium">Sign up with Google</p>
          </div>
        </div>
        <p className="mt-4 text-dark-gray">
          Already have an account?&nbsp;
          <span className="text-bright-green cursor-pointer">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login