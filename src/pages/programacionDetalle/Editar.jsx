import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getProgramacionDetallePorId } from "../../slices/programacionDetalleSlice";
import ProgramacionDetalleForm from "../../components/form/ProgramacionDetalleForm";

const EditarProgramacionDetalle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [programacionDetalle, setProgramacionDetalle] = useState({});
  console.log("id useParams", id);

  useEffect(() => {
    console.log("id ", id);
    dispatch(getProgramacionDetallePorId(id))
      .unwrap()
      .then((resultado) => {
        console.log("resultado ", resultado);
        setProgramacionDetalle(resultado);
      })
      .catch((errores) => {
        console.log("errores ===>> ", errores);
        // toast.error(errores.message);
      });
  }, []);

  return (
    <>
      <h1 className=" text-sky-600 font-black text-3xl capitalize text-center">
        Registrar programacion Personal
      </h1>

      <ProgramacionDetalleForm programacionDetalle={programacionDetalle} />
    </>
  );
};

export default EditarProgramacionDetalle;
