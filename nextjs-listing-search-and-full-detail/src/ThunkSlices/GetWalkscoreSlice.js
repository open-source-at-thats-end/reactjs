import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const getWalkScore = createAsyncThunk('getscore/getWalkScore',
async(postdata,{rejectWithValue})=>{
 

try {
     /* const postdata = {
            format:"json",
            address:"1119%8th%20Avenue%20Seattle%20WA%2098101",
            lat:"47.6085",
            lon:"-122.3295",
            transit:"1",
            bike:"1",
            wsapikey:"e6d7d750102614fe46b77cf99ebe72d5",
        }  */
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded",
    }
    
   const res = await axios.get(API_URL+"/walkscore",{params:postdata},{headers});
   //console.log("getwalkscore++++++++++++++",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const GetWalkscoreSlice=createSlice({
    name:"getscore",
    initialState:{
    objWalkScore:{},
    scoreloading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(getWalkScore.pending, (state, action) => {
        state.scoreloading=true;
    })
     .addCase(getWalkScore.fulfilled, (state, action) => {
        state.scoreloading=false;
        state.objWalkScore=action.payload;
    })
     .addCase(getWalkScore.rejected, (state, action) => {
        state.scoreloading=false;
    })
  }
})

export default GetWalkscoreSlice.reducer