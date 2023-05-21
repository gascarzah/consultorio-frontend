import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
  loading: '',
  user: {},
  code: null,
  message: null,
  logged: false,
  empleados: [],
  // medicos: [],
  total: [],
  prev: null,
  next: null,
  numberPage: 0
};

export const registrarEmpleado = createAsyncThunk(
  'empleado',
  async (values, { rejectWithValue }) => {
    try {
      console.log('registrarEmpleado values ==> ', values)
      const { data } = await clienteAxios.post("/empleados", values);

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

export const getEmpleados = createAsyncThunk(
  'getEmpleado',
  async (value, { rejectWithValue }) => {
    console.log('value ==> ', value)


    try {

      // const { data } = await clienteAxios.get(`/empleados/medicos/${value}`);
      const { data } = await clienteAxios.get(`/empleados/empresa/${value.idEmpresa}`);
      console.log('data ==> ', data)

      return data
    } catch (error) {
      console.error('error', error)
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)

// export const getEmpleadosCombo = createAsyncThunk(
//   'getEmpleado',
//   async (value, { rejectWithValue }) => {
//     console.log('values ==> ', value)


//     try {

//       // const { data } = await clienteAxios.get(`/empleados/medicos/${value}`);
//       const { data } = await clienteAxios.get(`/empleados/tipoEmpleado/${value}`);
//       console.log('data ==> ', data)

//       return data
//     } catch (error) {
//       console.error('error')
//       console.error(error.response.data.message)
//       return rejectWithValue(error.response.data)
//     }
//   }
// )

export const getEmpleadosPaginado = createAsyncThunk(
  'getEmpleadosPaginado',
  async (values, { rejectWithValue }) => {

    try {
      console.log('getEmpleadosPaginado ')
      const { data } = await clienteAxios.get(`/empleados/pageable`,
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


const empleadoSlice = createSlice({
  name: 'empleado',
  initialState,
  reducers: { resetState: () => initialState, },
  reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(getEmpleados.fulfilled, (state, { payload }) => {
        console.log('fulfilled getEmpleado payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.empleados = payload
      })
      .addCase(getEmpleados.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      }).addCase(getEmpleadosPaginado.fulfilled, (state, { payload }) => {
        console.log('fulfilled getCliente payload', payload)
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.empleados = payload.content
        state.total = payload.totalElements
        state.prev = payload.first
        state.next = payload.last
        state.numberPage = payload.number
      })
      .addCase(getEmpleadosPaginado.rejected, (state, { payload }) => {
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })

    // })
  }


})



export const { resetState } = empleadoSlice.actions

export default empleadoSlice.reducer

