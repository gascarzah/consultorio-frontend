import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const initialState = {
  loading: false,
  user: {},
  error: null,
  message: null,
  code: null,
  logged: false,
  email: null,
  rol: null,

};


export const login = createAsyncThunk(
  'auth',
  async (values, { rejectWithValue }) => {
    try {
      console.log(values)
      const { data } = await clienteAxios.post("/auth/login", values);
      // const { data } = await clienteAxios.post("/api/v1/auth/authenticate", values);


      return data
    } catch (error) {
      console.log(values)
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue({ message: "No token found" });
      }
      
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        return rejectWithValue({ message: "Token expired" });
      }
      
      return {
        access_token: token,
        decoded
      };
    } catch (error) {
      localStorage.removeItem("token");
      return rejectWithValue({ message: "Invalid token" });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { 
    headerResetState: () => {
      console.log('Reseteando estado de auth');
      return initialState;
    },
    logout: (state) => {
      console.log('Ejecutando logout');
      localStorage.removeItem("token");
      return initialState;
    },
    setRol: (state, action) => {
      state.rol = action.payload;
    }
  },
  // reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.logged = true;
        state.email = payload.decoded.sub;
        state.rol = payload.decoded.roles[0];
      })
      .addCase(checkAuth.rejected, (state) => {
        return initialState;
      })
      .addCase(login.pending, (state, action) => {
        console.log('Login pendiente');
        state.loading = true
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        console.log('Login exitoso, token decodificado:', jwt_decode(payload.access_token));
        state.loading = false
        localStorage.setItem("token", payload.access_token)
        let decoded = jwt_decode(payload.access_token)
        state.email = decoded.sub
        state.logged = true
        state.rol = decoded.roles[0]
      })
      .addCase(login.rejected, (state, { payload }) => {
        console.log('Login rechazado:', payload);
        state.loading = false;
        if (typeof payload === 'object' && payload !== null) {
          state.code = payload.status;
          state.message = payload.message || 'Error al iniciar sesión';
        } else {
          state.code = null;
          state.message = payload || 'Error al iniciar sesión';
        }
      })
  }
});

export const { headerResetState, logout, setRol } = authSlice.actions
export default authSlice.reducer


