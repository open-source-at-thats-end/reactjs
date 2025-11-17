import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const postDOMSold = createAsyncThunk('domSold/postDOMSold',
async(postData,{rejectWithValue})=>{

   try {
      const postdata = {
          "key":"ABCDXYZ0011",
       
      };
      let post={...postdata,...postData}
      let headers = {
         "Content-Type": "application/x-www-form-urlencoded"
      }
  
     const res = await axios.post(API_URL+"/daysonmarketsold",post,{headers});
     //console.log("postdomdays---------------",(res.data));
      return (res.data)
      }catch(error){
          rejectWithValue(error.res.data)
          console.log('error');
        }
      
});

export const postDOMSoldSlice=createSlice({
    name:"domSold",
    initialState:{
    DaysSold:{},
    daysLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(postDOMSold.pending, (state, action) => {
         state.daysLoading=true;
      })
      .addCase(postDOMSold.fulfilled, (state, action) => {
         state.daysLoading=false;
         state.DaysSold = action.payload;
      })
      .addCase(postDOMSold.rejected, (state, action) => {
         state.daysLoading=false;
      });
  }
})

export default postDOMSoldSlice.reducer