import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';

const initialState = {
    loading: false,
    rol: {},    
    error: null,
    message: null,
    roles: [],
  };

  export const getRolesPaginado = createAsyncThunk(
    'getRolesPaginado',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await clienteAxios.get(`/roles/pageable`,
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




export const registrarRol = createAsyncThunk(
    'registrarRol',
    async (values, { rejectWithValue }) => {

        console.log('values registrarRol  ==> ', values)

        try {


            const { data } = await clienteAxios.post(`/roles`, values);
            console.log('data ==> ', data)

            return data
        } catch (error) {
            console.error('error')
            console.error(error.response.data.message)
            return rejectWithValue(error.response.data)
        }
    }
)
export const modificarRol = createAsyncThunk(
    'modificarRol',
    async (values, { rejectWithValue }) => {

        console.log('values modificarRol  ==> ', values)

        try {


            const { data } = await clienteAxios.put(`/roles`, values);
            console.log('data ==> ', data)

            return data
        } catch (error) {
            console.error('error')
            console.error(error.response.data.message)
            return rejectWithValue(error.response.data)
        }
    }
)

export const getRol = createAsyncThunk(
    'getRol',
    async (id, { rejectWithValue }) => {
        console.log('llega getHorario ', id)
        try {

            const { data } = await clienteAxios.get(`/roles/${id}`);

            return data
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

export const getRoles = createAsyncThunk(
    'getRoles',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await clienteAxios.get(`/roles`);
            return data
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

const roleslice = createSlice({
    name: 'rol',
    initialState,
    reducers: { resetState: () => initialState, },
    // reducers: {},
    extraReducers(builder) {
        builder
            // .addCase(revertAll, () => initialState)
            .addCase(registrarRol.fulfilled, (state, { payload }) => {
                console.log('se grabo correctamente', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'

            })
            .addCase(registrarRol.rejected, (state, { payload }) => {
                console.log('rejected payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
                state.roles = []
            })
            .addCase(getRolesPaginado.fulfilled, (state, { payload }) => {
                console.log('se listo correctamente', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'
                state.roles = payload.content
                state.total = payload.totalElements
                state.prev = payload.first
                state.next = payload.last
                state.numberPage = payload.number
            })
            .addCase(getRolesPaginado.rejected, (state, { payload }) => {
                console.log('rejected payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
                state.roles = []
            })
            .addCase(getRol.fulfilled, (state, { payload }) => {
                console.log('fulfilled getRol payload', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'
                state.rol = payload
            })
            .addCase(getRol.rejected, (state, { payload }) => {
                console.log('rejected getRol payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
            })
            .addCase(getRoles.fulfilled, (state, { payload }) => {
                console.log('fulfilled getRol payload', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'
                state.roles = payload
            })
            .addCase(getRoles.rejected, (state, { payload }) => {
                console.log('rejected getRol payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
            })
            .addCase(modificarRol.fulfilled, (state, { payload }) => {
                console.log('se grabo correctamente', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'

            })
            .addCase(modificarRol.rejected, (state, { payload }) => {
                console.log('rejected payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
                state.roles = []
            })
    }


})



export const { resetState } = roleslice.actions

export default roleslice.reducer

