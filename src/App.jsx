import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./pages/Login";
import AuthLayout from "./layout/AuthLayout";
import OlvidePassword from "./pages/OlvidePassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import NuevoPassword from "./pages/NuevoPassword";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import RutaProtegida from "./layout/RutaProtegida";
import Dashboard from "./pages/Dashboard";
import EditarCita from "./pages/cita/Editar";
import SetupInterceptors from "./config/SetupInterceptors";
import AgregarProgramacion from "./pages/programacion/Agregar";
import AgregarCliente from "./pages/cliente/Agregar";
import AgregarCita from "./pages/cita/Agregar";
import ListarConsulta from "./pages/consulta";
import AgregarConsulta from "./pages/consulta/Agregar";
import ListarCliente from "./pages/cliente";
import EditarCliente from "./pages/cliente/Editar";
import ListarEmpleado from "./pages/empleado";
import ListarProgramacion from "./pages/programacion";
import ListarHorario from "./pages/horario";
import ListarTipoEmpleado from "./pages/tipoEmpleado";

import ListarCita from "./pages/cita";
import AgregarHorario from "./pages/horario/Agregar";
import AgregarTipoEmpleado from "./pages/tipoEmpleado/Agregar";
import EditarHorario from "./pages/horario/Editar";
import EditarTipoEmpleado from "./pages/tipoEmpleado/Editar";
import AgregarEmpleado from "./pages/empleado/Agregar";
import ListarProgramacionDetalle from "./pages/programacionDetalle";
import AgregarProgramacionDetalle from "./pages/programacionDetalle/Agregar";
import EditarProgramacionDetalle from "./pages/programacionDetalle/Editar";
import ListarMaestra from "./pages/maestra";
import AgregarMaestra from "./pages/maestra/Agregar";
import EditarMaestra from "./pages/maestra/Editar";

function App() {
  function NavigateFunctionComponent(props) {
    const navigate = useNavigate();
    SetupInterceptors(navigate);
    return <></>;
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        {<NavigateFunctionComponent />}
        <Routes>
          <Route path={"/"} element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path={"registrar"} element={<RegistrarUsuario />} />
            <Route path={"olvide-password"} element={<OlvidePassword />} />
            <Route
              path={"olvide-password/:token"}
              element={<NuevoPassword />}
            />
            <Route path={"confirmar/:id"} element={<ConfirmarCuenta />} />
          </Route>

          <Route path="/dashboard" element={<RutaProtegida />}>
            <Route index element={<Dashboard />} />

            <Route path="listar-cliente" element={<ListarCliente />} />

            <Route
              path="listar-cliente/agregar-cliente"
              element={<AgregarCliente />}
            />
            <Route
              path="listar-cliente/editar-cliente/:id"
              element={<EditarCliente />}
            />

            <Route path="listar-empleado" element={<ListarEmpleado />} />
            <Route
              path="listar-empleado/agregar-empleado"
              element={<AgregarEmpleado />}
            />
            <Route
              path="listar-programacion"
              element={<ListarProgramacion />}
            />
            <Route
              path="listar-programacion/agregar-programacion"
              element={<AgregarProgramacion />}
            />

            <Route
              path="listar-programacion-detalle"
              element={<ListarProgramacionDetalle />}
            />
            <Route
              path="listar-programacion-detalle/agregar-programacion-detalle"
              element={<AgregarProgramacionDetalle />}
            />
            <Route
              path="listar-programacion-detalle/editar-programacion-detalle/:id"
              element={<EditarProgramacionDetalle />}
            />

            <Route path="listar-maestra" element={<ListarMaestra />} />
            <Route
              path="listar-maestra/agregar-maestra"
              element={<AgregarMaestra />}
            />
            <Route
              path="listar-maestra/editar-maestra/:id"
              element={<EditarMaestra />}
            />
            {/* <Route path="listar-horario" element={<ListarHorario />} />
            <Route
              path="listar-horario/agregar-horario"
              element={<AgregarHorario />}
            />
            <Route
              path="listar-horario/editar-horario/:id"
              element={<EditarHorario />}
            /> */}
            {/* <Route
              path="listar-tipoempleado"
              element={<ListarTipoEmpleado />}
            />
            <Route
              path="listar-tipoEmpleado/agregar-tipoEmpleado"
              element={<AgregarTipoEmpleado />}
            />
            <Route
              path="listar-tipoEmpleado/editar-tipoEmpleado/:id"
              element={<EditarTipoEmpleado />}
            /> */}
            <Route path="listar-cita" element={<ListarCita />} />
            <Route path="listar-cita/agregar-cita" element={<AgregarCita />} />

            {/* <Route path="listar-consultorio" element={<ListarConsultorio />} />
            <Route
              path="listar-consultorio/agregar-consultorio"
              element={<AgregarConsultorio />}
            /> */}
            <Route path="editar-cita/:id" element={<EditarCita />} />

            <Route path="listar-consulta" element={<ListarConsulta />} />

            <Route
              path="agregar-consulta/:id/:idCliente"
              element={<AgregarConsulta />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
