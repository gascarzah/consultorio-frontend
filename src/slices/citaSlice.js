import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
  loading: '',
  code: null,
  message: null,
  logged: false,
  citas: [],
  cita: {},
  historiales: [],
  total: [],
  prev: null,
  next: null,
  numberPage: 0
};

export const getCitas = createAsyncThunk(
  'getCitas',
  async (values, { rejectWithValue }) => {

    console.log('getCitas slice values  ==> ', values)

    try {

      const { data } = await clienteAxios.get('/citas/medico/citados',
        {
          params: {
            idMedico: values.idMedico,
            numeroDiaSemana: values.numeroDiaSemana
          }
        });
      console.log('data ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getCitasIdProgramacionDetalle = createAsyncThunk(
  'getCitasIdProgramacionDetalle',
  async (idProgramacionDetalle, { rejectWithValue }) => {

    console.log('values idProgramacionDetalle  ==> ', idProgramacionDetalle)

    try {

      const { data } = await clienteAxios.get(`/citas/medico?idProgramacionDetalle=${idProgramacionDetalle}`);
      console.log('data ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)


export const getCita = createAsyncThunk(
  'getCita',
  async (id, { rejectWithValue }) => {


    // console.log('values idProgramacionDetalle  ==> ', idProgramacionDetalle)

    try {

      const { data } = await clienteAxios.get(`/citas/${id}`);
      console.log('data getCita ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)

export const editarCita = createAsyncThunk(
  'editarCita',
  async (values, { rejectWithValue }) => {

    console.log('values editarCita  ==> ', values)

    try {

      const { data } = await clienteAxios.put(`/citas`, values);
      console.log('data ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)


export const eliminarCita = createAsyncThunk(
  'eliminarCita',
  async (values, { rejectWithValue }) => {

    console.log('values eliminarCita  ==> ', values)

    try {

      const { data } = await clienteAxios.put(`/citas/eliminar`, values);
      console.log('data ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getHistorialCitas = createAsyncThunk(
  'getHistorialCitas',
  async (values, { rejectWithValue }) => {

    try {

      const { data } = await clienteAxios.get('/citas/historial/pageable',
        {
          params: {
            page: values.page,
            size: values.size,
            idCliente: values.idCliente,
          }
        });
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)


export const getCitasPaginado = createAsyncThunk(
  'getHorariosPaginado',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.get(`/citas/pageable`,
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

export const registrarCita = createAsyncThunk(
  'registrarCita',
  async (values, { rejectWithValue }) => {

    console.log('values editarCita  ==> ', values)

    try {

      const { data } = await clienteAxios.post(`/citas`, values);
      console.log('data ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)

const citaSlice = createSlice({
  name: 'cita',
  initialState,
  reducers: { resetState: () => initialState, },
  // reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(getCitas.fulfilled, (state, { payload }) => {
        console.log('fulfilled getCita payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.citas = payload
      })
      .addCase(getCitas.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.citas = []
      })
      .addCase(getCitasIdProgramacionDetalle.fulfilled, (state, { payload }) => {
        console.log('fulfilled getCita payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.citas = payload
      })
      .addCase(getCitasIdProgramacionDetalle.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.citas = []
      })
      .addCase(getCita.fulfilled, (state, { payload }) => {
        console.log('fulfilled getCita payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.cita = payload
      })
      .addCase(getCita.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.citas = []
      })
      .addCase(getHistorialCitas.fulfilled, (state, { payload }) => {
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.historiales = payload.content
        state.total = payload.totalElements
        state.prev = payload.first
        state.next = payload.last
        state.numberPage = payload.number
      })
      .addCase(getHistorialCitas.rejected, (state, { payload }) => {
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.historiales = []
      })
      .addCase(getCitasPaginado.fulfilled, (state, { payload }) => {
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.citas = payload.content
        state.total = payload.totalElements
        state.prev = payload.first
        state.next = payload.last
        state.numberPage = payload.number
      })
      .addCase(getCitasPaginado.rejected, (state, { payload }) => {
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.historiales = []
      })
      .addCase(registrarCita.fulfilled, (state, { payload }) => {
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(registrarCita.rejected, (state, { payload }) => {
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })


  }


})



export const { resetState } = citaSlice.actions

export default citaSlice.reducer

