import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { login } from "../slices/authSlice";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email no valido")
    .required("El email es obligatorio"),
  password: Yup.string().required("Password obligatorio"),
});

const Login = () => {
  const [alerta, setAlerta] = useState({});
  const [showErrorIcon, setShowErrorIcon] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const { email, password } = values;
    setShowErrorIcon(false);

    if (password.length < 6) {
      toast.error("password es muy corto, agrega minimo 6 caracteres");
      return;
    }

    dispatch(login(values))
      .unwrap()
      .then((resultado) => {
        navigate("/dashboard");
      })
      .catch((errores) => {
        console.log("errores ===>> ", errores);
        setShowErrorIcon(true);
        toast.error("Usuario no existe");
      });
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 text-center font-black text-6xl ">
        Inicia Sesión
      </h1>
      {msg && toast.error(msg)}

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
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  name={"email"}
                />
                {errors.email && touched.email && toast.error(errors.email)}
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
                  placeholder="Password"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  name={"password"}
                />
                {errors.password && touched.password && toast.error(errors.password)}
              </div>

              <input
                type="submit"
                value="Iniciar Sesión"
                className="bg-sky-700 mb-5 w-full rounded py-3 text-white font-bold
                uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
              />
              <Link
                to={"/olvide-password"}
                className={"block text-center my-5 text-slate-500 uppercase text-sm"}
              >
                Olvidé mi password
              </Link>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Login;
