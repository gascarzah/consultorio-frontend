import React from "react";

export const PreviewProgramacion = ({ programacion }) => {
  // console.log("programacion que llega", programacion);
  return (
    <>
      <tr>
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
          {programacion.idProgramacion}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
          {programacion.strFechaInicial}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
          {programacion.strFechaFinal}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {programacion.activo ? "ACTIVO" : "DESACTIVO"}
        </td>
      </tr>
    </>
  );
};


