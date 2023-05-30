import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { getProgramacionesDetallePaginado } from "../../slices/programacionDetalleSlice";
import PreviewProgramacionDetalle from "../../components/PreviewProgramacionDetalle";

const ListarProgramacionDetalle = () => {
  const { programacionesDetalle, prev, next, total } = useSelector(
    (state) => state.programacionDetalle
  );
  const dispatch = useDispatch();

  const [listProgramacionesDetalle, setListProgramacionesDetalle] = useState(
    []
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [disabledPrev, setDisabledPrev] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);

  useEffect(() => {
    dispatch(
      getProgramacionesDetallePaginado({
        page: currentPage,
        size: itemsPerPage,
      })
    );
  }, []);

  useEffect(() => {
    if (programacionesDetalle) {
      setListProgramacionesDetalle(programacionesDetalle);
      setDisabledPrev(prev);
      setDisabledNext(next);
    } else {
      setListProgramacionesDetalle([]);
    }
  }, [programacionesDetalle, currentPage]);

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
      getProgramacionesDetallePaginado({
        page: pagina,
        size: itemsPerPage,
      })
    );
  };

  return (
    <>
      <div className=" my-10 bg-white shadow rounded p-10 flex flex-col w-3/4  ">
        <Link
          className="bg-sky-600 text-white text-sm p-3 rounded-md uppercase font-bold w-1/6 text-center"
          to={"agregar-programacion-detalle"}
          disabled="true"
        >
          Generar Programacion Detalle
        </Link>

        <table className="min-w-full divide-y divide-gray-200 mt-4">
          <thead className="bg-gray-50">
            <tr>
              {/* <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                #
              </th> */}
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
                Doctor
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Registrados
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {console.log(
              "listProgramacionesDetalle == > ",
              listProgramacionesDetalle
            )}
            {listProgramacionesDetalle.length ? (
              listProgramacionesDetalle.map((programacionDetalle) => (
                <PreviewProgramacionDetalle
                  key={programacionDetalle.idProgramacionDetalle}
                  programacionDetalle={programacionDetalle}
                />
              ))
            ) : (
              <tr>
                <td>
                  <p className="text-center text-gray-600 uppercase p-5">
                    No hay programaciones aun
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {total > 5 && (
          <Pagination
            totalPosts={listProgramacionesDetalle.length}
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
