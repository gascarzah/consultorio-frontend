import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClienteForm from "../../components/form/ClienteForm";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { getCliente } from "../../slices/clienteSlice";

const EditarCliente = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [cliente, setCliente] = useState({});
  console.log("id EditarCliente", id);

  useEffect(() => {
    dispatch(getCliente(id))
      .unwrap()
      .then((resultado) => {
        console.log("resultado ", resultado);
        setCliente(resultado);
      });
  }, []);

  return (
    <>
      <h1 className=" text-sky-600 font-black text-3xl capitalize text-center">
        Editar Cliente
      </h1>

      <ClienteForm cliente={cliente} />
    </>
  );
};

export default EditarCliente;
