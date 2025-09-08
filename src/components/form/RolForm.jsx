import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { modificarRol, registrarRol, resetState } from "../../slices/rolSlice";
import { SWEET_GUARDO, SWEET_MODIFICO, SWEET_SUCESS, SweetCrud } from "../../utils";

const rolSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
});

const RolForm = ({ rol }) => {
  const [alerta, setAlerta] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (values, { setSubmitting, resetForm }) => {
    if (!values.idRol) {
      dispatch(registrarRol(values))
        .unwrap()
        .then(() => {
          dispatch(resetState());
          SweetCrud(SWEET_GUARDO, SWEET_SUCESS);
          navigate("/dashboard/listar-rol");
        })
        .catch((errores) => {
          console.log("Errores: ", errores);
          SweetCrud('Error', errores.message || 'No se pudo guardar');
          setAlerta({ msg: errores.message, error: true });
        });
    } else {
      dispatch(modificarRol(values))
        .unwrap()
        .then(() => {
          dispatch(resetState());
          SweetCrud(SWEET_MODIFICO, SWEET_SUCESS);
          navigate("/dashboard/listar-rol");
        })
        .catch((errores) => {
          console.log("Errores: ", errores);
          SweetCrud('Error', errores.message || 'No se pudo modificar');
          setAlerta({ msg: errores.message, error: true });
        });
    }
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={{ idRol: rol?.idRol || "", nombre: rol?.nombre || "" }}
        validationSchema={rolSchema}
        onSubmit={handleOnSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="my-10 bg-white shadow rounded p-10 flex flex-col w-2/5">
            <div className="my-3">
              <label htmlFor="nombre" className="uppercase text-gray-600 block font-bold">
                Nombre
              </label>
              <Field
                id="nombre"
                type="text"
                placeholder="nombre"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                name="nombre"
              />
              {errors.nombre && touched.nombre && toast.error(errors.nombre)}
            </div>

            <div>
              <button
                type="submit"
                className="bg-sky-700 mb-5 w-full rounded py-3 text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Procesando..." : "Registrar Rol"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RolForm;
