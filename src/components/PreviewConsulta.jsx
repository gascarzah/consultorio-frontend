import React from "react";
import { Link } from "react-router-dom";

export const PreviewConsulta = ({ cita }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 font-medium">
          {cita?.horario?.descripcion}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 bg-sky-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-sky-800">
              {cita?.historiaClinica?.nombres?.charAt(0)}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {cita?.historiaClinica?.apellidoPaterno} {cita?.historiaClinica?.apellidoMaterno}
            </div>
            <div className="text-sm text-gray-500">
              {cita?.historiaClinica?.nombres}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          cita.atendido 
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {cita.atendido ? 'Atendido' : 'Pendiente'}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        {!cita.atendido && (
          <Link
            to={`/dashboard/agregar-consulta/${cita.idCita}/${cita.historiaClinica?.idHistoriaClinica}`}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Registrar Consulta
          </Link>
        )}
      </td>
    </tr>
  );
};

