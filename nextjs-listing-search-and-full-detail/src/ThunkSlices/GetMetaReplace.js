import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const getMeta = createAsyncThunk('getmetareplace/getMeta',
async(postdata,{rejectWithValue})=>{
 

try {
    
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
    }
    
   const res = await axios.get(API_URL+"/metareplace",{params:postdata},{headers});
   console.log("getmetareplace++++++++++++++",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const GetMetaReplace=createSlice({
    name:"getmetareplace",
    initialState:{
    strMeta:"",
    metaloading:true    
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(getMeta.pending, (state, action) => {
        state.metaloading=true;
    })
     .addCase(getMeta.fulfilled, (state, action) => {
        state.metaloading=false;
        state.strMeta=action.payload;
    })
     .addCase(getMeta.rejected, (state, action) => {
        state.metaloading=false;
    })
  }
})

export default GetMetaReplace.reducer