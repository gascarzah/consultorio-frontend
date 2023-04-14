import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { getTipoEmpleados } from "../../slices/tipoEmpleadoSlice";
import { registrarEmpleado } from "../../slices/empleadoSlice";
import { Alerta } from "../Alerta";

const empleadoSchema = Yup.object().shape({
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
  idTipoEmpleado: Yup.string().required("Tipo empleado obligatorio"),
});

const EmpleadoForm = ({ cliente }) => {
  const [alerta, setAlerta] = useState({});
  const [listTipoEmpleados, setListTipoEmpleados] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTipoEmpleados())
      .unwrap()
      .then((resultado) => {
        console.log("resultado getTipoEmpleados ===>> ", resultado);
        setListTipoEmpleados(resultado);
      })
      .catch((errores) => {
        console.log("errores ===>> ", errores);
        setListTipoEmpleados([]);
        toast.error(errores.message);
      });
  }, []);

  const handleSubmit = (values, resetForm) => {
    if (!values.idEmpleado) {
      dispatch(registrarEmpleado(values))
        .unwrap()
        .then((resultado) => {
          console.log("resultado ===>> ", resultado);
          navigate("/dashboard/listar-empleado");
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          toast.error(errores.message);
        });
    } else {
      // dispatch(modificarEmpleado(values))
      //   .unwrap()
      //   .then((resultado) => {
      //     console.log("resultado modificarCliente ===>> ", resultado);
      //     dispatch(resetState());
      //     navigate("/dashboard/listar-empleado");
      //   })
      //   .catch((errores) => {
      //     console.log("errores ===>> ", errores);
      //     toast.error(errores.message);
      //   });
    }
  };

  const { msg } = alerta;

  return (
    <>
      {msg && <Alerta alerta={alerta} />}

      <Formik
        initialValues={{
          idEmpleado: cliente?.idCliente,
          nombres: cliente?.nombres,
          apellidoPaterno: cliente?.apellidoPaterno,
          apellidoMaterno: cliente?.apellidoMaterno,
          numeroDocumento: cliente?.numeroDocumento,
          email: cliente?.email,
          direccion: cliente?.direccion,
          idTipoEmpleado: cliente?.tipoEmpleado?.idTipoEmpleado,
          idEmpresa: 1,
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
          //resetForm();
        }}
        validationSchema={empleadoSchema}
      >
        {({ errors, touched, values, handleChange, setFieldValue }) => {
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
                  <Alerta>{errors.numeroDocumento}</Alerta>
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
                  <Alerta>{errors.nombres}</Alerta>
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
                  <Alerta>{errors.apellidoPaterno}</Alerta>
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
                  <Alerta>{errors.apellidoMaterno}</Alerta>
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
                  <Alerta>{errors.email}</Alerta>
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
                  <Alerta>{errors.direccion}</Alerta>
                ) : null}
              </div>

              <div className="my-3">
                <label
                  htmlFor="idTipoEmpleado"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Tipo Empleado
                </label>
                <select
                  name="idTipoEmpleado"
                  value={values.idTipoEmpleado}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue("idTipoEmpleado", value);
                    // handleVerificarProgramacion(value);
                  }}
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  style={{ display: "block" }}
                >
                  <option value="" label="Selecciona medico">
                    Selecciona un Medico{" "}
                  </option>

                  {listTipoEmpleados.length > 0 &&
                    listTipoEmpleados?.map((tipoEmpleado, index) => {
                      return (
                        <option
                          key={tipoEmpleado.idTipoEmpleado}
                          value={tipoEmpleado.idTipoEmpleado}
                        >
                          {tipoEmpleado.descripcion}
                        </option>
                      );
                    })}
                </select>
                {errors.idTipoEmpleado && touched.idTipoEmpleado ? (
                  <Alerta>{errors.idTipoEmpleado}</Alerta>
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

export default EmpleadoForm;
