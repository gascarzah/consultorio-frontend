import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";


import { getCita } from "../../slices/citaSlice";
import { CitaForm } from "../../components";

const EditarCita = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [cita, setCita] = useState({});
  console.log("id EditarCliente", id);

  useEffect(() => {
    dispatch(getCita(id))
      .unwrap()
      .then((resultado) => {
        console.log("resultado getCita ", resultado);
        setCita(resultado);
      });
  }, []);
  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize text-center">
        Editar Cita
      </h1>

      <CitaForm cita={cita} />
    </>
  );
};

export default EditarCita;
