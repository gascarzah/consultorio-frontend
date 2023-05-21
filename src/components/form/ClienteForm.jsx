import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Alerta } from "../Alerta";
import {
  modificarCliente,
  registrarCliente,
  resetState,
} from "../../slices/clienteSlice";

const clienteSchema = Yup.object().shape({
  nombres: Yup.string().required("El nombre del cliente es obligatorio"),
  apellidoPaterno: Yup.string().required("Apellido Paterno obligatorio"),
  apellidoMaterno: Yup.string().required("Apellido Materno obligatorio"),
  numeroDocumento: Yup.string()
    .max(8, "Numero de documento debe tener solo 8 digitos")
    .required("Dni es obligatorio")
    .matches(/^[0-9]+$/, "Dni debe tener solo numeros"),
  email: Yup.string()
    .email("Email no valido")
    .required("El email es obligatorio"),
  direccion: Yup.string().required("Direccion obligatorio"),
});

const ClienteForm = ({ cliente }) => {
  const [alerta, setAlerta] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, resetForm) => {
    if (!values.numeroDocumento) {
      dispatch(registrarCliente(values))
        .unwrap()
        .then((resultado) => {
          console.log("resultado ===>> ", resultado);
          // console.log("redirecciona login");
          dispatch(resetState());
          // toast.success(resultado.message);
          // resetForm();
          // setTimeout(() => {
          navigate("/dashboard/listar-cliente");
          // }, 3000);
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          toast.error(errores.message);
        });
    } else {
      dispatch(modificarCliente(values))
        .unwrap()
        .then((resultado) => {
          console.log("resultado modificarCliente ===>> ", resultado);
          dispatch(resetState());
          navigate("/dashboard/listar-cliente");
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
      {msg && <Alerta alerta={alerta} />}

      <Formik
        initialValues={{
          idCliente: cliente?.idCliente,
          nombres: cliente?.nombres,
          apellidoPaterno: cliente?.apellidoPaterno,
          apellidoMaterno: cliente?.apellidoMaterno,
          numeroDocumento: cliente?.numeroDocumento,
          email: cliente?.email,
          direccion: cliente?.direccion,
          historiaClinica: cliente?.historiaClinica,
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
          //resetForm();
        }}
        validationSchema={clienteSchema}
      >
        {({ errors, touched, values, handleChange }) => {
          return (
            <Form className=" my-10 bg-white shadow rounded p-10 flex flex-col w-2/5   ">
              <div className="my-3">
                <label
                  htmlFor="numeroDocumento"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Numero de Documento
                </label>
                <Field
                  id="numeroDocumento"
                  type="text"
                  placeholder="Numero de documento"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  style={{ display: "block" }}
                  name={"numeroDocumento"}
                />
                {errors.numeroDocumento && touched.numeroDocumento ? (
                  <Alerta msg={errors.numeroDocumento} error={true} />
                ) : null}
              </div>
              <div className="my-3   ">
                <label
                  htmlFor="nombre"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Nombre
                </label>
                <Field
                  id="nombres"
                  type="text"
                  placeholder="Nombres"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  name={"nombres"}
                />
                {errors.nombres && touched.nombres ? (
                  <Alerta msg={errors.nombres} error={true} />
                ) : null}
              </div>
              <div className="my-3">
                <label
                  htmlFor="apellidoPaterno"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Apellido Paterno
                </label>
                <Field
                  id="apellidoPaterno"
                  type="text"
                  placeholder="Apellido Paterno"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  name={"apellidoPaterno"}
                />
                {errors.apellidoPaterno && touched.apellidoPaterno ? (
                  <Alerta msg={errors.apellidoPaterno} error={true} />
                ) : null}
              </div>
              <div className="my-3">
                <label
                  htmlFor="apellidoMaterno"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Apellido Materno
                </label>
                <Field
                  id="apellidoMaterno"
                  type="text"
                  placeholder="Apellido Materno"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  name={"apellidoMaterno"}
                />
                {errors.apellidoMaterno && touched.apellidoMaterno ? (
                  <Alerta msg={errors.apellidoMaterno} error={true} />
                ) : null}
              </div>

              <div className="my-3">
                <label
                  htmlFor="email"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Email
                </label>
                <Field
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  name={"email"}
                />
                {errors.email && touched.email ? (
                  <Alerta msg={errors.email} error={true} />
                ) : null}
              </div>

              <div className="my-3">
                <label
                  htmlFor="direccion"
                  className="uppercase text-gray-600 block font-bold"
                >
                  direccion
                </label>
                <Field
                  id="direccion"
                  type="direccion"
                  placeholder="direccion de Registro"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  name={"direccion"}
                />
                {errors.direccion && touched.direccion ? (
                  <Alerta msg={errors.direccion} error={true} />
                ) : null}
              </div>

              <div className="">
                <input
                  type="submit"
                  value="Registrar Cliente"
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

export default ClienteForm;
