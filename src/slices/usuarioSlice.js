import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
  loading: '',
  user: {},
  code: null,
  message: null,
  logged: false,
  usuarios: [],
};

export const registrarUsuario = createAsyncThunk(
  'usuario',
  async (values, { rejectWithValue }) => {
    try {

      const { data } = await clienteAxios.post("/usuarios", values);

      console.log(data);
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        // console.log('xxxxxxx')
        // console.log(error.response.data.message)
        // console.log(error.message)

        return rejectWithValue(error.response.data.message)
      } else {
        // console.log('ttttttttt')
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getUsuario = createAsyncThunk(
  'getUsuario',
  async (email, { rejectWithValue }) => {
    console.log('values ==> ', email)


    try {

      const { data } = await clienteAxios.get(`/usuarios/${email}`);
      console.log('data ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)





const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: { resetState: () => initialState, },

  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(registrarUsuario.pending, (state, action) => {
        state.loading = true
      })
      .addCase(registrarUsuario.fulfilled, (state, { payload }) => {
        // console.log('fulfilled payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(registrarUsuario.rejected, (state, { payload }) => {
        console.log('registrarUsuario.rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(getUsuario.fulfilled, (state, { payload }) => {
        console.log('fulfilled getUsuario payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'

        state.user = {
          id: payload.idUsuario,
          email: payload.email,
          nombreCompleto: payload.empleado.apellidoPaterno + ' ' +
            payload.empleado.apellidoMaterno + ', ' +
            payload.empleado.nombres,
          idEmpleado: payload.empleado.idEmpleado,
          idEmpresa: payload.empleado.empresa.idEmpresa
        }
      })
      .addCase(getUsuario.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
    // .addCase(getUsuarios.fulfilled,(state, {payload}) => {
    //   console.log('fulfilled getUsuario payload', payload)

    //   state.loading = false
    //   state.code = 201
    //   state.message = 'se encontro'
    //   state.usuarios = payload
    // })
    // .addCase(getUsuarios.rejected,(state, {payload}) => {
    //   console.log('rejected payload', payload)
    //    state.loading = false
    //   state.code = payload.status
    //   state.message = payload.message
    // })
  }


})

//2
// const usuarioSlice = createSlice({
//     name: 'usuario',
//     initialState,
//     reducers: {
//       resetState:  () => initialState
//     },
//     extraReducers: {
//       [registrarUsuario.pending](state) {
//         // console.log('pendiente')
//         state.loading = 'pendiente'
//       },
//       [registrarUsuario.fulfilled](state, {payload}) {

//         console.log('fulfilled payload', payload)
//         state.loading = 'grabo'
//         state.code = payload.status
//         state.message = payload.message

//       },
//       [registrarUsuario.rejected](state, {payload}) {
//         console.log('rejected payload', payload)
//         state.loading = 'rechazado'
//         state.code = payload.status
//         state.message = payload.message

//       },
//     },

// }) 

//1
// const usuarioSlice = createSlice({
//     name: 'usuario',
//     initialState,
//     reducers: {
//         setUser: (state, action)=>{
//             state.user = action.payload
//             state.message = "Se registro con exito"
//             state.error = false
//         },
//         setError: (state, action)=>{
//           console.log('action')
//           console.log(action.payload)
//             state.message = action.payload
//             state.error = true
//         }

//     }

// }) 

export const { resetState } = usuarioSlice.actions

export default usuarioSlice.reducer

