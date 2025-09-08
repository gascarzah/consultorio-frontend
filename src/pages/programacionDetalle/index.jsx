import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {Pagination,PreviewProgramacionDetalle} from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { getProgramacionesDetallePaginado } from "../../slices/programacionDetalleSlice";
import { usePagination } from "../../hook/usePagination";
import { TableHeader } from "../../components/TableHeader";
import { ITEMS_POR_PAGINA } from "../../utils";

const headers = ['Día','Fecha','Doctor', 'Registrados','Acciones']

const ListarProgramacionDetalle = () => {
  const { programacionesDetalle, prev, next, total } = useSelector(
    (state) => state.programacionDetalle
  );

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
    setDisabledNext } = usePagination(programacionesDetalle, prev, next, getProgramacionesDetallePaginado)

  return (
    <>
      <div className="my-10 bg-white shadow rounded p-10 flex flex-col w-3/4">
        <Link
          className="bg-sky-600 text-white text-sm p-3 rounded-md uppercase font-bold w-1/6 text-center hover:bg-sky-700 transition-colors"
          to={"agregar-programacion-detalle"}
        >
          Generar Programación Detalle
        </Link>

        <table className="min-w-full divide-y divide-gray-200 mt-4">
          <TableHeader headers={headers}/>
          <tbody className="divide-y divide-gray-200">
            {listElementos.length ? (
              listElementos.map((programacionDetalle) => (
                <PreviewProgramacionDetalle
                  key={programacionDetalle.idProgramacionDetalle}
                  programacionDetalle={programacionDetalle}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <p className="text-center text-gray-600 uppercase p-5">
                    No hay programaciones aún
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

export default ListarProgramacionDetalle;
