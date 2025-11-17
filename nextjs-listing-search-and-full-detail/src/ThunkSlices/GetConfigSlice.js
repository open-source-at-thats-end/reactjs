import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const getConfigList = createAsyncThunk('getconfig/getConfigList',
async(_,{rejectWithValue})=>{
 

try {
    const postdata = {
        "key":"ABCDXYZ0011"
    };
    
 
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
    }
    
   const res = await axios.get(API_URL+"/config",{params:postdata},{headers});
   //console.log("getconfiglist++++++++++++++",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const GetConfigSlice=createSlice({
    name:"getconfig",
    initialState:{
    configObj:{},
    cnfgLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(getConfigList.pending, (state, action) => {
        state.cnfgLoading=true;
    })
     .addCase(getConfigList.fulfilled, (state, action) => {
        state.cnfgLoading=false;
        state.configObj=action.payload;
    })
     .addCase(getConfigList.rejected, (state, action) => {
        state.cnfgLoading=false;
    })
  }
})

export default GetConfigSlice.reducer