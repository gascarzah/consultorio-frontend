import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { create } from "yup/lib/array";
import clienteAxios from "../config/axios";

const initialState = {
    loading: false,
    rol: {},    
    error: null,
    message: null,
    roles: [],
  };

const rolSlice = createSlice({
    name: 'rol',
    initialState,
    reducers: {
        setRoles: (state, action) => {
            state.roles = action.payload
        }
    }
})


export const {setRoles} = rolSlice.actions

export default rolSlice.reducer

export const getRoles = () => async (dispatch) => {
    try {
        const { data } = await clienteAxios.get('/roles')
        dispatch(setRoles(data))
    } catch (error) {
        console.log(error);
    }
}