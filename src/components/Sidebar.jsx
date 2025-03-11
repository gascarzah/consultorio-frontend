import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getListaRolMenu } from "../slices/rolMenuSlice";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { rol } = useSelector((state) => state.auth);
  const { rolMenus } = useSelector((state) => state.rolMenu);

  useEffect(() => {
    if (rol?.idRol) {
      dispatch(getListaRolMenu(rol.idRol));
    }
  }, [dispatch, rol]);

  const menuItems = [
    // { path: "ficha-medica", label: "Ficha Clínica" },
    { path: "listar-horario", label: "Horario" },
    { path: "listar-programacion", label: "Programación" },
    { path: "listar-programacion-detalle", label: "Programación Personal" },
    { path: "listar-cliente", label: "Cliente" },
    { path: "listar-cita", label: "Cita" },
    { path: "listar-consulta", label: "Ver Atención" },
  ];

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >
          {item.label}
        </Link>
      ))}
    </aside>
  );
};
