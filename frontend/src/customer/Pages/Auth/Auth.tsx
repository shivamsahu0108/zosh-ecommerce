import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Button } from "@mui/material";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="max-w-md h-[85vh] rounded-md border shadow-lg border-gray-100">
        <img
          className="w-full rounded-t-md"
          src="https://indiabbazaar.in/wp-content/uploads/2022/12/Digital-Marketing.jpg"
          alt=""
        />
        <div className="mt-8 px-10">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="flex items-center gap-1 justify-center mt-5">
            <p>{isLogin && "Don't "} Have Account </p>
            <Button onClick={() => setIsLogin(!isLogin)} size="small">
              {isLogin ? "Create Account" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
