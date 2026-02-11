import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <main className="max-w-7xl bg-blue-200 mx-auto my-10 rounded-lg p-10 h-screen flex flex-col justify-between">
      <Navbar />
      <Homepage />
      <Footer />
    </main>
  );
}

export default App;
