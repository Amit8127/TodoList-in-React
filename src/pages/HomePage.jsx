import React from "react";
import { Link } from "react-router-dom";
import hello from "../assets/hello.gif";
import profile from "../assets/profile.png";

const HomePage = () => {
  return (
    <>
      <nav className="bg-dark">
        <h2 className="logo">Todo App</h2>
        <div className="d-flex">
          <img src={profile} alt="profile" className="me-2" height={25} />
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <img src={hello} alt="hello gif" height={300} />
      <h1 className="">Welcome To Your App</h1>
    </>
  );
};

export default HomePage;
