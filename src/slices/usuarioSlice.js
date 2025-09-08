import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';
import { registrarRolMenu } from './rolMenuSlice';
import { setRol } from './authSlice';


const initialState = {
  loading: false,
  user: {},
  code: null,
  message: null,
  logged: false,
  usuarios: [],
  passwordChanged: false,
};

export const registrarUsuario = createAsyncThunk(
  'usuario',
  async (values, { dispatch, rejectWithValue }) => {
    try {
      // Registrar usuario
      const { data } = await clienteAxios.post("/usuarios", values);
      
      // Obtener los menús por defecto para el rol
      const menuResponse = await clienteAxios.get(`/menus`);
      const menuIds = menuResponse.data
        .filter(menu => menu.activo) // Solo menús activos
        .map(menu => menu.idMenu);
      
      if (menuIds.length > 0) {
        // Registrar la relación rol-menu
        await dispatch(registrarRolMenu({ 
          idRol: values.idRol,
          idsMenu: menuIds
        })).unwrap();
      }

      // Obtener información del rol
      const rolResponse = await clienteAxios.get(`/roles/${values.idRol}`);
      
      // Actualizar el rol en el estado de autenticación
      dispatch(setRol(rolResponse.data));

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        // console.log('xxxxxxx')
        // console.log(error.response.data.message)
        // console.log(error.message)

        return rejectWithValue(error.response.data.message)
      } else {
        // console.log('ttttttttt')
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getUsuario = createAsyncThunk(
  'getUsuario',
  async (email, { rejectWithValue }) => {
    console.log('values ==> ', email)


    try {

      const { data } = await clienteAxios.get(`/usuarios/${email}`);
      // console.log('data ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)
export const getUsuarioPorId = createAsyncThunk(
  'getUsuarioPorId',
  async (id, { rejectWithValue }) => {
    console.log('values ==> ', id)


    try {

      const { data } = await clienteAxios.get(`/usuarios/id/${id}`);
      console.log('data ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getUsuariosPaginado = createAsyncThunk(
  'getUsuariosPaginado',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.get(`/usuarios/pageable`,
        {
          params: {
            page: values.page,
            size: values.size,
          }
        });
      return data
    } catch (error) {

      return rejectWithValue(error.response.data)
    }
  }
)


export const modificarUsuario = createAsyncThunk(
  'modificarUsuario',
  async (values, { rejectWithValue }) => {

    try {
      const { data } = await clienteAxios.put(`/usuarios`, values);
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const cambiarPassword = createAsyncThunk(
  'usuario/cambiarPassword',
  async ({ passwordActual, nuevaPassword, idUsuario }, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.post('/usuario/cambiar-password', {
        passwordActual,
        nuevaPassword,
        idUsuario
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: { resetState: () => initialState, },

  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(registrarUsuario.pending, (state, action) => {
        state.loading = true
      })
      .addCase(registrarUsuario.fulfilled, (state, { payload }) => {
        // console.log('fulfilled payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(registrarUsuario.rejected, (state, { payload }) => {
        console.log('registrarUsuario.rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(getUsuario.fulfilled, (state, { payload }) => {
        console.log('fulfilled getUsuario payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'

        state.user = {
          id: payload.idUsuario,
          email: payload.email,
          nombreCompleto: payload.empleado.apellidoPaterno + ' ' +
            payload.empleado.apellidoMaterno + ', ' +
            payload.empleado.nombres,
          idEmpleado: payload.empleado.idEmpleado,
          idEmpresa: payload.empleado.empresa.idEmpresa
        }
      })
      .addCase(getUsuario.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(getUsuarioPorId.fulfilled, (state, { payload }) => {
        console.log('fulfilled getUsuario payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'

        state.user = {
          id: payload.idUsuario,
          email: payload.email,
          nombreCompleto: payload.empleado.apellidoPaterno + ' ' +
            payload.empleado.apellidoMaterno + ', ' +
            payload.empleado.nombres,
          idEmpleado: payload.empleado.idEmpleado,
          idEmpresa: payload.empleado.empresa.idEmpresa
        }
      })
      .addCase(getUsuarioPorId.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(getUsuariosPaginado.fulfilled, (state, { payload }) => {
        console.log('se listo correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.usuarios = payload.content
        state.total = payload.totalElements
        state.prev = payload.first
        state.next = payload.last
        state.numberPage = payload.number
      })
      .addCase(getUsuariosPaginado.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.horarios = []
      })
      .addCase(modificarUsuario.fulfilled, (state, { payload }) => {
        console.log('se modifico correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'

      })
      .addCase(modificarUsuario.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.usuarios = []
      })
      .addCase(cambiarPassword.pending, (state) => {
        state.loading = true;
        state.passwordChanged = false;
      })
      .addCase(cambiarPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordChanged = true;
        state.code = 200;
        state.message = 'Contraseña cambiada exitosamente';
      })
      .addCase(cambiarPassword.rejected, (state, action) => {
        state.loading = false;
        state.passwordChanged = false;
        state.code = action.payload?.status || 400;
        state.message = action.payload?.message || 'Error al cambiar la contraseña';
      })
  }


})



export const { resetState } = usuarioSlice.actions

export default usuarioSlice.reducer

