import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const postDelPropList = createAsyncThunk('deleleprop/postDelPropList',
async(postData,{rejectWithValue})=>{

   try {
      const postdata = {
          "key":"ABCDXYZ0011",
       
      };
      let post={...postdata,...postData}
   console.log(post);
      let headers = {
         "Content-Type": "application/x-www-form-urlencoded"
      }
  
     const res = await axios.post(API_URL+"/offmarket-details/",post,{headers});
     //console.log("postdeletedProp---------------",(res.data));
      return (res.data)
      }catch(error){
          rejectWithValue(error.res.data)
          console.log('error');
        }
      
});

export const PostDeletedPropSlice=createSlice({
    name:"deleleprop",
    initialState:{
    objDelProp:{},
    delLoading:true,
    },
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(postDelPropList.pending, (state, action) => {
         //state.delLoading=true;
      })
      .addCase(postDelPropList.fulfilled, (state, action) => {
         state.delLoading=false;
         state.objDelProp = action.payload;
      })
      .addCase(postDelPropList.rejected, (state, action) => {
         state.delLoading=false;
      });
  }
})

export default PostDeletedPropSlice.reducer