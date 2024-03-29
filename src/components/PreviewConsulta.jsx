import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export  const PreviewConsulta = ({ cita }) => {
  // const { rol } = useSelector((state) => state.auth);

  console.log(cita);

  return (
    <>
      <tr>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {cita?.horario?.descripcion}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {cita?.cliente?.apellidoPaterno} {cita?.cliente?.apellidoMaterno}{" "}
          {cita?.cliente?.nombres}
        </td>

        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
          {!cita.atendido && (
            <Link
              className="text-green-500 hover:text-green-700"
              to={`/dashboard/agregar-consulta/${cita.idCita}/${cita.cliente?.numeroDocumento}`}
            >
              Registrar Consulta
            </Link>
            // <Link
            //   className="text-green-500 hover:text-green-700"
            //   to={
            //     rol === "MED"
            //       ? `/dashboard/agregar-consulta/${cita.idCita}/${cita.cliente?.idCliente}`
            //       : `/dashboard/editar-cita/${cita.idCita}`
            //   }
            // >
            //   {rol === "MED" ? "Registrar Consulta" : "Editar"}
            // </Link>
          )}
        </td>
      </tr>
    </>
  );
};

