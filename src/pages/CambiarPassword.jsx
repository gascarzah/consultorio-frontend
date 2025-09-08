import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SWEET_SUCESS, SweetCrud } from "../utils";
import { cambiarPassword } from "../slices/usuarioSlice";

const cambiarPasswordSchema = Yup.object().shape({
  passwordActual: Yup.string()
    .required("La contraseña actual es obligatoria"),
  nuevaPassword: Yup.string()
    .min(6, "La nueva contraseña debe tener al menos 6 caracteres")
    .notOneOf([Yup.ref('passwordActual')], 'La nueva contraseña no puede ser igual a la actual')
    .required("La nueva contraseña es obligatoria"),
  confirmarPassword: Yup.string()
    .oneOf([Yup.ref('nuevaPassword'), null], 'Las contraseñas deben coincidir')
    .required("Debe confirmar la nueva contraseña"),
});

function CambiarPasswordInner({ errors, touched, isSubmitting, navigate }) {
  useEffect(() => {
    Object.keys(errors).forEach((key) => {
      if (errors[key] && touched[key]) {
        toast.error(errors[key]);
      }
    });
  }, [errors, touched]);

  return (
    <Form className="space-y-6">
      <div>
        <label htmlFor="passwordActual" className="uppercase text-gray-600 block font-bold mb-2">
          Contraseña Actual
        </label>
        <Field
          id="passwordActual"
          type="password"
          name="passwordActual"
          placeholder="••••••••"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="nuevaPassword" className="uppercase text-gray-600 block font-bold mb-2">
          Nueva Contraseña
        </label>
        <Field
          id="nuevaPassword"
          type="password"
          name="nuevaPassword"
          placeholder="••••••••"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
        <p className="text-gray-500 text-xs mt-1">
          Mínimo 6 caracteres
        </p>
      </div>

      <div>
        <label htmlFor="confirmarPassword" className="uppercase text-gray-600 block font-bold mb-2">
          Confirmar Nueva Contraseña
        </label>
        <Field
          id="confirmarPassword"
          type="password"
          name="confirmarPassword"
          placeholder="••••••••"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-blue-800 font-semibold text-sm mb-2">
          Políticas de Seguridad:
        </h3>
        <ul className="text-blue-700 text-xs space-y-1">
          <li>• Mínimo 6 caracteres</li>
          <li>• No puede ser igual a la contraseña actual</li>
          <li>• Se invalidarán sesiones en otros dispositivos</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg font-bold uppercase hover:bg-gray-600 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-sky-600 text-white py-3 px-4 rounded-lg font-bold uppercase hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Cambiando..." : "Cambiar Contraseña"}
        </button>
      </div>
    </Form>
  );
}

const CambiarPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.usuario);

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    
    try {
      await dispatch(cambiarPassword({
        passwordActual: values.passwordActual,
        nuevaPassword: values.nuevaPassword,
        idUsuario: user.idUsuario
      })).unwrap();
      
      SweetCrud('Contraseña Cambiada', 'Su contraseña ha sido actualizada exitosamente');
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || 'Error al cambiar la contraseña. Verifique que la contraseña actual sea correcta.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-sky-600 font-black text-3xl capitalize text-center mb-8">
          Cambiar Contraseña
        </h1>
        
        <Formik
          initialValues={{
            passwordActual: "",
            nuevaPassword: "",
            confirmarPassword: "",
          }}
          validationSchema={cambiarPasswordSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <CambiarPasswordInner {...formikProps} isSubmitting={isSubmitting} navigate={navigate} />
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CambiarPassword; 