import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
  loading: '',
  code: null,
  message: null,
  logged: false,
  maestra: {},
  maestras: [],
  total: [],
  prev: null,
  next: null,
  numberPage: 0
};

export const getMaestrasPaginado = createAsyncThunk(
  'getMaestrasPaginado',
  async (values, { rejectWithValue }) => {
    console.log('valores ', values)
    try {
      const { data } = await clienteAxios.get(`/maestras/pageable`,
        {
          params: {
            page: values.page,
            size: values.size,
            idEmpresa: values.idEmpresa,
            idMaestra: values.idMaestra
          }
        });
      return data
    } catch (error) {

      return rejectWithValue(error.response.data)
    }
  }
)



export const registrarMaestra = createAsyncThunk(
  'registrarMaestra',
  async (values, { rejectWithValue }) => {

    try {
      const { data } = await clienteAxios.post(`/maestras`, values);
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const modificarMaestra = createAsyncThunk(
  'modificarMaestra',
  async (values, { rejectWithValue }) => {
    console.log('antes de actualizar ', values)
    try {
      const { data } = await clienteAxios.put(`/maestras`, values);
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getMaestra = createAsyncThunk(
  'getMaestra',
  async (id, { rejectWithValue }) => {
    console.log('llega getMaestra ', id)
    try {

      const { data } = await clienteAxios.get(`/maestras/${id}`);

      return data
    } catch (error) {

      return rejectWithValue(error.response.data)
    }
  }
)

export const getMaestras = createAsyncThunk(
  'getMaestras',
  async (value, { rejectWithValue }) => {
    console.log('values ==> ', value)


    try {

      const { data } = await clienteAxios.get(`/maestras`);
      console.log('data ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)


export const eliminarMaestra = createAsyncThunk(
  'eliminarMaestra',
  async (id, { rejectWithValue }) => {

    try {
      const { data } = await clienteAxios.delete(`/maestras/${id}`);
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const maestraSlice = createSlice({
  name: 'maestra',
  initialState,
  reducers: { resetState: () => initialState, },
  // reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(registrarMaestra.fulfilled, (state, { payload }) => {
        console.log('se grabo correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'

      })
      .addCase(registrarMaestra.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.maestras = []
      })
      .addCase(getMaestrasPaginado.fulfilled, (state, { payload }) => {
        console.log('se listo correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.maestras = payload.content
        state.total = payload.totalElements
        state.prev = payload.first
        state.next = payload.last
        state.numberPage = payload.number
      })
      .addCase(getMaestrasPaginado.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.maestras = []
      })
      .addCase(getMaestra.fulfilled, (state, { payload }) => {
        console.log('fulfilled getCliente payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.maestra = payload
      })
      .addCase(getMaestra.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(modificarMaestra.fulfilled, (state, { payload }) => {
        console.log('se modifico correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'

      })
      .addCase(modificarMaestra.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.maestras = []
      })
      .addCase(eliminarMaestra.fulfilled, (state, { payload }) => {
        console.log('se elimino correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'

      })
      .addCase(eliminarMaestra.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.maestras = []
      })
  }


})



export const { resetState } = maestraSlice.actions

export default maestraSlice.reducer

