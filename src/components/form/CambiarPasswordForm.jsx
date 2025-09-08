import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Alerta } from "../Alerta";
import { toast } from "react-toastify";

// Esquema de validación con Yup
const cambiarPasswordSchema = Yup.object().shape({
  passwordActual: Yup.string()
    .required("La contraseña actual es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  passwordNueva: Yup.string()
    .required("La nueva contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .notOneOf([Yup.ref('passwordActual')], 'La nueva contraseña debe ser diferente a la actual'),
  confirmarPassword: Yup.string()
    .required("La confirmación de contraseña es obligatoria")
    .oneOf([Yup.ref('passwordNueva')], 'Las contraseñas deben coincidir'),
});

const CambiarPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    actual: false,
    nueva: false,
    confirmar: false
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Aquí irá la lógica para cambiar la contraseña
      // dispatch(cambiarPassword(values))
      toast.success("Contraseña actualizada correctamente");
      resetForm();
      // navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Error al cambiar la contraseña");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <Formik
      initialValues={{
        passwordActual: "",
        passwordNueva: "",
        confirmarPassword: ""
      }}
      validationSchema={cambiarPasswordSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="my-10 bg-white shadow rounded p-10">
          <h2 className="text-2xl font-bold text-center text-sky-600 mb-8">
            Cambiar Contraseña
          </h2>

          {/* Campo Contraseña Actual */}
          <div className="my-5">
            <label className="uppercase text-gray-600 block font-bold">
              Contraseña Actual
            </label>
            <div className="relative">
              <Field
                type={showPassword.actual ? "text" : "password"}
                name="passwordActual"
                placeholder="Ingresa tu contraseña actual"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('actual')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.actual ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            <ErrorMessage name="passwordActual" component={Alerta} />
          </div>

          {/* Campo Nueva Contraseña */}
          <div className="my-5">
            <label className="uppercase text-gray-600 block font-bold">
              Nueva Contraseña
            </label>
            <div className="relative">
              <Field
                type={showPassword.nueva ? "text" : "password"}
                name="passwordNueva"
                placeholder="Ingresa tu nueva contraseña"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('nueva')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.nueva ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            <ErrorMessage name="passwordNueva" component={Alerta} />
          </div>

          {/* Campo Confirmar Contraseña */}
          <div className="my-5">
            <label className="uppercase text-gray-600 block font-bold">
              Confirmar Nueva Contraseña
            </label>
            <div className="relative">
              <Field
                type={showPassword.confirmar ? "text" : "password"}
                name="confirmarPassword"
                placeholder="Confirma tu nueva contraseña"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmar')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.confirmar ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            <ErrorMessage name="confirmarPassword" component={Alerta} />
          </div>

          {/* Botón de Submit */}
          <div className="my-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Cambiando...' : 'Cambiar Contraseña'}
            </button>
          </div>

          {/* Requisitos de contraseña */}
          <div className="mt-4 text-sm text-gray-600">
            <p className="font-medium mb-2">La contraseña debe cumplir con:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Mínimo 6 caracteres</li>
              <li>Ser diferente a la contraseña actual</li>
              <li>Las contraseñas nuevas deben coincidir</li>
            </ul>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CambiarPasswordForm; 