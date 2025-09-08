import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { modificarMenu, registrarMenu, resetState } from "../../slices/menuSlice";
import { SWEET_GUARDO, SWEET_MODIFICO, SWEET_SUCESS, SweetCrud } from "../../utils";

const menuSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
  path: Yup.string().required("El path es obligatorio"),
});

const MenuForm = ({ menu }) => {
  const [alerta, setAlerta] = useState({});
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = { ...values, activo: checked };
    if (!values.idMenu) {
      dispatch(registrarMenu(payload))
        .unwrap()
        .then(() => {
          dispatch(resetState());
          SweetCrud(SWEET_GUARDO, SWEET_SUCESS);
          navigate("/dashboard/listar-menu");
        })
        .catch((errores) => {
          console.log("Errores: ", errores);
          SweetCrud('Error', errores.message || 'No se pudo guardar');
          setAlerta({ msg: errores.message, error: true });
        });
    } else {
      dispatch(modificarMenu(payload))
        .unwrap()
        .then(() => {
          dispatch(resetState());
          SweetCrud(SWEET_MODIFICO, SWEET_SUCESS);
          navigate("/dashboard/listar-menu");
        })
        .catch((errores) => {
          console.log("Errores: ", errores);
          SweetCrud('Error', errores.message || 'No se pudo modificar');
          setAlerta({ msg: errores.message, error: true });
        });
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (menu) {
      setChecked(menu.activo);
    }
  }, [menu]);

  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize text-center mb-8">
        {menu?.idMenu ? "Editar Menú" : "Registrar Menú"}
      </h1>
      <Formik
        initialValues={{
          idMenu: menu?.idMenu || "",
          nombre: menu?.nombre || "",
          path: menu?.path || "",
        }}
        validationSchema={menuSchema}
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
                  placeholder="Nombre"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  name="nombre"
                />
                {/* No mostrar mensaje visual aquí */}
              </div>
              <div className="my-3">
                <label htmlFor="path" className="uppercase text-gray-600 block font-bold">
                  Path
                </label>
                <Field
                  id="path"
                  type="text"
                  placeholder="Path"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  name="path"
                />
                {/* No mostrar mensaje visual aquí */}
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-sky-700 mb-5 w-full rounded py-3 text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Procesando..." : "Registrar Menú"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default MenuForm;
