import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  console.log("location:", location);

  console.log("USER:", user);

  return (
    <section className="flex justify-between bg-blue-100 p-4 rounded-lg mb-10">
      <Link to="/" className="font-bold cursor-pointer">
        🔐 AuthFlow
      </Link>
      <nav>
        <ul className="flex gap-x-4">
          {user && (
            <>
              <Link to="/dashboard">
                <li className="cursor-pointer hover:underline">Dashboard</li>
              </Link>
              <Link to="/profile">
                <li className="cursor-pointer hover:underline">Profile</li>
              </Link>
            </>
          )}
          <div>
            <li className="cursor-pointer hover:underline">
              {user ? (
                <button className="text-blue-600 underline cursor-pointer">Logout</button>
              ) : (
                <Link to="/login" className="text-green-600 underline cursor-pointer">
                  {location.pathname === "/login" ? "" : "Login"}
                </Link>
              )}
            </li>
          </div>
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
