import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const getCityList = createAsyncThunk('getcity/getCityList',
async(_,{rejectWithValue})=>{
 

try {
    const postdata = {
        "key":"ABCDXYZ0011"
    };
    
 
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
    }
    
   const res = await axios.get(API_URL+"/cities",{params:postdata},{headers});
   //console.log("getcitylist++++++++++++++",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const getCityListSlice=createSlice({
    name:"getcity",
    initialState:{
    cityList:[],
    ctLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(getCityList.pending, (state, action) => {
        state.ctLoading=true;
    })
     .addCase(getCityList.fulfilled, (state, action) => {
        state.ctLoading=false;
        state.cityList=action.payload;
    })
     .addCase(getCityList.rejected, (state, action) => {
        state.ctLoading=false;
    })
  }
})

export default getCityListSlice.reducer