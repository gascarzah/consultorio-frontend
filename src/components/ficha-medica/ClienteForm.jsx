import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Alerta } from "../Alerta";

const clienteSchema = Yup.object().shape({
  nombres: Yup.string().required("El nombre es obligatorio"),
  apellidoPaterno: Yup.string().required("Apellido paterno obligatorio"),
  apellidoMaterno: Yup.string().required("Apellido materno obligatorio"),
  numeroDocumento: Yup.string()
    .length(8, "Debe tener 8 dígitos")
    .matches(/^\d+$/, "Debe contener solo números")
    .required("Número de documento obligatorio"),
  email: Yup.string().email("Email no válido").required("El email es obligatorio"),
  direccion: Yup.string().required("La dirección es obligatoria"),
});

export const ClienteForm = ({ cliente, handleSubmit, handleGetCliente, antecedenteMedico }) => {
  const [alerta, setAlerta] = useState({});
  const { msg } = alerta;

  return (
    <div className="w-full flex justify-center">
      {msg && <Alerta alerta={alerta} />}

      <Formik
        initialValues={{
          nombres: cliente?.nombres || "",
          apellidoPaterno: cliente?.apellidoPaterno || "",
          apellidoMaterno: cliente?.apellidoMaterno || "",
          numeroDocumento: cliente?.numeroDocumento || "",
          email: cliente?.email || "",
          direccion: cliente?.direccion || "",
          alergia: antecedenteMedico?.alergia || "",
          antecedentesMedicos: antecedenteMedico?.antecedentesMedicos || "",
          ectoscopia: antecedenteMedico?.ectoscopia || "",
          motivo: antecedenteMedico?.motivo || "",
        }}
        enableReinitialize
        validationSchema={clienteSchema}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {({ values }) => (
          <Form className="bg-white shadow-md rounded-lg p-8 w-full max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Información del cliente */}
              <div className="col-span-1">
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-1" htmlFor="numeroDocumento">
                    Número de Documento
                  </label>
                  <div className="flex items-center">
                    <Field
                      id="numeroDocumento"
                      type="text"
                      name="numeroDocumento"
                      placeholder="Número de documento"
                      className="w-full p-3 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleGetCliente(values.numeroDocumento)}
                      className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      🔍
                    </button>
                  </div>
                  <ErrorMessage name="numeroDocumento" component={Alerta} className="text-red-500 text-sm mt-1" />
                </div>

                {[{ label: "Nombre", name: "nombres" },
                  { label: "Apellido Paterno", name: "apellidoPaterno" },
                  { label: "Apellido Materno", name: "apellidoMaterno" }]
                  .map(({ label, name }) => (
                    <div className="mb-4" key={name}>
                      <label className="block text-gray-700 font-bold mb-1" htmlFor={name}>
                        {label}
                      </label>
                      <Field
                        id={name}
                        type="text"
                        name={name}
                        placeholder={label}
                        className="w-full p-3 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
                      />
                      <ErrorMessage name={name} component={Alerta} className="text-red-500 text-sm mt-1" />
                    </div>
                  ))}
              </div>

              {/* Información de contacto */}
              <div className="col-span-1">
                {[{ label: "Email", name: "email", type: "email" },
                  { label: "Dirección", name: "direccion" }]
                  .map(({ label, name, type = "text" }) => (
                    <div className="mb-4" key={name}>
                      <label className="block text-gray-700 font-bold mb-1" htmlFor={name}>
                        {label}
                      </label>
                      <Field
                        id={name}
                        type={type}
                        name={name}
                        placeholder={label}
                        className="w-full p-3 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
                      />
                      <ErrorMessage name={name} component={Alerta} className="text-red-500 text-sm mt-1" />
                    </div>
                  ))}
              </div>

              {/* Antecedentes médicos */}
              <div className="col-span-1">
                {[{ label: "Alergias", name: "alergia" },
                  { label: "Antecedentes Médicos", name: "antecedentesMedicos" },
                  { label: "Ectoscopia", name: "ectoscopia" }]
                  .map(({ label, name }) => (
                    <div className="mb-4" key={name}>
                      <label className="block text-gray-700 font-bold mb-1" htmlFor={name}>
                        {label}
                      </label>
                      <Field
                        id={name}
                        type="text"
                        name={name}
                        placeholder={label}
                        className="w-full p-3 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
                      />
                      <ErrorMessage name={name} component={Alerta} className="text-red-500 text-sm mt-1" />
                    </div>
                  ))}

                {/* Campo de texto largo para motivo */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-1" htmlFor="motivo">
                    Motivo
                  </label>
                  <Field
                    id="motivo"
                    name="motivo"
                    as="textarea"
                    rows="5"
                    placeholder="Especifica el motivo"
                    className="w-full p-3 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
                  />
                  <ErrorMessage name="motivo" component={Alerta} className="text-red-500 text-sm mt-1" />
                </div>
              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Registrar Cliente
            </button>
          </Form>
        )}
      </Formik>

      <ToastContainer />
    </div>
  );
};
