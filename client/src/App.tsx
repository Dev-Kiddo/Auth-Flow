import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <main className="max-w-7xl bg-blue-200 mx-auto my-10 rounded-lg p-10 flex flex-col justify-between">
      <Navbar />
      {/* <Homepage /> */}
      {/* <Login /> */}
      <Register />
      <Footer />
    </main>
  );
}

export default App;
