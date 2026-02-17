import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function onChangeHandler(e) {
    const { value, id } = e.target;
    setFormData((formData) => ({ ...formData, [id]: value }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Register User Err");
      }

      const result = await response.json();

      toast(result.message);
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  }

  return (
    <section className="mx-auto p-10 rounded-lg bg-blue-100 shadow-lg">
      <h1 className="mb-3 text-2xl font-semibold text-heading text-center">Create Account</h1>
      <h3 className="mb-6 text-1xl font-semibold text-heading text-center">Join us today for free!</h3>

      <form onSubmit={handleOnSubmit}>
        <div className="mb-5 w-100">
          <label className="block mb-2.5 text-sm font-medium text-heading">Full Name</label>
          <input
            type="text"
            id="name"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Prasanth Shanmugam"
            required
            value={formData.name}
            onChange={onChangeHandler}
          />
        </div>

        <div className="mb-5 w-100">
          <label className="block mb-2.5 text-sm font-medium text-heading">Email</label>
          <input
            type="email"
            id="email"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Name@mail.com"
            required
            value={formData.email}
            onChange={onChangeHandler}
          />
        </div>

        <div className="mb-5 w-100">
          <label className="block mb-2.5 text-sm font-medium text-heading">Password</label>
          <input
            type="password"
            id="password"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Password"
            required
            value={formData.password}
            onChange={onChangeHandler}
          />
        </div>

        {/* <div className="mb-5 w-100">
          <label className="block mb-2.5 text-sm font-medium text-heading">Confirm Password</label>
          <input
            type="password"
            id="confirmPasssword"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Confirm Password"
            required
            value={formData.confirmPasssword}
            onChange={onChangeHandler}
          />
        </div> */}

        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create Account</button>
      </form>

      <hr className="my-5 text-gray-300" />

      <div>
        <p className="block mb-2.5 text-sm font-medium text-heading">
          Already have account?
          <Link to="/login">
            <span className="font-medium text-heading text-blue-600 underline cursor-pointer">Sign In</span>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
