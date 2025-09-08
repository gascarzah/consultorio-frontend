import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import clienteAxios from '../config/axios';


const initialState = {
    loading: false,
    code: null,
    message: null,
    logged: false,
    menu: {},
    menus: [],
    menusPorRol: [],
    total: [],
    prev: null,
    next: null,
    numberPage: 0
};

export const getMenusPaginado = createAsyncThunk(
    'getMenusPaginado',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await clienteAxios.get(`/menus/pageable`,
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




export const registrarMenu = createAsyncThunk(
    'registrarMenu',
    async (values, { rejectWithValue }) => {

        console.log('values registrarMenu  ==> ', values)

        try {


            const { data } = await clienteAxios.post(`/menus`, values);
            console.log('data ==> ', data)

            return data
        } catch (error) {
            console.error('error')
            console.error(error.response.data.message)
            return rejectWithValue(error.response.data)
        }
    }
)
export const modificarMenu = createAsyncThunk(
    'modificarMenu',
    async (values, { rejectWithValue }) => {

        console.log('values modificarMenu  ==> ', values)

        try {


            const { data } = await clienteAxios.put(`/menus`, values);
            console.log('data ==> ', data)

            return data
        } catch (error) {
            console.error('error')
            console.error(error.response.data.message)
            return rejectWithValue(error.response.data)
        }
    }
)

export const getMenu = createAsyncThunk(
    'getMenu',
    async (id, { rejectWithValue }) => {
        console.log('llega getHorario ', id)
        try {

            const { data } = await clienteAxios.get(`/menus/${id}`);

            return data
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

export const getMenus = createAsyncThunk(
    'getMenus',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await clienteAxios.get(`/menus`);
            return data
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

// export const getMenusPorRol = createAsyncThunk(
//     'getMenusPorRol',
//     async (values, { rejectWithValue }) => {
//         try {
//             const { data } = await clienteAxios.get(`/menus/rol`, values);
//             return data
//         } catch (error) {

//             return rejectWithValue(error.response.data)
//         }
//     }
// )

const menuslice = createSlice({
    name: 'menu',
    initialState,
    reducers: { resetState: () => initialState, },
    // reducers: {},
    extraReducers(builder) {
        builder
            // .addCase(revertAll, () => initialState)
            .addCase(registrarMenu.fulfilled, (state, { payload }) => {
                console.log('se grabo correctamente', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'

            })
            .addCase(registrarMenu.rejected, (state, { payload }) => {
                console.log('rejected payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
                state.menus = []
            })
            .addCase(getMenusPaginado.fulfilled, (state, { payload }) => {
                console.log('se listo correctamente', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'
                state.menus = payload.content
                state.total = payload.totalElements
                state.prev = payload.first
                state.next = payload.last
                state.numberPage = payload.number
            })
            .addCase(getMenusPaginado.rejected, (state, { payload }) => {
                console.log('rejected payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
                state.menus = []
            })
            .addCase(getMenu.fulfilled, (state, { payload }) => {
                console.log('fulfilled getMenu payload', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'
                state.menu = payload
            })
            .addCase(getMenu.rejected, (state, { payload }) => {
                console.log('rejected getMenu payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
            })
            .addCase(getMenus.fulfilled, (state, { payload }) => {
                console.log('fulfilled getMenu payload', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'
                state.menusPorRol = payload
            })
            .addCase(getMenus.rejected, (state, { payload }) => {
                console.log('rejected getMenu payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
            })
            .addCase(modificarMenu.fulfilled, (state, { payload }) => {
                console.log('se grabo correctamente', payload)
                // state.loading = 'grabo'
                state.loading = false
                state.code = 201
                state.message = 'se encontro'

            })
            .addCase(modificarMenu.rejected, (state, { payload }) => {
                console.log('rejected payload', payload)
                state.loading = false
                state.code = payload.status
                state.message = payload.message
                state.menus = []
            })
            // .addCase(getMenusPorRol.fulfilled, (state, { payload }) => {
            //     console.log('fulfilled getMenu payload', payload)
            //     // state.loading = 'grabo'
            //     state.loading = false
            //     state.code = 201
            //     state.message = 'se encontro'
            //     state.menus = payload
            // })
            // .addCase(getMenusPorRol.rejected, (state, { payload }) => {
            //     console.log('rejected getMenu payload', payload)
            //     state.loading = false
            //     state.code = payload.status
            //     state.message = payload.message
            // })
    }


})



export const { resetState } = menuslice.actions

export default menuslice.reducer

