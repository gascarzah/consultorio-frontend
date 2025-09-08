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
    <div className="flex justify-center items-center  flex-col ">
     

      <CitaForm cita={cita} />
    </div>
  );
};

export default EditarCita;
