import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
  loading: '',
  cliente: {},
  code: null,
  message: null,
  clientes: [],
  total: [],
  prev: null,
  next: null,
  numberPage: 0
};

export const registrarCliente = createAsyncThunk(
  'cliente',
  async (values, { rejectWithValue }) => {

    console.log('registrarCliente ', values)

    try {
      const { data } = await clienteAxios.post("/clientes", values);
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {


        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
export const modificarCliente = createAsyncThunk(
  'modificarCliente',
  async (values, { rejectWithValue }) => {

    console.log('modificarCliente ', values)

    try {
      const { data } = await clienteAxios.put("/clientes", values);
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {


        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getCliente = createAsyncThunk(
  'getCliente',
  async (id, { rejectWithValue }) => {

    try {

      const { data } = await clienteAxios.get(`/clientes/${id}`);

      return data
    } catch (error) {

      return rejectWithValue(error.response.data)
    }
  }
)

export const getClientes = createAsyncThunk(
  'getClientes',
  async (email, { rejectWithValue }) => {

    try {

      const { data } = await clienteAxios.get(`/clientes`);


      return data
    } catch (error) {

      return rejectWithValue(error.response.data)
    }
  }
)

export const getClientesPaginado = createAsyncThunk(
  'getClientesPaginado',
  async (values, { rejectWithValue }) => {

    try {
      const { data } = await clienteAxios.get(`/clientes/pageable`,
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

const clienteSlice = createSlice({
  name: 'cliente',
  initialState,
  reducers: { resetState: () => initialState, },
  // reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(registrarCliente.pending, (state, action) => {
        state.loading = true
      })
      .addCase(registrarCliente.fulfilled, (state, { payload }) => {
        console.log('fulfilled payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(registrarCliente.rejected, (state, { payload }) => {
        console.log('registrarCliente.rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(modificarCliente.pending, (state, action) => {
        state.loading = true
      })
      .addCase(modificarCliente.fulfilled, (state, { payload }) => {
        console.log('fulfilled modificarCliente', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(modificarCliente.rejected, (state, { payload }) => {
        console.log('modificarCliente.rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(getCliente.fulfilled, (state, { payload }) => {
        console.log('fulfilled getCliente payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.cliente = {
          id: payload.idCliente,
          email: payload.email,
          nombreCompleto: payload.apellidoPaterno + ' ' +
            payload.apellidoMaterno + ', ' +
            payload.nombres
        }
      })
      .addCase(getCliente.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(getClientes.fulfilled, (state, { payload }) => {
        console.log('fulfilled getCliente payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.clientes = payload
      })
      .addCase(getClientes.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(getClientesPaginado.fulfilled, (state, { payload }) => {
        console.log('fulfilled getCliente payload', payload)
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.clientes = payload.content
        state.total = payload.totalElements
        state.prev = payload.first
        state.next = payload.last
        state.numberPage = payload.number
      })
      .addCase(getClientesPaginado.rejected, (state, { payload }) => {
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
  }
})


export const { resetState } = clienteSlice.actions

export default clienteSlice.reducer
