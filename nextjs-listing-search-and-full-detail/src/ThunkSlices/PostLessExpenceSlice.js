import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const postLessExpensePrice = createAsyncThunk('lessexpenseprice/postLessExpensePrice',
async(postData,{rejectWithValue})=>{

   try {
      const postdata = {
          "key":"ABCDXYZ0011",
       
      };
      let post={...postdata,...postData}
   
      let headers = {
         "Content-Type": "application/x-www-form-urlencoded"
      }
  
     const res = await axios.post(API_URL+"/lessExpensivePrices",post,{headers});
     //console.log("postlessexpensiveprice---------------",(res.data));
      return (res.data)
      }catch(error){
          rejectWithValue(error.res.data)
          console.log('error');
        }
      
});

export const PostLessExpenceSlice=createSlice({
    name:"lessexpenseprice",
    initialState:{
    lessExpensivePrice:{},
    leLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(postLessExpensePrice.pending, (state, action) => {
         state.leLoading=true;
      })
      .addCase(postLessExpensePrice.fulfilled, (state, action) => {
         state.leLoading=false;
         state.lessExpensivePrice = action.payload;
      })
      .addCase(postLessExpensePrice.rejected, (state, action) => {
         state.leLoading=false;
      });
  }
})

export default PostLessExpenceSlice.reducer