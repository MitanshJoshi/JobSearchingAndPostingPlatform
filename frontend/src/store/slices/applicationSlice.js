import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applications: [],
    error: null,
    message: null,
    loading: false, 
  },
  reducers: {
    requestForAllApplications(state, action) {
      (state.loading = true), (state.error = null);
    },
    successForAllApplications(state, action) {
      (state.loading = false),
        (state.error = null),
        (state.applications = action.payload);
    },
    FailureForAllApplications(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    requestForMyApplications(state, action) {
      (state.loading = true), (state.error = null);
    },
    successForMyApplications(state, action) {
      (state.loading = false),
        (state.error = null),
        (state.applications = action.payload);
    },
    FailureForMyApplications(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    requestForPostApplication(state, action) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    successForPostApplication(state, action) {
      (state.loading = false),
        (state.error = null),
        (state.message = action.payload);
    },
    failureForPostApplication(state, action) {
      (state.loading = false),
        (state.error = action.payload),
        (state.message = null);
    },
    requestForDeleteApplication(state, action) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    successForDeleteApplication(state, action) {
      (state.loading = false),
        (state.error = null),
        (state.message = action.payload);
    },
    failureForDeleteApplication(state, action) {
      (state.loading = false),
        (state.error = action.payload),
        (state.message = null);
    },
    clearAllErrors(state, action) {
      (state.error = null),
        (state.applications = state.applications)
    },
    resetApplicationSlice(state, action) {
      (state.error = null),
        (state.applications = state.applications),

        (state.message = null),
        (state.loading = false);
    },
  },
});


export const DeleteApplications =(id)=>async (dispatch)=>{
  dispatch(applicationSlice.actions.requestForDeleteApplication());
  try {
    const response = await axios.delete(`https://job-api-five.vercel.app/api/V1/application/delete/${id}`,{
      withCredentials:true
    });
    dispatch(applicationSlice.actions.successForDeleteApplication());
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(applicationSlice.actions.failureForDeleteApplication(error.response.data.message));
    
  }
}

export const fetchEmployerApplication = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForAllApplications());
  try {
    const response = await axios.get(
      "https://job-api-five.vercel.app/api/V1/application/employer/getall",
      {
        withCredentials: true,
       
      }
    );
    dispatch(applicationSlice.actions.successForAllApplications(response.data.applications));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(applicationSlice.actions.FailureForAllApplications(error.response.data.message))
  }
};
export const fetchUserApplication = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForMyApplications());
  try {
    const response = await axios.get(
      "https://job-api-five.vercel.app/api/V1/application/jobseeker/getall",
      {
        withCredentials: true,
       
      }
    );
    dispatch(applicationSlice.actions.successForMyApplications(response.data.applications));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(applicationSlice.actions.FailureForMyApplications(error.response.data.message))
  }
};
export const postApplication = (data, JobId) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForPostApplication());
  try {
    const response = await axios.post(
      `https://job-api-five.vercel.app/api/V1/application/post/${JobId}`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(applicationSlice.actions.successForPostApplication(response.data.message));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(applicationSlice.actions.failureForPostApplication(error.response.data.message))
  }
};

export const clearAllApplicationErrors = () => (dispatch) => {
    dispatch(applicationSlice.actions.clearAllErrors());
  };
  
  export const resetApplicationSlice = () => (dispatch) => {
    dispatch(applicationSlice.actions.resetApplicationSlice());
  };

export default applicationSlice.reducer;
