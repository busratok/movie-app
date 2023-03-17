import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const { signIn, signUpProvider } = useContext(AuthContext);
  const [info, setInfo] = useState(initialState);
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(info.email, info.password);
    setInfo(initialState);
  };
  console.log(info);
  return (
    <div className="overflow-hidden flex-1 h-screen justify-center items-center bg-[#23242a] dark">
      <div className={`form-container mt-[5vh] w-[380px] h-[430px]`}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3">
            Log In
          </h2>
          <div className="relative z-0 w-full mb-6 group">
            <input
              id="email"
              name="floating_email"
              type="email"
              className="peer"
              placeholder=" "
              required
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="floating_email">Email</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              id="password"
              name="floating_password"
              type="password"
              className="peer"
              placeholder=" "
              required
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="floating_password">Password</label>
          </div>
          <button className="btn-danger" type="submit">
            Log In
          </button>
          <button
            className="flex justify-between text-center btn-danger"
            type="button"
            onClick={signUpProvider}
          >
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
