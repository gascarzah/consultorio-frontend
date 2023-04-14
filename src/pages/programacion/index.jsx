import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getProgramacionesPaginado,
  registrarProgramacion,
} from "../../slices/programacionSlice";

import Pagination from "../../components/Pagination";
import PreviewProgramacion from "../../components/PreviewProgramacion";
import { Link, useNavigate } from "react-router-dom";

const ListarProgramacionDetalle = () => {
  const { user } = useSelector((state) => state.usuario);
  const { programaciones, prev, next, total } = useSelector(
    (state) => state.programacion
  );
  const dispatch = useDispatch();

  const [listProgramaciones, setListProgramaciones] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [disabledPrev, setDisabledPrev] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);

  useEffect(() => {
    dispatch(
      getProgramacionesPaginado({
        idEmpresa: user.idEmpresa,
        page: currentPage,
        size: itemsPerPage,
      })
    );
  }, []);

  useEffect(() => {
    if (programaciones) {
      setListProgramaciones(programaciones);
      setDisabledPrev(prev);
      setDisabledNext(next);
    } else {
      setListProgramaciones([]);
    }
  }, [programaciones, currentPage]);

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
      getProgramacionesPaginado({
        page: pagina,
        size: itemsPerPage,
      })
    );
  };

  return (
    <>
      <div className=" my-10 bg-white shadow rounded p-10 flex flex-col w-3/4  ">
        {/* {listProgramaciones.length < 1 ? ( */}
        <Link
          className={`${
            listProgramaciones.length > 0 ? "bg-sky-800" : "bg-sky-600"
          } text-white text-sm p-3 rounded-md uppercase font-bold w-1/6 text-center`}
          to={"agregar-programacion"}
          disabled="true"
        >
          Generar Programacion
        </Link>
        {/* ) : (
          ""
        )} */}
        <table className="min-w-full divide-y divide-gray-200 mt-4">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Fecha Inicio
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Fecha Fin
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Estado{" "}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {console.log("listProgramaciones == > ", listProgramaciones)}
            {listProgramaciones.length ? (
              listProgramaciones.map((programacion) => (
                <PreviewProgramacion
                  key={programacion.idProgramacion}
                  programacion={programacion}
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
            totalPosts={listProgramaciones.length}
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
