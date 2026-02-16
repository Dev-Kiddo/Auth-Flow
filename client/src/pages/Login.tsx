import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Context  Error");
  }

  const { isLoading, setisLoading, setUser } = authContext;

  function onHandelChange(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log("event:", e);

    const { id, value } = e.target;
    setFormData((formData) => ({ ...formData, [id]: value }));
  }

  async function onHandelSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      setisLoading(true);
      // const response = await fetch("http:localhost:8000/api/v1/users", {
      const response = await fetch("http://localhost:8000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login Err");
      }

      const data = await response.json();
      // console.log(data);

      const userResponse = await fetch("http://localhost:8000/api/v1/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!userResponse.ok) {
        throw new Error("Get UserData Failed");
      }

      const userData = await userResponse.json();

      setUser(userData.user);

      toast(data.message);

      navigate("/dashboard");

      console.log("Login successfull", data);
    } catch (error) {
      console.log("OnHandleSubmit:", error);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <section className="mx-auto p-10 rounded-lg bg-blue-100 shadow-lg">
      <h1 className="mb-3 text-2xl font-semibold text-heading text-center">Welcome Back!</h1>
      <h3 className="mb-6 text-1xl font-semibold text-heading text-center">Sign in to your account</h3>

      <form>
        <div className="mb-5 w-100">
          <label className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
          <input
            type="email"
            id="email"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Name@mail.com"
            required
            value={formData.email}
            onChange={(e) => onHandelChange(e)}
          />
        </div>

        <div className="mb-5 w-100">
          <label className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
          <input
            type="password"
            id="password"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) => onHandelChange(e)}
          />
        </div>

        <div className="flex justify-between mb-5">
          <div className="flex items-center gap-x-1 text-sm">
            <input type="checkbox" />
            <span>Remember me</span>
          </div>
          <div className="text-sm hover:underline cursor-pointer">Forgot password?</div>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={(e) => onHandelSubmit(e)}>
          {isLoading ? "Signing..." : "Sign in"}
        </button>
      </form>

      <hr className="my-5 text-gray-300" />

      <div>
        <p className="block mb-2.5 text-sm font-medium text-heading">
          Don't have account?{" "}
          <Link to="/register">
            <span className="font-medium text-heading text-blue-600 underline cursor-pointer">Sign Up</span>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
