import React from "react";

const Dashboard = () => {
  return (
    <section className="flex flex-col gap-y-10">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h1 className="mb-2.5 text-lg font-medium text-heading">👋 Welcome back, Prasanth</h1>
        <p className="mb-2.5 text-sm font-medium ">✅ Your account is verified</p>
      </div>

      <div className="flex justify-evenly bg-blue-100 p-4 rounded-lg">
        <div>
          <h2 className="mb-2.5 text-lg font-medium text-heading"> 📧 Email</h2>
          <p className="text-sm font-medium text-center">john@email.com</p>
        </div>
        <div>
          <h2 className="mb-2.5 text-lg font-medium text-heading"> 📅 Member Since</h2>
          <p className="text-sm font-medium text-center">Jan 15, 2025</p>
        </div>
        <div>
          <h2 className="mb-2.5 text-lg font-medium text-heading">🔑 Role</h2>
          <p className="text-sm font-medium text-center">User</p>
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
