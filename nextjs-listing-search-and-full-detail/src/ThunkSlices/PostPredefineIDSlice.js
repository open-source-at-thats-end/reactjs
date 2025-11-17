import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const postPredefineIDList = createAsyncThunk('predefID/postPredefineIDList',
async(ID,{rejectWithValue})=>{
 
try {

    const postdata = {
        "key":"ABCDXYZ0011",
        "pid":ID,
     
    };
 
 
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
      
    }

   const res = await axios.post(API_URL+"/predefineId",postdata ,{headers});
   //console.log("predefID---------------",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const PostPredefineIDSlice=createSlice({
    name:"predefID",
    initialState:{
    objPredefID:{},
    pidLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(postPredefineIDList.pending, (state, action) => {
        state.pidLoading=true;
    })
     .addCase(postPredefineIDList.fulfilled, (state, action) => {
        state.pidLoading=false;
        state.objPredefID=action.payload;
    })
     .addCase(postPredefineIDList.rejected, (state, action) => {
       
        state.pidLoading=false;
    })
  }
})

export default PostPredefineIDSlice.reducer