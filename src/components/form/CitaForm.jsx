import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Alerta } from "../Alerta";
import { useDispatch, useSelector } from "react-redux";
import {
  resetState,
  getCitasIdProgramacionDetalle,
  registrarCita,
  editarCita,
} from "../../slices/citaSlice";
import { getEmpleadosPorEmpresa } from "../../slices/empleadoSlice";
import { getProgramacionDetalles } from "../../slices/programacionDetalleSlice";

import { getHorarios } from "../../slices/horarioSlice";
import { getClientes } from "../../slices/clienteSlice";
import { LISTAR_CITA, MENSAJE_GUARDADO_EXITOSO, MENSAJE_MODIFICADO_EXITOSO, SWEET_GUARDO, SWEET_MODIFICO, SWEET_SUCESS, SweetCrud, TIEMPO_REDIRECCION } from "../../utils";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const nuevaCitaSchema = Yup.object().shape({
  numeroDocumento: Yup.string().required("Debe seleccionar un medico"),
  idProgramacionDetalle: Yup.string().required("Debe seleccionar un dia"),
  idHorario: Yup.string().required("Debe seleccionar un horario"),
});

export const CitaForm = ({ cita }) => {
  const { user } = useSelector((state) => state.usuario);
  const [alerta, setAlerta] = useState({});

  const [dias, setDias] = useState([]);
  const [listaCitas, setListaCitas] = useState([]);
  const [listaClientes, setListaClientes] = useState([]);
  const [listaHorarios, setListaHorarios] = useState([]);
  const [listaEmpleados, setListaEmpleados] = useState([]);

  const [items, setItems] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [clientes, setClientes] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, onChange] = useState(new Date());


  useEffect(() => {
    dispatch(resetState());
  }, []);
  useEffect(() => {
    //console.log("viene de editar1 ", cita);
    if (cita) {
      //console.log("viene de editar");
      handleProgramacionDetallada(
        cita?.programacionDetalle?.empleado?.numeroDocumento
      );

      handleOnSelect({ id: cita?.cliente?.numeroDocumento });
    }
  }, [cita]);

  useEffect(() => {
    //console.log(user.idEmpresa);
    dispatch(getEmpleadosPorEmpresa(user.idEmpresa))
      .unwrap()
      .then((resultado) => {
        setListaEmpleados(resultado);
      })
      .catch((errores) => {
        //console.log("Cita handleSubmit errores ===>> ", errores);
        setListaEmpleados([]);
        toast.error(errores.message);
      });

    dispatch(getHorarios())
      .unwrap()
      .then((resultado) => {
        setListaHorarios(resultado);
      })
      .catch((errores) => {
        //console.log("Cita handleSubmit errores ===>> ", errores);
        setListaHorarios([]);
        toast.error(errores.message);
      });

    dispatch(getClientes())
      .unwrap()
      .then((resultado) => {
        //console.log("resultado de resultado ", resultado);
        setClientes(resultado);
        const manyItems = resultado.map((cliente, i) => ({
          id: cliente.historiaClinica,
          name:
            cliente.apellidoPaterno +
            " " +
            cliente.apellidoMaterno +
            ", " +
            cliente.nombres,
        }));

        console.log(manyItems)
        setListaClientes(manyItems);
      })
      .catch((errores) => {
       // console.log("Cita handleSubmit errores ===>> ", errores);
        setListaClientes([]);
        toast.error(errores.message);
      });
    //console.log(" useeffect ===>>>> ", items);
  }, [dispatch]);

  const handleSubmit = (values, resetForm) => {
console.log('si esta activo ',values)
    if (cita) {
      dispatch(
        editarCita({
          ...values,
          historiaClinica: values.historiaClinica,
          atendido: false,
        })
      )
        .unwrap()
        .then((resultado) => {
          SweetCrud(SWEET_MODIFICO,SWEET_SUCESS)
          navigate(LISTAR_CITA);
        })
        .catch((errores) => {
          console.log("Cita handleSubmit errores ===>> ", errores);
          
        });
    } else {

      const valores = {
        ...values,
        historiaClinica: cliente.id,
        atendido: false,
      };


      dispatch(registrarCita(valores))
        .unwrap()
        .then((resultado) => {
          SweetCrud(SWEET_GUARDO,SWEET_SUCESS) 
          navigate(LISTAR_CITA);
        })
        .catch((errores) => {
          console.log("Cita handleSubmit errores ===>> ", errores);
          toast.error(errores.message);
        });
    }
  };

  const handleProgramacionDetallada = (numeroDocumento) => {
    //console.log(numeroDocumento);
    if (numeroDocumento) {
      dispatch(
        getProgramacionDetalles({
          numeroDocumento: numeroDocumento,
          idEmpresa: user.idEmpresa,
        })
      )
        .unwrap()
        .then((resultado) => {
          // console.log(
          //   "Cita handleProgramacionDetallada resultado ===>> ",
          //   resultado
          // );
          // console.log("Cita handleProgramacionDetallada redirecciona login");
          setDias(resultado);
          setListaCitas([]);
        })
        .catch((errores) => {
          // console.log(
          //   "Cita handleProgramacionDetallada errores ===>> ",
          //   errores
          // );
          setListaCitas([]);
          setDias([]);
        });
    } else {
      setListaCitas([]);
      setDias([]);
    }
  };

  const handleCitas = (idProgramacionDetalle) => {
    // console.log(
    //   "handleCitas idProgramacionDetalle ====>>>>  ",
    //   idProgramacionDetalle
    // );

    if (idProgramacionDetalle) {
      dispatch(getCitasIdProgramacionDetalle(idProgramacionDetalle))
        .unwrap()
        .then((resultado) => {
          // console.log("Cita handleCitas resultado ===>> ", resultado);
          // console.log("Cita handleCitas redirecciona login");
          setListaCitas(resultado);
        })
        .catch((errores) => {
          console.log("Cita handleCitas errores ===>> ", errores);
        });
    } else {
      setListaCitas([]);
    }
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log("handleOnSearch");
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log("handleOnHover");
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log("handleOnSelect");
    // the item selected
    console.log(item);
    setCliente(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span> */}
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  const { msg } = alerta;

  return (
    <>
      {" "}
      {msg && <Alerta msg={alerta.msg} error={alerta.error} />}
      <Formik
        initialValues={{
          idCita: cita?.idCita ?? "",
          numeroDocumento:
            cita?.programacionDetalle?.empleado?.numeroDocumento ?? "",
          idProgramacionDetalle:
            cita?.programacionDetalle?.idProgramacionDetalle ?? "",
          idHorario: cita?.horario?.idHorario ?? "",
          historiaClinica: cita?.cliente?.historiaClinica ?? "",
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
          //resetForm();
        }}
        validationSchema={nuevaCitaSchema}
      >
        {({ errors, touched, values, handleChange, setFieldValue }) => {
          return (
            <Form className="my-10 bg-white shadow rounded p-10 w-2/5 flex flex-col ">
              {console.log("errors ==>> ", errors)}
              {console.log("values ==>> ", values)} 
              <div className="my-3 ">
                <label
                  htmlFor="numeroDocumento"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Medico
                </label>
                <select
                  name="numeroDocumento"
                  value={values.numeroDocumento}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue("numeroDocumento", value);
                    handleProgramacionDetallada(value);
                    // props.setFieldValue("idProgramacionDetalle", "");
                  }}
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  style={{ display: "block" }}
                >
                  <option value="" label="Selecciona medico">
                    Selecciona un Medico{" "}
                  </option>

                  {listaEmpleados?.length > 0 &&
                    listaEmpleados?.map((empleado, index) => {
                      return (
                        <option
                          key={empleado.numeroDocumento}
                          value={empleado.numeroDocumento}
                        >
                          {empleado.persona.apellidoPaterno}{" "}
                          {empleado.persona.apellidoMaterno},{" "}
                          {empleado.persona.nombres}
                        </option>
                      );
                    })}
                </select>
                {errors.numeroDocumento && touched.numeroDocumento ? (
                  <Alerta msg={errors.numeroDocumento} error={true} />
                ) : null}
              </div>

                  {/* <div className="my-3">
                  <Calendar onChange={onChange} value={value} minDate={value} /> */}
                  {/* </div> */}

              <div className="my-3">
                <label
                  htmlFor="idProgramacionDetalle"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Dia
                </label>
                <select
                  id="idProgramacionDetalle"
                  name="idProgramacionDetalle"
                  value={values.idProgramacionDetalle || ""}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue("idProgramacionDetalle", value);
                    handleCitas(value);
                  }}
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  style={{ display: "block" }}
                >
                  <option value="" label="Selecciona dia">
                    Selecciona un Dia{" "}
                  </option>
                  {dias &&
                    dias.length > 0 &&
                    dias.map((item, index) => {
                      return (
                        <option
                          key={item.idProgramacionDetalle}
                          value={item.idProgramacionDetalle}
                        >
                          {item.diaSemana}
                        </option>
                      );
                    })}
                </select>
                {errors.idProgramacionDetalle &&
                touched.idProgramacionDetalle ? (
                  <Alerta msg={errors.idProgramacionDetalle} error={true} />
                ) : null}
              </div>

              <div className="my-3">
                <label
                  htmlFor="idHorario"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Horario
                </label>
                <select
                  id="idHorario"
                  name="idHorario"
                  value={values.idHorario || ""}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue("idHorario", value);
                    handleCitas(value);
                  }}
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  style={{ display: "block" }}
                >
                  <option value="" label="Selecciona dia">
                    Selecciona un Horario{" "}
                  </option>
                  {dias &&
                    listaHorarios.length > 0 &&
                    listaHorarios.map((item, index) => {
                      return (
                        <option key={item.idHorario} value={item.idHorario}>
                          {item.descripcion}
                        </option>
                      );
                    })}
                </select>
                {errors.idHorario && touched.idHorario ? (
                  <Alerta msg={errors.idHorario} error={true} />
                ) : null}
              </div>

              <div className="my-3">
                <label
                  htmlFor="cliente"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Cliente
                </label>

                {cita ? (
                  
                  <div className="my-3">
                    <select
                      name="historiaClinica"
                      value={values.historiaClinica}
                      // onChange={values.handleChange}
                      onChange={async (e) => {
                        console.log('historia clinica va', values)
                        const { value } = e.target;
                        console.log('historia clinica', value)
                        setFieldValue("historiaClinica", value);
                      }}
                      className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                    >
                      <option value="" label="Selecciona un cliente">
                        Select un Cliente{" "}
                      </option>
                      {clientes?.map((item, index) => {
                        return (
                          <option
                            key={item.historiaClinica}
                            value={item.historiaClinica}
                          >
                            {item.apellidoPaterno +
                              " " +
                              item.apellidoMaterno +
                              ", " +
                              item.nombres}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : (
                  <ReactSearchAutocomplete
                    items={listaClientes}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    formatResult={formatResult}
                  />
                )}
              </div>
              <div className="">
                <input
                  type="submit"
                  value="Registrar Cita"
                  className="bg-sky-700 mb-5 w-full rounded py-3 text-white font-bold
            uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
      
    </>
  );
};


