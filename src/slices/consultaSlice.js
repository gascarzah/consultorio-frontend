import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
  loading: '',
  code: null,
  message: null,
  logged: false,

};





export const registrarConsulta = createAsyncThunk(
  'registrarConsulta',
  async (values, { rejectWithValue }) => {

    console.log('values registrarConsulta  ==> ', values)

    try {

      // const { data } = await clienteAxios.post(`/historiasClinicaDetalles`, values);
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



const registrarConsultaSlice = createSlice({
  name: 'cita',
  initialState,
  reducers: { resetState: () => initialState, },
  // reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(registrarConsulta.fulfilled, (state, { payload }) => {
        console.log('se grabo correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.citas = payload
      })
      .addCase(registrarConsulta.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.citas = []
      })

  }


})



export const { resetState } = registrarConsultaSlice.actions

export default registrarConsultaSlice.reducer

