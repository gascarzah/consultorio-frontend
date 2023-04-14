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
  rol: null
};


export const login = createAsyncThunk(
  'auth',
  async (values, { rejectWithValue }) => {
    try {

      const { data } = await clienteAxios.post("/login", values);


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


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { headerResetState: () => initialState, },
  // reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(revertAll, () => initialState)
      .addCase(login.pending, (state, action) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false

        localStorage.setItem("token", payload.access_token)
        let decoded = jwt_decode(payload.access_token)

        state.email = decoded.sub
        state.logged = true
        state.rol = decoded.roles[0]
      })
      .addCase(login.rejected, (state, { payload }) => {

        state.loading = false
        state.code = payload.status
        state.message = payload.message
      })

  }



})

export const { headerResetState } = authSlice.actions
export default authSlice.reducer


