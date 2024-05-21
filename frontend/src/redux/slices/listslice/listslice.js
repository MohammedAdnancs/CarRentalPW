import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import listServices from './listsliceServies'

const initialState = {
    ListInfo: null,
    isError: false,
    isSucces: false,
    isLoding: false,
    message: ''
}

//Register user
export const ViewAllListing = createAsyncThunk('auth/ViewAllListing', async (user, thunkAPI) => {
    try {
        return await listServices.getalllistings()
    } catch (error) {
        const message = error
        return thunkAPI.rejectWithValue(message.response.data.error)
    }
})

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        resetlist: (state) => {
            state.isError = false
            state.isSucces = false
            state.isLoding = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(ViewAllListing.pending, (state) => {
                state.isError = false
                state.isSucces = false
                state.isLoding = true
                state.message = ''
            })
            .addCase(ViewAllListing.fulfilled, (state, action) => {
                state.ListInfo = action.payload
                state.isError = false
                state.isSucces = true
                state.isLoding = false
                state.message = ''
            })
            .addCase(ViewAllListing.rejected, (state, action) => {
                state.isError = true
                state.isSucces = false
                state.isLoding = false
                state.message = action.payload
            })
    },
})

export const { resetlist } = listSlice.actions
export default listSlice.reducer