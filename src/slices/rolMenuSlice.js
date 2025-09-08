import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
    loading: '',
    code: null,
    message: null,
    logged: false,
    rolMenu: {},
    rolMenus: [],
    rolMenusGen: [],
    total: [],
    prev: null,
    next: null,
    numberPage: 0
};






export const registrarRolMenu = createAsyncThunk(
    'registrarRolMenu',
    async (values, { rejectWithValue }) => {

        console.log('values registrarRolMenu  ==> ', values)

        try {


            const { data } = await clienteAxios.post(`/rolMenus`, values);
            console.log('data ==> ', data)

            return data
        } catch (error) {
            console.error('error')
            console.error(error.response.data.message)
            return rejectWithValue(error.response.data)
        }
    }
)
export const modificarRolMenu = createAsyncThunk(
    'modificarRolMenu',
    async (values, { rejectWithValue }) => {

        console.log('values modificarRolMenu  ==> ', values)

        try {


            const { data } = await clienteAxios.put(`/rolMenus`, values);
            console.log('data ==> ', data)

            return data
        } catch (error) {
            console.error('error')
            console.error(error.response.data.message)
            return rejectWithValue(error.response.data)
        }
    }
)

export const getMenusPorRol = createAsyncThunk(
    'getMenusPorRol',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await clienteAxios.get(`/rolMenus/${values}`);
            return data
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)


export const getMenusPorRolTodo = createAsyncThunk(
    'getMenusPorRolTodo',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await clienteAxios.get(`/rolMenus/menus/${values}`);
            return data
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

const rolMenuSlice = createSlice({
    name: 'rolMenu',
    initialState,
    reducers: { resetState: () => initialState, },
    // reducers: {},
    extraReducers(builder) {
        builder
            // .addCase(revertAll, () => initialState)
            .addCase(registrarRolMenu.fulfilled, (state, { payload }) => {
                console.log('se grabo correctamente', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'

            })
            .addCase(registrarRolMenu.rejected, (state, { payload }) => {
                console.log('rejected payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
                state.rolMenus = []
            })           
            .addCase(modificarRolMenu.fulfilled, (state, { payload }) => {
                console.log('se grabo correctamente', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'

            })
            .addCase(modificarRolMenu.rejected, (state, { payload }) => {
                console.log('rejected payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
                state.rolMenus = []
            })
             .addCase(getMenusPorRol.fulfilled, (state, { payload }) => {
                console.log('fulfilled getMenu payload', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'
                state.rolMenus = payload
            })
            .addCase(getMenusPorRol.rejected, (state, { payload }) => {
                console.log('rejected getMenu payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
            })
             .addCase(getMenusPorRolTodo.fulfilled, (state, { payload }) => {
                console.log('fulfilled getMenu payload', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'
                state.rolMenusGen = payload
            })
            .addCase(getMenusPorRolTodo.rejected, (state, { payload }) => {
                console.log('rejected getMenu payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
            })
    }


})



export const { resetState } = rolMenuSlice.actions

export default rolMenuSlice.reducer

