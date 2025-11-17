import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const postRebatePriceList = createAsyncThunk('rebateCalprice/postRebatePriceList',
async(postData,{rejectWithValue})=>{

   try {
      const postdata = {
          "key":"ABCDXYZ0011",
       
      };
      let post={...postdata,...postData}
   
      let headers = {
         "Content-Type": "application/x-www-form-urlencoded"
      }
  
     const res = await axios.post(API_URL+"/rebatecalculator",post,{headers});
     //console.log("postrebatecal---------------",(res.data));
      return (res.data)
      }catch(error){
          rejectWithValue(error.res.data)
          console.log('error');
        }
      
});

export const PostRebatecalslice=createSlice({
    name:"rebateCalprice",
    initialState:{
    rebatePrice:{},
    rebLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(postRebatePriceList.pending, (state, action) => {
         state.rebLoading=true;
      })
      .addCase(postRebatePriceList.fulfilled, (state, action) => {
         state.rebLoading=false;
         state.rebatePrice = action.payload;
      })
      .addCase(postRebatePriceList.rejected, (state, action) => {
         state.rebLoading=false;
      });
  }
})

export default PostRebatecalslice.reducer