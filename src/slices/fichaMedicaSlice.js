import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
  loading: '',
  code: null,
  message: null,
  logged: false,
  fichaMedica: {},
  fichasMedicas: [],
  total: [],
  prev: null,
  next: null,
  numberPage: 0
};






export const getFichaMedica = createAsyncThunk(
  'getFichaMedica',
  async (id, { rejectWithValue }) => {
    console.log('llega getFichaMedica ', id)
    try {

      const { data } = await clienteAxios.get(`/fichasMedicas/${id}`);

      return data
    } catch (error) {

      return rejectWithValue(error.response.data)
    }
  }
)



const fichaMedicaSlice = createSlice({
  name: 'fichaMedica',
  initialState,
  reducers: { resetState: () => initialState, },
  // reducers: {},
  extraReducers(builder) {
    builder
     
      .addCase(getFichaMedica.fulfilled, (state, { payload }) => {
        console.log('fulfilled getFichaMedica payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.fichaMedica = payload
      })
      .addCase(getFichaMedica.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      
  }


})



export const { resetState } = fichaMedicaSlice.actions

export default fichaMedicaSlice.reducer

