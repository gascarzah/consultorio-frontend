import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
    loading: '',
    code: null,
    message: null,
    logged: false,
    rolMenu: {},
    rolMenus: [],
    total: [],
    prev: null,
    next: null,
    numberPage: 0
};


export const getListaRolMenu = createAsyncThunk(
    'getListaRolMenu',
    async (values, { rejectWithValue }) => {

        console.log('values getListaRolMenu  ==> ', values)

        try {


            const { data } = await clienteAxios.get(`/rolMenus/${values}`,);
            console.log('data ==> ', data)

            return data
        } catch (error) {
            console.error('error')
            console.error(error.response.data.message)
            return rejectWithValue(error.response.data)
        }
    }
)




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
                state.roles = []
            })
            .addCase(getListaRolMenu.fulfilled, (state, { payload }) => {
                console.log('fulfilled getRol payload', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'
                state.rolMenus = payload
            })
            .addCase(getListaRolMenu.rejected, (state, { payload }) => {
                console.log('rejected getRol payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message

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
                state.roles = []
            })
    }


})



export const { resetState } = rolMenuSlice.actions

export default rolMenuSlice.reducer

