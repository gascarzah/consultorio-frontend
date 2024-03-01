import React from "react";
import { ProgramacionDetalleForm, ProgramacionForm } from "../../components";

const AgregarProgramacion = () => {
  return (
    <>
      <h1 className=" text-sky-600 font-black text-3xl capitalize text-center">
        Registrar programacion
      </h1>

      <ProgramacionForm />
    </>
  );
};

export default AgregarProgramacion;
