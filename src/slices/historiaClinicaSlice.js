import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import historiaclinicaAxios from '../config/axios';

// Estado inicial
const initialState = {
  loading: false,
  historiaClinica: {},
  code: null,
  message: null,
  historiaClinicas: [],
  total: 0,
  prev: null,
  next: null,
  numberPage: 0,
};

// Función de utilidad para manejo de errores
const getErrorMessage = (error) => {
  if (error.response && error.response.data) {
    return error.response.data.message || error.response.data;
  }
  return error.message || 'Error desconocido';
};

// Crear thunks
export const registrarHistoriaClinica = createAsyncThunk(
  'registrarHistoriaClinica',
  async (values, { rejectWithValue }) => {
    console.log('registrarHistoriaClinica - valores: ', values);
    try {
      const { data } = await historiaclinicaAxios.post("/historiasClinicas", values);
      console.log('registrarHistoriaClinica - respuesta: ', data);
      return data;
    } catch (error) {
      console.log('registrarHistoriaClinica - error: ', error);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const modificarHistoriaClinica = createAsyncThunk(
  'modificarHistoriaClinica',
  async (values, { rejectWithValue }) => {
    console.log('modificarHistoriaClinica - valores: ', values);
    try {
      const { data } = await historiaclinicaAxios.put("/historiasClinicas", values);
      console.log('modificarHistoriaClinica - respuesta: ', data);
      return data;
    } catch (error) {
      console.log('modificarHistoriaClinica - error: ', error);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getHistoriaClinica = createAsyncThunk(
  'getHistoriaClinica',
  async (id, { rejectWithValue }) => {
    console.log('getHistoriaClinica - id: ', id);
    try {
      const { data } = await historiaclinicaAxios.get(`/historiasClinicas/${id}`);
      console.log('getHistoriaClinica - respuesta: ', data);
      return data;
    } catch (error) {
      console.log('getHistoriaClinica - error: ', error);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getHistoriaClinicas = createAsyncThunk(
  'getHistoriaClinicas',
  async (_, { rejectWithValue }) => {
    console.log('getHistoriaClinicas - obteniendo todos los historiaclinicas');
    try {
      const { data } = await historiaclinicaAxios.get(`/historiasClinicas`);
      console.log('getHistoriaClinicas - respuesta: ', data);
      return data;
    } catch (error) {
      console.log('getHistoriaClinicas - error: ', error);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getHistoriaClinicasPaginado = createAsyncThunk(
  'getHistoriaClinicasPaginado',
  async (values, { rejectWithValue }) => {
    console.log('getHistoriaClinicasPaginado - valores: ', values);
    try {
      const { data } = await historiaclinicaAxios.get(`/historiasClinicas/pageable`, {
        params: {
          page: values.page,
          size: values.size,
        },
      });
      console.log('getHistoriaClinicasPaginado - respuesta: ', data);
      return data;
    } catch (error) {
      console.log('getHistoriaClinicasPaginado - error: ', error);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Slice
const historiaClinicaSlice = createSlice({
  name: 'historiaClinica',
  initialState,
  reducers: { resetState: () => initialState },
  extraReducers(builder) {
    builder
      .addCase(registrarHistoriaClinica.pending, (state) => {
        console.log('registrarHistoriaClinica - pending');
        state.loading = true;
      })
      .addCase(registrarHistoriaClinica.fulfilled, (state, { payload }) => {
        console.log('registrarHistoriaClinica - fulfilled', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(registrarHistoriaClinica.rejected, (state, { payload }) => {
        console.log('registrarHistoriaClinica - rejected', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(modificarHistoriaClinica.pending, (state) => {
        console.log('modificarHistoriaClinica - pending');
        state.loading = true;
      })
      .addCase(modificarHistoriaClinica.fulfilled, (state, { payload }) => {
        console.log('modificarHistoriaClinica - fulfilled', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(modificarHistoriaClinica.rejected, (state, { payload }) => {
        console.log('modificarHistoriaClinica - rejected', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(getHistoriaClinica.fulfilled, (state, { payload }) => {
        console.log('getHistoriaClinica - fulfilled', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'HistoriaClinica encontrado';
        state.historiaclinica = {
          id: payload.idHistoriaClinica,
          email: payload.email,
          nombreCompleto: `${payload.apellidoPaterno} ${payload.apellidoMaterno}, ${payload.nombres}`,
        };
      })
      .addCase(getHistoriaClinica.rejected, (state, { payload }) => {
        console.log('getHistoriaClinica - rejected', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(getHistoriaClinicas.fulfilled, (state, { payload }) => {
        console.log('getHistoriaClinicas - fulfilled', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'HistoriaClinicas encontrados';
        state.historiaClinicas = payload;
      })
      .addCase(getHistoriaClinicas.rejected, (state, { payload }) => {
        console.log('getHistoriaClinicas - rejected', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(getHistoriaClinicasPaginado.fulfilled, (state, { payload }) => {
        console.log('getHistoriaClinicasPaginado - fulfilled', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'HistoriaClinicas encontrados';
        state.historiaClinicas = payload.content;
        state.total = payload.totalElements;
        state.prev = payload.first;
        state.next = payload.last;
        state.numberPage = payload.number;
      })
      .addCase(getHistoriaClinicasPaginado.rejected, (state, { payload }) => {
        console.log('getHistoriaClinicasPaginado - rejected', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      });
  },
});

// Acción para restablecer el estado
export const { resetState } = historiaClinicaSlice.actions;

// Reducer del slice
export default historiaClinicaSlice.reducer;
