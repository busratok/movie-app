import React from "react";
import AuthContextProvider from "./context/AuthContext";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import AppRouter from "./router/AppRouter";
import MovieContextProvider from "./context/MovieContext";

const App = () => {
  return (
    <AuthContextProvider>
      <MovieContextProvider>
        <ToastContainer />
        <AppRouter />
      </MovieContextProvider>
    </AuthContextProvider>
  );
};

export default App;
