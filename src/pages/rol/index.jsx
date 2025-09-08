import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Modal from "react-modal";
import { Link, Outlet } from "react-router-dom";

import {Pagination} from "../../components";
import PreviewRol from "../../components/PreviewRol";
import { getRolesPaginado } from "../../slices/rolSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};
// Modal.setAppElement("#root");
const ListarRol = () => {
  const { roles, prev, next, total } = useSelector((state) => state.rol);
  const [listRoles, setListRoles] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [disabledPrev, setDisabledPrev] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getRolesPaginado({ page: currentPage, size: itemsPerPage }));
  }, []);

  useEffect(() => {
    if (roles) {
      setListRoles(roles);
      setDisabledPrev(prev);
      setDisabledNext(next);
    }
  }, [roles, currentPage]);

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
      getRolesPaginado({
        page: pagina,
        size: itemsPerPage,
      })
    );
  };

  const dispatch = useDispatch();

  return (
    <>
      <div className=" my-10 bg-white shadow rounded p-10 flex flex-col w-3/4  ">
        <Link
          to={"agregar-rol"}
          className="text-white bg-indigo-600 text-sm p-3 rounded-md uppercase font-bold w-1/6 text-center"
        >
          Agregar Rol
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
                nombre
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {console.log("listRoles == > ", listRoles)}
            {listRoles.length ? (
              listRoles.map((rol) => <PreviewRol key={rol.idRol} rol={rol} />)
            ) : (
              <tr>
                <td>
                  <p className="text-center text-gray-600 uppercase p-5">
                    No hay roles aun
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {total > 5 && (
          <Pagination
            totalPosts={listRoles.length}
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

export default ListarRol;
