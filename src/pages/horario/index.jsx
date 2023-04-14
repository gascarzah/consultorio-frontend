import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  eliminarHorario,
  getHorariosPaginado,
} from "../../slices/horarioSlice";

import Pagination from "../../components/Pagination";
import PreviewHorario from "../../components/PreviewHorario";
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
const ListarHorario = () => {
  // const { horarios, prev, next, total } = useSelector((state) => state.horario);
  const [listHorarios, setListHorarios] = useState([]);

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
    dispatch(getHorariosPaginado({ page: currentPage, size: itemsPerPage }))
      .unwrap()
      .then((resultado) => {
        console.log("resultado que llega", resultado);
        setListHorarios(resultado.content);
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
    console.log("horarios id que llega", id);

    dispatch(eliminarHorario(id))
      .unwrap()
      .then((resultado) => {
        // buscarHoriosPaginados(pagina, itemsPerPage);
        console.log("resultado que llega eliminarHorario ", resultado);

        console.log("listHorarios ", listHorarios);
        console.log("id ", id);
        console.log("listHorarios ", listHorarios[0].idHorario);

        const horariosActualizados = listHorarios.filter(
          (h) => h.idHorario !== parseInt(id)
        );

        console.log("horariosActualizados ", horariosActualizados);

        setListHorarios(horariosActualizados);
        setTotal(total - 1);
        // navigate("/dashboard/listar-horario");
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
          to={"agregar-horario"}
          className="text-white bg-sky-600 text-sm p-3 rounded-md uppercase font-bold w-1/6 text-center"
        >
          Agregar Horario
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
            {console.log("listHorarios == > ", listHorarios)}
            {listHorarios?.length ? (
              listHorarios.map((horario) => (
                <PreviewHorario
                  key={horario.idHorario}
                  horario={horario}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td>
                  <p className="text-center text-gray-600 uppercase p-5">
                    No hay horarios aun
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {console.log("total ", total)}
        {console.log("listHorarios ", listHorarios)}
        {total > 5 && (
          <Pagination
            totalPosts={listHorarios.length}
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

      {/* {modal && (
        <Modal
          isOpen={modal}
          style={customStyles}
          onRequestClose={closeModal}
          contentLabel="Detalle 24/09/2021"
        >
          <AgregarCliente />
        </Modal>
      )} */}
    </>
  );
};

export default ListarHorario;
