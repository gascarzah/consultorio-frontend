import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../config/axios';

const initialState = {
  loading: false,
  user: {},
  code: null,
  message: null,
  logged: false,
  usuarios: [],
};

export const registrarUsuario = createAsyncThunk(
  'usuario',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.post("/usuarios", values);
      console.log('Registro exitoso:', data);
      return data;
    } catch (error) {
      console.error('Error en registrarUsuario:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const getUsuario = createAsyncThunk(
  'getUsuario',
  async (email, { rejectWithValue }) => {
    console.log('Buscando usuario con email:', email);
    try {
      const { data } = await clienteAxios.get(`/usuarios/${email}`);
      console.log('Usuario encontrado:', data);
      return data;
    } catch (error) {
      console.error('Error en getUsuario:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrarUsuario.pending, (state) => {
        console.log('Registro de usuario pendiente...');
        state.loading = true;
      })
      .addCase(registrarUsuario.fulfilled, (state, { payload }) => {
        console.log('Registro completado con éxito:', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(registrarUsuario.rejected, (state, { payload }) => {
        console.error('Registro rechazado:', payload);
        state.loading = false;
        state.code = payload?.status || 500;
        state.message = payload?.message || 'Error desconocido';
      })
      .addCase(getUsuario.fulfilled, (state, { payload }) => {
        console.log('Usuario obtenido con éxito:', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'Usuario encontrado';
        state.user = {
          id: payload.idUsuario,
          email: payload.email,
          nombreCompleto: `${payload.empleado.apellidoPaterno} ${payload.empleado.apellidoMaterno}, ${payload.empleado.nombres}`,
          numeroDocumento: payload.numeroDocumento,
          idEmpresa: payload.empleado?.empresa?.idEmpresa,
        };
      })
      .addCase(getUsuario.rejected, (state, { payload }) => {
        console.error('Error al obtener usuario:', payload);
        state.loading = false;
        state.code = payload?.status || 500;
        state.message = payload?.message || 'Error desconocido';
      });
  },
});

export const { resetState } = usuarioSlice.actions;
export default usuarioSlice.reducer;
