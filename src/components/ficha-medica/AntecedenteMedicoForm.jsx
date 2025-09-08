import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { toast } from "react-toastify";

export const AntecedenteMedicoForm = ({ antecedenteMedico = {}, handleSubmit }) => {
  const [alerta, setAlerta] = useState({});
  const { msg } = alerta;

  return (
    <div className="w-full flex justify-center">
      <Formik
        initialValues={{
          idAntecedenteMedico: antecedenteMedico?.idAntecedenteMedico || "",
          ectoscopia: antecedenteMedico?.ectoscopia || "",
          alergia: antecedenteMedico?.alergia || "",
          motivo: antecedenteMedico?.motivo || "",
          antecedentesMedicos: antecedenteMedico?.antecedentesMedicos || "",
        }}
        enableReinitialize
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {({ errors, touched }) => (
          <Form className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
            {[
              { label: "Alergias", name: "alergia" },
              { label: "Antecedentes Médicos", name: "antecedentesMedicos" },
              { label: "Ectoscopia", name: "ectoscopia" },
            ].map(({ label, name }) => (
              <div className="mb-4" key={name}>
                <label className="block text-gray-700 font-bold mb-1" htmlFor={name}>
                  {label}
                </label>
                <Field
                  id={name}
                  type="text"
                  name={name}
                  placeholder={label}
                  className="w-full p-3 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
                />
                {errors[name] && touched[name] && toast.error(errors[name])}
              </div>
            ))}

            {/* Campo de texto largo (textarea) */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1" htmlFor="motivo">
                Motivo
              </label>
              <Field
                id="motivo"
                name="motivo"
                as="textarea"
                rows="5"
                placeholder="Especifica el motivo"
                className="w-full p-3 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
              />
              {errors.motivo && touched.motivo && toast.error(errors.motivo)}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Registrar Antecedente Médico
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
