import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
const Register = () => {
  const { createUser, signUpProvider } = useContext(AuthContext);
  const [info, setInfo] = useState(initialState);
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = `${info.firstName} ${info.lastName}`;
    createUser(info.email, info.password, displayName);
    setInfo(initialState);
  };
  console.log(info);
  return (
    <div className="overflow-hidden flex-grow justify-center items-center dark:bg-gray-dark-main">
      <div className={`form-container mt-[5vh] w-[380px] h-[580px]`}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3">
            Sign Up
          </h2>
          <div className="relative z-0 w-full mb-6 group">
            <input
              id="firstName"
              type="text"
              name="floating_text"
              className="peer"
              placeholder=" "
              required
              onChange={(e) =>
                setInfo({ ...info, [e.target.id]: e.target.value })
              }
            />
            <label htmlFor="floating_email">First Name</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              id="lastName"
              name="floating_text"
              type="text"
              required
              className="peer"
              placeholder=" "
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="floating_text">Last Name</label>
          </div>
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
            Register
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

export default Register;
