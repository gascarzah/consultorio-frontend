import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMaestra } from "../../slices/maestraSlice";
import MaestraForm from "../../components/form/MaestraForm";
const EditarMaestra = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [maestra, setMaestra] = useState({});
  console.log("id useParams", useParams());

  useEffect(() => {
    dispatch(getMaestra(id))
      .unwrap()
      .then((resultado) => {
        console.log("resultado ", resultado);
        setMaestra(resultado);
      });
  }, []);

  return (
    <>
      <h1 className=" text-sky-600 font-black text-3xl capitalize text-center">
        Editar Maestra
      </h1>

      <MaestraForm maestra={maestra} />
    </>
  );
};

export default EditarMaestra;
