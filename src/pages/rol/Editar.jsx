import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getRol } from "../../slices/rolSlice";
import RolForm from "../../components/form/RolForm";

const EditarRol = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rol, setRol] = useState({});
  console.log("id EditarRol", id);

  useEffect(() => {
    dispatch(getRol(id))
      .unwrap()
      .then((resultado) => {
        console.log("resultado ", resultado);
        setRol(resultado);
      });
  }, []);

  return (
    <>
      <h1 className=" text-indigo-600 font-black text-3xl capitalize text-center">
        Editar Rol
      </h1>

      <RolForm rol={rol} />
    </>
  );
};

export default EditarRol;
