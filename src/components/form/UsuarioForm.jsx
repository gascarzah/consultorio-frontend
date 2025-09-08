import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { getRoles } from "../../slices/rolSlice";
import { getMenusPorRol, registrarRolMenu, resetState } from "../../slices/rolMenuSlice";
import { Alerta } from "../Alerta";
import { getEmpleadosPorEmpresa } from "../../slices/empleadoSlice";
import { getUsuario } from "../../slices/usuarioSlice";

// Esquema de validación con Yup
const usuarioSchema = Yup.object().shape({
  idRol: Yup.string().required("El rol es obligatorio"),
  idEmpleado: Yup.string().required("El empleado es obligatorio"),
});

const UsuarioForm = ({ usuario }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { roles } = useSelector((state) => state.rol);
  const { rolMenus } = useSelector((state) => state.rolMenu);
  const { empleados } = useSelector((state) => state.empleado);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.usuario);
  const { email } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getRoles());
  }, [dispatch]);

  useEffect(() => {
    if (rolMenus.length > 0) {
      setSelectedItems(rolMenus.filter(menu => menu.activo).map(menu => menu.idMenu));
    }
  }, [rolMenus]);

  // Primero obtenemos los datos del usuario
  useEffect(() => {
    if (email) {
      dispatch(getUsuario(email))
        .unwrap()
        .then((resultado) => {
          console.log("Usuario cargado:", resultado);
        })
        .catch((error) => {
          console.error("Error al cargar usuario:", error);
        });
    }
  }, [dispatch, email]);

  // Luego, cuando tengamos el user.idEmpresa, cargamos los empleados
  useEffect(() => {
    if (user?.idEmpresa) {
      console.log("Cargando empleados para empresa:", user.idEmpresa);
      dispatch(getEmpleadosPorEmpresa(user.idEmpresa));
    }
  }, [dispatch, user?.idEmpresa]);

  const handleOnSubmit = (values) => {
    dispatch(registrarRolMenu({ 
      ...values, 
      idsMenu: selectedItems,
      idEmpleado: values.idEmpleado 
    }))
      .unwrap()
      .then((resultado) => {
        dispatch(resetState());
        navigate('/listar-usuario');
      })
      .catch((errores) => {
        console.log("Errores al registrar rol-menu:", errores);
      });
  };

  const checkboxHandler = (e) => {
    const value = parseInt(e.target.value);
    setSelectedItems((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const checkAllHandler = () => {
    setSelectedItems(selectedItems.length === rolMenus.length ? [] : rolMenus.map((menu) => menu.idMenu));
  };

  const handleOnChange = (e, setFieldValue) => {
    const idRol = e.target.value;
    setFieldValue("idRol", idRol);
    setSelectedItems([]);
    dispatch(getMenusPorRol(idRol));
  };

  return (
    <Formik
      initialValues={{
        idRol: usuario?.idRol || "",
        idEmpleado: usuario?.idEmpleado || ""
      }}
      validationSchema={usuarioSchema}
      onSubmit={handleOnSubmit}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form className="my-10 bg-white shadow rounded p-10">
          <div className="my-3">
            <label
              htmlFor="idEmpleado"
              className="uppercase text-gray-600 block font-bold"
            >
              Médico
            </label>
            <Field
              as="select"
              name="idEmpleado"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            >
              <option value="">Selecciona un Médico</option>
              {empleados?.map((empleado) => (
                <option
                  key={empleado.idEmpleado}
                  value={empleado.idEmpleado}
                >
                  {empleado.apellidoPaterno} {empleado.apellidoMaterno}, {empleado.nombres}
                </option>
              ))}
            </Field>
            <ErrorMessage name="idEmpleado" component={Alerta} />
          </div>

          <div className="my-5">
            <label htmlFor="idRol" className="uppercase text-gray-600 block font-bold">
              Rol
            </label>
            <Field
              as="select"
              name="idRol"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              onChange={(e) => handleOnChange(e, setFieldValue)}
            >
              <option value="">Selecciona un Rol</option>
              {roles?.map((role) => (
                <option key={role.idRol} value={role.idRol}>
                  {role.nombre}
                </option>
              ))}
            </Field>
            <ErrorMessage name="idRol" component={Alerta} />
          </div>

          <div className="my-5">
            <button
              type="button"
              onClick={checkAllHandler}
              className="bg-sky-600 text-white py-1.5 px-3 rounded text-sm hover:bg-sky-700 transition-colors"
            >
              {rolMenus && rolMenus.length === selectedItems.length
                ? "Deseleccionar Todos"
                : "Seleccionar Todos"}
            </button>
          </div>

          <div className="my-5">
            <h3 className="text-lg font-bold">Seleccionar Menús</h3>
            {rolMenus && rolMenus.length > 0 ? (
              <div className="grid grid-cols-5 gap-4">
                {rolMenus.map((menu) => (
                  <label key={menu.idMenu} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={menu.idMenu}
                      checked={selectedItems.includes(menu.idMenu)}
                      onChange={checkboxHandler}
                      className="form-checkbox h-5 w-5 text-sky-600"
                    />
                    <span className="text-gray-700">{menu.nombre}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No hay menús disponibles</p>
            )}
          </div>

          <div>
            <input
              type="submit"
              value="Registrar Usuario"
              className="bg-sky-700 w-full rounded py-3 text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UsuarioForm;
