import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const postZipStatisticList = createAsyncThunk('ZipStcList/postZipStatisticList',
async(postdata={},{rejectWithValue})=>{
 //console.log("++++++++++++++Post zipstatisticList Api+++++++++++");
try {
    const postkey = {
        "key":"ABCDXYZ0011",
       
       };

       postdata={...postdata,...postkey}
       
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
      
       }

      //console.log(headers);
    
   
   const res = await axios.post(API_URL+"/zipstatatics",postdata ,{headers});
   //console.log("zipstc---------------",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const ZipStatisticSlice=createSlice({
    name:"zipStcList",
    initialState:{
      zipStcList:[],
      zipLoading:false,
    },
    reducers:{
      resetZip:(state,action)=> {
        state.zipStcList=[];
        state.zipLoading=false;
      },
    },
    extraReducers:(builder)=>{
    builder
      .addCase(postZipStatisticList.pending, (state, action) => {
        state.zipLoading=true;
     })
     .addCase(postZipStatisticList.fulfilled, (state, action) => {
         state.zipLoading=false;
         state.zipStcList = action.payload;
         //console.log(prepareData);
     })
     .addCase(postZipStatisticList.rejected, (state, action) => {
        state.zipLoading=false;
      
     })
    }
})
export const { resetZip } = ZipStatisticSlice.actions;
export default ZipStatisticSlice.reducer