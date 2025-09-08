import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getMenusPorRolTodo } from "../slices/rolMenuSlice";

export const Sidebar = () => {
  const { rol } = useSelector((state) => state.auth);
  const { rolMenusGen } = useSelector((state) => state.rolMenu);
  const location = useLocation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        if (rol?.idRol) {
          await dispatch(getMenusPorRolTodo(rol.idRol)).unwrap();
        }
      } catch (error) {
        console.error("Error al cargar menús:", error);
      }
    };

    fetchMenus();
  }, [dispatch, rol]);

  if (!rol?.idRol) {
    return null;
  }

  // Agrupar menús por categorías
  const menuCategories = {
    "Gestión Principal": ["/dashboard", "listar-horario", "listar-programacion", "listar-programacion-detalle"],
    "Gestión Médica": ["listar-historia-clinica", "listar-cita", "listar-consulta", "ficha-medica"],
    "Administración": ["listar-usuario", "listar-empleado", "listar-empresa"],
    "Configuración": ["listar-rol", "listar-menu", "listar-rol-menu", "listar-tipoempleado"]
  };

  const getMenuCategory = (path) => {
    for (const [category, paths] of Object.entries(menuCategories)) {
      if (paths.some(p => path.includes(p))) {
        return category;
      }
    }
    return "Otros";
  };

  const groupedMenus = rolMenusGen.reduce((acc, item) => {
    const category = getMenuCategory(item.menu.path);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <aside className={`bg-white border-r border-gray-200 h-screen ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out fixed left-0 top-0 z-50`}>
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className={`font-bold text-xl text-sky-800 ${!isOpen && 'hidden'}`}>Consultorio</h2>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>

      <nav className="mt-2 overflow-y-auto h-[calc(100vh-5rem)]">
        {Object.entries(groupedMenus).map(([category, items]) => (
          <div key={category} className="mb-4">
            {isOpen && (
              <h3 className={`px-4 py-2 text-xs uppercase tracking-wider ${
                category === "Gestión Principal" 
                  ? "font-bold text-sky-800" 
                  : "font-semibold text-gray-500"
              }`}>
                {category}
              </h3>
            )}
            <div className="space-y-1 px-2">
              {items.map((item) => (
                <Link
                  key={item.menu.path}
                  to={item.menu.path}
                  className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-200 
                    ${(item.menu.path === '/dashboard' ? 
                        location.pathname === '/dashboard' : 
                        (location.pathname === item.menu.path || 
                         (location.pathname.startsWith(item.menu.path + '/') && 
                          location.pathname.split('/').length === item.menu.path.split('/').length + 1)))
                      ? 'bg-sky-50 text-sky-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-sky-600'
                    } ${!isOpen && 'justify-center'} ${
                      category === "Gestión Principal" ? "font-medium" : ""
                    }`}
                >
                  <span className={`${!isOpen ? 'text-center w-full' : ''}`}>
                    {isOpen ? item.menu.nombre : item.menu.nombre.charAt(0)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};
