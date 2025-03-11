import { MyCalendar, StatsCard } from "../components";

const scheduledPatients = [
  { name: "Carlos Martínez", time: "10:00 AM" },
  { name: "Lucía Rodríguez", time: "12:00 PM" },
  { name: "Juan López", time: "09:00 AM" },
  { name: "Ana García", time: "02:00 PM" },
  { name: "Pedro Jiménez", time: "11:00 AM" },
  { name: "Marta Sánchez", time: "01:00 PM" },
  { name: "Luis Fernández", time: "03:00 PM" },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Sección de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatsCard title="Pacientes del mes" value="120" />
        <StatsCard title="Citas del día" value="15" />
        <StatsCard title="Ingreso mensual" value="$3,000" />
      </div>

      {/* Contenedor principal */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendario */}
        <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <MyCalendar />
        </div>

        {/* Tarjetas de pacientes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          {[0, 3, 6].map((start, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Pacientes Agendados {index + 1}
              </h3>
              <ul className="space-y-2">
                {scheduledPatients.slice(start, start + 3).map((patient, idx) => (
                  <li key={idx} className="text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">{patient.time}</span> - {patient.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
