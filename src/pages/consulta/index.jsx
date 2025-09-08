import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { PreviewConsulta } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getListaCitados, resetState } from "../../slices/citaSlice";
import { getUsuario } from "../../slices/usuarioSlice";


const nuevoClienteSchema = Yup.object().shape({
  idEmpleado: Yup.string().required("Debe seleccionar un medico"),
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
  const { email } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  console.log('Estado de autenticación - email:', email);
  console.log('Estado de usuario:', user);

  useEffect(() => {
    dispatch(resetState());
    
    if (email) {
      console.log('Obteniendo datos del usuario con email:', email);
      dispatch(getUsuario(email))
        .unwrap()
        .then((resultado) => {
          console.log('Datos del usuario obtenidos:', resultado);
          if (resultado?.empleado?.idEmpleado && resultado?.empleado?.empresa?.idEmpresa) {
            handleCitas({ 
              idEmpleado: resultado.empleado.idEmpleado, 
              idEmpresa: resultado.empleado.empresa.idEmpresa,
              numeroDiaSemana: getToday() 
            });
          }
        })
        .catch((error) => {
          console.error('Error al obtener usuario:', error);
          toast.error('Error al obtener datos del usuario');
        });
    } else {
      console.log('No hay email en el estado de autenticación');
    }
  }, [email]);

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
    console.log("Valores a enviar en getListaCitados:", valores);

    dispatch(getListaCitados(valores))
      .unwrap()
      .then((resultado) => {
        console.log("Resultado de getListaCitados:", resultado);
        setListaCitas(resultado);
      })
      .catch((errores) => {
        console.log("Error en getListaCitados:", errores);
        toast.error(errores?.message || 'Error al obtener las citas');
        setListaCitas([]);
      });
  };

  const { msg } = alerta;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Consultas del Día
              </h1>
              <div className="text-sm text-gray-600 font-medium">
                {weekday[getToday()]} {format(new Date())}
              </div>
            </div>

            {msg && toast.error(msg)}

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Horario
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Paciente
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {listaCitas.length ? (
                    listaCitas.map((cita) => (
                      <PreviewConsulta key={cita.idCita} cita={cita} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4">
                        <div className="flex flex-col items-center justify-center text-gray-500 py-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <p className="text-center text-gray-600 font-medium">
                            No hay consultas programadas para hoy
                          </p>
                          <p className="text-sm text-gray-500">
                            Las consultas aparecerán aquí cuando sean agendadas
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListarConsulta;
