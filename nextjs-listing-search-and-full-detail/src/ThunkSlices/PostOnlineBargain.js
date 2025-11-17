import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const postOnlineBargainList = createAsyncThunk('onlineBargain/postOnlineBargain',
async(postData,{rejectWithValue})=>{

   try {
      const postdata = {
          "key":"ABCDXYZ0011",
       
      };
      let post={...postdata,...postData}
   
      let headers = {
         "Content-Type": "application/x-www-form-urlencoded"
      }
  
     const res = await axios.post(API_URL+"/onlinebargain",post ,{headers});
     console.log("postonlinebargain---------------",(res.data));
      return (res.data)
      }catch(error){
          rejectWithValue(error.res.data)
          console.log('error');
        }
      
});

export const PostOnlineBargain=createSlice({
    name:"onlineBargain",
    initialState:{
    objBargain:{},
    loadingBargain:false,
    },
    reducers:{
      resetObjBargain:(state,action)=> {
         state.objBargain={};
         state.loadingBargain=false;
       },
    },
    extraReducers:(builder)=>{
      builder
      .addCase(postOnlineBargainList.pending, (state, action) => {

         state.loadingBargain=true;
      })
      .addCase(postOnlineBargainList.fulfilled, (state, action) => {
         state.loadingBargain=false;
         state.objBargain = action.payload;
         
      })
      .addCase(postOnlineBargainList.rejected, (state, action) => {
         state.loadingBargain=false;
      });
  }
})
export const { resetObjBargain } = PostOnlineBargain.actions;
export default PostOnlineBargain.reducer