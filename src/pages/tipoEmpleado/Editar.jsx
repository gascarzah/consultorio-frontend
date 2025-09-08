import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TipoEmpleadoForm from "../../components/form/TipoEmpleadoForm";

import { getTipoEmpleado } from "../../slices/tipoEmpleadoSlice";

const EditarTipoEmpleado = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [tipoEmpleado, setTipoEmpleado] = useState({});
  console.log("id EditarTipoEmpleado", id);

  useEffect(() => {
    dispatch(getTipoEmpleado(id))
      .unwrap()
      .then((resultado) => {
        console.log("resultado ", resultado);
        setTipoEmpleado(resultado);
      });
  }, []);

  return (
    <>
      <h1 className=" text-indigo-600 font-black text-3xl capitalize text-center">
        Editar TipoEmpleado
      </h1>

      <TipoEmpleadoForm tipoEmpleado={tipoEmpleado} />
    </>
  );
};

export default EditarTipoEmpleado;
