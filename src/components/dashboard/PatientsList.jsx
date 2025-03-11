export const PatientsList = () => {
  const patients = [
    { name: "Juan Pérez", age: 32 },
    { name: "Ana López", age: 25 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Lista de Pacientes</h2>
      <ul>
        {patients.map((patient, index) => (
          <li key={index} className="py-2">
            {patient.name} - {patient.age} años
          </li>
        ))}
      </ul>
    </div>
  );
};