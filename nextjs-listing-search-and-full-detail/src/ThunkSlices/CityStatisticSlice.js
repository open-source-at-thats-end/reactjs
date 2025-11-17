import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const postCityStatatics = createAsyncThunk('cityStcList/postCityStatatics',
async(postdata,{rejectWithValue})=>{
//console.log("++++++++++++++Post citystatstict Api+++++++++++");


try {
    const postkey = {
        "key":"ABCDXYZ0011",
       };
      //console.log(postdata);
     postdata={...postdata,...postkey}
     
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
      }

     // console.log(postdata);
    
   
   const res = await axios.post(API_URL+"/citystatatics",postdata ,{headers});
   //console.log("citystc---------------",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const CityStatisticSlice=createSlice({
    name:"cityStcList",
    initialState:{
      cityStcList:[],
      cityLoading:false,
    },
    reducers:{
      resetCity:(state,action)=> {
        state.cityStcList=[];
      state.cityLoading=false;
      },
    },
    extraReducers:(builder)=>{
    builder
      .addCase(postCityStatatics.pending, (state, action) => {
        state.cityLoading=true;
     })
     .addCase(postCityStatatics.fulfilled, (state, action) => {
         state.cityLoading=false;
         state.cityStcList = action.payload;
         //console.log(prepareData);
     })
     .addCase(postCityStatatics.rejected, (state, action) => {
        state.cityLoading=false;
      
     })
    }
})
export const { resetCity } = CityStatisticSlice.actions;
export default CityStatisticSlice.reducer