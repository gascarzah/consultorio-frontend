import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const { rol } = useSelector((state) => state.auth);

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:2-1/6 px-5 py-10">
      {rol === "OPE" && (
        <div>
          {/* <Link
            to={"listar-tipoEmpleado"}
            className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
          >
            Tipo Empleado
          </Link> */}

          {/* <Link
            to={"listar-empleado"}
            className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
          >
            Empleado
          </Link> */}
          {/* <Link
            to={"listar-horario"}
            className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
          >
            Horario
          </Link> */}
          <Link
            to={"listar-maestra"}
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
          </Link>
        </div>
      )}
      {rol === "MED" && (
        <Link
          to={"listar-consulta"}
          className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >
          Ver Atencion
        </Link>
      )}
    </aside>
  );
};

export default Sidebar;
