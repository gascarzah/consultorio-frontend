import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, Outlet, useNavigate } from "react-router-dom";

import {Pagination} from "../../components";
import PreviewUsuario from "../../components/PreviewUsuario";
import { useDispatch } from "react-redux";
import { getUsuariosPaginado } from "../../slices/usuarioSlice";

const ListarUsuario = () => {
  const [listUsuarios, setListUsuarios] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [disabledPrev, setDisabledPrev] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);
  const [total, setTotal] = useState(0);
  // const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    buscarUsuariosPaginados(currentPage, itemsPerPage);
  }, []);

  const buscarUsuariosPaginados = (currentPage, itemsPerPage) => {
    dispatch(getUsuariosPaginado({ page: currentPage, size: itemsPerPage }))
      .unwrap()
      .then((resultado) => {
        console.log("resultado que llega", resultado);
        setListUsuarios(resultado.content);
        setDisabledPrev(resultado.prev);
        setDisabledNext(resultado.next);
        setTotal(resultado.totalElements);
      })
      .catch((errores) => {
        console.log("usuario handleSubmit errores ===>> ", errores);
        // toast.error(errores.message);
      });
  };

  const handlePrev = () => {
    console.log("handlePrev ", handlePrev);
    if (!disabledPrev) {
      const pagina = currentPage - 1;
      setCurrentPage(currentPage - 1);
      console.log("pagPrev ", currentPage);
      pagination(pagina);
    }
  };
  const handleNext = () => {
    console.log("disabledNext ", disabledNext);
    if (!disabledNext) {
      const pagina = currentPage + 1;
      setCurrentPage(pagina);
      console.log("pagNext ", currentPage);
      pagination(pagina);
    }
  };

  const pagination = (pagina) => {
    buscarUsuariosPaginados(pagina, itemsPerPage);
  };

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    console.log("Usuarios id que llega", id);

    dispatch(eliminarUsuario(id))
      .unwrap()
      .then((resultado) => {
        // buscarHoriosPaginados(pagina, itemsPerPage);
        console.log("resultado que llega eliminarUsuario ", resultado);

        console.log("listUsuarios ", listUsuarios);
        console.log("id ", id);
        console.log("listUsuarios ", listUsuarios[0].idUsuario);

        const UsuariosActualizados = listUsuarios.filter(
          (h) => h.idUsuario !== parseInt(id)
        );

        console.log("UsuariosActualizados ", UsuariosActualizados);

        setListUsuarios(UsuariosActualizados);
        setTotal(total - 1);
        // navigate("/dashboard/listar-Usuario");
      })
      .catch((errores) => {
        console.log("Cita handleSubmit errores ===>> ", errores);

        toast.error(errores.message);
      });
  };

  return (
    <>
      <div className=" my-10 bg-white shadow rounded p-10 flex flex-col w-3/4  ">
        <Link
          to={"agregar-usuario"}
          className="text-white bg-indigo-600 text-sm p-3 rounded-md uppercase font-bold w-1/6 text-center"
        >
          Agregar Usuario
        </Link>

        <table className="min-w-full divide-y divide-gray-200 mt-4">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                usuario
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                empresa
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                rol
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {console.log("listUsuarios == > ", listUsuarios)}
            {listUsuarios?.length ? (
              listUsuarios.map((usuario) => (
                <PreviewUsuario
                  key={usuario.idUsuario}
                  usuario={usuario}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td>
                  <p className="text-center text-gray-600 uppercase p-5">
                    No hay Usuarios aun
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {total > 5 && (
          <Pagination
            totalPosts={listUsuarios.length}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            handlePrev={handlePrev}
            handleNext={handleNext}
            disabledPrev={disabledPrev}
            setDisabledPrev={setDisabledPrev}
            disabledNext={disabledNext}
            setDisabledNext={setDisabledNext}
          />
        )}
      </div>
    </>
  );
};

export default ListarUsuario;
