import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import Modal from "react-modal";
import * as Yup from "yup";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Alerta, Pagination, AtencionDetalleModal } from "../../components";
import regeneratorRuntime from "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { getCita, getHistorialCitas, editarCita } from "../../slices/citaSlice";


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
  const { cita, historiales, prev, next } = useSelector((state) => state.cita);

  const [play, setPlay] = useState(false);
  const { idCita, numeroDocumento } = useParams();

  const [listaHistorial, setListaHistorial] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const [disabledPrev, setDisabledPrev] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);
  const [informe, setInforme] = useState();

  const [modal, setModal] = useState(false);

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
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const [alerta, setAlerta] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, resetForm) => {
    console.log("values ", values);

    dispatch(
      editarCita({
        idCita: values.cita.idCita,
        numeroDocumento: values.cita.cliente.numeroDocumento,
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
    setPlay(true);
    SpeechRecognition.startListening({
      continuous: true,
      language: "es-PE",
    });
  };

  const handleStopRecord = () => {
    setPlay(false);
    SpeechRecognition.stopListening();
  };

  const handleResetScript = () => {
    setPlay(false);
    resetTranscript();
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
      <div className="flex justify-center gap-7  w-full">
        <div>
          <h1 className="text-sky-600 font-black text-3xl capitalize text-center">
            Registrar Consulta
          </h1>
          {msg && <Alerta msg={alerta.msg} error={alerta.error} />}

          <Formik
            initialValues={{
              nombres: cita.cliente?.nombres ?? "",
              apellidoPaterno: cita.cliente?.apellidoPaterno ?? "",
              apellidoMaterno: cita.cliente?.apellidoMaterno ?? "",
              numeroDocumento: cita.cliente?.numeroDocumento ?? "",
              cita,
            }}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values, resetForm);
              //resetForm();
            }}
            validationSchema={nuevoClienteSchema}
          >
            {({ errors, touched, values, handleChange }) => {
              return (
                <Form className=" my-10 bg-white shadow rounded p-10 flex  gap-10    ">
                  <div className="w-full">
                    <div className="my-3">
                      <label
                        htmlFor="numeroDocumento"
                        className="uppercase text-gray-600 block font-bold"
                        disabled="true"
                      >
                        Numero de Documento
                      </label>
                      <Field
                        id="numeroDocumento"
                        type="text"
                        placeholder="Numero de documento"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                        name={"numeroDocumento"}
                        disabled="true"
                      />
                      {errors.numeroDocumento && touched.numeroDocumento ? (
                        <Alerta>{errors.numeroDocumento}</Alerta>
                      ) : null}
                    </div>
                    <div className="my-3   ">
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
                        disabled="true"
                      />
                      {errors.nombres && touched.nombres ? (
                        <Alerta>{errors.nombres}</Alerta>
                      ) : null}
                    </div>
                    <div className="my-3">
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
                        disabled="true"
                      />
                      {errors.apellidoPaterno && touched.apellidoPaterno ? (
                        <Alerta>{errors.apellidoPaterno}</Alerta>
                      ) : null}
                    </div>
                    <div className="my-3">
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
                        disabled="true"
                      />
                      {errors.apellidoMaterno && touched.apellidoMaterno ? (
                        <Alerta>{errors.apellidoMaterno}</Alerta>
                      ) : null}
                    </div>
                  </div>
                  <div className="my-3 w-full">
                    <label
                      htmlFor="informe"
                      className="uppercase text-gray-600 block font-bold"
                    >
                      Informe
                    </label>
                    {play && <p>Grabando</p>}

                    <div className="flex flex-row gap-1 ">
                      <div>
                        <button
                          type="button"
                          onClick={handleStartRecord}
                          className="bg-sky-700 mb-5 w-auto rounded py-3 text-white font-bold 
            uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={handleStopRecord}
                          className="bg-sky-700 mb-5 w-auto rounded py-3 text-white font-bold
            uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                            />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={handleResetScript}
                          className="bg-sky-700 mb-5 w-auto rounded py-3 text-white font-bold
            uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                    <textarea
                      className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                      value={transcript}
                      placeholder="Informe"
                      rows="10"
                      cols="50"
                      readOnly
                    ></textarea>
                    <div className="flex-1">
                      <input
                        type="submit"
                        value="Registrar Informe"
                        className="bg-sky-700 mb-5 w-full rounded py-3 text-white font-bold
            uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
                      />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div>
          {" "}
          <h1 className="text-sky-600 font-black text-3xl capitalize text-center">
            Historial de consultas
          </h1>
          {msg && <Alerta alerta={alerta} />}
          <div className="flex flex-col bg-white mt-10">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Fecha de Atencion
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaHistorial.length ? (
                        listaHistorial.map((cita, index) => (
                          <tr
                            className="border-b dark:border-neutral-500"
                            key={cita.idCita}
                          >
                            <td className="whitespace-nowrap px-6 py-4">
                              <button
                                type="button"
                                className="bg-sky-600 hover:bg-sky-800 text-white w-full mt-5 p-3 uppercase font-bold"
                                onClick={() => {
                                  handleChangeModal(cita.informe);
                                }}
                              >
                                {dayjs(cita.programacionDetalle.fecha).format(
                                  "DD/MM/YYYY"
                                )}
                              </button>
                            </td>
                          </tr>
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
              </div>
            </div>
          </div>
          {total && total > ITEMS_POR_PAGINA && ( 
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
          )}
        </div>

        {modal && (
          <Modal
            isOpen={modal}
            style={customStyles}
            onRequestClose={closeModal}
            contentLabel="Detalle 24/09/2021"
          >
            <AtencionDetalleModal informe={informe} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default AgregarConsulta;
