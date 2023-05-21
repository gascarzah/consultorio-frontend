import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Switch from "react-switch";
import { toast, ToastContainer } from "react-toastify";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { Alerta } from "../Alerta";
import { useDispatch, useSelector } from "react-redux";

import { getEmpleados, resetState } from "../../slices/empleadoSlice";

import {
  modificarProgramacionDetalle,
  registrarProgramacionDetalle,
} from "../../slices/programacionDetalleSlice";
import { getProgramacionActivo } from "../../slices/programacionSlice";

registerLocale("es", es);

const programacionDetalleSchema = Yup.object().shape({
  numeroDocumento: Yup.string().required("Debe seleccionar un medico"),
});

const ProgramacionDetalleForm = ({ programacionDetalle }) => {
  console.log("ProgramacionDetalleForm llega ", programacionDetalle);
  const { empleados } = useSelector((state) => state.empleado);
  const { user } = useSelector((state) => state.usuario);
  const [alerta, setAlerta] = useState({});
  const arrChecked = programacionDetalle?.listaDias ?? "";
  console.log("arrChecked ", arrChecked);
  const [programacion, setProgramacion] = useState();
  const [dias, setDias] = useState([]);
  const [checkedLunes, setCheckedLunes] = useState(false);
  const [checkedMartes, setCheckedMartes] = useState(false);
  const [checkedMiercoles, setCheckedMiercoles] = useState(false);
  const [checkedJueves, setCheckedJueves] = useState(false);
  const [checkedViernes, setCheckedViernes] = useState(false);
  const [checkedSabado, setCheckedSabado] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(dias.length).fill(false)
  );

  const estado = true;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeLunes = (checked) => {
    setCheckedLunes(checked);
  };
  const handleChangeMartes = (checked) => {
    setCheckedMartes(checked);
  };
  const handleChangeMiercoles = (checked) => {
    setCheckedMiercoles(checked);
  };
  const handleChangeJueves = (checked) => {
    setCheckedJueves(checked);
  };
  const handleChangeViernes = (checked) => {
    setCheckedViernes(checked);
  };
  const handleChangeSabado = (checked) => {
    setCheckedSabado(checked);
  };
  useEffect(() => {
    dispatch(getProgramacionActivo())
      .unwrap()
      .then((resultado) => {
        setProgramacion(resultado);
      })
      .catch((errores) => {
        console.log("errores ===>> ", errores);
      });
  }, []);

  useEffect(() => {
    dispatch(getEmpleados({ idEmpresa: user.idEmpresa }));
  }, [dispatch]);

  useEffect(() => {
    if (arrChecked) {
      console.log("arrChecked ", arrChecked);
      setCheckedLunes(arrChecked[0]);
      setCheckedMartes(arrChecked[1]);
      setCheckedMiercoles(arrChecked[2]);
      setCheckedJueves(arrChecked[3]);
      setCheckedViernes(arrChecked[4]);
      setCheckedSabado(arrChecked[5]);
    }
  }, [arrChecked]);

  const handleSubmit = (values, resetForm) => {
    console.log("alsubmit ===>> ", values);
    values.checked = [
      checkedLunes ? 0 : "",
      checkedMartes ? 1 : "",
      checkedMiercoles ? 2 : "",
      checkedJueves ? 3 : "",
      checkedViernes ? 4 : "",
      checkedSabado ? 5 : "",
    ];
    if (!programacionDetalle) {
      dispatch(
        registrarProgramacionDetalle({ ...values, idEmpresa: user.idEmpresa })
      )
        .unwrap()
        .then((resultado) => {
          console.log("resultado ===>> ", resultado);
          console.log("redirecciona login");

          toast.success("Se registro con exito");
          resetForm();

          navigate("/dashboard/listar-programacion-detalle");
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          toast.error(errores);
        });
    } else {
      dispatch(
        modificarProgramacionDetalle({ ...values, idEmpresa: user.idEmpresa })
      )
        .unwrap()
        .then((resultado) => {
          console.log("resultado ===>> ", resultado);
          console.log("redirecciona login");

          toast.success("Se registro con exito");
          resetForm();

          navigate("/dashboard/listar-programacion-detalle");
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          toast.error(errores);
        });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <ToastContainer />
      {msg && <Alerta alerta={alerta} />}

      <Formik
        initialValues={{
          numeroDocumento: programacionDetalle?.empleado?.numeroDocumento ?? "",
          checked: [],
          idProgramacion: programacion?.idProgramacion,
          idProgramacionDetalle: programacion?.idProgramacion,
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
          //resetForm();
        }}
        validationSchema={programacionDetalleSchema}
      >
        {({ errors, touched, values, handleChange, setFieldValue }) => {
          return (
            <Form className="my-10 bg-white shadow rounded p-10 w-2/5  ">
              {/* {console.log("props ", props)} */}
              <div className="flex flex-row gap-10">
                <div className="my-3 flex flex-col justify-evenly ">
                  <label
                    htmlFor="rango"
                    className="uppercase text-gray-600 block font-bold"
                  >
                    Fechas programadas
                  </label>
                  <span className="flex flex-row gap-7 mt-6">
                    {"Del"}
                    <h3 className="font-bold">
                      {programacion?.strFechaInicial}
                    </h3>
                    {"al"}
                    <h3 className="font-bold">{programacion?.strFechaFinal}</h3>
                  </span>
                </div>
              </div>
              <div className="my-3">
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
                    // handleVerificarProgramacion(value);
                  }}
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
                  style={{ display: "block" }}
                >
                  <option value="" label="Selecciona medico">
                    Selecciona un Medico{" "}
                  </option>

                  {empleados.length > 0 &&
                    empleados?.map((empleado, index) => {
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

              <div className="my-3   ">
                <label
                  htmlFor="nombre"
                  className="uppercase text-gray-600 block font-bold"
                >
                  Horario
                </label>
              </div>

              <div className="flex justify-between py-4">
                <label>
                  <Switch
                    checked={checkedLunes}
                    onChange={handleChangeLunes}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    className="react-switch"
                  />
                  Lunes
                </label>
                <label>
                  <Switch
                    checked={checkedMartes}
                    onChange={handleChangeMartes}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    className="react-switch"
                  />
                  Martes
                </label>
                <label>
                  <Switch
                    checked={checkedMiercoles}
                    onChange={handleChangeMiercoles}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    className="react-switch"
                  />
                  Miercoles
                </label>
                <label>
                  <Switch
                    checked={checkedJueves}
                    onChange={handleChangeJueves}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    className="react-switch"
                  />
                  Jueves
                </label>
                <label>
                  <Switch
                    checked={checkedViernes}
                    onChange={handleChangeViernes}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    className="react-switch"
                  />
                  Viernes
                </label>
                <label>
                  <Switch
                    checked={checkedSabado}
                    onChange={handleChangeSabado}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    className="react-switch"
                  />
                  Sabado
                </label>
              </div>

              <div className="flex-1">
                <input
                  type="submit"
                  value="Registrar Programacion"
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

export default ProgramacionDetalleForm;
