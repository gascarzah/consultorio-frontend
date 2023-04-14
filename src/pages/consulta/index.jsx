import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Alerta } from "../../components/Alerta";
import { useDispatch, useSelector } from "react-redux";
import { getCitas, resetState } from "../../slices/citaSlice";

import PreviewCita from "../../components/PreviewCita";
import PreviewConsulta from "../../components/PreviewConsulta";

const nuevoClienteSchema = Yup.object().shape({
  idMedico: Yup.string().required("Debe seleccionar un medico"),
  idProgramacionDetalle: Yup.string().required("Debe seleccionar un dia"),
});
const weekday = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

function format(inputDate) {
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${date}/${month}/${year}`;
}

const ListarConsulta = () => {
  const [alerta, setAlerta] = useState({});
  const [listaCitas, setListaCitas] = useState([]);

  const { dias, diaAtencion } = useSelector(
    (state) => state.programacionDetalle
  );

  const { user } = useSelector((state) => state.usuario);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());

    handleCitas({ idMedico: user.idEmpleado, numeroDiaSemana: getToday() });
  }, []);

  const getToday = () => {
    const date = new Date();
    const day = date.getDay();
    return day;
  };

  const handleSubmit = (values, resetForm) => {
    dispatch(registrarProgramacion(values))
      .unwrap()
      .then((resultado) => {
        toast.success(resultado.message);
        resetForm();
      })
      .catch((errores) => {
        console.log("errores ===>> ", errores);
        toast.error(errores.message);
      });
  };

  const handleCitas = (valores) => {
    console.log("idProgramacionDetalle a enviar ", valores);

    dispatch(getCitas(valores))
      .unwrap()
      .then((resultado) => {
        console.log("resultadohandleCitas  ===>> ", resultado);
        setListaCitas(resultado);
      })
      .catch((errores) => {
        console.log("errores handleCitas ===>> ", errores);
        toast.error(errores);
        setListaCitas([]);
      });
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize text-center">
        Consultas del Dia
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <Formik
        initialValues={{
          idMedico: user.idEmpleado,
          idProgramacionDetalle: diaAtencion,
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
          //resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {(props) => {
          return (
            <Form className="my-10 bg-white shadow rounded p-10 flex flex-col w-2/5 ">
              <div className="my-3">
                <label
                  htmlFor="idProgramacionDetalle"
                  className="uppercase text-gray-600 block font-bold"
                >
                  {weekday[getToday()]} {format(new Date())}
                </label>
              </div>

              <div className="overflow-hidden border rounded-lg my-3">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Horario
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Cliente
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      ></th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {listaCitas.length ? (
                      listaCitas.map((cita) => (
                        <PreviewConsulta key={cita.idCita} cita={cita} />
                      ))
                    ) : (
                      <tr>
                        <td>
                          <p className="text-center text-gray-600 uppercase p-5">
                            No hay citas aun
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ListarConsulta;
