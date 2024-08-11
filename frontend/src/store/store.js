import {configureStore} from "@reduxjs/toolkit"
import jobReducer from "./slices/jobSlice"
import userReducer from "./slices/userSlice"
import applicationSlice from "./slices/applicationSlice"

const store = configureStore({
    reducer:{
        jobs: jobReducer,
        user: userReducer,
        application : applicationSlice
    },
});

export default store;