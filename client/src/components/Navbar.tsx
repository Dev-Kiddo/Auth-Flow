import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log("location:", location);
  // console.log("USER:", user);

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:8000/api/v1/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout Err");
      }

      const result = await response.json();

      toast(result.message);

      setUser(null);

      navigate("/");

      console.log(result);
    } catch (error) {
      console.error(error);
      toast(error.message);
    }
  }

  return (
    <section className="flex justify-between bg-blue-100 p-4 rounded-lg mb-10">
      <Link to="/" className="font-bold cursor-pointer">
        🔐 AuthFlow
      </Link>
      <nav>
        <ul className="flex gap-x-4">
          {user && (
            <>
              <NavLink to="/dashboard" className="cursor-pointer hover:underline [&.active]:font-bold">
                Dashboard
              </NavLink>
              {/* <li className="cursor-pointer hover:underline [&.active]:font-bold">Dashboard</li> */}

              <Link to="/profile">
                <li className="cursor-pointer hover:underline">Profile</li>
              </Link>
            </>
          )}
          <div>
            <li className="cursor-pointer hover:underline">
              {user ? (
                <button className="text-blue-600 underline cursor-pointer" onClick={handleLogout}>
                  Logout
                </button>
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
