import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
    loading: '',
    code: null,
    message: null,
    logged: false,
    empresa: {},
    empresas: [],
    total: [],
    prev: null,
    next: null,
    numberPage: 0
};

export const getEmpresasPaginado = createAsyncThunk(
    'getEmpresasPaginado',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await clienteAxios.get(`/empresas/pageable`,
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




export const registrarEmpresa = createAsyncThunk(
    'registrarEmpresa',
    async (values, { rejectWithValue }) => {

        console.log('values registrarEmpresa  ==> ', values)

        try {


            const { data } = await clienteAxios.post(`/empresas`, values);
            console.log('data ==> ', data)

            return data
        } catch (error) {
            console.error('error')
            console.error(error.response.data.message)
            return rejectWithValue(error.response.data)
        }
    }
)
export const modificarEmpresa = createAsyncThunk(
    'modificarEmpresa',
    async (values, { rejectWithValue }) => {

        console.log('values modificarEmpresa  ==> ', values)

        try {


            const { data } = await clienteAxios.put(`/empresas`, values);
            console.log('data ==> ', data)

            return data
        } catch (error) {
            console.error('error')
            console.error(error.response.data.message)
            return rejectWithValue(error.response.data)
        }
    }
)

export const getEmpresa = createAsyncThunk(
    'getEmpresa',
    async (id, { rejectWithValue }) => {
        console.log('llega getHorario ', id)
        try {

            const { data } = await clienteAxios.get(`/empresas/${id}`);

            return data
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

export const getEmpresas = createAsyncThunk(
    'getEmpresas',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await clienteAxios.get(`/empresas`);
            return data
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

const empresaSlice = createSlice({
    name: 'empresa',
    initialState,
    reducers: { resetState: () => initialState, },
    // reducers: {},
    extraReducers(builder) {
        builder
            // .addCase(revertAll, () => initialState)
            .addCase(registrarEmpresa.fulfilled, (state, { payload }) => {
                console.log('se grabo correctamente', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'

            })
            .addCase(registrarEmpresa.rejected, (state, { payload }) => {
                console.log('rejected payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
                state.empresas = []
            })
            .addCase(getEmpresasPaginado.fulfilled, (state, { payload }) => {
                console.log('se listo correctamente', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'
                state.empresas = payload.content
                state.total = payload.totalElements
                state.prev = payload.first
                state.next = payload.last
                state.numberPage = payload.number
            })
            .addCase(getEmpresasPaginado.rejected, (state, { payload }) => {
                console.log('rejected payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
                state.empresas = []
            })
            .addCase(getEmpresa.fulfilled, (state, { payload }) => {
                console.log('fulfilled getEmpresa payload', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'
                state.empresa = payload
            })
            .addCase(getEmpresa.rejected, (state, { payload }) => {
                console.log('rejected getEmpresa payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
            })
            .addCase(getEmpresas.fulfilled, (state, { payload }) => {
                console.log('fulfilled getEmpresa payload', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'
                state.empresas = payload
            })
            .addCase(getEmpresas.rejected, (state, { payload }) => {
                console.log('rejected getEmpresa payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
            })
            .addCase(modificarEmpresa.fulfilled, (state, { payload }) => {
                console.log('se grabo correctamente', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'

            })
            .addCase(modificarEmpresa.rejected, (state, { payload }) => {
                console.log('rejected payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
                state.empresas = []
            })
    }


})



export const { resetState } = empresaSlice.actions

export default empresaSlice.reducer

