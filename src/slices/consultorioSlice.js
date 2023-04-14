import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
  loading: '',
  code: null,
  message: null,
  logged: false,
  consultorio: {},
  consultorios: [],
  total: [],
  prev: null,
  next: null,
  numberPage: 0
};

export const getConsultoriosPaginado = createAsyncThunk(
  'getConsultoriosPaginado',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.get(`/consultorios/pageable`,
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



export const registrarConsultorio = createAsyncThunk(
  'registrarConsultorio',
  async (values, { rejectWithValue }) => {

    console.log('values registrarConsultorio  ==> ', values)

    try {


      const { data } = await clienteAxios.post(`/consultorios`, values);
      console.log('data ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)



const consultorioSlice = createSlice({
  name: 'consultorio',
  initialState,
  reducers: { resetState: () => initialState, },
  // reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(registrarConsultorio.fulfilled, (state, { payload }) => {
        console.log('se grabo correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'

      })
      .addCase(registrarConsultorio.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.consultorios = []
      })
      .addCase(getConsultoriosPaginado.fulfilled, (state, { payload }) => {
        console.log('se listo correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.consultorios = payload.content
        state.total = payload.totalElements
        state.prev = payload.first
        state.next = payload.last
        state.numberPage = payload.number
      })
      .addCase(getConsultoriosPaginado.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.consultorios = []
      })

  }


})



export const { resetState } = consultorioSlice.actions

export default consultorioSlice.reducer

