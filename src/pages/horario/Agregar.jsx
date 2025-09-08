import React from "react";
import {HorarioForm} from "../../components";

const AgregarHorario = () => {
  return (
    <div className="flex justify-center items-center  flex-col">
      <h1 className=" text-sky-600 font-black text-3xl capitalize text-center">
        Registrar Horario
      </h1>
      <HorarioForm />
    </div>
  );
};

export default AgregarHorario;
