import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <main style={{marginBottom:"5rem"}}>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default AuthLayout;
