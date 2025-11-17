import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const postContact = createAsyncThunk('checkavailability/postContact',
async(postData,{rejectWithValue})=>{

   try {
      const postdata = {
          "key":"ABCDXYZ0011",
       
      };
      let post={...postdata,...postData}
   
      let headers = {
         "Content-Type": "application/x-www-form-urlencoded"
      }
  
     const res = await axios.post(API_URL+"/contact-form",post ,{headers});
     console.log("postcontact---------------",(res.data));
      return (res.data)
      }catch(error){
          rejectWithValue(error.res.data)
          console.log('error');
        }
      
});

export const PostContactSlice=createSlice({
    name:"checkavailability",
    initialState:{
    objContact:{},
    dLoading:false,
    },
    reducers:{
      resetobjContact:(state,action)=> {
         state.objContact={};
         state.dLoading=false;
       },
    },
    extraReducers:(builder)=>{
      builder
      .addCase(postContact.pending, (state, action) => {

         state.dLoading=true;
      })
      .addCase(postContact.fulfilled, (state, action) => {
         state.dLoading=false;
         state.objContact = action.payload;
         
      })
      .addCase(postContact.rejected, (state, action) => {
         state.dLoading=false;
      });
  }
})
export const { resetobjContact } = PostContactSlice.actions;
export default PostContactSlice.reducer