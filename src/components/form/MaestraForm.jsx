import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import {
  modificarMaestra,
  registrarMaestra,
  resetState,
} from "../../slices/maestraSlice";
import { Alerta } from "../Alerta";

const maestraSchema = Yup.object().shape({
  descripcion: Yup.string().required("La descripcion es obligatoria"),
});

const MaestraForm = ({ maestra }) => {
  const { user } = useSelector((state) => state.usuario);
  const [alerta, setAlerta] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, resetForm) => {
    const datos = {
      ...values,
      idEmpresa: user.idEmpresa,
      idMaestraPadre: 1,
      estado: true,
    };
    if (!datos.idMaestra) {
      dispatch(registrarMaestra(datos))
        .unwrap()
        .then((resultado) => {
          console.log("resultado ===>> ", resultado);

          dispatch(resetState());

          navigate("/dashboard/listar-maestra");
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          toast.error(errores.message);
        });
    } else {
      console.log("antes de slice ", datos);
      dispatch(modificarMaestra(datos))
        .unwrap()
        .then((resultado) => {
          console.log("resultado modificarCliente ===>> ", resultado);
          dispatch(resetState());
          navigate("/dashboard/listar-maestra");
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          toast.error(errores.message);
        });
    }
  };

  const { msg } = alerta;

  return (
    <>
      {msg && <Alerta msg={alerta.msg} error={alerta.error} />}

      <Formik
        initialValues={{
          idMaestra: maestra?.idMaestra,
          descripcion: maestra?.descripcion,
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
          //resetForm();
        }}
        validationSchema={maestraSchema}
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
                  value="Registrar Maestra"
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

export default MaestraForm;
