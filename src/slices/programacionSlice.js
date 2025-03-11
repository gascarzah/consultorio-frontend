import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../config/axios';

const SUCCESS_CODE = 201;
const SUCCESS_MESSAGE = 'Operación realizada correctamente';
const ERROR_MESSAGE = 'Hubo un error en la operación';

const initialState = {
  loading: false,
  code: null,
  message: null,
  logged: false,
  programaciones: [],
  programacion: {},
  total: [],
  prev: null,
  next: null,
  numberPage: 0,
};

// Función genérica para manejar casos fulfilled
const handleFulfilled = (state, action, message) => {
  console.log('Fulfilled payload:', action.payload);
  state.loading = false;
  state.code = SUCCESS_CODE;
  state.message = message;
  if (action.payload) {
    state.programaciones = action.payload.content || state.programaciones;
    state.programacion = action.payload || state.programacion;
    state.total = action.payload.totalElements || state.total;
    state.prev = action.payload.first || state.prev;
    state.next = action.payload.last || state.next;
    state.numberPage = action.payload.number || state.numberPage;
  }
};

// Función genérica para manejar casos rejected
const handleRejected = (state, action) => {
  console.log('Rejected payload:', action.payload);
  state.loading = false;
  state.code = action.payload.status;
  state.message = action.payload.message || ERROR_MESSAGE;
};

// Acciones asíncronas
export const registrarProgramacion = createAsyncThunk(
  'programacion',
  async (values, { rejectWithValue }) => {
    try {
      console.log('Registrar programacion:', values);
      const { data } = await clienteAxios.post("/programaciones", values);
      return data;
    } catch (error) {
      console.error('Error en registrar programacion:', error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getProgramacionesPaginado = createAsyncThunk(
  'getProgramacionesPaginado',
  async (values, { rejectWithValue }) => {
    try {
      console.log('Paginado de programaciones:', values);
      const { data } = await clienteAxios.get(`/programaciones/${values.idEmpresa}/pageable`, {
        params: { page: values.page, size: values.size },
      });
      return data;
    } catch (error) {
      console.error('Error en getProgramacionesPaginado:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProgramacionActivo = createAsyncThunk(
  'getProgramacionActivo',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Obteniendo programación activa');
      const { data } = await clienteAxios.get(`/programaciones/activo`);
      return data;
    } catch (error) {
      console.error('Error en getProgramacionActivo:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const eliminarProgramacion = createAsyncThunk(
  'eliminarProgramacion',
  async (id, { rejectWithValue }) => {
    console.log('Eliminando programación con id:', id);
    try {
      const { data } = await clienteAxios.delete(`/programaciones/${id}`);
      return data;
    } catch (error) {
      console.error('Error en eliminarProgramacion:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const programacionSlice = createSlice({
  name: 'programacion',
  initialState,
  reducers: { resetState: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(registrarProgramacion.fulfilled, (state, { payload }) => {
        handleFulfilled(state, { payload }, 'Se grabó correctamente');
      })
      .addCase(registrarProgramacion.rejected, handleRejected)
      .addCase(getProgramacionesPaginado.fulfilled, (state, { payload }) => {
        handleFulfilled(state, { payload }, 'Se encontró la programación');
      })
      .addCase(getProgramacionesPaginado.rejected, handleRejected)
      .addCase(getProgramacionActivo.fulfilled, (state, { payload }) => {
        handleFulfilled(state, { payload }, 'Se encontró la programación activa');
      })
      .addCase(getProgramacionActivo.rejected, handleRejected)
      .addCase(eliminarProgramacion.fulfilled, (state) => {
        handleFulfilled(state, {}, 'Se eliminó correctamente');
      })
      .addCase(eliminarProgramacion.rejected, handleRejected);
  },
});

export const { resetState } = programacionSlice.actions;
export default programacionSlice.reducer;
