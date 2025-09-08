import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export const PreviewProgramacionDetalle = ({ programacionDetalle }) => {
  return (
    <tr>
      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
        {programacionDetalle.diaSemana}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
        {dayjs(programacionDetalle.fecha).format("DD/MM/YYYY")}
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {programacionDetalle?.empleado?.apellidoPaterno +
          " " +
          programacionDetalle?.empleado?.apellidoMaterno +
          " " +
          programacionDetalle?.empleado?.nombres}
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
        {programacionDetalle?.registrados}
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        <div className="flex gap-2">
          <Link
            to={`editar-programacion-detalle/${programacionDetalle?.idProgramacionDetalle}`}
            className="text-blue-600 hover:text-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </Link>
        </div>
      </td>
    </tr>
  );
}; 