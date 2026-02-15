import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  // console.log("USER:", user);

  return (
    <section className="flex justify-between bg-blue-100 p-4 rounded-lg mb-10">
      <Link to="/" className="font-bold cursor-pointer">
        🔐 AuthFlow
      </Link>
      <nav>
        <ul className="flex gap-x-4">
          <Link to="/dashboard">
            <li className="cursor-pointer hover:underline">Dashboard</li>
          </Link>
          <li className="cursor-pointer hover:underline">Profile</li>
          <li className="cursor-pointer hover:underline">Logout</li>
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
