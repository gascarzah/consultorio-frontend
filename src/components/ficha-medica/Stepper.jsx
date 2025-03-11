import React from "react";

const TABS = [
  { id: 1, name: "Cliente" },
  { id: 2, name: "Antecedentes" },
  { id: 3, name: "Odontograma" },
];

export const Stepper = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Stepper para pantallas grandes */}
      <div className="hidden sm:flex justify-center w-full mb-6">
        {TABS.map((tab, index) => (
          <div key={tab.id} className="flex items-center">
            {/* Paso */}
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center relative px-4 transition duration-300 ${
                activeTab === tab.id
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-500 hover:text-indigo-500"
              }`}
            >
              {/* Círculo del paso */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all ${
                  activeTab === tab.id
                    ? "border-indigo-600 bg-indigo-500 text-white"
                    : "border-gray-400 bg-white"
                }`}
              >
                {tab.id}
              </div>
              {/* Nombre del paso */}
              <span className="mt-2 text-sm">{tab.name}</span>
            </button>

            {/* Línea de conexión entre pasos */}
            {index < TABS.length - 1 && (
              <div className="w-16 h-1 bg-gray-300 mx-2 sm:mx-4">
                <div
                  className={`h-1 transition-all ${
                    activeTab > tab.id ? "bg-indigo-500 w-full" : "bg-gray-300"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stepper para móviles */}
      <div className="sm:hidden w-full mb-4">
        <select
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:ring-indigo-500 focus:border-indigo-500"
          value={activeTab}
          onChange={(e) => setActiveTab(Number(e.target.value))}
        >
          {TABS.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


