import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import DatePicker from "react-datepicker";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { useDispatch, useSelector } from "react-redux";
import { registrarProgramacion, resetState } from "../../slices/programacionSlice";
// import { getEmpleadosPorEmpresa } from "../../slices/empleadoSlice";
import { LISTAR_PROGRAMACION, MENSAJE_GUARDADO_EXITOSO, SWEET_GUARDO, SweetCrud, TIEMPO_REDIRECCION } from "../../utils";
import { SWEET_MODIFICO, SWEET_SUCESS } from "../../utils";
import { toast } from "react-toastify";

// Register the Spanish locale
registerLocale("es", es);

const programacionSchema = Yup.object().shape({
  fechaInicial: Yup.date().required("Fecha Inicial requerida"),
  fechaFinal: Yup.date().required("Fecha final requerida"),
});

export const ProgramacionForm = () => {
  const { user } = useSelector((state) => state.usuario);
  const [alerta, setAlerta] = useState({});
  const [monday, setMonday] = useState();
  const [saturday, setSaturday] = useState();
  const [sunday, setSunday] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("user state >>>>>>> ", user);
  useEffect(() => {
    getMondayOfCurrentWeek();
    // getSaturdayOfCurrentWeek();
    getSundayOfCurrentWeek();
  }, []);

  // useEffect(() => {
  //   dispatch(getEmpleadosPorEmpresa(user?.idEmpresa));
  // }, [dispatch]);

  const handleSubmit = (values, resetForm) => {
    if (!user?.idEmpresa) {
      console.error("No se pudo obtener la empresa del usuario");
      return;
    }

    dispatch(
      registrarProgramacion({
        ...values,
        idEmpresa: user.idEmpresa,
      })
    )
      .unwrap()
      .then((resultado) => {
        console.log("resultado ===>> ", resultado);
        SweetCrud(SWEET_GUARDO, MENSAJE_GUARDADO_EXITOSO);
        navigate(LISTAR_PROGRAMACION);        
      })
      .catch((errores) => {
        console.log("errores ===>> ", errores);
        SweetCrud('Error', errores.message || 'No se pudo guardar');
        setAlerta({
          msg: errores || "Error al registrar la programación",
          error: true
        });
      });
  };

  const getMondayOfCurrentWeek = () => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const monday = new Date(today.setDate(first));
    setMonday(monday);
  };

  // const getSaturdayOfCurrentWeek = () => {
  //   const today = new Date();
  //   const first = today.getDate() - today.getDay() + 1;
  //   const sixth = first + 5;

  //   const saturday = new Date(today.setDate(sixth));
  //   setSaturday(saturday);
  //   console.log("saturday", saturday);
  // };

  const getSundayOfCurrentWeek = () => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const sixth = first + 6;
    const sunday = new Date(today.setDate(sixth));
    setSunday(sunday);
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize text-center mb-8">
        Registrar Programación
      </h1>
      <Formik
        initialValues={{
          fechaInicial: monday || new Date(),
          fechaFinal: sunday || new Date(),
        }}
        validationSchema={programacionSchema}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form className="my-10 bg-white shadow rounded p-10 flex flex-col w-2/5">
            <div className="my-3">
              <label htmlFor="fechaInicial" className="uppercase text-gray-600 block font-bold">Fecha Inicial</label>
              <Field
                id="fechaInicial"
                name="fechaInicial"
                type="date"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              />
              {/* No mostrar mensaje visual aquí */}
            </div>
            <div className="my-3">
              <label htmlFor="fechaFinal" className="uppercase text-gray-600 block font-bold">Fecha Final</label>
              <Field
                id="fechaFinal"
                name="fechaFinal"
                type="date"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              />
              {/* No mostrar mensaje visual aquí */}
            </div>
            <div>
              <button
                type="submit"
                className="bg-sky-700 mb-5 w-full rounded py-3 text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
              >
                Registrar Programación
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};


