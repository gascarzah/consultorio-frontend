
import {  useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { getCitasPaginado, resetState } from "../../slices/citaSlice";

import {Pagination,PreviewCita} from "../../components";
import { usePagination } from "../../hook/usePagination";
import { TableHeader } from "../../components/TableHeader";
import { ITEMS_POR_PAGINA } from "../../utils";


const headers = ['Dia','Fecha','Horario','Cliente','Doctor','Especialidad','Acciones']

const ListarCita = () => {

  const { citas, prev, next, total, resetState } = useSelector((state) => state.cita);


   
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
    setDisabledNext } = usePagination(citas, prev, next, getCitasPaginado)
  
   
  
  return (
    <>
      <div className=" my-10 bg-white shadow rounded p-10 flex flex-col w-full">
        <Link
          to={"agregar-cita"}
          className="text-white bg-sky-600 text-sm p-3 rounded-md uppercase font-bold w-1/6 text-center"
        >
          Agregar Cita
        </Link>

        <table className="min-w-full divide-y divide-gray-200 mt-4">
        <TableHeader headers={headers}/>
          <tbody className="divide-y divide-gray-200">
            {console.log("listElementos == > ", listElementos)}
            {listElementos.length ? (
              listElementos.map((cita) => (
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


    </>
  );
};

export default ListarCita;
