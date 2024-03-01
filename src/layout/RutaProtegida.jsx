import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";



import "react-toastify/dist/ReactToastify.css";
import { Header, Sidebar } from "../components";

const RutaProtegida = ({ props }) => {
  const { logged } = useSelector((state) => state.auth);

  return (
    <>
      {logged ? (
        <div className="bg-gray-100">
          <Header />

          <div className="flex ">
            <Sidebar />

            <main className="flex flex-col items-center w-full ">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RutaProtegida;
