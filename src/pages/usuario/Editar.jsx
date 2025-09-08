import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UsuarioForm from "../../components/form/UsuarioForm";
import { getUsuarioPorId } from "../../slices/usuarioSlice";

const EditarUsuario = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [usuario, setUsuario] = useState({});
  console.log("id useParams", useParams());

  useEffect(() => {
    dispatch(getUsuarioPorId(id))
      .unwrap()
      .then((resultado) => {
        console.log("resultado ", resultado);
        setUsuario(resultado);
      });
  }, []);
  return (
    <div className="flex justify-center items-center  flex-col">
      <h1 className="text-sky-600 font-black text-6xl capitalize text-center">
        Editar Usuario
      </h1>
      <UsuarioForm usuario={usuario} />
    </div>
  );
};

export default EditarUsuario;
