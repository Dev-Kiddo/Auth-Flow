const Login = () => {
  return (
    <section className="mx-auto p-10 rounded-lg bg-white shadow-lg">
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
          />
        </div>

        <div className="flex justify-between mb-5">
          <div className="flex items-center gap-x-1 text-sm">
            <input type="checkbox" />
            <span>Remember me</span>
          </div>
          <div className="text-sm hover:underline cursor-pointer">Forgot password?</div>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign in</button>
      </form>

      <hr className="my-5 text-gray-300" />

      <div>
        <p className="block mb-2.5 text-sm font-medium text-heading">
          Don't have account? <span className="font-medium text-heading text-blue-600 underline cursor-pointer">Sign Up</span>
        </p>
      </div>
    </section>
  );
};

export default Login;
