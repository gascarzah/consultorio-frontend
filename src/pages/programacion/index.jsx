
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
eliminarProgramacion,
  getProgramacionesPaginado
} from "../../slices/programacionSlice";

import {PreviewProgramacion, Pagination} from "../../components";
import { usePagination } from "../../hook/usePagination";
import { ITEMS_POR_PAGINA, SweetDelete } from "../../utils";
import { TableHeader } from "../../components/TableHeader";

const headers = ['#','Fecha Inicio','Fecha Fin', 'Estado','']

const ListarProgramacionDetalle = () => {
  const { user } = useSelector((state) => state.usuario);
  const { programaciones, prev, next, total } = useSelector(
    (state) => state.programacion
  );
  const dispatch = useDispatch();

  console.log("user ===> ",user)

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
    setDisabledNext } = usePagination(programaciones, prev, next, getProgramacionesPaginado, user.idEmpresa)


  const handleDelete = (id) => {
    SweetDelete(id, processDelete)
  }

  const processDelete = (id) => {

    dispatch(eliminarProgramacion(id))
      .unwrap()
      .then((resultado) => {

        const programacionesActualizados = listElementos.filter(
          (h) => h.idProgramacion !== parseInt(id)
        );

        setListElementos(programacionesActualizados);

      })
      .catch((errores) => {
        console.log("Cita handleSubmit errores ===>> ", errores);


      });
  };

  return (
    <>
      <div className=" my-10 bg-white shadow rounded p-10 flex flex-col w-3/4  ">
        {/* {listElementos.length < 1 ? ( */}
        <Link
          className={`${
            listElementos.length > 0 ? "bg-sky-800" : "bg-sky-600"
          } text-white text-sm p-3 rounded-md uppercase font-bold w-1/6 text-center`}
          to={"agregar-programacion"}
          disabled={true}
        >
          Generar Programacion
        </Link>

        <table className="min-w-full divide-y divide-gray-200 mt-4">
        <TableHeader headers={headers}/>
          <tbody className="divide-y divide-gray-200">
            {/* {console.log("listElementos == > ", listElementos)} */}
            {listElementos.length ? (
              listElementos.map((programacion) => (
                <PreviewProgramacion
                  key={programacion.idProgramacion}
                  programacion={programacion}
                  handleDelete={handleDelete}
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
