import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import DatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { Alerta } from "../Alerta";
import { useDispatch, useSelector } from "react-redux";
import { registrarProgramacion } from "../../slices/programacionSlice";
import { getEmpleados, resetState } from "../../slices/empleadoSlice";

const programacionSchema = Yup.object().shape({
  fechaInicial: Yup.date().required("Fecha Inicial requerida"),
  fechaFinal: Yup.date().required("Fecha final requerida"),
});

const ProgramacionForm = () => {
  const { user } = useSelector((state) => state.usuario);
  const [alerta, setAlerta] = useState({});
  const [monday, setMonday] = useState();
  const [saturday, setSaturday] = useState();
  const [sunday, setSunday] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("user state >>>>>>> ", user);
  useEffect(() => {
    getMondayOfCurrentWeek();
    // getSaturdayOfCurrentWeek();
    getSundayOfCurrentWeek();
  }, []);

  useEffect(() => {
    dispatch(getEmpleados(1));
  }, [dispatch]);

  const handleSubmit = (values, resetForm) => {
    dispatch(
      registrarProgramacion({
        ...values,
        idEmpresa: user?.idEmpresa,
      })
    )
      .unwrap()

      .then((resultado) => {
        console.log("resultado ===>> ", resultado);

        resetForm();
        navigate("/dashboard/listar-programacion");
      })
      .catch((errores) => {
        console.log("errores ===>> ", errores);
        toast.error(errores);
      });
  };

  const getMondayOfCurrentWeek = () => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;

    const monday = new Date(today.setDate(first));
    setMonday(monday);
    console.log("monday", monday);
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
      <ToastContainer />
      {msg && <Alerta alerta={alerta} />}
      <Formik
        initialValues={{
          idProgramacion: "",
          fechaInicial: monday,
          fechaFinal: sunday,
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
          //resetForm();
        }}
        validationSchema={programacionSchema}
      >
        {({ errors, touched, values, handleChange, setFieldValue }) => {
          return (
            <Form className="my-10 bg-white shadow rounded p-10 w-2/5  ">
              <div className="flex flex-row gap-10">
                <div className="my-3 flex flex-col justify-evenly ">
                  <label
                    htmlFor="rango"
                    className="uppercase text-gray-600 block font-bold"
                  >
                    Fecha inicial
                  </label>
                  <DatePicker
                    selected={values.fechaInicial}
                    dateFormat="dd/MM/yyyy"
                    className="mt-3 p-3 border rounded-xl bg-gray-50 "
                    name="fechaInicial"
                    onChange={(date) => setFieldValue("fechaInicial", date)}
                    locale="es"
                    disabled="true"
                  />{" "}
                  {errors.fechaInicial && touched.fechaInicial ? (
                    <Alerta msg={errors.fechaInicial} error={true} />
                  ) : null}
                </div>
                <div className="my-3 flex flex-col justify-evenly ">
                  <label
                    htmlFor="rango"
                    className="uppercase text-gray-600 block font-bold"
                  >
                    Fecha Final
                  </label>
                  <DatePicker
                    selected={values.fechaFinal}
                    dateFormat="dd/MM/yyyy"
                    className=" mt-3 p-3 border rounded-xl bg-gray-50 "
                    name="fechaFinal"
                    onChange={(date) => setFieldValue("fechaFinal", date)}
                    locale="es"
                    disabled="true"
                  />
                  {errors.fechaFinal && touched.fechaFinal ? (
                    <Alerta msg={errors.fechaFinal} error={true} />
                  ) : null}
                </div>
              </div>

              <div className="flex-1">
                <input
                  type="submit"
                  value="Registrar Programacion"
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

export default ProgramacionForm;
