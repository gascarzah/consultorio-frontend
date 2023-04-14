import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
  loading: '',
  code: null,
  message: null,
  logged: false,
  horario: {},
  horarios: [],
  total: [],
  prev: null,
  next: null,
  numberPage: 0
};

export const getHorariosPaginado = createAsyncThunk(
  'getHorariosPaginado',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.get(`/horarios/pageable`,
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



export const registrarHorario = createAsyncThunk(
  'registrarHorario',
  async (values, { rejectWithValue }) => {

    try {
      const { data } = await clienteAxios.post(`/horarios`, values);
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const modificarHorario = createAsyncThunk(
  'modificarHorario',
  async (values, { rejectWithValue }) => {

    try {
      const { data } = await clienteAxios.put(`/horarios`, values);
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getHorario = createAsyncThunk(
  'getHorario',
  async (id, { rejectWithValue }) => {
    console.log('llega getHorario ', id)
    try {

      const { data } = await clienteAxios.get(`/horarios/${id}`);

      return data
    } catch (error) {

      return rejectWithValue(error.response.data)
    }
  }
)

export const getHorarios = createAsyncThunk(
  'getHorarios',
  async (value, { rejectWithValue }) => {
    console.log('values ==> ', value)


    try {

      const { data } = await clienteAxios.get(`/horarios`);
      console.log('data ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)


export const eliminarHorario = createAsyncThunk(
  'eliminarHorario',
  async (id, { rejectWithValue }) => {

    try {
      const { data } = await clienteAxios.delete(`/horarios/${id}`);
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const horarioSlice = createSlice({
  name: 'horario',
  initialState,
  reducers: { resetState: () => initialState, },
  // reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(registrarHorario.fulfilled, (state, { payload }) => {
        console.log('se grabo correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'

      })
      .addCase(registrarHorario.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.horarios = []
      })
      .addCase(getHorariosPaginado.fulfilled, (state, { payload }) => {
        console.log('se listo correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.horarios = payload.content
        state.total = payload.totalElements
        state.prev = payload.first
        state.next = payload.last
        state.numberPage = payload.number
      })
      .addCase(getHorariosPaginado.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.horarios = []
      })
      .addCase(getHorario.fulfilled, (state, { payload }) => {
        console.log('fulfilled getCliente payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.horario = payload
      })
      .addCase(getHorario.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(modificarHorario.fulfilled, (state, { payload }) => {
        console.log('se modifico correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'

      })
      .addCase(modificarHorario.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.horarios = []
      })
      .addCase(eliminarHorario.fulfilled, (state, { payload }) => {
        console.log('se elimino correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'

      })
      .addCase(eliminarHorario.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.horarios = []
      })
  }


})



export const { resetState } = horarioSlice.actions

export default horarioSlice.reducer

