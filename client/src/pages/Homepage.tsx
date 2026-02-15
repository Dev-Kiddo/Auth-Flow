import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Homepage = () => {
  return (
    <>
      <main className="max-w-7xl bg-blue-200 mx-auto my-10 rounded-lg p-10 flex flex-col justify-between">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default Homepage;
