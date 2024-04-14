import {  useSelector } from "react-redux";
import { Link} from "react-router-dom";
import {
  eliminarHorario,
  getHorariosPaginado,
  resetState,
} from "../../slices/horarioSlice";

import {Pagination, PreviewHorario} from "../../components";

import { ITEMS_POR_PAGINA, SweetDelete } from "../../utils";
import { usePagination } from "../../hook/usePagination";
import { TableHeader } from "../../components/TableHeader";

const headers = ['DESCRIPCION','ACCIONES']

const ListarHorario = () => {

  
  const { horarios, prev, next, total, resetState } = useSelector((state) => state.horario);
  
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
    setDisabledNext } = usePagination(horarios, prev, next, getHorariosPaginado)

 

  const handleDelete = (id) => {
    SweetDelete(id, processDelete)
  }

  const processDelete = (id) => {

    dispatch(eliminarHorario(id))
      .unwrap()
      .then((resultado) => {
        const horariosActualizados = listElementos.filter(
          (h) => h.idHorario !== parseInt(id)
        );
        console.log("horariosActualizados ", horariosActualizados);
        setListElementos(horariosActualizados);
        dispatch(resetState())
      })
      .catch((errores) => {
        console.log("processDelete handleSubmit errores ===>> ", errores);
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
          <TableHeader headers={headers}/>

          <tbody className="divide-y divide-gray-200">
            {/* {console.log("listElementos == > ", listElementos)} */}
            {listElementos?.length ? (
              listElementos.map((horario) => (
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
        {/* {console.log("total ", total)}
        {console.log("listElementos ", listElementos)} */}
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

export default ListarHorario;
