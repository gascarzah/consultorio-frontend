import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getListaRolMenu } from "../slices/rolMenuSlice";
export const Sidebar = () => {
  const { rol } = useSelector((state) => state.auth);
  const { rolMenus } = useSelector((state) => state.rolMenu);
  // const [menus, setMenus] = useState([])
  console.log(rol);

  useEffect(() => {
    // console.log("una sola vez");
    dispatch(getListaRolMenu(rol.idRol));
  }, []);

  const dispatch = useDispatch();

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:2-1/6 px-5 py-10">
      {/* {rol === "OPE" && ( */}
      <div>
        {rolMenus?.map((item) => (
          <Link
            key={item.menu.idMenu}
            to={item.menu.path}
            className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
          >
            {/* {console.log(item)} */}
            {item.menu.nombre}
          </Link>
        ))}
{/* <Link
          to={"ficha-medica"}
          className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >
          Ficha clinica
        </Link> */}
   
        {/* <Link
          to={"listar-horario"}
          className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >
          Horario
        </Link>

        <Link
          to={"listar-programacion"}
          className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >
          Programacion
        </Link>
        <Link
          to={"listar-programacion-detalle"}
          className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >
          Programacion Personal
        </Link>

        <Link
          to={"listar-cliente"}
          className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >
          Cliente
        </Link>

        <Link
          to={"listar-cita"}
          className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >
          Cita
        </Link>*/}
      </div>
      {/* // )}
      // {rol === "MED" && ( */}
      {/* <Link
        to={"listar-consulta"}
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Ver Atencion
      </Link> */}
      {/* // )} */}
    </aside>
  );
};

