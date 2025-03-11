import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import clienteAxios from '../config/axios';

// Estado inicial
const initialState = {
  loading: false,
  cliente: {},
  code: null,
  message: null,
  clientes: [],
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
export const registrarCliente = createAsyncThunk(
  'registrarCliente',
  async (values, { rejectWithValue }) => {
    console.log('registrarCliente - valores: ', values);
    try {
      const { data } = await clienteAxios.post("/clientes", values);
      console.log('registrarCliente - respuesta: ', data);
      return data;
    } catch (error) {
      console.log('registrarCliente - error: ', error);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const modificarCliente = createAsyncThunk(
  'modificarCliente',
  async (values, { rejectWithValue }) => {
    console.log('modificarCliente - valores: ', values);
    try {
      const { data } = await clienteAxios.put("/clientes", values);
      console.log('modificarCliente - respuesta: ', data);
      return data;
    } catch (error) {
      console.log('modificarCliente - error: ', error);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getCliente = createAsyncThunk(
  'getCliente',
  async (id, { rejectWithValue }) => {
    console.log('getCliente - id: ', id);
    try {
      const { data } = await clienteAxios.get(`/clientes/${id}`);
      console.log('getCliente - respuesta: ', data);
      return data;
    } catch (error) {
      console.log('getCliente - error: ', error);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getClientes = createAsyncThunk(
  'getClientes',
  async (_, { rejectWithValue }) => {
    console.log('getClientes - obteniendo todos los clientes');
    try {
      const { data } = await clienteAxios.get(`/clientes`);
      console.log('getClientes - respuesta: ', data);
      return data;
    } catch (error) {
      console.log('getClientes - error: ', error);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getClientesPaginado = createAsyncThunk(
  'getClientesPaginado',
  async (values, { rejectWithValue }) => {
    console.log('getClientesPaginado - valores: ', values);
    try {
      const { data } = await clienteAxios.get(`/clientes/pageable`, {
        params: {
          page: values.page,
          size: values.size,
        },
      });
      console.log('getClientesPaginado - respuesta: ', data);
      return data;
    } catch (error) {
      console.log('getClientesPaginado - error: ', error);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Slice
const clienteSlice = createSlice({
  name: 'cliente',
  initialState,
  reducers: { resetState: () => initialState },
  extraReducers(builder) {
    builder
      .addCase(registrarCliente.pending, (state) => {
        console.log('registrarCliente - pending');
        state.loading = true;
      })
      .addCase(registrarCliente.fulfilled, (state, { payload }) => {
        console.log('registrarCliente - fulfilled', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(registrarCliente.rejected, (state, { payload }) => {
        console.log('registrarCliente - rejected', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(modificarCliente.pending, (state) => {
        console.log('modificarCliente - pending');
        state.loading = true;
      })
      .addCase(modificarCliente.fulfilled, (state, { payload }) => {
        console.log('modificarCliente - fulfilled', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(modificarCliente.rejected, (state, { payload }) => {
        console.log('modificarCliente - rejected', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(getCliente.fulfilled, (state, { payload }) => {
        console.log('getCliente - fulfilled', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'Cliente encontrado';
        state.cliente = {
          id: payload.idCliente,
          email: payload.email,
          nombreCompleto: `${payload.apellidoPaterno} ${payload.apellidoMaterno}, ${payload.nombres}`,
        };
      })
      .addCase(getCliente.rejected, (state, { payload }) => {
        console.log('getCliente - rejected', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(getClientes.fulfilled, (state, { payload }) => {
        console.log('getClientes - fulfilled', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'Clientes encontrados';
        state.clientes = payload;
      })
      .addCase(getClientes.rejected, (state, { payload }) => {
        console.log('getClientes - rejected', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })
      .addCase(getClientesPaginado.fulfilled, (state, { payload }) => {
        console.log('getClientesPaginado - fulfilled', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'Clientes encontrados';
        state.clientes = payload.content;
        state.total = payload.totalElements;
        state.prev = payload.first;
        state.next = payload.last;
        state.numberPage = payload.number;
      })
      .addCase(getClientesPaginado.rejected, (state, { payload }) => {
        console.log('getClientesPaginado - rejected', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      });
  },
});

// Acción para restablecer el estado
export const { resetState } = clienteSlice.actions;

// Reducer del slice
export default clienteSlice.reducer;
