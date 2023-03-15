import React from "react";
import AuthContextProvider from "./context/AuthContext";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AuthContextProvider>
      <ToastContainer />
      <Register />
    </AuthContextProvider>
  );
};

export default App;
