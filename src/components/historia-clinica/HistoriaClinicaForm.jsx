import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Alerta } from "../Alerta";
import { LISTAR_HISTORIA_CLINICA, SWEET_GUARDO, SWEET_MODIFICO, SWEET_SUCESS, SweetCrud } from "../../utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { modificarHistoriaClinica, registrarHistoriaClinica, resetState } from "../../slices/historiaClinicaSlice";

const historiaclinicaSchema = Yup.object().shape({
  nombres: Yup.string().required("El nombre del historiaclinica es obligatorio"),
  apellidoPaterno: Yup.string().required("Apellido Paterno obligatorio"),
  apellidoMaterno: Yup.string().required("Apellido Materno obligatorio"),
  numeroDocumento: Yup.string()
    .max(8, "Numero de documento debe tener solo 8 digitos")
    .required("Dni es obligatorio")
    .matches(/^[0-9]+$/, "Dni debe tener solo numeros"),
  email: Yup.string().email("Email no valido").required("El email es obligatorio"),
  direccion: Yup.string().required("Direccion obligatorio"),
});

export const HistoriaClinicaForm = ({ historiaclinica, handleGetHistoriaClinica }) => {
  const [alerta, setAlerta] = useState({});
  const { msg } = alerta;

  const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log('valores enviados ', values)
    const action = values?.historiaClinica ? modificarHistoriaClinica : registrarHistoriaClinica;

    try {
      const resultado = await dispatch(action(values)).unwrap();
      // setHistoriaClinica(resultado);
      SweetCrud(values?.historiaClinica ? SWEET_MODIFICO : SWEET_GUARDO, SWEET_SUCESS);
      dispatch(resetState())
      navigate(LISTAR_HISTORIA_CLINICA);
    } catch (error) {
      SweetCrud('Error', error.message || 'No se pudo guardar');
    }
  };
  return (
    <>
            <h1 className="text-sky-600 font-black text-3xl capitalize text-center mb-8">
        {historiaclinica?.idHistoriaClinica ? "Editar Historia Clinica" : "Registrar Historia Clinica"}
      </h1>
      <Formik
        initialValues={{
          idHistoriaClinica: historiaclinica?.idHistoriaClinica || "",
          nombres: historiaclinica?.nombres || "",
          apellidoPaterno: historiaclinica?.apellidoPaterno || "",
          apellidoMaterno: historiaclinica?.apellidoMaterno || "",
          numeroDocumento: historiaclinica?.numeroDocumento || "",
          email: historiaclinica?.email || "",
          direccion: historiaclinica?.direccion || "",
          alergia: historiaclinica?.alergia || "",
          antecedentesMedicos: historiaclinica?.antecedentesMedicos || "",
          ectoscopia: historiaclinica?.ectoscopia || "",
          motivo: historiaclinica?.motivo || "",
        }}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
        validationSchema={historiaclinicaSchema}
      >
        {({ errors, touched, values }) => (
          
          <Form className="my-10 bg-white shadow rounded p-10 w-3/4">
            {console.log("errors ==>> ", errors)}
            {console.log("values ==>> ", values)} 
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Historia Clínica", name: "idHistoriaClinica", type: "text" , disabled: true },
                { label: "Número de Documento", name: "numeroDocumento", type: "text", isSearchable: true , disabled: false},
                { label: "Nombre", name: "nombres", type: "text" , disabled: false},
                { label: "Apellido Paterno", name: "apellidoPaterno", type: "text" , disabled: false},
                { label: "Apellido Materno", name: "apellidoMaterno", type: "text" , disabled: false},
                { label: "Email", name: "email", type: "email" , disabled: false},
                { label: "Dirección", name: "direccion", type: "text" , disabled: false},
                { label: "Alergias", name: "alergia", type: "text" , disabled: false},
                { label: "Antecedentes Médicos", name: "antecedentesMedicos", type: "text" , disabled: false},
                { label: "Ectoscopia", name: "ectoscopia", type: "text" , disabled: false},
              ].map(({ label, name, type, isSearchable, disabled }) => (
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
                      disabled={disabled}
                    />
                    {isSearchable && (
                      <button type="button" onClick={() => handleGetHistoriaClinica(values.numeroDocumento)}>
                        🔍
                      </button>
                    )}
                  </div>
                  {errors[name] && touched[name] && <Alerta msg={errors[name]} error />}
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
                {errors.motivo && touched.motivo && <Alerta msg={errors.motivo} error />}
              </div>
            </div>
            <div className="mt-5">
              <input
                type="submit"
                value="Registrar HistoriaClinica y Antecedente Médico"
                className="bg-sky-700 w-full rounded py-3 text-white font-bold uppercase hover:bg-sky-800 transition-colors"
              />
            </div>
          </Form>
        )}
      </Formik>
      {/* Eliminar ToastContainer */}
    </>
  );
};
