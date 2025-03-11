import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../config/axios';

// Estado inicial
const initialState = {
  loading: false,
  antecedenteMedico: {},
  code: null,
  message: null,
  antecedentesMedicos: [],
  total: 0,
  prev: null,
  next: null,
  numberPage: 0
};

// Función para manejar los errores y evitar repetición
const handleRejected = (state, payload) => {
  state.loading = false;
  state.code = payload?.status || null;
  state.message = payload?.message || 'Error';
};

// Crear los thunks
export const registrarAntecedenteMedico = createAsyncThunk(
  'antecedenteMedico/registrar',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.post('/antecedentesMedicos', values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const modificarAntecedenteMedico = createAsyncThunk(
  'antecedenteMedico/modificar',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.put('/antecedentesMedicos', values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAntecedenteMedico = createAsyncThunk(
  'antecedenteMedico/get',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.get(`/antecedentesMedicos/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAntecedentesMedicos = createAsyncThunk(
  'antecedenteMedico/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.get('/antecedentesMedicos');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAntecedentesMedicosPaginado = createAsyncThunk(
  'antecedenteMedico/getPaginado',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.get('/antecedentesMedicos/pageable', {
        params: {
          page: values.page,
          size: values.size,
        }
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Crear el slice
const antecedenteMedicoSlice = createSlice({
  name: 'antecedenteMedico',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers(builder) {
    builder
      // Registrar antecedente médico
      .addCase(registrarAntecedenteMedico.pending, (state) => {
        state.loading = true;
      })
      .addCase(registrarAntecedenteMedico.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(registrarAntecedenteMedico.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })

      // Modificar antecedente médico
      .addCase(modificarAntecedenteMedico.pending, (state) => {
        state.loading = true;
      })
      .addCase(modificarAntecedenteMedico.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(modificarAntecedenteMedico.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })

      // Obtener antecedente médico por ID
      .addCase(getAntecedenteMedico.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.code = 201;
        state.message = 'Se encontró el antecedente médico';
        state.antecedenteMedico = {
          id: payload.numeroAntecedenteMedico,
          email: payload.email,
          nombreCompleto: `${payload.apellidoPaterno} ${payload.apellidoMaterno}, ${payload.nombres}`,
        };
      })
      .addCase(getAntecedenteMedico.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })

      // Obtener todos los antecedentes médicos
      .addCase(getAntecedentesMedicos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.code = 201;
        state.message = 'Se encontraron antecedentes médicos';
        state.antecedentesMedicos = payload;
      })
      .addCase(getAntecedentesMedicos.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })

      // Obtener antecedentes médicos paginados
      .addCase(getAntecedentesMedicosPaginado.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.code = 201;
        state.message = 'Se encontraron antecedentes médicos';
        state.antecedentesMedicos = payload.content;
        state.total = payload.totalElements;
        state.prev = payload.first;
        state.next = payload.last;
        state.numberPage = payload.number;
      })
      .addCase(getAntecedentesMedicosPaginado.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      });
  }
});

// Exportar las acciones
export const { resetState } = antecedenteMedicoSlice.actions;

// Exportar el reducer
export default antecedenteMedicoSlice.reducer;
