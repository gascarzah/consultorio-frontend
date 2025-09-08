import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


import { modificarTipoEmpleado, registrarTipoEmpleado, resetState } from "../../slices/tipoEmpleadoSlice";
import { SWEET_GUARDO, SWEET_MODIFICO, SWEET_SUCESS, SweetCrud } from "../../utils";

const tipoEmpleadoSchema = Yup.object().shape({
  descripcion: Yup.string().required("La descripción es obligatoria"),
});

const TipoEmpleadoForm = ({ tipoEmpleado }) => {
  const [alerta, setAlerta] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (values, { setSubmitting }) => {
    if (!values.idTipoEmpleado) {
      dispatch(registrarTipoEmpleado(values))
        .unwrap()
        .then(() => {
          dispatch(resetState());
          SweetCrud(SWEET_GUARDO, SWEET_SUCESS);
          navigate("/dashboard/listar-tipoempleado");
        })
        .catch((errores) => {
          console.log("Errores: ", errores);
          SweetCrud('Error', errores.message || 'No se pudo guardar');
          
        });
    } else {
      dispatch(modificarTipoEmpleado(values))
        .unwrap()
        .then(() => {
          dispatch(resetState());
          SweetCrud(SWEET_MODIFICO, SWEET_SUCESS);
          navigate("/dashboard/listar-tipoempleado");
        })
        .catch((errores) => {
          console.log("Errores: ", errores);
          SweetCrud('Error', errores.message || 'No se pudo modificar');
          
        });
    }
    setSubmitting(false);
  };

  return (
    <>

      <Formik
        initialValues={{ idTipoEmpleado: tipoEmpleado?.idTipoEmpleado || "", descripcion: tipoEmpleado?.descripcion || "" }}
        validationSchema={tipoEmpleadoSchema}
        onSubmit={handleOnSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="my-10 bg-white shadow rounded p-10 flex flex-col w-2/5">
            <div className="my-3">
              <label htmlFor="descripcion" className="uppercase text-gray-600 block font-bold">
                Descripción
              </label>
              <Field
                id="descripcion"
                type="text"
                placeholder="Descripción"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                name="descripcion"
              />
              
            </div>

            <div>
              <button
                type="submit"
                className="bg-sky-700 mb-5 w-full rounded py-3 text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Procesando..." : "Registrar TipoEmpleado"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TipoEmpleadoForm;
