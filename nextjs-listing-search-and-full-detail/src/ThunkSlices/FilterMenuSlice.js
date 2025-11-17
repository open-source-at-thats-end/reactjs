import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const postMenuFilterList = createAsyncThunk('MenuFilterList/postMenuFilterList',
async(_,{rejectWithValue})=>{
 //console.log("++++++++++++++Post filterlist Api+++++++++++");


try {
    const postdata = {
        "key":"ABCDXYZ0011",
    };

 
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded",
  
    }

   const res = await axios.post(API_URL+"/filterOption",postdata ,{headers});
   //console.log("filterlist---------------",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const FilterMenuSlice=createSlice({
    name:"MenuFilterList",
    initialState:{
    filtersOptions:[],
    filterLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(postMenuFilterList.pending, (state, action) => {
        state.filterLoading=true;
    })
     .addCase(postMenuFilterList.fulfilled, (state, action) => {
       
        state.filterLoading=false;
        state.filtersOptions=action.payload;
    })
     .addCase(postMenuFilterList.rejected, (state, action) => {
       
        state.filterLoading=false;
    })
  }
})

export default FilterMenuSlice.reducer