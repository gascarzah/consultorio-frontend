import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../config/axios';
import { registrarEmpleado } from './empleadoSlice';

const initialState = {
  loading: false,
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
  numberPage: 0,
};

// Obtener las citas del día actual
export const getCitasDelDia = createAsyncThunk(
  'getCitasDelDia',
  async (values, { rejectWithValue }) => {
    try {
      const result = await clienteAxios.get('/programacionesDetalladas/medico/dia', {
        params: {
          'idMedico': values.idEmpleado,
          numeroDiaSemana: getToday(),
        },
      });
      const { data } = result;
      return data;
    } catch (error) {
      console.error('error');
      console.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Obtener detalles de la programación
export const getProgramacionDetalles = createAsyncThunk(
  'programacionDetalle',
  async (values, { rejectWithValue }) => {
    try {
      const result = await clienteAxios.get('/programacionesDetalladas/listarDiasProgramados', {
        params: {
          'numeroDocumento': values.numeroDocumento,
          'idEmpresa': values.idEmpresa,
        },
      });
      const { data } = result;
      return data;
    } catch (error) {
      console.error('error');
      console.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Verificar programación
export const getVerificarProgramacion = createAsyncThunk(
  'verificarProgramacion',
  async (values, { rejectWithValue }) => {
    try {
      const result = await clienteAxios.get(`/programacionesDetalladas/verifica?idMedico=${values.idMedico}&fechaInicial=${values.fechaInicial}&fechaFinal=${values.fechaFinal}`);
      const { data } = result;
      return data;
    } catch (error) {
      console.error('error');
      console.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Obtener programación de detalles paginados
export const getProgramacionesDetallePaginado = createAsyncThunk(
  'getProgramacionesDetallePaginado',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.get('/programacionesDetalladas/pageable', {
        params: {
          page: values.page,
          size: values.size,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Registrar detalle de programación
export const registrarProgramacionDetalle = createAsyncThunk(
  'registrarProgramacionDetalle',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.post("/programacionesDetalladas", values);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Modificar detalle de programación
export const modificarProgramacionDetalle = createAsyncThunk(
  'modificarProgramacionDetalle',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await clienteAxios.put("/programacionesDetalladas", values);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Obtener detalle de programación por ID
export const getProgramacionDetallePorId = createAsyncThunk(
  'getProgramacionDetallePorId',
  async (id, { rejectWithValue }) => {
    try {
      const result = await clienteAxios.get(`/programacionesDetalladas/programaDetalle/${id}`);
      const { data } = result;
      return data;
    } catch (error) {
      console.error('error');
      console.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const getToday = () => {
  const date = new Date();
  const day = date.getDay();
  return day;
};

// Slice de programación detallada
const programacionDetalleSlice = createSlice({
  name: 'programacionDetalle',
  initialState,
  reducers: { resetState: () => initialState },
  extraReducers(builder) {
    builder
      // Manejo de la respuesta correcta de obtener la programación de detalles
      .addCase(getProgramacionDetalles.fulfilled, (state, { payload }) => {
        console.log('fulfilled getProgramacionDetalles:', payload);

        if (payload) {
          state.dias = payload;
          state.loading = false;
          state.code = 201;
          state.message = 'Se grabaron los datos correctamente';

          const selectedProgramacionDetalle = state.dias.find(
            (el) => el.numeroDiaSemana === getToday()
          );
          if (selectedProgramacionDetalle) {
            state.diaAtencion = selectedProgramacionDetalle.idProgramacionDetalle;
          }
        } else {
          state.dias = [];
          state.diaAtencion = '';
        }
      })
      .addCase(getProgramacionDetalles.rejected, (state, { payload }) => {
        console.log('rejected payload', payload);
        state.loading = false;
        state.code = payload.status;
        if (payload.status === 403) {
          state.logged = false;
        }
        state.message = payload.message;
      })

      // Manejo de la respuesta correcta de obtener las citas del día
      .addCase(getCitasDelDia.fulfilled, (state, { payload }) => {
        console.log('fulfilled getCitasDelDia payload', payload);
        state.dias = payload;
        state.loading = false;
        state.code = 201;
        state.message = 'Se grabaron los datos correctamente';
      })
      .addCase(getCitasDelDia.rejected, (state, { payload }) => {
        console.log('rejected payload', payload);
        state.loading = false;
        state.code = payload.status;
        if (payload.status === 403) {
          state.logged = false;
        }
        state.message = payload.message;
      })

      // Manejo de la respuesta correcta de verificar programación
      .addCase(getVerificarProgramacion.fulfilled, (state, { payload }) => {
        console.log('fulfilled getVerificarProgramacion payload', payload);
        state.dias = payload;
        state.loading = false;
        state.code = 201;
        state.message = 'Se grabaron los datos correctamente';
      })
      .addCase(getVerificarProgramacion.rejected, (state, { payload }) => {
        console.log('rejected payload', payload);
        state.loading = false;
        state.code = payload.status;
        if (payload.status === 403) {
          state.logged = false;
        }
        state.message = payload.message;
      })

      // Manejo de la respuesta correcta de obtener detalles de la programación paginados
      .addCase(getProgramacionesDetallePaginado.fulfilled, (state, { payload }) => {
        console.log('se listaron correctamente', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'Se encontraron los datos';
        state.programacionesDetalle = payload.content;
        state.total = payload.totalElements;
        state.prev = payload.first;
        state.next = payload.last;
        state.numberPage = payload.number;
      })
      .addCase(getProgramacionesDetallePaginado.rejected, (state, { payload }) => {
        console.log('rejected payload', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
        state.programacionesDetalle = [];
      })

      // Manejo de la respuesta correcta al registrar un detalle de programación
      .addCase(registrarProgramacionDetalle.fulfilled, (state, { payload }) => {
        console.log('fulfilled registrarProgramacionDetalle payload', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'Se grabaron los datos correctamente';
      })
      .addCase(registrarProgramacionDetalle.rejected, (state, { payload }) => {
        console.log('rejected registrarProgramacionDetalle payload', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })

      // Manejo de la respuesta correcta al obtener detalle de programación por ID
      .addCase(getProgramacionDetallePorId.fulfilled, (state, { payload }) => {
        console.log('fulfilled getProgramacionDetallePorId payload', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'Se encontró la programación';
        state.programacionDetalle = payload;
      })
      .addCase(getProgramacionDetallePorId.rejected, (state, { payload }) => {
        console.log('rejected getProgramacionDetallePorId payload', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      })

      // Manejo de la respuesta correcta al modificar un detalle de programación
      .addCase(modificarProgramacionDetalle.fulfilled, (state, { payload }) => {
        console.log('fulfilled modificarProgramacionDetalle payload', payload);
        state.loading = false;
        state.code = 201;
        state.message = 'Se modificaron los datos correctamente';
      })
      .addCase(modificarProgramacionDetalle.rejected, (state, { payload }) => {
        console.log('rejected modificarProgramacionDetalle payload', payload);
        state.loading = false;
        state.code = payload.status;
        state.message = payload.message;
      });
  },
});

export const { resetState } = programacionDetalleSlice.actions;
export default programacionDetalleSlice.reducer;
