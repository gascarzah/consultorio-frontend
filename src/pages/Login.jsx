import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { Alerta } from "../components";

import { login } from "../slices/authSlice";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email no valido")
    .required("El email es obligatorio"),
  password: Yup.string().required("Password obligatorio"),
});

const Login = () => {
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const { email, password } = values;

    if (password.length < 6) {
      setAlerta({
        msg: "password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });

      return;
    }

    dispatch(login(values))
      .unwrap()

      .then((resultado) => {
        navigate("/dashboard");

        // console.log("respuesta ", resultado);
      })
      .catch((errores) => {
        console.log("errores ===>> ", errores);

        toast.error("usuario no existe");
      });
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 text-center font-black text-6xl ">
        Inicia Sesion
      </h1>
      <ToastContainer />
      {msg && <Alerta msg={alerta.msg} error={alerta.error} />}

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
        validationSchema={loginSchema}
      >
        {({ errors, touched, values, handleChange }) => {
          return (
            <Form className={"my-10 bg-white shadow rounded p-10"}>
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
                  placeholder="Email"
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

              <input
                type="submit"
                value="Iniciar Sesion"
                className="bg-sky-700 mb-5 w-full rounded py-3 text-white font-bold
            uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
              />
               <Link
          to={"/olvide-password"}
          className={"block text-center my-5 text-slate-500 uppercase text-sm"}
        >
          Olvide mi password
        </Link>
            </Form>
            
          );
        }}
      </Formik>
      {/* <nav className={"lg:flex lg:justify-between"}>
        <Link
          to={"/registrar"}
          className={"block text-center my-5 text-slate-500 uppercase text-sm"}
        >
          No tienes una cuenta? Registrate
        </Link>
        <Link
          to={"/olvide-password"}
          className={"block text-center my-5 text-slate-500 uppercase text-sm"}
        >
          Olvide mi password
        </Link>
      </nav> */}
    </>
  );
};

export default Login;
