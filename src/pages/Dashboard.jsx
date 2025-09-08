import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PageContainer } from '../components/PageContainer';
import { MyCalendar } from "../components";
import { citasHoy } from "../slices/dashboardSlice";
import { toast } from "react-toastify";

const DashboardCard = ({ title, value, icon, color }) => (
  <div className="card">
    <div className={`card-body flex items-center space-x-4 ${color}`}>
      <div className="p-3 rounded-full bg-opacity-20">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [listadoCitasHoy, setListadoCitasHoy] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    getCitasHoy(today);
  }, []);

  const getCitasHoy = (today) => {
    dispatch(citasHoy(today))
      .unwrap()
      .then((resultado) => {
        setListadoCitasHoy(resultado);
      })
      .catch((errores) => {
        setListadoCitasHoy([]);
        toast.error(errores.message);
      });
  };

  const totalCitasDia = listadoCitasHoy.reduce((acc, cita) => acc + cita.citados.length, 0);

  const stats = [
    {
      title: "Citas Hoy",
      value: totalCitasDia,
      icon: (
        <svg className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-sky-50"
    },
    {
      title: "Citas Canceladas",
      value: "5",
      icon: (
        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-red-50"
    },
    {
      title: "Citas Reprogramadas",
      value: "8",
      icon: (
        <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-yellow-50"
    },
    {
      title: "Consultas Pendientes",
      value: "3",
      icon: (
        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "bg-purple-50"
    }
  ];

  return (
    <PageContainer 
      title="Dashboard"
      actionButton={
        <button className="btn-primary">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Actualizar
        </button>
      }
    >
      <div className="space-y-6">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <DashboardCard key={index} {...stat} />
          ))}
        </div>

        {/* Acceso Rápido */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/odontograma"
            className="card hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <div className="card-body flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="p-3 rounded-full bg-blue-100">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Odontograma</p>
                <p className="text-sm text-gray-600">Registro dental profesional</p>
              </div>
            </div>
          </Link>

          <Link
            to="/listar-historia-clinica"
            className="card hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <div className="card-body flex items-center space-x-4 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="p-3 rounded-full bg-green-100">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Historia Clínica</p>
                <p className="text-sm text-gray-600">Gestión de pacientes</p>
              </div>
            </div>
          </Link>

          <Link
            to="/listar-cita"
            className="card hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <div className="card-body flex items-center space-x-4 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="p-3 rounded-full bg-purple-100">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Citas</p>
                <p className="text-sm text-gray-600">Programación de citas</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Contenedor principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Calendario */}
          <div className="lg:col-span-4">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-sky-900">Calendario</h3>
              </div>
              <div className="card-body">
                <MyCalendar setFechaSelected={() => {}} getCitasHoy={getCitasHoy} />
              </div>
            </div>
          </div>

          {/* Listado de citas */}
          <div className="lg:col-span-8">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-sky-900">Citas del Día</h3>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
                  {listadoCitasHoy.map((cita, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-base font-semibold text-sky-900 mb-3">{cita.medico}</h4>
                      <ul className="space-y-2">
                        {cita.citados.map((patient, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm">
                            <span className="font-medium text-gray-900">{patient.horario}</span>
                            <span className="text-gray-600">-</span>
                            <span className="text-gray-800">{patient.paciente}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;