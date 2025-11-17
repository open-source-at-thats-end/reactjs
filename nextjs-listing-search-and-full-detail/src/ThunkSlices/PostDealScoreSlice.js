import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const postDealScore = createAsyncThunk('dealscore/postDealScore',
async(postData,{rejectWithValue})=>{

   try {
      const postdata = {
          "key":"ABCDXYZ0011",
       
      };
      
      let post={...postdata,...postData}
   
      let headers = {
         "Content-Type": "application/x-www-form-urlencoded"
      }
  
     const res = await axios.post(API_URL+"/dealscoredata",post ,{headers}); //dealscore
     //console.log("postDealScore---------------",(res.data));
      return (res.data)
      }catch(error){
          rejectWithValue(error.res.data)
          console.log('error');
        }
      
});

export const PostDealScoreSlice=createSlice({
    name:"dealscore",
    initialState:{
    propertyScore:"",
    scoreLoading:false,
    },
    reducers:{
    },
    extraReducers:(builder)=>{
      builder
      .addCase(postDealScore.pending, (state, action) => {

         state.scoreLoading=true;
      })
      .addCase(postDealScore.fulfilled, (state, action) => {
         state.scoreLoading=false;
         state.propertyScore = action.payload;
         
      })
      .addCase(postDealScore.rejected, (state, action) => {
         state.scoreLoading=false;
      });
  }
})
export default PostDealScoreSlice.reducer