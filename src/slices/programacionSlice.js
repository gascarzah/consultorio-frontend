import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';
import { registrarEmpleado } from './empleadoSlice';


const initialState = {
  loading: '',
  code: null,
  message: null,
  logged: false,
  programaciones: [],
  programacion: {},
  total: [],
  prev: null,
  next: null,
  numberPage: 0
};

export const registrarProgramacion = createAsyncThunk(
  'programacion',
  async (values, { rejectWithValue }) => {
    try {
      console.log('registrarProgramacion ', values)
      const { data } = await clienteAxios.post("/programaciones", values);
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

export const getProgramacionesPaginado = createAsyncThunk(
  'getProgramacionesPaginado',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.get(`/programaciones/${values.idEmpresa}/pageable`,
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

export const getProgramacionActivo = createAsyncThunk(
  'getProgramacionActivo',
  async (estado, { rejectWithValue }) => {

    try {

      const { data } = await clienteAxios.get(`/programaciones/activo`);

      return data
    } catch (error) {

      return rejectWithValue(error.response.data)
    }
  }
)

const programacionSlice = createSlice({
  name: 'programacion',
  initialState,
  reducers: { resetState: () => initialState, },
  reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(registrarProgramacion.fulfilled, (state, { payload }) => {
        console.log('fulfilled getProgramacion payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'Se grabo'
      })
      .addCase(registrarProgramacion.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(getProgramacionesPaginado.fulfilled, (state, { payload }) => {
        console.log('se listo correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.programaciones = payload.content
        state.total = payload.totalElements
        state.prev = payload.first
        state.next = payload.last
        state.numberPage = payload.number
      })
      .addCase(getProgramacionesPaginado.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.programaciones = []
      })
      .addCase(getProgramacionActivo.fulfilled, (state, { payload }) => {
        console.log('fulfilled getProgramacionActivo payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.programacion = payload
      })
      .addCase(getProgramacionActivo.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
    // })
  }


})



export const { resetState } = programacionSlice.actions

export default programacionSlice.reducer

