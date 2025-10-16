import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-purple-50 to-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
