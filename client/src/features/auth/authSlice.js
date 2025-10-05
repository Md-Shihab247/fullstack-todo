import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from './authApi'

export const registration = createAsyncThunk('auth/registration' , async(data, thunkAPI)=>{
        try {
            let res = await authApi.registration(data)
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
})
export const login = createAsyncThunk('auth/login' , async(data, thunkAPI)=>{
        try {
            let res = await authApi.login(data)
            return res.data
        } catch (error) {   
            return thunkAPI.rejectWithValue(error.message)
        }
})
export const verifyEmail = createAsyncThunk('auth/verifyEmail' , async(token, thunkAPI)=>{
        try {
            let res = await authApi.verifyEmail(token)
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
})
export const forgotPass = createAsyncThunk('auth/forgotPass' , async(data, thunkAPI)=>{
        try {
            let res = await authApi.forgotPassword(data)
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
})
export const resetPass = createAsyncThunk('auth/resetPass',async({resetToken,password}, thunkAPI)=>{
    try {
            let res = await authApi.resetPassword(resetToken.token,{password})
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
})



export const authSlice = createSlice({
  name: 'auth',
  initialState : {
    user: null,
    accessToken: null,
    loading: false,
    message: null,
    error: null
  },
  reducers: {
    logout: (state, action)=>{
        state.user = null
        state.accessToken = null
    }
  },
  extraReducers: (builder)=>{
    builder
    .addCase(login.pending, (state,action)=>{ state.loading = true})
    .addCase(login.fulfilled, (state, action)=>{
        state.user = {
          username: action.payload.username,
          email: action.payload.email
        }
        state.loading = false
        state.message = action.payload.message
        state.accessToken = action.payload.accessToken
        localStorage.setItem('accessToken', JSON.stringify(state.accessToken))
    })
    .addCase(login.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload.error
        
    })
    .addCase(registration.fulfilled, (state, action)=>{
        state.message = action.payload.message
    })
    .addCase(verifyEmail.fulfilled, (state, action)=>{
        state.message = action.payload.message
    })
    .addCase(forgotPass.fulfilled ,(state, action)=>{
        state.message = action.payload.message
    })
    .addCase(resetPass.fulfilled ,(state, action)=>{
        state.message = action.payload.message
    })
    
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer