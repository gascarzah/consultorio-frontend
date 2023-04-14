import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  eliminarMaestra,
  getMaestrasPaginado,
} from "../../slices/maestraSlice";

import Pagination from "../../components/Pagination";
import PreviewMaestra from "../../components/PreviewMaestra";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
const ListarMaestra = () => {
  const { user } = useSelector((state) => state.usuario);
  const [listMaestras, setListMaestras] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [disabledPrev, setDisabledPrev] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);
  const [total, setTotal] = useState(0);
  // const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    buscarHoriosPaginados(currentPage, itemsPerPage);
  }, []);

  const buscarHoriosPaginados = (currentPage, itemsPerPage) => {
    dispatch(
      getMaestrasPaginado({
        idMaestra: 1,
        idEmpresa: user.idEmpresa,
        page: currentPage,
        size: itemsPerPage,
      })
    )
      .unwrap()
      .then((resultado) => {
        console.log("resultado que llega", resultado);
        setListMaestras(resultado.content);
        setDisabledPrev(resultado.prev);
        setDisabledNext(resultado.next);
        setTotal(resultado.totalElements);
      })
      .catch((errores) => {
        console.log("Cita handleSubmit errores ===>> ", errores);
        toast.error(errores.message);
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
    buscarHoriosPaginados(pagina, itemsPerPage);
  };

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    console.log("maestras id que llega", id);

    dispatch(eliminarMaestra(id))
      .unwrap()
      .then((resultado) => {
        // buscarHoriosPaginados(pagina, itemsPerPage);
        console.log("resultado que llega eliminarMaestra ", resultado);

        console.log("listMaestras ", listMaestras);
        console.log("id ", id);
        console.log("listMaestras ", listMaestras[0].idMaestra);

        const maestrasActualizados = listMaestras.filter(
          (h) => h.idMaestra !== parseInt(id)
        );

        console.log("maestrasActualizados ", maestrasActualizados);

        setListMaestras(maestrasActualizados);
        setTotal(total - 1);
        // navigate("/dashboard/listar-maestra");
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
          to={"agregar-maestra"}
          className="text-white bg-sky-600 text-sm p-3 rounded-md uppercase font-bold w-1/6 text-center"
        >
          Agregar Maestra
        </Link>

        <table className="min-w-full divide-y divide-gray-200 mt-4">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Numero
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Descripcion
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {console.log("listMaestras == > ", listMaestras)}
            {listMaestras?.length ? (
              listMaestras.map((maestra) => (
                <PreviewMaestra
                  key={maestra.idMaestra}
                  maestra={maestra}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td>
                  <p className="text-center text-gray-600 uppercase p-5">
                    No hay maestras aun
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {console.log("total ", total)}
        {console.log("listMaestras ", listMaestras)}
        {total > 5 && (
          <Pagination
            totalPosts={listMaestras.length}
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

export default ListarMaestra;
