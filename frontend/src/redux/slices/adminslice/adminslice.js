import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from './adminServices'

const initialState = {
    Allusers: null,
    isError: false,
    isSucces: false,
    isLoding: false,
    message: ''
}

export const ViewAllUsers = createAsyncThunk('auth/ViewAllUsers', async (user, thunkAPI) => {
    try {
        return await authServices.getAllUser(user)
    } catch (error) {
        const message = error
        return thunkAPI.rejectWithValue(message.response.data.error)
    }
})

export const DeleteUser = createAsyncThunk('auth/DeleteUser', async (User, thunkAPI) => {
    try {
        return await authServices.DeleteUser(User)
    } catch (error) {
        const message = error
        return thunkAPI.rejectWithValue(message.response.data.error)
    }
})

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetadmin: (state) => {
            state.isError = false
            state.isSucces = false
            state.isLoding = false
            state.message = ''
        },
        resetAllusers: (state) => {
            state.Allusers = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ViewAllUsers.pending, (state) => {
                state.isLoding = true
            })
            .addCase(ViewAllUsers.fulfilled, (state, action) => {
                state.Allusers = action.payload
                state.isLoding = false
                state.isSucces = true
                state.isError = false
            })
            .addCase(ViewAllUsers.rejected, (state, action) => {
                state.isLoding = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(DeleteUser.pending, (state) => {
                state.isLoding = true
            })
            .addCase(DeleteUser.fulfilled, (state, action) => {
                state.isLoding = false
                state.isSucces = true
                state.isError = false
            })
            .addCase(DeleteUser.rejected, (state, action) => {
                state.isLoding = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { resetadmin, resetAllusers } = adminSlice.actions
export default adminSlice.reducer