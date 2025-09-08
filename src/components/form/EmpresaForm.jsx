import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { modificarEmpresa, registrarEmpresa, resetState } from "../../slices/empresaSlice";
import { SWEET_GUARDO, SWEET_MODIFICO, SWEET_SUCESS, SweetCrud } from "../../utils";

const empresaSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
});

const EmpresaForm = ({ empresa }) => {
  const [alerta, setAlerta] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (values, { setSubmitting, resetForm }) => {
    if (!values.idEmpresa) {
      dispatch(registrarEmpresa(values))
        .unwrap()
        .then(() => {
          dispatch(resetState());
          SweetCrud(SWEET_GUARDO, SWEET_SUCESS);
          navigate("/dashboard/listar-empresa");
        })
        .catch((errores) => {
          console.log("Errores: ", errores);
          SweetCrud('Error', errores.message || 'No se pudo guardar');
          setAlerta({ msg: errores.message, error: true });
        });
    } else {
      dispatch(modificarEmpresa(values))
        .unwrap()
        .then(() => {
          dispatch(resetState());
          SweetCrud(SWEET_MODIFICO, SWEET_SUCESS);
          navigate("/dashboard/listar-empresa");
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
      <h1 className="text-sky-600 font-black text-3xl capitalize text-center mb-8">
        {empresa?.idEmpresa ? "Editar Empresa" : "Registrar Empresa"}
      </h1>
      <Formik
        initialValues={{ idEmpresa: empresa?.idEmpresa || "", nombre: empresa?.nombre || "" }}
        validationSchema={empresaSchema}
        onSubmit={handleOnSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => {
          useEffect(() => {
            Object.keys(errors).forEach((key) => {
              if (errors[key] && touched[key]) {
                toast.error(errors[key]);
              }
            });
          }, [errors, touched]);
          return (
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
                {/* No mostrar mensaje visual aquí */}
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-sky-700 mb-5 w-full rounded py-3 text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Procesando..." : "Registrar Empresa"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default EmpresaForm;
