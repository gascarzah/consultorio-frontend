import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components";
import "react-toastify/dist/ReactToastify.css";

const RutaProtegida = () => {
  const { logged } = useSelector((state) => state.auth);

  if (!logged) return <Navigate to="/" />;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-grow flex flex-col items-center p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RutaProtegida;
