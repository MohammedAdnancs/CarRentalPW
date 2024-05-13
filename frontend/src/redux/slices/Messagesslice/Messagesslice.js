import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from './MessagesServices'

const initialState = {
    UserContacts: null,
    UserMessages: null,
    isError: false,
    isSucces: false,
    isLoding: false,
    message: ''
}


export const getUserContacts = createAsyncThunk('auth/getUserContacts', async (user, thunkAPI) => {
    try {
        return await authServices.getUserContacts(user)
    } catch (error) {
        const message = error
        return thunkAPI.rejectWithValue(message.response.data.error)
    }
})

export const getUserMessages = createAsyncThunk('auth/getUserMessages', async (user, thunkAPI) => {
    try {
        return await authServices.getUserMessages(user)
    } catch (error) {
        const message = error
        return thunkAPI.rejectWithValue(message.response.data.error)
    }
})

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        resetmessage: (state) => {
            state.isError = false
            state.isSucces = false
            state.isLoding = false
            state.message = ''
        },
        resetUserContacts: (state) => {
            state.UserContacts = null
            state.UserMessages = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserContacts.pending, (state) => {
                state.isLoding = true
            })
            .addCase(getUserContacts.fulfilled, (state, action) => {
                state.UserContacts = action.payload
                state.isLoding = false
                state.isSucces = true
                state.isError = false
            })
            .addCase(getUserContacts.rejected, (state, action) => {
                state.isLoding = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserMessages.pending, (state) => {
                state.isLoding = true
            })
            .addCase(getUserMessages.fulfilled, (state, action) => {
                state.UserMessages = action.payload
                state.isLoding = false
                state.isSucces = true
                state.isError = false
            })
            .addCase(getUserMessages.rejected, (state, action) => {
                state.isLoding = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { resetmessage, resetUserContacts } = messageSlice.actions
export default messageSlice.reducer