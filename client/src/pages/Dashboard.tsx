import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Auth Context Err");
  }

  const { user } = authContext;

  // console.log("USER:", user);

  const date = new Date(user?.createdAt);
  const joinedAt = date.toLocaleDateString("en-IN");

  async function sendVerifyEmail() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/send-verification", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Send Email Verify Failed");
      }

      const data = await res.json();

      toast(data.message);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error Send Verify Email", error);
        toast(error.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  }

  return (
    <section className="flex flex-col gap-y-10">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h1 className="mb-2.5 text-lg font-medium text-heading">👋 Welcome back, {user?.name}</h1>
        <p className="mb-2.5 text-sm font-medium ">
          {user?.isEmailVerified ? (
            "✅ Your account is verified"
          ) : (
            <button onClick={sendVerifyEmail} className="underline text-blue-600 cursor-pointer">
              ❌ Please verify your account by clicking here
            </button>
          )}
        </p>
      </div>

      <div className="flex justify-evenly bg-blue-100 p-4 rounded-lg">
        <div>
          <h2 className="mb-2.5 text-lg font-medium text-heading"> 📧 Email</h2>
          <p className="text-sm font-medium text-center">{user?.email}</p>
        </div>
        <div>
          <h2 className="mb-2.5 text-lg font-medium text-heading"> 📅 Member Since</h2>
          <p className="text-sm font-medium text-center">{joinedAt}</p>
        </div>
        <div>
          <h2 className="mb-2.5 text-lg font-medium text-heading">🔑 Role</h2>
          <p className="text-sm font-medium text-center">{user?.role}</p>
        </div>
      </div>

      <div className="flex justify-between bg-blue-100 p-4 rounded-lg">
        <button className="underline p-2 cursor-pointer hover:text-blue-600">Update Profile</button>
        <button className="underline p-2 cursor-pointer hover:text-blue-600">Change Password</button>
        <button className="underline p-2 cursor-pointer hover:text-blue-600">Settings</button>
      </div>
    </section>
  );
};

export default Dashboard;
