import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
  loading: '',
  antecedenteMedico: {},
  code: null,
  message: null,
  antecedentesMedicos: [],
  total: [],
  prev: null,
  next: null,
  numberPage: 0
};

export const registrarAntecedenteMedico = createAsyncThunk(
  'antecedenteMedico',
  async (values, { rejectWithValue }) => {

    console.log('registrarAntecedenteMedico ', values)

    try {
      const { data } = await clienteAxios.post("/antecedentesMedicos", values);
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
export const modificarAntecedenteMedico = createAsyncThunk(
  'modificarAntecedenteMedico',
  async (values, { rejectWithValue }) => {

    console.log('modificarAntecedenteMedico ', values)

    try {
      const { data } = await clienteAxios.put("/antecedentesMedicos", values);
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

export const getAntecedenteMedico = createAsyncThunk(
  'getAntecedenteMedico',
  async (id, { rejectWithValue }) => {

    try {

      const { data } = await clienteAxios.get(`/antecedentesMedicos/${id}`);
      console.log(data)
      return data
    } catch (error) {

      return rejectWithValue(error.response.data)
    }
  }
)

export const getAntecedentesMedicos = createAsyncThunk(
  'getAntecedentesMedicos',
  async (email, { rejectWithValue }) => {

    try {

      const { data } = await clienteAxios.get(`/antecedentesMedicos`);


      return data
    } catch (error) {

      return rejectWithValue(error.response.data)
    }
  }
)

export const getAntecedentesMedicosPaginado = createAsyncThunk(
  'getAntecedentesMedicosPaginado',
  async (values, { rejectWithValue }) => {

    try {
      console.log('aca')
      const { data } = await clienteAxios.get(`/antecedentesMedicos/pageable`,
        {
          params: {
            page: values.page,
            size: values.size,
          }
        });
        console.log(data)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const antecedenteMedicoSlice = createSlice({
  name: 'antecedenteMedico',
  initialState,
  reducers: { resetState: () => initialState, },
  // reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(registrarAntecedenteMedico.pending, (state, action) => {
        state.loading = true
      })
      .addCase(registrarAntecedenteMedico.fulfilled, (state, { payload }) => {
        console.log('fulfilled payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(registrarAntecedenteMedico.rejected, (state, { payload }) => {
        console.log('registrarAntecedenteMedico.rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(modificarAntecedenteMedico.pending, (state, action) => {
        state.loading = true
      })
      .addCase(modificarAntecedenteMedico.fulfilled, (state, { payload }) => {
        console.log('fulfilled modificarAntecedenteMedico', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(modificarAntecedenteMedico.rejected, (state, { payload }) => {
        console.log('modificarAntecedenteMedico.rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(getAntecedenteMedico.fulfilled, (state, { payload }) => {
        console.log('fulfilled getAntecedenteMedico payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.antecedenteMedico = {
          id: payload.numeroAntecedenteMedico,
          email: payload.email,
          nombreCompleto: payload.apellidoPaterno + ' ' +
            payload.apellidoMaterno + ', ' +
            payload.nombres
        }
      })
      .addCase(getAntecedenteMedico.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(getAntecedentesMedicos.fulfilled, (state, { payload }) => {
        console.log('fulfilled getAntecedenteMedico payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.antecedentemedicos = payload
      })
      .addCase(getAntecedentesMedicos.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(getAntecedentesMedicosPaginado.fulfilled, (state, { payload }) => {
        console.log('fulfilled getAntecedentesMedicosPaginado payload', payload)
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.antecedentesMedicos = payload.content
        state.total = payload.totalElements
        state.prev = payload.first
        state.next = payload.last
        state.numberPage = payload.number
      })
      .addCase(getAntecedentesMedicosPaginado.rejected, (state, { payload }) => {
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
  }
})


export const { resetState } = antecedenteMedicoSlice.actions

export default antecedenteMedicoSlice.reducer
