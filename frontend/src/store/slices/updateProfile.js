import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const updateProfileSlice = createSlice({
    name:"updateProfile",
    initialState:{
        loading:false,
        error:null,
        isUpdated:false,
    },
    reducers:{
        updateProfileRequest(state,action){
            state.loading=true
        },
        updateProfileSuccess(state,action){
            state.loading=false,
            state.error=null,
            state.isUpdated=true
        },
        updateProfileFailed(state,action){
            state.loading=false,
            state.error=action.payload,
            state.isUpdated=false
        },
        updatePasswordRequest(state,action){
            state.loading=true,
            state.error=null,
            state.isUpdated=false
        },
        updatePasswordSuccess(state,action){
            state.loading=false,
            state.error=null,
            state.isUpdated=true
        },
        updatePasswordFailed(state,action){
            state.loading=false,
            state.error=action.payload,
            state.isUpdated=false
        },
        profileResetAfterUpdate(state,action){
            state.error=null,
            state.isUpdated=false
        },
    }
})


export const updateProfile=(data)=>async(dispatch)=>{
    dispatch(updateProfileSlice.actions.updateProfileRequest());
    try {
        const response = await axios.put("http://localhost:4000/api/V1/user/update/profile",data,{
            withCredentials:true,
            headers:{
                "Content-Type":"multipart/form-data"
            },
        });
        dispatch(updateProfileSlice.actions.updateProfileSuccess());
    } catch (error) {
        dispatch(updateProfileSlice.actions.updateProfileFailed(error.response.data.message || "Failed to update profile"))
    }

}


export const updatePassword=(data)=>async (dispatch)=>{
    dispatch(updateProfileSlice.actions.updatePasswordRequest());
    try {
        const response = await axios.put("http://localhost:4000/api/V1/user/update/password",data,{
            withCredentials:true,
        });
        dispatch(updateProfileSlice.actions.updatePasswordSuccess());
    } catch (error) {
        dispatch(updateProfileSlice.actions.updatePasswordFailed(error.response.data.message));
    }
}
