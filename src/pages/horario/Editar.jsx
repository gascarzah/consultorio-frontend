import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getHorario } from "../../slices/horarioSlice";
import HorarioForm from "../../components/form/HorarioForm";
const EditarHorario = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [horario, setHorario] = useState({});
  console.log("id useParams", useParams());

  useEffect(() => {
    dispatch(getHorario(id))
      .unwrap()
      .then((resultado) => {
        console.log("resultado ", resultado);
        setHorario(resultado);
      });
  }, []);

  return (
    <>
      <h1 className=" text-sky-600 font-black text-3xl capitalize text-center">
        Editar Horario
      </h1>

      <HorarioForm horario={horario} />
    </>
  );
};

export default EditarHorario;
