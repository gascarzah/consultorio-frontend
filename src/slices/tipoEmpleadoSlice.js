import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
  loading: '',
  code: null,
  message: null,
  logged: false,
  tipoEmpleado: {},
  tipoEmpleados: [],
  total: [],
  prev: null,
  next: null,
  numberPage: 0
};

export const getTipoEmpleadosPaginado = createAsyncThunk(
  'getTipoEmpleadosPaginado',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.get(`/tipoEmpleados/pageable`,
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




export const registrarTipoEmpleado = createAsyncThunk(
  'registrarTipoEmpleado',
  async (values, { rejectWithValue }) => {

    console.log('values registrarTipoEmpleado  ==> ', values)

    try {


      const { data } = await clienteAxios.post(`/tipoEmpleados`, values);
      console.log('data ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)
export const modificarTipoEmpleado = createAsyncThunk(
  'modificarTipoEmpleado',
  async (values, { rejectWithValue }) => {

    console.log('values modificarTipoEmpleado  ==> ', values)

    try {


      const { data } = await clienteAxios.put(`/tipoEmpleados`, values);
      console.log('data ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTipoEmpleado = createAsyncThunk(
  'getTipoEmpleado',
  async (id, { rejectWithValue }) => {
    console.log('llega getHorario ', id)
    try {

      const { data } = await clienteAxios.get(`/tipoEmpleados/${id}`);

      return data
    } catch (error) {

      return rejectWithValue(error.response.data)
    }
  }
)

export const getTipoEmpleados = createAsyncThunk(
  'getTipoEmpleados',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.get(`/tipoEmpleados`);
      return data
    } catch (error) {

      return rejectWithValue(error.response.data)
    }
  }
)

const tipoEmpleadoSlice = createSlice({
  name: 'tipoEmpleado',
  initialState,
  reducers: { resetState: () => initialState, },
  // reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(registrarTipoEmpleado.fulfilled, (state, { payload }) => {
        console.log('se grabo correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'

      })
      .addCase(registrarTipoEmpleado.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.tipoEmpleados = []
      })
      .addCase(getTipoEmpleadosPaginado.fulfilled, (state, { payload }) => {
        console.log('se listo correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.tipoEmpleados = payload.content
        state.total = payload.totalElements
        state.prev = payload.first
        state.next = payload.last
        state.numberPage = payload.number
      })
      .addCase(getTipoEmpleadosPaginado.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.tipoEmpleados = []
      })
      .addCase(getTipoEmpleado.fulfilled, (state, { payload }) => {
        console.log('fulfilled getTipoEmpleado payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.tipoEmpleado = payload
      })
      .addCase(getTipoEmpleado.rejected, (state, { payload }) => {
        console.log('rejected getTipoEmpleado payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(getTipoEmpleados.fulfilled, (state, { payload }) => {
        console.log('fulfilled getTipoEmpleado payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.tipoEmpleados = payload
      })
      .addCase(getTipoEmpleados.rejected, (state, { payload }) => {
        console.log('rejected getTipoEmpleado payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(modificarTipoEmpleado.fulfilled, (state, { payload }) => {
        console.log('se grabo correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'

      })
      .addCase(modificarTipoEmpleado.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.tipoEmpleados = []
      })
  }


})



export const { resetState } = tipoEmpleadoSlice.actions

export default tipoEmpleadoSlice.reducer

