import React from "react";
import AuthContextProvider from "./context/AuthContext";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <AuthContextProvider>
      <ToastContainer />
      <AppRouter />
    </AuthContextProvider>
  );
};

export default App;
