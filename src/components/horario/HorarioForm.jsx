import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  modificarHorario,
  registrarHorario,
  resetState,
} from "../../slices/horarioSlice";
import { Alerta } from "../Alerta";
import {  MENSAJE_GUARDADO_EXITOSO,MENSAJE_MODIFICADO_EXITOSO, LISTAR_HORARIO, SweetCrud, SWEET_GUARDO, SWEET_MODIFICO } from "../../utils";


const horarioSchema = Yup.object().shape({
  descripcion: Yup.string().required("La descripcion es obligatoria"),
});

export const HorarioForm = ({ horario }) => {
   const { user } = useSelector((state) => state.usuario);
  const [alerta, setAlerta] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, resetForm) => {
    console.log("values horario ",{...values, idEmpresa: user.idEmpresa})
    if (!values.idHorario) {
      
      dispatch(registrarHorario({...values, idEmpresa: user.idEmpresa}))
        .unwrap()
        .then((resultado) => {
          console.log("resultado ===>> ", resultado);
          SweetCrud(SWEET_GUARDO,MENSAJE_GUARDADO_EXITOSO)
          dispatch(resetState())
          navigate(LISTAR_HORARIO);
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          
        });
    } else {
      
      dispatch(modificarHorario(values))
        .unwrap()
        .then((resultado) => {
          console.log("resultado modificarCliente ===>> ", resultado);
          SweetCrud(SWEET_MODIFICO,MENSAJE_MODIFICADO_EXITOSO)
          dispatch(resetState())
          navigate(LISTAR_HORARIO);
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          
        });
    }
  };

  const { msg } = alerta;

  return (
    <>
      {msg && <Alerta msg={alerta.msg} error={alerta.error} />}

      <Formik
        initialValues={{
          idHorario: horario?.idHorario,
          descripcion: horario?.descripcion,
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
          //resetForm();
        }}
        validationSchema={horarioSchema}
      >
        {({ errors, touched, values, handleChange }) => {
          return (
            <Form className=" my-10 bg-white shadow rounded p-10 flex flex-col w-2/5   ">
              <div className="my-3">
                <label
                  htmlFor="descripcion"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Descripcion
                </label>
                <Field
                  id="descripcion"
                  type="text"
                  placeholder="Descripcion"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  style={{ display: "block" }}
                  name={"descripcion"}
                />
                {errors.descripcion && touched.descripcion ? (
                  <Alerta msg={errors.descripcion} error={true} />
                ) : null}
              </div>

              <div className="">
                <input
                  type="submit"
                  value="Registrar Horario"
                  className="bg-sky-700 mb-5 w-full rounded py-3 text-white font-bold
            uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
      
    </>
  );
};
