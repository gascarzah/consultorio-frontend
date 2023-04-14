import React from "react";
import EmpleadoForm from "../../components/form/EmpleadoForm";

const AgregarEmpleado = () => {
  return (
    <>
      <h1 className=" text-sky-600 font-black text-3xl capitalize text-center">
        Registrar Empleado
      </h1>

      <EmpleadoForm />
    </>
  );
};

export default AgregarEmpleado;
