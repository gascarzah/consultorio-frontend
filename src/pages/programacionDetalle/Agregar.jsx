import React from "react";
import {ProgramacionDetalleForm} from "../../components";

const AgregarProgramacionDetalle = () => {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1 className=" text-sky-600 font-black text-3xl capitalize text-center">
        Registrar programacion Personal
      </h1>
      <ProgramacionDetalleForm />
    </div>
  );
};

export default AgregarProgramacionDetalle;
