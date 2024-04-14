import React, { useState } from "react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Alerta } from "../Alerta";


const clienteSchema = Yup.object().shape({
  nombres: Yup.string().required("El nombre del cliente es obligatorio"),
  apellidoPaterno: Yup.string().required("Apellido Paterno obligatorio"),
  apellidoMaterno: Yup.string().required("Apellido Materno obligatorio"),
  numeroDocumento: Yup.string()
    .max(8, "Numero de documento debe tener solo 8 digitos")
    .required("Dni es obligatorio")
    .matches(/^[0-9]+$/, "Dni debe tener solo numeros"),
  email: Yup.string()
    .email("Email no valido")
    .required("El email es obligatorio"),
  direccion: Yup.string().required("Direccion obligatorio"),
});

export const ClienteForm = ({ cliente, handleSubmit, handleGetCliente }) => {
  const [alerta, setAlerta] = useState({});
  

  const { msg } = alerta;

  return (
    <div className="w-full flex justify-center">
      {msg && <Alerta alerta={alerta} />}

      <Formik
        initialValues={{
          historiaClinica: cliente?.historiaClinica,
          nombres: cliente?.nombres,
          apellidoPaterno: cliente?.apellidoPaterno,
          apellidoMaterno: cliente?.apellidoMaterno,
          numeroDocumento: cliente?.numeroDocumento,
          email: cliente?.email,
          direccion: cliente?.direccion,
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
          //resetForm();
        }}
        validationSchema={clienteSchema}
      >
        {({ errors, touched, values, handleChange }) => {
          return (
            <Form className=" my-10 bg-white shadow rounded p-10 w-1/2">
              <div className="w-full">

              <div className="my-3   ">
                  <label
                    htmlFor="historiaClinica"
                    className="uppercase text-gray-600 block font-bold"
                  >
                    Historia Clinica
                  </label>
                  <Field
                    id="historiaClinica"
                    type="text"
                    placeholder="Historia Clinica"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                    name={"historiaClinica"}
                    
                  />

                </div>

                <div className="my-3">
                  <label
                    htmlFor="numeroDocumento"
                    className="uppercase text-gray-600 block font-bold"
                  >
                    Numero de Documento
                  </label>
                  <div className="flex">
                    <Field
                      id="numeroDocumento"
                      type="text"
                      placeholder="Numero de documento"
                      className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                      style={{ display: "block" }}
                      name={"numeroDocumento"}
                    />
                    {/* <input type="button" onClick={() =>handleGetCliente(values.numeroDocumento)} value={'buscar'} /> */}

                    <button
                      type="button"
                      onClick={() => handleGetCliente(values.numeroDocumento)}
                      
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
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    </button>
                  </div>
                  {errors.numeroDocumento && touched.numeroDocumento ? (
                    <Alerta msg={errors.numeroDocumento} error={true} />
                  ) : null}
                </div>
                <div className="my-3   ">
                  <label
                    htmlFor="nombre"
                    className="uppercase text-gray-600 block font-bold"
                  >
                    Nombre
                  </label>
                  <Field
                    id="nombres"
                    type="text"
                    placeholder="Nombres"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                    name={"nombres"}
                  />
                  {errors.nombres && touched.nombres ? (
                    <Alerta msg={errors.nombres} error={true} />
                  ) : null}
                </div>
                <div className="my-3">
                  <label
                    htmlFor="apellidoPaterno"
                    className="uppercase text-gray-600 block font-bold"
                  >
                    Apellido Paterno
                  </label>
                  <Field
                    id="apellidoPaterno"
                    type="text"
                    placeholder="Apellido Paterno"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                    name={"apellidoPaterno"}
                  />
                  {errors.apellidoPaterno && touched.apellidoPaterno ? (
                    <Alerta msg={errors.apellidoPaterno} error={true} />
                  ) : null}
                </div>
                <div className="my-3">
                  <label
                    htmlFor="apellidoMaterno"
                    className="uppercase text-gray-600 block font-bold"
                  >
                    Apellido Materno
                  </label>
                  <Field
                    id="apellidoMaterno"
                    type="text"
                    placeholder="Apellido Materno"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                    name={"apellidoMaterno"}
                  />
                  {errors.apellidoMaterno && touched.apellidoMaterno ? (
                    <Alerta msg={errors.apellidoMaterno} error={true} />
                  ) : null}
                </div>

                <div className="my-3">
                  <label
                    htmlFor="email"
                    className="uppercase text-gray-600 block font-bold"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                    name={"email"}
                  />
                  {errors.email && touched.email ? (
                    <Alerta msg={errors.email} error={true} />
                  ) : null}
                </div>

                <div className="my-3">
                  <label
                    htmlFor="direccion"
                    className="uppercase text-gray-600 block font-bold"
                  >
                    direccion
                  </label>
                  <Field
                    id="direccion"
                    type="direccion"
                    placeholder="direccion de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                    name={"direccion"}
                  />
                  {errors.direccion && touched.direccion ? (
                    <Alerta msg={errors.direccion} error={true} />
                  ) : null}
                </div>
              </div>

              <div className="  ">
                <input
                  type="submit"
                  value="Registrar Cliente"
                  className="bg-sky-700 mb-5 w-full rounded py-3 text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
      <ToastContainer />
    </div>
  );
};
