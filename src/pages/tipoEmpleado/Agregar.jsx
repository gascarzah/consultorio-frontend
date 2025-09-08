import React from "react";

import TipoEmpleadoForm from "../../components/form/TipoEmpleadoForm";

const AgregarTipoEmpleado = () => {
  return (
    <>
      <h1 className=" text-indigo-600 font-black text-3xl capitalize text-center">
        Registrar TipoEmpleado
      </h1>

      <TipoEmpleadoForm />
    </>
  );
};

export default AgregarTipoEmpleado;
