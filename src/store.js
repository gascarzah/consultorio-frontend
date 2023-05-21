import { configureStore } from '@reduxjs/toolkit'
import usuario from './slices/usuarioSlice'
import rol from './slices/rolSlice'
import auth from './slices/authSlice'
import cliente from './slices/clienteSlice'
import empleado from './slices/empleadoSlice'
import programacion from './slices/programacionSlice'
import programacionDetalle from './slices/programacionDetalleSlice'
import cita from './slices/citaSlice'
import empresa from './slices/empresaSlice'
import horario from './slices/horarioSlice'

import consultorio from './slices/consultorioSlice'


export default configureStore({
  reducer: {
    usuario,
    rol,
    auth,
    cliente,
    empleado,
    programacion,
    cita,
    programacionDetalle,
    empresa,
    horario,

    consultorio,

  }
})