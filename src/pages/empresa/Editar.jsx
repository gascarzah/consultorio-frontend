import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getEmpresa } from "../../slices/empresaSlice";
import EmpresaForm from "../../components/form/EmpresaForm";

const EditarEmpresa = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [empresa, setEmpresa] = useState({});
  console.log("id EditarEmpresa", id);

  useEffect(() => {
    dispatch(getEmpresa(id))
      .unwrap()
      .then((resultado) => {
        console.log("resultado ", resultado);
        setEmpresa(resultado);
      });
  }, []);

  return (
    <div className="flex justify-center items-center  flex-col">

      <EmpresaForm empresa={empresa} />
    </div>
  );
};

export default EditarEmpresa;
