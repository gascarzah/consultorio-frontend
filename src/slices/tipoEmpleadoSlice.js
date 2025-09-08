import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../config/axios';

const initialState = {
  loading: false,
  code: null,
  message: null,
  logged: false,
  tipoEmpleado: {},
  tipoEmpleados: [],
  total: 0,
  prev: null,
  next: null,
  numberPage: 0
};

// 🔹 Función reutilizable para crear thunks asíncronos
const asyncThunkCreator = (type, apiCall) => createAsyncThunk(type, async (params, { rejectWithValue }) => {
  try {
    const { data } = await apiCall(params);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Error desconocido', status: 500 });
  }
});

// 🔹 Thunks reutilizando la función `asyncThunkCreator`
export const getTipoEmpleadosPaginado = asyncThunkCreator('tipoEmpleados/getPaginado', 
  (values) => clienteAxios.get('/tipoEmpleados/pageable', { params: { page: values.page, size: values.size } })
);

export const registrarTipoEmpleado = asyncThunkCreator('tipoEmpleados/registrar', 
  (values) => clienteAxios.post('/tipoEmpleados', values)
);

export const modificarTipoEmpleado = asyncThunkCreator('tipoEmpleados/modificar', 
  (values) => clienteAxios.put('/tipoEmpleados', values)
);

export const getTipoEmpleado = asyncThunkCreator('tipoEmpleados/get', 
  (id) => clienteAxios.get(`/tipoEmpleados/${id}`)
);

export const getTipoEmpleados = asyncThunkCreator('tipoEmpleados/getAll', 
  () => clienteAxios.get('/tipoEmpleados')
);

const tipoEmpleadoSlice = createSlice({
  name: 'tipoEmpleado',
  initialState,
  reducers: {
    resetState: () => ({ ...initialState })
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Obtener tipos de empleados paginados
      .addCase(getTipoEmpleadosPaginado.pending, (state) => { state.loading = true; })
      .addCase(getTipoEmpleadosPaginado.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.code = 200;
        state.message = 'Tipos de empleados paginados obtenidos correctamente';
        state.tipoEmpleados = payload.content;
        state.total = payload.totalElements;
        state.prev = payload.first;
        state.next = payload.last;
        state.numberPage = payload.number;
      })
      .addCase(getTipoEmpleadosPaginado.rejected, (state, { payload }) => {
        state.loading = false;
        state.code = payload?.status ?? 500;
        state.message = payload?.message ?? 'Error desconocido';
        state.tipoEmpleados = [];
      })

      // 🔹 Obtener un tipo de empleado por ID
      .addCase(getTipoEmpleado.pending, (state) => { state.loading = true; })
      .addCase(getTipoEmpleado.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.code = 200;
        state.message = 'Tipo de empleado obtenido correctamente';
        state.tipoEmpleado = payload;
      })
      .addCase(getTipoEmpleado.rejected, (state, { payload }) => {
        state.loading = false;
        state.code = payload?.status ?? 500;
        state.message = payload?.message ?? 'Error desconocido';
      })

      // 🔹 Obtener todos los tipos de empleados
      .addCase(getTipoEmpleados.pending, (state) => { state.loading = true; })
      .addCase(getTipoEmpleados.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.code = 200;
        state.message = 'Tipos de empleados obtenidos correctamente';
        state.tipoEmpleados = payload;
      })
      .addCase(getTipoEmpleados.rejected, (state, { payload }) => {
        state.loading = false;
        state.code = payload?.status ?? 500;
        state.message = payload?.message ?? 'Error desconocido';
      })

      // 🔹 Registrar un tipo de empleado
      .addCase(registrarTipoEmpleado.pending, (state) => { state.loading = true; })
      .addCase(registrarTipoEmpleado.fulfilled, (state) => {
        state.loading = false;
        state.code = 201;
        state.message = 'Tipo de empleado registrado correctamente';
      })
      .addCase(registrarTipoEmpleado.rejected, (state, { payload }) => {
        state.loading = false;
        state.code = payload?.status ?? 500;
        state.message = payload?.message ?? 'Error desconocido';
      })

      // 🔹 Modificar un tipo de empleado
      .addCase(modificarTipoEmpleado.pending, (state) => { state.loading = true; })
      .addCase(modificarTipoEmpleado.fulfilled, (state) => {
        state.loading = false;
        state.code = 200;
        state.message = 'Tipo de empleado modificado correctamente';
      })
      .addCase(modificarTipoEmpleado.rejected, (state, { payload }) => {
        state.loading = false;
        state.code = payload?.status ?? 500;
        state.message = payload?.message ?? 'Error desconocido';
      });
  }
});

export const { resetState } = tipoEmpleadoSlice.actions;
export default tipoEmpleadoSlice.reducer;
