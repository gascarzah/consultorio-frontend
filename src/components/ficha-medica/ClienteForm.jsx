import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { SWEET_GUARDO, SWEET_MODIFICO, SWEET_SUCESS, SweetCrud } from "../../utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { modificarCliente, registrarCliente } from "../../slices/clienteSlice";

const clienteSchema = Yup.object().shape({
  nombres: Yup.string().required("El nombre del cliente es obligatorio"),
  apellidoPaterno: Yup.string().required("Apellido Paterno obligatorio"),
  apellidoMaterno: Yup.string().required("Apellido Materno obligatorio"),
  numeroDocumento: Yup.string()
    .max(8, "Numero de documento debe tener solo 8 digitos")
    .required("Dni es obligatorio")
    .matches(/^[0-9]+$/, "Dni debe tener solo numeros"),
  email: Yup.string().email("Email no valido").required("El email es obligatorio"),
  direccion: Yup.string().required("Direccion obligatorio"),
});

export const ClienteForm = ({ cliente, antecedenteMedico,  handleGetCliente }) => {
  const [alerta, setAlerta] = useState({});
  const { msg } = alerta;

  const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log('valores enviados ', values)
    const action = values?.historiaClinica ? modificarCliente : registrarCliente;

    try {
      const resultado = await dispatch(action(values)).unwrap();
      //setCliente(resultado);
      SweetCrud(values?.historiaClinica ? SWEET_MODIFICO : SWEET_GUARDO, SWEET_SUCESS);
    } catch (error) {
      SweetCrud('Error', error.message || 'No se pudo guardar');
    }
  };
  return (
    <div>
      <h1 className="text-sky-600 font-black text-3xl capitalize text-center mb-8">
        {cliente?.historiaClinica ? "Editar Cliente" : "Registrar Cliente"}
      </h1>
      {msg && toast.error(msg)}
      <Formik
        initialValues={{
          historiaClinica: cliente?.historiaClinica || "",
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
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
        validationSchema={clienteSchema}
      >
        {({ errors, touched, values }) => (
          
          <Form className="my-10 bg-white shadow rounded p-10 flex flex-col w-2/5">
            {console.log("errors ==>> ", errors)}
            {console.log("values ==>> ", values)} 
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Historia Clínica", name: "historiaClinica", type: "text" },
                { label: "Número de Documento", name: "numeroDocumento", type: "text", isSearchable: true },
                { label: "Nombre", name: "nombres", type: "text" },
                { label: "Apellido Paterno", name: "apellidoPaterno", type: "text" },
                { label: "Apellido Materno", name: "apellidoMaterno", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Dirección", name: "direccion", type: "text" },
                { label: "Alergias", name: "alergia", type: "text" },
                { label: "Antecedentes Médicos", name: "antecedentesMedicos", type: "text" },
                { label: "Ectoscopia", name: "ectoscopia", type: "text" },
              ].map(({ label, name, type, isSearchable }) => (
                <div key={name} className="my-3">
                  <label htmlFor={name} className="uppercase text-gray-600 block font-bold">
                    {label}
                  </label>
                  <div className="flex items-center gap-2">
                    <Field
                      id={name}
                      type={type}
                      placeholder={label}
                      className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                      name={name}
                    />
                    {isSearchable && (
                      <button type="button" onClick={() => handleGetCliente(values.numeroDocumento)}>
                        🔍
                      </button>
                    )}
                  </div>
                  {errors[name] && touched[name] && toast.error(errors[name])}
                </div>
              ))}
              <div className="my-3 col-span-2">
                <label htmlFor="motivo" className="uppercase text-gray-600 block font-bold">
                  Motivo
                </label>
                <Field
                  id="motivo"
                  component="textarea"
                  rows="4"
                  placeholder="Motivo"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  name="motivo"
                />
                {errors.motivo && touched.motivo && toast.error(errors.motivo)}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-sky-700 w-full rounded py-3 text-white font-bold uppercase hover:bg-sky-800 transition-colors"
              >
                Registrar Cliente y Antecedente Médico
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
