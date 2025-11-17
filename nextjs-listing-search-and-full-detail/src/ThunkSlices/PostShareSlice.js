import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const postShare = createAsyncThunk('shareForm/postShare',
async(postData,{rejectWithValue})=>{
 

try {
    const postdata = {
        "key":"ABCDXYZ0011",
      /*   "lead_first_name":"mansi",
        "lead_email":"fdfd@fgf.com",
        "lead_comment":"fghfyhfgjghj", */
     
    };
    let post={...postdata,...postData}
    //console.log(postdata);
 
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
    }

   const res = await axios.post(API_URL+"/share-prop",post ,{headers});
   console.log("share---------------",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const PostShareSlice=createSlice({
    name:"shareForm",
    initialState:{
    objShare:{},
    shareLoading:false,
    },
    reducers:{
      resetObjshare:(state,action)=> {
        state.objShare={};
        state.shareLoading=false;
      },
    },
    extraReducers:(builder)=>{
    builder
      .addCase(postShare.pending, (state, action) => {
        state.shareLoading=true;
    })
     .addCase(postShare.fulfilled, (state, action) => {
        state.shareLoading=false;
        state.objShare=action.payload;
    })
     .addCase(postShare.rejected, (state, action) => {
        state.shareLoading=false;
    })
  }
})
export const { resetObjshare } = PostShareSlice.actions;
export default PostShareSlice.reducer