import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import Modal from "react-modal";
import * as Yup from "yup";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Pagination, AtencionDetalleModal } from "../../components";
import regeneratorRuntime from "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { getCita, getHistorialCitas, editarCita } from "../../slices/citaSlice";
import { ITEMS_POR_PAGINA } from "../../utils";
import { Odontograma } from "../../components/Odontograma/Odontograma";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
const nuevoClienteSchema = Yup.object().shape({
  nombres: Yup.string().required("El nombre del cliente es obligatorio"),
  apellidoPaterno: Yup.string().required("Apellido Paterno obligatorio"),
  apellidoMaterno: Yup.string().required("Apellido Materno obligatorio"),
  numeroDocumento: Yup.string()
    .max(8, "Numero de documento debe tener solo 8 digitos")
    .required("Dni es obligatorio")
    .matches(/^[0-9]+$/, "Dni debe tener solo numeros"),
});

const AgregarConsulta = () => {
  const { cita, historiales, prev, next, total } = useSelector((state) => state.cita);

  const [play, setPlay] = useState(false);
  const { idCita, numeroDocumento } = useParams();

  const [listaHistorial, setListaHistorial] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const [disabledPrev, setDisabledPrev] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);
  const [informe, setInforme] = useState();

  const [modal, setModal] = useState(false);

  const [openSections, setOpenSections] = useState({
    consulta: true,
    odontograma: false,
    informe: false,
    historial: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    dispatch(getCita(idCita));
    dispatch(
      getHistorialCitas({
        numeroDocumento: numeroDocumento,
        page: currentPage,
        size: itemsPerPage,
      })
    );
  }, []);

  useEffect(() => {
    if (historiales) {
      setListaHistorial(historiales);
      setDisabledPrev(prev);
      setDisabledNext(next);
    }
  }, [historiales, currentPage]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
  } = useSpeechRecognition({
    continuous: true,
    language: 'es-PE'
  });

  useEffect(() => {
    // Actualizar el estado de play basado en listening
    setPlay(listening);
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-center p-4 bg-yellow-100 text-yellow-800 rounded-md">
        Tu navegador no soporta el reconocimiento de voz.
        Por favor, usa un navegador más moderno como Chrome.
      </div>
    );
  }

  const [alerta, setAlerta] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, resetForm) => {
    console.log("values ", values);

    dispatch(
      editarCita({
        idCita: values.cita.idCita,
        idHistoriaClinica: values.cita.historiaClinica.idHistoriaClinica,
        idHorario: values.cita.horario.idHorario,
        idProgramacionDetalle:
          values.cita.programacionDetalle.idProgramacionDetalle,
        informe: transcript,
        atendido: true,
      })
    )
      .unwrap()

      .then((resultado) => {
        console.log("resultado ===>> ", resultado);
        console.log("redirecciona login");

        toast.success(resultado.message);
        navigate("/dashboard/listar-consulta");
      })
      .catch((errores) => {
        console.log("errores ===>> ", errores);
        toast.error(errores.message);
      });
  };

  const handleStartRecord = () => {
    try {
      resetTranscript(); // Limpiar transcripción anterior
      SpeechRecognition.startListening({
        continuous: true,
        language: 'es-PE'
      });
    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
      toast.error('Error al iniciar la grabación');
    }
  };

  const handleStopRecord = () => {
    try {
      SpeechRecognition.stopListening();
    } catch (error) {
      console.error('Error al detener la grabación:', error);
      toast.error('Error al detener la grabación');
    }
  };

  const handleResetScript = () => {
    try {
      SpeechRecognition.stopListening();
      resetTranscript();
      setPlay(false);
    } catch (error) {
      console.error('Error al reiniciar la grabación:', error);
      toast.error('Error al reiniciar la grabación');
    }
  };

  const { msg } = alerta;

  const handlePrev = () => {
    console.log("handlePrev ", handlePrev);
    if (!disabledPrev) {
      const pagina = currentPage - 1;
      setCurrentPage(currentPage - 1);
      console.log("pagPrev ", currentPage);
      pagination(pagina);
    }
  };
  const handleNext = () => {
    console.log("disabledNext ", disabledNext);
    if (!disabledNext) {
      const pagina = currentPage + 1;
      setCurrentPage(pagina);
      console.log("pagNext ", currentPage);
      pagination(pagina);
    }
  };

  const pagination = (pagina) => {
    dispatch(
      getHistorialCitas({
        numeroDocumento: numeroDocumento,
        page: pagina,
        size: itemsPerPage,
      })
    );
  };

  const handleChangeModal = (informe) => {
    setModal(!modal);
    setInforme(informe);
  };
  function closeModal() {
    setModal(false);
  }
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Acordeón de Registrar Consulta */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('consulta')}
            className="w-full bg-white p-4 flex justify-between items-center rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold text-gray-800">Registrar Consulta</h2>
            <svg
              className={`w-6 h-6 transform transition-transform ${openSections.consulta ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className={`mt-2 transition-all duration-200 ease-in-out ${openSections.consulta ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="bg-white shadow-lg rounded-lg p-6">
              {msg && toast.error(msg)}

              <Formik
                initialValues={{
                  nombres: cita.historiaClinica?.nombres ?? "",
                  apellidoPaterno: cita.historiaClinica?.apellidoPaterno ?? "",
                  apellidoMaterno: cita.historiaClinica?.apellidoMaterno ?? "",
                  numeroDocumento: cita.historiaClinica?.numeroDocumento ?? "",
                  cita,
                }}
                enableReinitialize={true}
                onSubmit={(values, { resetForm }) => {
                  handleSubmit(values, resetForm);
                }}
                validationSchema={nuevoClienteSchema}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="numeroDocumento"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Número de Documento
                        </label>
                        <Field
                          id="numeroDocumento"
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50"
                          name="numeroDocumento"
                          disabled={true}
                        />
                        {errors.numeroDocumento && touched.numeroDocumento && (
                          <div className="text-sm text-red-600">{errors.numeroDocumento}</div>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="nombres"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Nombre Completo
                        </label>
                        <Field
                          id="nombres"
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50"
                          name="nombres"
                          disabled={true}
                        />
                        {errors.nombres && touched.nombres && (
                          <div className="text-sm text-red-600">{errors.nombres}</div>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="motivo"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Motivo de la Consulta
                        </label>
                        <Field
                          as="textarea"
                          id="motivo"
                          name="motivo"
                          rows="4"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50"
                          placeholder="Describa el motivo de la consulta"
                        />
                        {errors.motivo && touched.motivo && (
                          <div className="text-sm text-red-600">{errors.motivo}</div>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="diagnostico"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Diagnóstico
                        </label>
                        <Field
                          as="textarea"
                          id="diagnostico"
                          name="diagnostico"
                          rows="4"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50"
                          placeholder="Ingrese el diagnóstico"
                        />
                        {errors.diagnostico && touched.diagnostico && (
                          <div className="text-sm text-red-600">{errors.diagnostico}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <input
                        type="submit"
                        value="Registrar Consulta"
                        className="w-full bg-sky-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-sky-700 transition-colors cursor-pointer"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>

        {/* Acordeón de Odontograma */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('odontograma')}
            className="w-full bg-white p-4 flex justify-between items-center rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold text-gray-800">Odontograma</h2>
            <svg
              className={`w-6 h-6 transform transition-transform ${openSections.odontograma ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className={`mt-2 transition-all duration-200 ease-in-out ${openSections.odontograma ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="bg-white shadow-lg rounded-lg">
              <Odontograma />
            </div>
          </div>
        </div>

        {/* Acordeón de Informe */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('informe')}
            className="w-full bg-white p-4 flex justify-between items-center rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold text-gray-800">Informe</h2>
            <svg
              className={`w-6 h-6 transform transition-transform ${openSections.informe ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className={`mt-2 transition-all duration-200 ease-in-out ${openSections.informe ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  {play ? (
                    <button
                      type="button"
                      onClick={handleStopRecord}
                      className="flex-1 px-4 py-2 rounded-md font-medium bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3a1 1 0 00-1 1v12a1 1 0 002 0V4a1 1 0 00-1-1z" />
                      </svg>
                      Detener Dictado
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleStartRecord}
                      className="flex-1 px-4 py-2 rounded-md font-medium bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                      </svg>
                      Iniciar Dictado
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleResetScript}
                    className="px-4 py-2 rounded-md font-medium bg-gray-500 text-white hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    Limpiar
                  </button>
                </div>

                <div className="relative">
                  <div className={`absolute -top-3 right-2 flex items-center gap-2 ${play ? 'text-red-500' : 'text-gray-400'}`}>
                    {play && (
                      <span className="flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                    )}
                    <span className="text-sm">{play ? 'Dictando...' : 'Dictado detenido'}</span>
                  </div>
                  <textarea
                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50 mt-2"
                    value={transcript}
                    placeholder="Escriba o dicte el informe aquí..."
                    rows="10"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acordeón de Historial */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('historial')}
            className="w-full bg-white p-4 flex justify-between items-center rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold text-gray-800">Historial de Consultas</h2>
            <svg
              className={`w-6 h-6 transform transition-transform ${openSections.historial ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className={`mt-2 transition-all duration-200 ease-in-out ${openSections.historial ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Fecha de Atención
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listaHistorial.length ? (
                      listaHistorial.map((cita) => (
                        <tr key={cita.idCita}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              type="button"
                              className="w-full text-left px-4 py-2 text-sm text-sky-600 hover:bg-sky-50 rounded transition-colors"
                              onClick={() => handleChangeModal(cita.informe)}
                            >
                              {dayjs(cita.programacionDetalle.fecha).format("DD/MM/YYYY")}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          No hay consultas registradas
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {total && total > ITEMS_POR_PAGINA && (
                <div className="mt-4">
                  <Pagination
                    totalPosts={listaHistorial.length}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    disabledPrev={disabledPrev}
                    setDisabledPrev={setDisabledPrev}
                    disabledNext={disabledNext}
                    setDisabledNext={setDisabledNext}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {modal && (
          <Modal
            isOpen={modal}
            style={customStyles}
            onRequestClose={closeModal}
            contentLabel="Detalle de Consulta"
          >
            <AtencionDetalleModal informe={informe} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default AgregarConsulta;
