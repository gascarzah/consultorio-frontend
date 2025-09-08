import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik"; // Usamos Formik, Field, Form y ErrorMessage aquí
import { getRoles } from "../../slices/rolSlice";
import { getMenusPorRol, registrarRolMenu, resetState } from "../../slices/rolMenuSlice";
import { Alerta } from "../../components/Alerta";


// Esquema de validación con Yup
const menuSchema = Yup.object().shape({
  idRol: Yup.string().required("El rol es obligatorio"),
});

const MantenimientoRolMenu = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { roles } = useSelector((state) => state.rol);
  const { rolMenus } = useSelector((state) => state.rolMenu);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch roles y reset del estado cuando el componente se monta
  useEffect(() => {
    // dispatch(resetState());
    dispatch(getRoles());
  }, [dispatch]);

  // Efecto para actualizar los menús seleccionados cuando cambian los rolMenus
  useEffect(() => {
    if (rolMenus.length > 0) {
      setSelectedItems(rolMenus.filter(menu => menu.activo).map(menu => menu.idMenu));
    }
  }, [rolMenus]);

  // Maneja la sumisión del formulario
  const handleOnSubmit = (values) => {
    dispatch(registrarRolMenu({ ...values, idsMenu: selectedItems }))
      .unwrap()
      .then((resultado) => {
        dispatch(resetState());
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
    setSelectedItems([]); // Reinicia los seleccionados al cambiar de rol
    dispatch(getMenusPorRol(idRol));
  };

  return (
    <Formik
      initialValues={{ idRol: "" }}
      validationSchema={menuSchema}
      onSubmit={handleOnSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="my-10 bg-white shadow rounded flex-col w-3/4">
          <div className="my-10 bg-white shadow rounded p-10 flex flex-col w-3/4">
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
                <option value="" label="Selecciona un rol">
                  Select un Rol
                </option>

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
                className="relative block rounded bg-sky-600 py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              >
                {rolMenus && rolMenus.length === selectedItems.length
                  ? "DesSeleccionar Todos"
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
          </div>

          <div className="">
            <input
              type="submit"
              value="Registrar Menú"
              className="bg-sky-700 mb-5 w-full rounded py-3 text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MantenimientoRolMenu;
