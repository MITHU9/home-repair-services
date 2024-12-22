import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useServiceContext } from "./context/Context";

function App() {
  const { theme } = useServiceContext();

  return (
    <div
      className={`min-h-screen  ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
