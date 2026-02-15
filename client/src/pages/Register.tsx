import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="mx-auto p-10 rounded-lg bg-blue-100 shadow-lg">
      <h1 className="mb-3 text-2xl font-semibold text-heading text-center">Create Account</h1>
      <h3 className="mb-6 text-1xl font-semibold text-heading text-center">Join us today for free!</h3>

      <form>
        <div className="mb-5 w-100">
          <label className="block mb-2.5 text-sm font-medium text-heading">Full Name</label>
          <input
            type="text"
            id="name"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Prasanth Shanmugam"
            required
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
          />
        </div>

        <div className="mb-5 w-100">
          <label className="block mb-2.5 text-sm font-medium text-heading">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Confirm Password"
            required
          />
        </div>

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
