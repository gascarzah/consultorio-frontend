import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Alerta } from "../Alerta";

import {
  LISTAR_ANTECEDENTEMEDICO,
  MENSAJE_GUARDADO_EXITOSO,
  MENSAJE_MODIFICADO_EXITOSO,
  TIEMPO_REDIRECCION,
} from "../../utils";
import { modificarAntecedenteMedico, registrarAntecedenteMedico, resetState } from "../../slices/antecedenteMedicoSlice";



// const antecedenteMedicoSchema = Yup.object().shape({
//   nombres: Yup.string().required("El nombre del paciente es obligatorio"),
//   apellidoPaterno: Yup.string().required("Apellido Paterno obligatorio"),
//   apellidoMaterno: Yup.string().required("Apellido Materno obligatorio"),
//   numeroDocumento: Yup.string()
//     .max(8, "Numero de documento debe tener solo 8 digitos")
//     .required("Dni es obligatorio")
//     .matches(/^[0-9]+$/, "Dni debe tener solo numeros"),
//   email: Yup.string()
//     .email("Email no valido")
//     .required("El email es obligatorio"),
//   direccion: Yup.string().required("Direccion obligatorio"),
// });

export const AntecedenteMedicoForm = ({ antecedenteMedico,handleSubmit }) => {
 
  const [alerta, setAlerta] = useState({});
  

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleSubmit = (values, resetForm) => {
  //   console.log('antecedenteMedico init',antecedenteMedico)
  //   if (Object.keys(antecedenteMedico).length === 0) {
  //     console.log("antecedenteMedico registrarAntecedenteMedico")
  //     dispatch(registrarAntecedenteMedico(values))
  //       .unwrap()
  //       .then((resultado) => {
  //         console.log("resultado registrarAntecedenteMedico ===>> ", resultado);
  //         toast.success(MENSAJE_GUARDADO_EXITOSO);
  //         dispatch(resetState());
  //         setTimeout(() => {
  //           navigate(LISTAR_ANTECEDENTEMEDICO);
  //         }, TIEMPO_REDIRECCION);
  //       })
  //       .catch((errores) => {
  //         console.log("errores ===>> ", errores);
  //         toast.error(errores.message);
  //       });
  //   } else {
  //     console.log("antecedenteMedico modificarAntecedenteMedico")
  //     dispatch(modificarAntecedenteMedico(values))
  //       .unwrap()
  //       .then((resultado) => {
  //         console.log("resultado modificarAntecedenteMedico ===>> ", resultado);
  //         toast.success(MENSAJE_MODIFICADO_EXITOSO);
  //         dispatch(resetState());
  //         setTimeout(() => {
  //           navigate(LISTAR_ANTECEDENTEMEDICO);
  //         }, TIEMPO_REDIRECCION);
  //       })
  //       .catch((errores) => { 
  //         console.log("errores ===>> ", errores);
  //         toast.error(errores.message);
  //       });
  //   }
  // };

  const { msg } = alerta;

  return (
    <div className="w-full flex justify-center">
      
      {msg && <Alerta alerta={alerta} />}

      <Formik
        initialValues={{
          idAntecedenteMedico: antecedenteMedico?.idAntecedenteMedico,
          ectoscopia: antecedenteMedico?.ectoscopia,
          alergia: antecedenteMedico?.alergia,
          motivo: antecedenteMedico?.motivo,
          antecedentesMedicos: antecedenteMedico?.antecedentesMedicos,
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
          //resetForm();
        }}
        // validationSchema={antecedenteMedicoSchema}
      >
        {({ errors, touched, values, handleChange }) => {
          return (
            <Form className=" my-10 bg-white shadow rounded p-10 w-1/2">
              
              <div className="w-full">
                <div className="my-3">
                  <label
                    htmlFor="alergia"
                    className="uppercase text-gray-600 block font-bold"
                  >
                    Alergias
                  </label>
                  <Field
                    id="alergia"
                    type="text"
                    placeholder="Numero de documento"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                    style={{ display: "block" }}
                    name={"alergia"}
                  />
                 
                </div>
                <div className="my-3   ">
                  <label
                    htmlFor="antecedentesMedicos"
                    className="uppercase text-gray-600 block font-bold"
                  >
                    Antecedentes Medicos
                  </label>
                  <Field
                    id="antecedentesMedicos"
                    type="text"
                    placeholder="antecedentesMedicos"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                    name={"antecedentesMedicos"}
                  />
                  
                </div>
                <div className="my-3">
                  <label
                    htmlFor="ectoscopia"
                    className="uppercase text-gray-600 block font-bold"
                  >
                    Ectoscopia
                  </label>
                  <Field
                    id="ectoscopia"
                    type="text"
                    placeholder="ectoscopia"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                    name={"ectoscopia"}
                  />
                 
                </div>
                <div className="my-3 ">
                  <label
                    htmlFor="motivo"
                    className="uppercase text-gray-600 block font-bold"
                  >
                    Motivo
                  </label>
                  <Field
                    id="motivo"
                    component="textarea"
                    rows="10"
                    cols="40"
                    placeholder="Motivo"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50  "
                    name={"motivo"}
                  />
                 
                </div>

         
                 </div>
              <div className=" col-span-2 ">
                <input
                  type="submit"
                  value="Registrar AntecedenteMedico"
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
