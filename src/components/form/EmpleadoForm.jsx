import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { registrarEmpleado, modificarEmpleado } from "../../slices/empleadoSlice";
import { getRoles } from "../../slices/rolSlice";
import { getEmpresas } from "../../slices/empresaSlice";
import { resetState } from "../../slices/rolMenuSlice";
import { LISTAR_EMPLEADO, MENSAJE_GUARDADO_EXITOSO, MENSAJE_MODIFICADO_EXITOSO, TIEMPO_REDIRECCION } from "../../utils";
import { toast } from "react-toastify";
import { SWEET_GUARDO, SWEET_MODIFICO, SWEET_SUCESS, SweetCrud } from "../../utils";

const empleadoSchema = Yup.object().shape({
  nombres: Yup.string().required("El nombre del empleado es obligatorio"),
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
  idRol: Yup.string().required("Rol es obligatorio"),
  idEmpresa: Yup.string().required("Seleccionar una empresa"),
});

function EmpleadoFormInner({ errors, touched, roles, empresas, handleSubmit, empleado }) {
  // useEffect(() => {
  //   Object.keys(errors).forEach((key) => {
  //     if (errors[key] && touched[key]) {
  //       toast.error(errors[key]);
  //     }
  //   });
  // }, [errors, touched]);

  return (
    <Form className="my-10 bg-white shadow rounded p-10 flex flex-col w-2/5">
      <div className="my-3">
        <label htmlFor="nombres" className="uppercase text-gray-600 block font-bold">
          Nombres
        </label>
        <Field
          id="nombres"
          type="text"
          placeholder="Nombres"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          name="nombres"
        />
        <ErrorMessage
          name="nombres"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div className="my-3">
        <label htmlFor="apellidoPaterno" className="uppercase text-gray-600 block font-bold">
          Apellido Paterno
        </label>
        <Field
          id="apellidoPaterno"
          type="text"
          placeholder="Apellido Paterno"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          name="apellidoPaterno"
        />
        <ErrorMessage
          name="apellidoPaterno"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div className="my-3">
        <label htmlFor="apellidoMaterno" className="uppercase text-gray-600 block font-bold">
          Apellido Materno
        </label>
        <Field
          id="apellidoMaterno"
          type="text"
          placeholder="Apellido Materno"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          name="apellidoMaterno"
        />
        <ErrorMessage
          name="apellidoMaterno"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div className="my-3">
        <label htmlFor="numeroDocumento" className="uppercase text-gray-600 block font-bold">
          Número de Documento
        </label>
        <Field
          id="numeroDocumento"
          type="text"
          placeholder="Número de Documento"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          name="numeroDocumento"
        />
        <ErrorMessage
          name="numeroDocumento"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div className="my-3">
        <label htmlFor="email" className="uppercase text-gray-600 block font-bold">
          Email
        </label>
        <Field
          id="email"
          type="email"
          placeholder="Email"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          name="email"
        />
        <ErrorMessage
          name="email"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div className="my-3">
        <label htmlFor="direccion" className="uppercase text-gray-600 block font-bold">
          Dirección
        </label>
        <Field
          id="direccion"
          type="text"
          placeholder="Dirección"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          name="direccion"
        />
        <ErrorMessage
          name="direccion"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div className="my-3">
        <label htmlFor="idRol" className="uppercase text-gray-600 block font-bold">
          Rol
        </label>
        <Field
          as="select"
          id="idRol"
          name="idRol"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
        >
          <option value="">Selecciona un rol</option>
          {roles && roles.map((rol) => (
            <option key={rol.idRol} value={rol.idRol}>{rol.nombre}</option>
          ))}
        </Field>
        <ErrorMessage
          name="idRol"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div className="my-3">
        <label htmlFor="idEmpresa" className="uppercase text-gray-600 block font-bold">
          Empresa
        </label>
        <Field
          as="select"
          id="idEmpresa"
          name="idEmpresa"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
        >
          <option value="">Selecciona una empresa</option>
          {empresas && empresas.map((empresa) => (
            <option key={empresa.idEmpresa} value={empresa.idEmpresa}>{empresa.nombre}</option>
          ))}
        </Field>
        <ErrorMessage
          name="idEmpresa"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-sky-700 mb-5 w-full rounded py-3 text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
        >
          Registrar Empleado
        </button>
      </div>
    </Form>
  );
}

export const EmpleadoForm = ({ empleado }) => {
  console.log("empleado que llega al form ===>> ", empleado);
  const { empresas } = useSelector((state) => state.empresa);
  const { roles } = useSelector((state) => state.rol);
  const { rolMenus } = useSelector((state) => state.rolMenu);
  const [alerta, setAlerta] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getRoles());
    dispatch(getEmpresas());
  }, [dispatch]);

  const handleSubmit = (values, resetForm) => {
    if (!values.idEmpleado) {
      dispatch(registrarEmpleado(values))
        .unwrap()
        .then((resultado) => {
          console.log("resultado ===>> ", resultado);
          SweetCrud(SWEET_GUARDO, SWEET_SUCESS);
          dispatch(resetState());
          setTimeout(() => {
            navigate(LISTAR_EMPLEADO);
          }, TIEMPO_REDIRECCION);
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          SweetCrud('Error', errores.message || 'No se pudo guardar');
        });
    } else {
      dispatch(modificarEmpleado(values))
        .unwrap()
        .then((resultado) => {
          console.log("resultado modificarempleado ===>> ", resultado);
          dispatch(resetState());
          SweetCrud(SWEET_MODIFICO, SWEET_SUCESS);
          setTimeout(() => {
            navigate(LISTAR_EMPLEADO);
          }, TIEMPO_REDIRECCION);
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          SweetCrud('Error', errores.message || 'No se pudo modificar');
        });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize text-center mb-8">
        {empleado?.idEmpleado ? "Editar Empleado" : "Registrar Empleado"}
      </h1>
      <Formik
        initialValues={{
          nombres: empleado?.nombres || "",
          apellidoPaterno: empleado?.apellidoPaterno || "",
          apellidoMaterno: empleado?.apellidoMaterno || "",
          numeroDocumento: empleado?.numeroDocumento || "",
          email: empleado?.email || "",
          direccion: empleado?.direccion || "",
          idRol: empleado?.idRol || "",
          idEmpresa: empleado?.idEmpresa || "",
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
        validationSchema={empleadoSchema}
      >
        {(formikProps) => (
          <EmpleadoFormInner
            {...formikProps}
            roles={roles}
            empresas={empresas}
            handleSubmit={handleSubmit}
            empleado={empleado}
          />
        )}
      </Formik>
    </>
  );
};
