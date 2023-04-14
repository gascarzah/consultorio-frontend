import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { Link, Outlet } from "react-router-dom";
import { getCitasPaginado } from "../../slices/citaSlice";

import Pagination from "../../components/Pagination";
import PreviewCita from "../../components/PreviewCita";

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
const ListarCita = () => {
  const { citas, prev, next, total } = useSelector((state) => state.cita);
  const [listCitas, setListCitas] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [disabledPrev, setDisabledPrev] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getCitasPaginado({ page: currentPage, size: itemsPerPage }));
  }, []);

  useEffect(() => {
    if (citas) {
      setListCitas(citas);
      setDisabledPrev(prev);
      setDisabledNext(next);
    }
  }, [citas, currentPage]);

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
    dispatch(
      getCitasPaginado({
        page: pagina,
        size: itemsPerPage,
      })
    );
  };

  const handleChangeModal = (informe) => {
    setModal(!modal);
    setInforme(informe);
  };
  function closeModal() {
    setModal(false);
  }

  const dispatch = useDispatch();

  return (
    <>
      <div className=" my-10 bg-white shadow rounded p-10 flex flex-col w-3/4  ">
        <Link
          to={"agregar-cita"}
          className="text-white bg-sky-600 text-sm p-3 rounded-md uppercase font-bold w-1/6 text-center"
        >
          Agregar Cita
        </Link>

        <table className="min-w-full divide-y divide-gray-200 mt-4">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Dia
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Fecha
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Horario
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Cliente
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Doctor
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Especialidad
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {console.log("listCitas == > ", listCitas)}
            {listCitas.length ? (
              listCitas.map((cita) => (
                <PreviewCita key={cita.idCita} cita={cita} />
              ))
            ) : (
              <tr>
                <td>
                  <p className="text-center text-gray-600 uppercase p-5">
                    No hay citas aun
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {total > 5 && (
          <Pagination
            totalPosts={listCitas.length}
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

export default ListarCita;
