import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="my-20 flex items-center gap-x-20">
      <div className="flex flex-col gap-y-10 py-4">
        <h1 className="text-4xl font-medium">Secure Authentication Made Simple</h1>

        <h4 className="text-3xl font-normal">
          A complete MERN stack authentication system with JWT, Refresh Tokens, Email Verification, and Password Recovery built for real-world applications.
        </h4>

        <p className="text-lg">
          Auth Flow is a full-featured authentication system built using the MERN stack (MongoDB, Express, React, Node.js). It provides secure login and registration workflows
          using JWT authentication with Access & Refresh Tokens. Designed with security best practices, it includes email verification, password reset functionality, protected
          routes, and token-based session management.
        </p>

        <div className="flex gap-x-4">
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-white font-medium cursor-pointer">Get Started</button>
          <Link to="/login" className="px-4 py-2 bg-indigo-500 rounded-lg text-white font-medium cursor-pointer">
            Login
          </Link>
        </div>
      </div>

      <div className="w-400">
        <img className="w-full rounded-lg" src="/hero-banner.svg" alt="hero-banner" />
      </div>
    </section>
  );
};

export default Hero;
