import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
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
import { getHistoriaClinicas } from "../../slices/historiaClinicaSlice";
import { getUsuario } from "../../slices/usuarioSlice";

import { LISTAR_CITA, MENSAJE_GUARDADO_EXITOSO, MENSAJE_MODIFICADO_EXITOSO, SWEET_GUARDO, SWEET_MODIFICO, SWEET_SUCESS, SweetCrud, TIEMPO_REDIRECCION } from "../../utils";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from "react-toastify";

const nuevaCitaSchema = Yup.object().shape({
  numeroDocumento: Yup.string().required("Debe seleccionar un medico"),
  idProgramacionDetalle: Yup.string().required("Debe seleccionar un dia"),
  idHorario: Yup.string().required("Debe seleccionar un horario"),
});

export const CitaForm = ({ cita }) => {
  const { email } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.usuario);
  const { empleados } = useSelector((state) => state.empleado);
  
  const [alerta, setAlerta] = useState({});

  const [dias, setDias] = useState([]);
  const [listaCitas, setListaCitas] = useState([]);
  const [listaHorarios, setListaHorarios] = useState([]);
  const [listaEmpleados, setListaEmpleados] = useState([]);
  
  const [items, setItems] = useState([]);
  const [handleSelectHistoriaClinica, setHandleSelectHistoriaClinica] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [listaHistoriaClinicas, setListaHistoriaClinicas] = useState([]);
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    if (email) {
      console.log("Obteniendo datos del usuario con email:", email);
      dispatch(getUsuario(email))
        .unwrap()
        .then((resultado) => {
          console.log("Datos del usuario obtenidos exitosamente:", resultado);
        })
        .catch((error) => {
          console.error("Error al obtener datos del usuario:", error);
          toast.error("Error al obtener datos del usuario");
        });
    }
  }, [email, dispatch]);

  useEffect(() => {
    if (user?.idEmpresa) {
      console.log("Obteniendo empleados para la empresa ID:", user.idEmpresa);
      dispatch(getEmpleadosPorEmpresa(user.idEmpresa))
        .unwrap()
        .then((resultado) => {
          console.log("Lista de empleados obtenida:", resultado);
          if (Array.isArray(resultado)) {
            setListaEmpleados(resultado);
          } else {
            console.error("El resultado no es un array:", resultado);
            setListaEmpleados([]);
          }
        })
        .catch((errores) => {
          console.error("Error al obtener empleados:", errores);
          setListaEmpleados([]);
          toast.error(errores.message || "Error al obtener la lista de empleados");
        });
    } else {
      console.log("No hay ID de empresa disponible en user:", user);
    }
  }, [user?.idEmpresa, dispatch]);

  useEffect(() => {
    dispatch(getHorarios())
      .unwrap()
      .then((resultado) => {
        console.log("Horarios obtenidos:", resultado);
        setListaHorarios(resultado);
      })
      .catch((errores) => {
        console.error("Error al obtener horarios:", errores);
        setListaHorarios([]);
        toast.error(errores.message || "Error al obtener horarios");
      });
  }, [dispatch]);

  useEffect(() => {
    // dispatch(resetState());
    getHistoriasClinicas()
  }, []);
  useEffect(() => {
    if (cita) {
      console.log("viene de editar1 ", cita);
      //console.log("viene de editar");
      handleProgramacionDetallada(
        cita?.programacionDetalle?.empleado?.numeroDocumento
      );

      handleOnSelect({ id: cita?.historiaClinica?.idHistoriaClinica });
      // setHandleSelectHistoriaClinica({
      //   idHistoriaClinica: cita?.historiaClinica?.idHistoriaClinica,
      //   name: cita?.historiaClinica?.apellidoPaterno + " " +
      //         cita?.historiaClinica?.apellidoMaterno + ", " +
      //         cita?.historiaClinica?.nombres
      // });
    }
  }, [cita]);

  const getHistoriasClinicas = () => {
    
    dispatch(getHistoriaClinicas())
      .unwrap()
      .then((resultado) => {
        console.log("resultado de getHistoriaClinicas ", resultado);
        // setListaHistoriaClinicas(resultado);
        const manyItems = resultado.map((historiaClinica, i) => ({
          id: historiaClinica.idHistoriaClinica,
          name:
          historiaClinica.apellidoPaterno +
            " " +
            historiaClinica.apellidoMaterno +
            ", " +
            historiaClinica.nombres,
        }));

        console.log(manyItems)
        setListaHistoriaClinicas(manyItems);
      })
      .catch((errores) => {
       // console.log("Cita handleSubmit errores ===>> ", errores);
        setListaHistoriaClinicas([]);
        toast.error(errores.message);
      });
  }


  const handleSubmit = (values, resetForm) => {
console.log('si esta activo ',values)
    if (cita) {
      dispatch(
        editarCita({
          ...values,
          idHistoriaClinica: values.idHistoriaClinica,
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
        idHistoriaClinica: handleSelectHistoriaClinica.id,
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
    setHandleSelectHistoriaClinica(item);
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
      {msg && toast.error(msg)}
      <Formik
        initialValues={{
          idCita: cita?.idCita ?? "",
          numeroDocumento:
            cita?.programacionDetalle?.empleado?.numeroDocumento ?? "",
          idProgramacionDetalle:
            cita?.programacionDetalle?.idProgramacionDetalle ?? "",
          idHorario: cita?.horario?.idHorario ?? "",
          idHistoriaClinica: cita?.historiaClinica?.idHistoriaClinica ?? "",
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

            <>
                  <h1 className="text-sky-600 font-black text-3xl capitalize text-center mb-8">
        {cita?.idCita ? "Editar Cita" : "Registrar Cita"}
      </h1>
            
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
                          {empleado.apellidoPaterno}{" "}
                          {empleado.apellidoMaterno},{" "}
                          {empleado.nombres}
                        </option>
                      );
                    })}
                </select>
                {errors.numeroDocumento && touched.numeroDocumento && toast.error(errors.numeroDocumento)}
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
                          {item.diaSemana} (<strong>{item.fecha.split("-").reverse().join("/")}</strong>)
                        </option>
                      );
                    })}
                </select>
                {errors.idProgramacionDetalle &&
                touched.idProgramacionDetalle && toast.error(errors.idProgramacionDetalle)}
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
                {errors.idHorario && touched.idHorario && toast.error(errors.idHorario)}
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
                      name="idHistoriaClinica"
                      value={values.idHistoriaClinica}
                      // onChange={values.handleChange}
                      onChange={async (e) => {
                        
                        const { value } = e.target;
                        console.log('historia clinica', value)
                        setFieldValue("idHistoriaClinica", value);
                      }}
                      className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                    >
                      <option value="" label="Selecciona un cliente">
                        Select un Cliente{" "}
                      </option>
                      
                      {listaHistoriaClinicas?.map((item, index) => {
                        return (
                          <option
                            key={item.id}
                            value={item.id}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : (
                  <ReactSearchAutocomplete
                    items={listaHistoriaClinicas}
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
            </>
          );
        }}
      </Formik>
      
    </>
  );
};


