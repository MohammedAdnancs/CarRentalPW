import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from './authServices'

const initialState = {
    userInfo: null,
    isErrorsignup: false,
    isErrorlogin: false,
    isSucceslogin: false,
    isSuccessignup: false,
    isLodingsignup: false,
    isLodinglogin: false,
    messagesignup: '',
    messagelogin: ''
}

//Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authServices.register(user)
    } catch (error) {
        const message = error
        return thunkAPI.rejectWithValue(message.response.data.error)
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authServices.login(user)
    } catch (error) {
        const message = error
        return thunkAPI.rejectWithValue(message.response.data.error)
    }
})

export const Logoutuser = createAsyncThunk('auth/logout', async (user, thunkAPI) => {
    try {
        return await authServices.Logout()
    } catch (error) {
        const message = error
        return thunkAPI.rejectWithValue(message)
    }
})

export const editUser = createAsyncThunk('auth/Edit', async (user, thunkAPI) => {
    try {
        return await authServices.editUser(user)
    } catch (error) {
        const message = error
        return thunkAPI.rejectWithValue(message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetUser: (state) => {
            state.isErrorsignup = false
            state.isSuccessignup = false
            state.isLodingsignup = false
            state.messagesignup = ''
            state.isErrorlogin = false
            state.isSucceslogin = false
            state.isLodinglogin = false
            state.messagelogin = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLodingsignup = true
                state.isSuccessignup = false
                state.isErrorsignup = false
                state.messagesignup = ""
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLodingsignup = false
                state.isSuccessignup = true
                state.isErrorsignup = false
                state.messagesignup = ""
            })
            .addCase(register.rejected, (state, action) => {
                state.isLodingsignup = false
                state.isErrorsignup = true
                state.isSuccessignup = false
                state.messagesignup = action.payload
                state.userInfo = null
            })
            .addCase(login.pending, (state) => {
                state.isLodinglogin = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.userInfo = action.payload
                state.isLodinglogin = false
                state.isErrorlogin = false
                state.isSucceslogin = true
                state.messagelogin = ""
            })
            .addCase(login.rejected, (state, action) => {
                state.isLodinglogin = false
                state.isErrorlogin = true
                state.messagelogin = action.payload
                state.userInfo = null
            })
            .addCase(Logoutuser.pending, (state) => {
                state.isLodinglogin = true
            })
            .addCase(Logoutuser.fulfilled, (state, action) => {
                state.userInfo = null
                state.isLodinglogin = false
                state.isSucceslogin = false
                state.isErrorlogin = false
                state.messagelogin = ""
            })
            .addCase(Logoutuser.rejected, (state, action) => {
                state.isLodinglogin = false
                state.isErrorlogin = true
                state.messagelogin = action.payload
            })
            .addCase(editUser.pending, (state) => {
                state.isLodinglogin = true
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.userInfo = action.payload
                state.isLodinglogin = false
                state.isSucceslogin = true
                state.isErrorlogin = false
            })
            .addCase(editUser.rejected, (state, action) => {
                state.isLodinglogin = false
                state.isErrorlogin = true
                state.messagelogin = action.payload
            })
    },
})

export const { resetUser } = authSlice.actions
export default authSlice.reducer