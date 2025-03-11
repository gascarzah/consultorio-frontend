import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../config/axios';

// Estado inicial
const initialState = {
  loading: false,
  code: null, 
  message: null,
  logged: false,
  citas: [],
  cita: {},
  historiales: [],
  total: 0,
  prev: null,
  next: null,
  numberPage: 0,
};

// Manejo de errores de manera centralizada
const handleError = (state, payload) => {
  console.error('Error:', payload);
  state.loading = false;
  state.code = payload?.status || null;
  state.message = payload?.message || 'Error';
};

// Crear los thunks
export const getListaCitados = createAsyncThunk(
  'getListaCitados',
  async (values, { rejectWithValue }) => {
    console.log('getListaCitados - valores:', values);
    try {
      const { data } = await clienteAxios.get('/citas/listaCitados', {
        params: {
          numeroDocumento: values.idEmpleado.numeroDocumento, 
          idEmpresa: values.idEmpleado.idEmpresa,
          numeroDiaSemana: values.numeroDiaSemana,
        },
      });
      console.log('getListaCitados - respuesta:', data);
      return data;
    } catch (error) {
      console.error('Error en getListaCitados:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCitasIdProgramacionDetalle = createAsyncThunk(
  'getCitasIdProgramacionDetalle',
  async (idProgramacionDetalle, { rejectWithValue }) => {
    console.log('getCitasIdProgramacionDetalle - id:', idProgramacionDetalle);
    try {
      const { data } = await clienteAxios.get(`/citas/medico?idProgramacionDetalle=${idProgramacionDetalle}`);
      console.log('getCitasIdProgramacionDetalle - respuesta:', data);
      return data;
    } catch (error) {
      console.error('Error en getCitasIdProgramacionDetalle:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCita = createAsyncThunk(
  'getCita',
  async (id, { rejectWithValue }) => {
    console.log('getCita - id:', id);
    try {
      const { data } = await clienteAxios.get(`/citas/${id}`);
      console.log('getCita - respuesta:', data);
      return data;
    } catch (error) {
      console.error('Error en getCita:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editarCita = createAsyncThunk(
  'editarCita',
  async (values, { rejectWithValue }) => {
    console.log('editarCita - valores:', values);
    try {
      const { data } = await clienteAxios.put(`/citas`, values);
      console.log('editarCita - respuesta:', data);
      return data;
    } catch (error) {
      console.error('Error en editarCita:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const eliminarCita = createAsyncThunk(
  'eliminarCita',
  async (values, { rejectWithValue }) => {
    console.log('eliminarCita - valores:', values);
    try {
      const { data } = await clienteAxios.put(`/citas/eliminar`, values);
      console.log('eliminarCita - respuesta:', data);
      return data;
    } catch (error) {
      console.error('Error en eliminarCita:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getHistorialCitas = createAsyncThunk(
  'getHistorialCitas',
  async (values, { rejectWithValue }) => {
    console.log('getHistorialCitas - valores:', values);
    try {
      const { data } = await clienteAxios.get('/citas/historial/pageable', {
        params: {
          page: values.page,
          size: values.size,
          numeroDocumento: values.numeroDocumento,
        },
      });
      console.log('getHistorialCitas - respuesta:', data);
      return data;
    } catch (error) {
      console.error('Error en getHistorialCitas:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCitasPaginado = createAsyncThunk(
  'getCitasPaginado',
  async (values, { rejectWithValue }) => {
    console.log('getCitasPaginado - valores:', values);
    try {
      const { data } = await clienteAxios.get('/citas/pageable', {
        params: {
          page: values.page,
          size: values.size,
        },
      });
      console.log('getCitasPaginado - respuesta:', data);
      return data;
    } catch (error) {
      console.error('Error en getCitasPaginado:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const registrarCita = createAsyncThunk(
  'registrarCita',
  async (values, { rejectWithValue }) => {
    console.log('registrarCita - valores:', values);
    try {
      const { data } = await clienteAxios.post('/citas', values);
      console.log('registrarCita - respuesta:', data);
      return data;
    } catch (error) {
      console.error('Error en registrarCita:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const citaSlice = createSlice({
  name: 'cita',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getListaCitados.fulfilled, (state, { payload }) => {
        console.log('fulfilled getListaCitados - payload:', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'Se encontró la lista de citados';
        state.citas = payload;
      })
      .addCase(getListaCitados.rejected, (state, { payload }) => {
        console.log('rejected getListaCitados - payload:', payload);
        handleError(state, payload);
        state.citas = [];
      })
      .addCase(getCitasIdProgramacionDetalle.fulfilled, (state, { payload }) => {
        console.log('fulfilled getCitasIdProgramacionDetalle - payload:', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'Detalles encontrados';
        state.citas = payload;
      })
      .addCase(getCitasIdProgramacionDetalle.rejected, (state, { payload }) => {
        console.log('rejected getCitasIdProgramacionDetalle - payload:', payload);
        handleError(state, payload);
        state.citas = [];
      })
      .addCase(getCita.fulfilled, (state, { payload }) => {
        console.log('fulfilled getCita - payload:', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'Cita encontrada';
        state.cita = payload;
      })
      .addCase(getCita.rejected, (state, { payload }) => {
        console.log('rejected getCita - payload:', payload);
        handleError(state, payload);
        state.cita = {};
      })
      .addCase(getHistorialCitas.fulfilled, (state, { payload }) => {
        console.log('fulfilled getHistorialCitas - payload:', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'Historial encontrado';
        state.historiales = payload.content;
        state.total = payload.totalElements;
        state.prev = payload.first;
        state.next = payload.last;
        state.numberPage = payload.number;
      })
      .addCase(getHistorialCitas.rejected, (state, { payload }) => {
        console.log('rejected getHistorialCitas - payload:', payload);
        handleError(state, payload);
        state.historiales = [];
      })
      .addCase(getCitasPaginado.fulfilled, (state, { payload }) => {
        console.log('fulfilled getCitasPaginado - payload:', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'Citas paginadas encontradas';
        state.citas = payload.content;
        state.total = payload.totalElements;
        state.prev = payload.first;
        state.next = payload.last;
        state.numberPage = payload.number;
      })
      .addCase(getCitasPaginado.rejected, (state, { payload }) => {
        console.log('rejected getCitasPaginado - payload:', payload);
        handleError(state, payload);
        state.citas = [];
      })
      .addCase(registrarCita.fulfilled, (state, { payload }) => {
        console.log('fulfilled registrarCita - payload:', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(registrarCita.rejected, (state, { payload }) => {
        console.log('rejected registrarCita - payload:', payload);
        handleError(state, payload);
      });
  },
});

export const { resetState } = citaSlice.actions;
export default citaSlice.reducer;
