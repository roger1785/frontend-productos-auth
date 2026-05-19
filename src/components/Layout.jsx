import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <main className="container">
      <h1>Clase 28</h1>

      <Navbar />

      <Outlet />
    </main>
  );
}

export default Layout;
