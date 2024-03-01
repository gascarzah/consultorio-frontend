import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';
import { registrarEmpleado } from './empleadoSlice';


const initialState = {
  loading: '',
  code: null,
  message: null,
  logged: true,
  dias: [],
  diasDeSemana: [],
  diaAtencion: '',
  programacionesDetalle: [],
  programacionDetalle: {},
  total: [],
  prev: null,
  next: null,
  numberPage: 0
};

export const getCitasDelDia = createAsyncThunk(
  'getCitasDelDia',
  async (values, { rejectWithValue }) => {
    // console.log('valroes que llega ==> ', values)
    // return

    try {

      const result = await clienteAxios.get('/programacionesDetalladas/medico/dia',
        {
          params: {
            'idMedico': values.idEmpleado,
            numeroDiaSemana: getToday()
          }
        });
      console.log('result xxxx ==> ', result)
      const { data } = result
      console.log('datas xxxx ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getProgramacionDetalles = createAsyncThunk(
  'programacionDetalle',
  async (values, { rejectWithValue }) => {
    console.log('getProgramacionDetalles valores ==> ', values)
    // return

    try {

      const result = await clienteAxios.get('/programacionesDetalladas/listarDiasProgramados',
        {
          params: {
            'numeroDocumento': values.numeroDocumento,
            'idEmpresa': values.idEmpresa
          }
        });
      console.log('result programacionDetalle ==> ', result)
      const { data } = result
      console.log('dattos response programacionDetalle ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)


export const getVerificarProgramacion = createAsyncThunk(
  'verificarProgramacion',
  async (values, { rejectWithValue }) => {
    console.log('values llega ==> ', values)


    try {

      const result = await clienteAxios.get(`/programacionesDetalladas/verifica?idMedico=${values.idMedico}&fechaInicial=${values.fechaInicial}&fechaFinal=${values.fechaFinal}`);
      console.log('result xxxx ==> ', result)
      const { data } = result
      console.log('datas xxxx ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)
const getToday = () => {
  const date = new Date();
  const day = date.getDay();

  return day;
};

export const getProgramacionesDetallePaginado = createAsyncThunk(
  'getProgramacionesDetallePaginado',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.get(`/programacionesDetalladas/pageable`,
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

export const registrarProgramacionDetalle = createAsyncThunk(
  'registrarProgramacionDetalle',
  async (values, { rejectWithValue }) => {
    try {
      console.log('registrarProgramacionDetalle ', values)
      const { data } = await clienteAxios.post("/programacionesDetalladas", values);
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
export const modificarProgramacionDetalle = createAsyncThunk(
  'modificarProgramacionDetalle',
  async (values, { rejectWithValue }) => {
    try {
      console.log('modificarProgramacionDetalle ', values)
      const { data } = await clienteAxios.put("/programacionesDetalladas", values);
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


export const getProgramacionDetallePorId = createAsyncThunk(
  'getProgramacionDetallePorId',
  async (id, { rejectWithValue }) => {
    console.log('getProgramacionDetallePorId valores ==> ', id)

    try {

      const result = await clienteAxios.get(`/programacionesDetalladas/programaDetalle/${id}`);
      console.log('result programacionDetalle ==> ', result)
      const { data } = result
      console.log('dattos response programacionDetalle ==> ', data)

      return data
    } catch (error) {
      console.error('error')
      console.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)

const programacionDetalleSlice = createSlice({
  name: 'programacionDetalle',
  initialState,
  reducers: { resetState: () => initialState, },
  reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(getProgramacionDetalles.fulfilled, (state, { payload }) => {
        console.log('fulfilled getProgramacionDetalle payload', payload)
        if (payload) {
          state.dias = payload
          state.loading = false
          state.code = 201
          state.message = 'Se grabo'

          console.log('state.dias ', state.dias)


          const selectedProgramacionDetalle = state.dias.find(
            (el) => el.numeroDiaSemana === getToday()
          );
          console.log('selectedProgramacionDetalle ', selectedProgramacionDetalle)
          if (selectedProgramacionDetalle)
            state.diaAtencion = selectedProgramacionDetalle.idProgramacionDetalle

        } else {
          state.dias = []
          state.diaAtencion = ''
        }
      })
      .addCase(getProgramacionDetalles.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        if (payload.status === 403) {
          state.logged = false
        }
        state.message = payload.message
      })
      .addCase(getCitasDelDia.fulfilled, (state, { payload }) => {
        console.log('fulfilled getProgramacionDetalle payload', payload)
        state.dias = payload
        state.loading = false
        state.code = 201
        state.message = 'Se grabo'

      })
      .addCase(getCitasDelDia.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        if (payload.status === 403) {
          state.logged = false
        }
        state.message = payload.message
      })
      .addCase(getVerificarProgramacion.fulfilled, (state, { payload }) => {
        console.log('fulfilled getProgramacionDetalle payload', payload)
        state.dias = payload
        state.loading = false
        state.code = 201
        state.message = 'Se grabo'
      })
      .addCase(getVerificarProgramacion.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        if (payload.status === 403) {
          state.logged = false
        }
        state.message = payload.message
      })
      .addCase(getProgramacionesDetallePaginado.fulfilled, (state, { payload }) => {
        console.log('se listo correctamente', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.programacionesDetalle = payload.content
        state.total = payload.totalElements
        state.prev = payload.first
        state.next = payload.last
        state.numberPage = payload.number
      })
      .addCase(getProgramacionesDetallePaginado.rejected, (state, { payload }) => {
        console.log('rejected payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
        state.programacionesDetalle = []
      })
      .addCase(registrarProgramacionDetalle.fulfilled, (state, { payload }) => {
        console.log('fulfilled registrarProgramacionDetalle payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'Se grabo'
      })
      .addCase(registrarProgramacionDetalle.rejected, (state, { payload }) => {
        console.log('rejected registrarProgramacionDetalle payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(getProgramacionDetallePorId.fulfilled, (state, { payload }) => {
        console.log('fulfilled registrarProgramacionDetalle payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'se encontro'
        state.programacionDetalle = payload
      })
      .addCase(getProgramacionDetallePorId.rejected, (state, { payload }) => {
        console.log('rejected registrarProgramacionDetalle payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
      .addCase(modificarProgramacionDetalle.fulfilled, (state, { payload }) => {
        console.log('fulfilled registrarProgramacionDetalle payload', payload)
        // state.loading = 'grabo'
        state.loading = false
        state.code = 201
        state.message = 'Se modifico'
      })
      .addCase(modificarProgramacionDetalle.rejected, (state, { payload }) => {
        console.log('rejected registrarProgramacionDetalle payload', payload)
        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })
    // })
  }


})



export const { resetState } = programacionDetalleSlice.actions

export default programacionDetalleSlice.reducer

