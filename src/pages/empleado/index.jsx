import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { getEmpleadosPaginado } from "../../slices/empleadoSlice";


import { Link, Outlet } from "react-router-dom";
import {Pagination,PreviewEmpleado} from "../../components";

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
const ListarEmpleado = () => {
  const { empleados, prev, next, total } = useSelector(
    (state) => state.empleado
  );
  const [listEmpleados, setListEmpleados] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [disabledPrev, setDisabledPrev] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getEmpleadosPaginado({ page: currentPage, size: itemsPerPage }));
  }, []);

  useEffect(() => {
    if (empleados) {
      setListEmpleados(empleados);
      setDisabledPrev(prev);
      setDisabledNext(next);
    }
  }, [empleados, currentPage]);

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
      getEmpleadosPaginado({
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
          to={"agregar-empleado"}
          className="text-white bg-sky-600 text-sm p-3 rounded-md uppercase font-bold w-1/6 text-center"
        >
          Agregar Empleado
        </Link>

        <table className="min-w-full divide-y divide-gray-200 mt-4">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Apellido Paterno
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Apellido Materno
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Direccion
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {listEmpleados.length ? (
              listEmpleados.map((empleado) => (
                <PreviewEmpleado
                  key={empleado.idEmpleado}
                  empleado={empleado}
                />
              ))
            ) : (
              <tr>
                <td>
                  <p className="text-center text-gray-600 uppercase p-5">
                    No hay empleados aun
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {total > 5 && (
          <Pagination
            totalPosts={listEmpleados.length}
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

      {modal && (
        <Modal
          isOpen={modal}
          style={customStyles}
          onRequestClose={closeModal}
          contentLabel="Detalle 24/09/2021"
        >
          <AgregarCliente />
        </Modal>
      )}
    </>
  );
};

export default ListarEmpleado;
