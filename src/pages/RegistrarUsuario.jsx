import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { registrarUsuario, resetState } from "../slices/usuarioSlice";
import { getRoles } from "../slices/rolSlice";
import { getEmpresas } from "../slices/empresaSlice";
import { Alerta } from "../components";
import { toast } from "react-toastify";

const nuevoUsuarioSchema = Yup.object().shape({
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
  password: Yup.string().required("Password obligatorio"),

  password2: Yup.string().required("Repetir Password obligatorio"),
  idRol: Yup.string().required("Seleccionar un rol"),
  idEmpresa: Yup.string().required("Seleccionar una empresa"),
});

const RegistrarUsuario = () => {
  const [alerta, setAlerta] = useState({});

  const { roles } = useSelector((state) => state.rol);
  const { empresas } = useSelector((state) => state.empresa);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getRoles());

    dispatch(getEmpresas());
  }, [dispatch]);

  const handleSubmit = (values, resetForm) => {
    console.log("values ", values);
    const { password, password2 } = values;

    if (password !== password2) {
      console.log("passwords no son iguales");
      setAlerta({
        msg: "passwords no son iguales",
        error: true,
      });

      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });

      return;
    }

    dispatch(registrarUsuario(values))
      .unwrap()

      .then((resultado) => {
        console.log("resultado ===>> ", resultado);
        console.log("redirecciona login");

        dispatch(resetState());
        toast.success(resultado.message);
        resetForm();
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((errores) => {
        console.log("errores ===>> ", errores);
        // toast.error(errores.message);
        setAlerta({
          msg: errores,
          error: true,
        });
      });
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize text-center">
        Crea cuenta
      </h1>

      {msg && <Alerta msg={msg} error={true} />}
      <Formik
        initialValues={{
          nombres: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          numeroDocumento: "",
          email: "",
          password: "",
          password2: "",
          idRol: "",
          idEmpresa: "",
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
          //resetForm();
        }}
        validationSchema={nuevoUsuarioSchema}
      >
        {({ errors, touched, values, handleChange } = props) => {
          return (
            <Form className="my-10 bg-white shadow rounded p-10 ">
              {console.log(values)}
              {console.log(errors)}
              <div className="my-5">
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
              <div className="my-5">
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
              <div className="my-5">
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

              <div className="my-5">
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
                  name={"numeroDocumento"}
                />
                {errors.numeroDocumento && touched.numeroDocumento ? (
                  <Alerta msg={errors.numeroDocumento} error={true} />
                ) : null}
              </div>
              <div className="my-5">
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
              <div className="my-5">
                <label
                  htmlFor="password"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Password
                </label>
                <Field
                  id="password"
                  type="password"
                  placeholder="Password de Registro"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  name={"password"}
                />
                {errors.password && touched.password ? (
                  <Alerta msg={errors.password} error={true} />
                ) : null}
              </div>
              <div className="my-5">
                <label
                  htmlFor="password2"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Password
                </label>
                <Field
                  id="password2"
                  type="password"
                  placeholder="Password de Registro"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  name={"password2"}
                />
                {errors.password2 && touched.password2 ? (
                  <Alerta msg={errors.password2} error={true} />
                ) : null}
              </div>

              <div className="my-5">
                <label
                  htmlFor="idRol"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Rol
                </label>
                <select
                  name="idRol"
                  value={values.idRol}
                  onChange={handleChange}
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  style={{ display: "block" }}
                >
                  <option value="" label="Selecciona un rol">
                    Select un Rol{" "}
                  </option>

                  {roles?.map((roles, index) => {
                    return (
                      <option key={roles.idRol} value={roles.idRol}>
                        {roles.nombre}
                      </option>
                    );
                  })}
                </select>
                {errors.idRol && touched.idRol ? (
                  <Alerta msg={errors.idRol} error={true} />
                ) : null}
              </div>
              <div className="my-5">
                <label
                  htmlFor="idEmpresa"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Empresa
                </label>
                <select
                  name="idEmpresa"
                  value={values.idEmpresa}
                  onChange={handleChange}
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  style={{ display: "block" }}
                >
                  <option value="" label="Selecciona una empresa">
                    Select una Empresa{" "}
                  </option>
                  {/* <option key={1} value={1}>
                        {'GAFAH'}
                      </option> */}
                  {empresas?.map((empresa, index) => {
                    return (
                      <option key={empresa.idEmpresa} value={empresa.idEmpresa}>
                        {empresa.nombre}
                      </option>
                    );
                  })}
                </select>
                {errors.idEmpresa && touched.idEmpresa ? (
                  <Alerta msg={errors.idEmpresa} error={true} />
                ) : null}
              </div>

              <input
                type="submit"
                value="Crear Cuenta"
                className="bg-sky-700 mb-5 w-full rounded py-3 text-white font-bold
            uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
              />
            </Form>
          );
        }}
      </Formik>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Ya tienes una cuenta? Inicia Sesion
        </Link>
        <Link
          to="/olvide-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default RegistrarUsuario;
