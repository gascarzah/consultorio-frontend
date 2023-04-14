import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import clienteAxios from "../config/axios";

const initialState = {
    loading: false,
    empresa: {},
    error: null,
    message: null,
    empresas: [],
};

const empresaSlice = createSlice({
    name: 'empresa',
    initialState,
    reducers: {
        setEmpresas: (state, action) => {
            state.empresas = action.payload
        }
    }
})


export const { setEmpresas } = empresaSlice.actions

export default empresaSlice.reducer

export const getEmpresas = () => async (dispatch) => {
    try {
        const { data } = await clienteAxios.get('/empresas')
        dispatch(setEmpresas(data))
    } catch (error) {
        console.log(error);
    }
}