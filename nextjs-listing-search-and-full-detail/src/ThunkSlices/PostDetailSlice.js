import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";
import { APIMaster } from "../APIMaster";
import { APISiimilarProp } from "../APISiimilarProp";
import {ApiSimilarAction} from '../ApiSimilarAction'

export const postDetailList = createAsyncThunk('detailData/postDetailList',
async(lKey,{rejectWithValue})=>{
 
try {
    const postdata = {
        "key":"ABCDXYZ0011",
    };
    //let data = {...postdata,...lKey}
  
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
    }

   //const res = await axios.post(API_URL+"/property-details/",data ,{headers});
   //console.log("detailList---------------",(res.data));
    return (lKey)
    }catch(error){
        rejectWithValue(error.res.data)
        //console.log('error');
      }
    }
);
export const simProp = createAsyncThunk('detailData/simProp',
async(objFilter,{rejectWithValue})=>{
  let objAPI = new APISiimilarProp();
  return await objAPI.getListingbyParam(objFilter)
});
export const simPropType = createAsyncThunk('detailData/simPropType',
async(objFilter,{rejectWithValue})=>{
  let objAPI = new APISiimilarProp();
  return await objAPI.getListingbyParam(objFilter)
});
 export const simPropPrice = createAsyncThunk('detailData/simPropPrice',
async(objFilter,{rejectWithValue})=>{
  let objAPI = new APISiimilarProp();
  return await objAPI.getListingbyParam(objFilter)
});
export const simPropZip = createAsyncThunk('detailData/simPropZip',
async(objFilter,{rejectWithValue})=>{
  let objAPI = new APISiimilarProp();
  return await objAPI.getListingbyParam(objFilter)
});
export const simPropSold = createAsyncThunk('detailData/simPropSold',
async(objFilter,{rejectWithValue})=>{
  let objAPI = new APISiimilarProp();
  return await objAPI.getListingbyParam(objFilter)
});
export const simPropAction = createAsyncThunk('detailData/simPropAction',
async(objFilter,{rejectWithValue})=>{
  let objAPI = new ApiSimilarAction();
  return await objAPI.getListingbyParamActiom(objFilter)
});

export const PostDetailSlice=createSlice({
    name:"detailData",
    initialState:{
    detailObj:{},
    objContact:{},
    listSimProp:[],
    listSimPropByPrice:[],
    listSimPropByType:[],
    listSimPropByZip:[],
    listSimPropForSold:[],
    listSimPropByAction:[],
    dLoading:true,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
    .addCase(postDetailList.pending, (state, action) => {
        //state.dLoading=true;
    })
    .addCase(postDetailList.fulfilled, (state, action) =>  {
        state.dLoading=false;
        state.detailObj=action.payload;
    })
    .addCase(postDetailList.rejected, (state, action) => {
      //console.log('rejected');
        state.dLoading=false;
    })

    builder
    .addCase(simProp.pending, (state, action) => {
      // state.dLoading=true;
    })
    .addCase(simProp.fulfilled, (state, action) => {
       //state.dLoading=false;
       state.listSimProp = action.payload;
    })
    .addCase(simProp.rejected, (state, action) => {
       //state.dLoading=false;
    }); 

    builder
    .addCase(simPropType.pending, (state, action) => {
      // state.dLoading=true;
    })
    .addCase(simPropType.fulfilled, (state, action) => {
      //console.log('===>>>>>>>>>>>>TYPE<<<<<<<<<<<<<===');
      if(action.payload == undefined){
        //state.dLoading = false; 
        return;
      }
       if((action.payload).length >0)
        state.listSimPropByType = action.payload
    })
    .addCase(simPropType.rejected, (state, action) => {
      // state.dLoading=false;
    });
  
    builder
    .addCase(simPropPrice.pending, (state, action) => {
       //state.dLoading=true;
    })
    .addCase(simPropPrice.fulfilled, (state, action) => {
      //console.log('===>>>>>>>>>>>>simPropPrice<<<<<<<<<<<<<===');
       //state.dLoading=false;
       if( action.payload !=undefined && (action.payload).length >0)
        state.listSimPropByPrice = action.payload;
    })
    .addCase(simPropPrice.rejected, (state, action) => {
       //state.dLoading=false;
    });

   builder
    .addCase(simPropZip.pending, (state, action) => {
       //state.dLoading=true;
    })
    .addCase(simPropZip.fulfilled, (state, action) => {
      
      //console.log('===>>>>>>>>>>>>ZIPCODE<<<<<<<<<<<<<===');
       //state.dLoading=false;
       if(action.payload != undefined && (action.payload).length > 0)
        state.listSimPropByZip = action.payload;
    })
    .addCase(simPropZip.rejected, (state, action) => {
       //state.dLoading=false;
    });  
  
    builder
    .addCase(simPropSold.pending, (state, action) => {
       //state.dLoading=true;
    })
    .addCase(simPropSold.fulfilled, (state, action) => {
       //state.dLoading=false;
       if(action.payload != undefined && (action.payload).length > 0)
       state.listSimPropForSold = action.payload;
    })
    .addCase(simPropSold.rejected, (state, action) => {
       //state.dLoading=false;
    }); 
  

    builder
    .addCase(simPropAction.pending, (state, action) => {
       //state.dLoading=true;
    })
    .addCase(simPropAction.fulfilled, (state, action) => {
       //state.dLoading=false;
       if(action.payload != undefined && (action.payload).length > 0)
       state.listSimPropByAction = action.payload;
    })
    .addCase(simPropAction.rejected, (state, action) => {
       //state.dLoading=false;
    }); 
  
  
  }
})

export default PostDetailSlice.reducer