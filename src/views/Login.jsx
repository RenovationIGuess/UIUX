import image from "../constant/image";
import { AiFillCheckCircle } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import "./styles/Login.scss";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KrdStateContext } from "../contexts/ContextProvider";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { users, setCurrentUser } = KrdStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const findUserIndex = users.findIndex((u) => u.email === email);
    if (findUserIndex !== -1) {
      if (users[findUserIndex].password === password) {
        toast("Login Successful!");
        setCurrentUser(users[findUserIndex]);
        navigate(`/profile`);
      }
    } else toast("Invalid Email Address!");
  };

  const onFinishFailed = (errorInfo) => {
    toast("Failed:", errorInfo);
  };

  return (
    <div className="max-w-[1208px] flex gap-4 items-center z-10">
      <div className="login-left-side">
        <h1 className="font-bold text-7xl mb-8 break-words">
          Make your life easier with Kurendar!
        </h1>
        <p className="font-semibold text-dark-gray text-base mb-4">
          Scheduling & Taking Note Modern App
        </p>
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
          <p className="text-base text-dark-gray font-md">
            Share your idea and plan with people
          </p>
        </div>
      </div>
      <div className="login-right-side">
        <img src={image.kuru} className="kuru-img" alt="spinning" />
        <h1 className="font-bold text-3xl mb-6">Join our community</h1>
        <Form
          name="basic"
          className="flex flex-col w-full gap-6"
          onFinish={handleLogin}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="flex flex-col gap-2">
            <span>Email</span>
            <Form.Item
              name="email"
              className="disable-margin"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                className="py-2 pl-4"
                // status="error"
                placeholder="Enter your email address"
                allowClear
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
          </div>

          <div className="flex flex-col gap-2">
            <span>Password</span>
            <Form.Item
              name="password"
              className="disable-margin"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                className="py-2 pl-4"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                allowClear
              />
            </Form.Item>
          </div>

          <Button
            htmlType="submit"
            className="cursor-pointer flex items-center justify-center rounded-md h-10 w-full bg-bright-green py-3 text-white font-medium hover:bg-less-bright-green"
          >
            Login
          </Button>
        </Form>

        {/* <form className="flex flex-col w-full gap-4">
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
          <button
            onClick={() => handleLogin()}
            className="cursor-pointer flex items-center justify-center rounded-md w-full mt-3 bg-bright-green py-3 text-white font-medium hover:bg-less-bright-green"
          >
            Login
          </button>
        </form> */}

        <div className="w-full flex items-center mt-4">
          <div className="line"></div>
          <p className="mx-2 text-[#8896AB] font-medium text-sm">OR</p>
          <div className="line"></div>
        </div>
        <div className="w-full mt-4 flex items-center justify-center border border-solid border-[#D5DAE1] rounded-md py-3 hover:border-bright-green cursor-pointer">
          <div className="flex items-center gap-3">
            <FcGoogle className="text-2xl" />
            <p className="font-base text-dark-gray font-medium">
              Sign in with Google
            </p>
          </div>
        </div>
        <p className="mt-4 text-dark-gray">
          Doesn’t have an account?&nbsp;
          <span className="text-bright-green cursor-pointer">
            <Link to="/signup">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
