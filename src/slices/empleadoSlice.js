import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../config/axios';

const initialState = {
  loading: false, // Cambiado a false por defecto
  user: {},
  code: null,
  message: null,
  logged: false,
  empleados: [],
  total: [],
  prev: null,
  next: null,
  numberPage: 0,
  empleado: null
};

// Acción para registrar empleado
export const registrarEmpleado = createAsyncThunk(
  'empleado/registrar',
  async (values, { rejectWithValue }) => {
    try {
      console.log('registrarEmpleado values ==> ', values);
      const { data } = await clienteAxios.post("/empleados", values);
      return data;
    } catch (error) {
      console.error('Error al registrar empleado:', error);
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// Acción para obtener empleados por empresa
export const getEmpleadosPorEmpresa = createAsyncThunk(
  'empleado/getPorEmpresa',
  async (value, { rejectWithValue }) => {
    try {
      console.log('Obteniendo empleados por empresa:', value);
      const { data } = await clienteAxios.get(`/empleados/empresa/${value}`);
      return data;
    } catch (error) {
      console.error('Error al obtener empleados por empresa:', error);
      return rejectWithValue(error?.response?.data || 'Error desconocido');
    }
  }
);

// Acción para obtener empleados paginados
export const getEmpleadosPaginado = createAsyncThunk(
  'empleado/getPaginado',
  async (values, { rejectWithValue }) => {
    try {
      console.log('Obteniendo empleados paginados');
      const { data } = await clienteAxios.get('/empleados/pageable', {
        params: {
          page: values.page,
          size: values.size,
        }
      });
      return data;
    } catch (error) {
      console.error('Error al obtener empleados paginados:', error);
      return rejectWithValue(error?.response?.data || 'Error desconocido');
    }
  }
);

// Acción para modificar empleado
export const modificarEmpleado = createAsyncThunk(
  'empleado/modificar',
  async (values, { rejectWithValue }) => {
    try {
      console.log('modificarEmpleado values ==> ', values);
      const { data } = await clienteAxios.put("/empleados", values);
      return data;
    } catch (error) {
      console.error('Error al modificar empleado:', error);
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// Acción para obtener un empleado por ID
export const getEmpleado = createAsyncThunk(
  'empleado/get',
  async (id, { rejectWithValue }) => {
    try {
      console.log('Obteniendo empleado por ID:', id);
      const { data } = await clienteAxios.get(`/empleados/${id}`);
      console.log('Respuesta getEmpleado:', data);
      return data;
    } catch (error) {
      console.error('Error al obtener empleado:', error);
      return rejectWithValue(error?.response?.data || 'Error desconocido');
    }
  }
);

const empleadoSlice = createSlice({
  name: 'empleado',
  initialState,
  reducers: { 
    resetState: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getEmpleadosPorEmpresa.fulfilled, (state, { payload }) => {
        console.log('Empleados por empresa obtenidos:', payload);
        state.loading = false;
        state.code = 200; // Asegurarse de asignar un código de estado adecuado
        state.message = 'Empleados obtenidos con éxito';
        state.empleados = payload;
      })
      .addCase(getEmpleadosPorEmpresa.rejected, (state, { payload }) => {
        console.log('Error al obtener empleados por empresa:', payload);
        state.loading = false;
        state.code = payload?.status || 500; // Asignar un valor predeterminado de código de error
        state.message = payload?.message || 'Error al obtener empleados';
      })
      .addCase(getEmpleadosPaginado.fulfilled, (state, { payload }) => {
        console.log('Empleados paginados obtenidos:', payload);
        state.loading = false;
        state.code = 200; // Código de éxito
        state.message = 'Empleados cargados con éxito';
        state.empleados = payload.content;
        state.total = payload.totalElements;
        state.prev = payload.first;
        state.next = payload.last;
        state.numberPage = payload.number;
      })
      .addCase(getEmpleadosPaginado.rejected, (state, { payload }) => {
        console.log('Error al obtener empleados paginados:', payload);
        state.loading = false;
        state.code = payload?.status || 500; // Valor predeterminado de error
        state.message = payload?.message || 'Error al cargar empleados';
      })
      .addCase(modificarEmpleado.fulfilled, (state) => {
        state.loading = false;
        state.code = 200;
        state.message = 'Empleado modificado correctamente';
      })
      .addCase(modificarEmpleado.rejected, (state, { payload }) => {
        state.loading = false;
        state.code = payload?.status || 500;
        state.message = payload?.message || 'Error al modificar empleado';
      })
      .addCase(getEmpleado.pending, (state) => {
        state.loading = true;
        state.empleado = null;
        state.error = null;
      })
      .addCase(getEmpleado.fulfilled, (state, { payload }) => {
        console.log('Empleado obtenido:', payload);
        state.loading = false;
        state.code = 200;
        state.message = 'Empleado obtenido con éxito';
        state.empleado = payload;
      })
      .addCase(getEmpleado.rejected, (state, { payload }) => {
        console.log('Error al obtener empleado:', payload);
        state.loading = false;
        state.code = payload?.status || 500;
        state.message = payload?.message || 'Error al obtener empleado';
        state.empleado = null;
      });
  }
});

export const { resetState } = empleadoSlice.actions;

export default empleadoSlice.reducer;
