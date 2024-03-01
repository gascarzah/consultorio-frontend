import React from "react";

import {ClienteForm} from  "../../components";

const AgregarCliente = () => {
  return (
    <>
      <h1 className=" text-sky-600 font-black text-3xl capitalize text-center">
        Registrar Cliente
      </h1>

      <ClienteForm />
    </>
  );
};

export default AgregarCliente;
