import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const postOfficeIDList = createAsyncThunk('pIDList/postOfficeIDList',
async(ID,{rejectWithValue})=>{
 
try {

    const postdata = {
        "key":"ABCDXYZ0011",
        "id":ID,
        //"field":["page_content","page_browser_title","page_meta_keyword"," page_meta_desc"]
     
    };
 
 
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
      
    }

   const res = await axios.post(API_URL+"/page",postdata ,{headers});
   //console.log("OfficeID---------------",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const PageIDSlice=createSlice({
    name:"pIDList",
    initialState:{
    objPage:{},
    idLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(postOfficeIDList.pending, (state, action) => {
        state.idLoading=true;
    })
     .addCase(postOfficeIDList.fulfilled, (state, action) => {
        state.idLoading=false;
        state.objPage=action.payload;
    })
     .addCase(postOfficeIDList.rejected, (state, action) => {
       
        state.idLoading=false;
    })
  }
})

export default PageIDSlice.reducer