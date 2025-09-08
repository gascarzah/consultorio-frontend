import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {HistoriaClinicaForm} from "../../components";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { getHistoriaClinica } from "../../slices/historiaClinicaSlice";

const EditarHistoriaClinica = () => {
  const { numeroDocumento } = useParams();
  const dispatch = useDispatch();
  const [historiaclinica, setHistoriaClinica] = useState({});
  console.log("id EditarHistoriaClinica", numeroDocumento);

  useEffect(() => {
    dispatch(getHistoriaClinica(numeroDocumento))
      .unwrap()
      .then((resultado) => {
        console.log("resultado ", resultado);
        setHistoriaClinica(resultado);
      });
  }, []);

  return (
    <>
      <h1 className=" text-sky-600 font-black text-3xl capitalize text-center">
        Editar HistoriaClinica
      </h1>

      <HistoriaClinicaForm historiaclinica={historiaclinica} />
    </>
  );
};

export default EditarHistoriaClinica;
