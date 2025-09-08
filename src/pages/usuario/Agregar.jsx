// import React from "react";
import UsuarioForm from "../../components/form/UsuarioForm";

const AgregarUsuario = () => {
  return (
    <div className="flex justify-center items-center  flex-col">
      <h1 className="text-sky-600 font-black text-5xl capitalize text-center">
        Crea cuenta
      </h1>
      <UsuarioForm />
    </div>
  );
};

export default AgregarUsuario;
