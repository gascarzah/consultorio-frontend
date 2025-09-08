import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Modal from "react-modal";
import {getHistoriaClinicasPaginado
} from "../../slices/historiaClinicaSlice";
import {PreviewHistoriaClinica, Pagination} from "../../components";
import AgregarHistoriaClinica from "./Agregar";
import { ITEMS_POR_PAGINA } from "../../utils";
import { usePagination } from "../../hook/usePagination";


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
const ListarHistoriaClinica = () => {
  const data = useSelector((state) => state.historiaClinica);
  console.log('data ', data)
  const { historiaClinicas, prev, next, total } = useSelector((state) => state.historiaClinica);
  const [listHistoriaClinicas, setListHistoriaClinicas] = useState([]);

  
  const [modal, setModal] = useState(false);



   const { handlePrev,
     handleNext,
     currentPage,
     setCurrentPage,
     listElementos,
     setListElementos,
     itemsPerPage,
     disabledPrev, 
     setDisabledPrev,
     disabledNext,
     setDisabledNext } = usePagination(historiaClinicas, prev, next, getHistoriaClinicasPaginado)
 

  const handleChangeModal = (informe) => {
    setModal(!modal);
    setInforme(informe);
  };
  function closeModal() {
    setModal(false);
  }

  const deleteElement = (id) => {
    console.log('borrao')
  }

  const dispatch = useDispatch();

  return (
    <>
      <div className=" my-10 bg-white shadow rounded p-10 flex flex-col w-3/4  ">
        <Link
          to={"agregar-historia-clinica"}
          className="text-white bg-sky-600 text-sm p-3 rounded-md uppercase font-bold w-1/6 text-center"
        >
          Agregar HistoriaClinica
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
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            
            {listElementos.length ? (
              listElementos.map((historiaClinica) => (
                <PreviewHistoriaClinica
                  key={historiaClinica.numeroDocumento}
                  historiaClinica={historiaClinica}
                  deleteElement={deleteElement}
                />
              ))
            ) : (
              <tr>
                <td>
                  <p className="text-center text-gray-600 uppercase p-5">
                    No hay historiaclinicas aun
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {total && total > ITEMS_POR_PAGINA && (
          <Pagination
            totalPosts={listElementos.length}
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
          <AgregarHistoriaClinica />
        </Modal>
      )}
    </>
  );
};

export default ListarHistoriaClinica;
