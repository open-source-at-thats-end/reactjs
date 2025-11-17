import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getCoordinates = createAsyncThunk('getcoord/getCoordinates',
async(postdata,{rejectWithValue})=>{
 

try {
    
    
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
    }
    
   const res = await axios.get("https://maps.googleapis.com/maps/api/geocode/json",{params:postdata},{headers});
   //console.log("getcoordinates++++++++++++++",(res.data.results));
    return (res.data.results)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const GetLanLongSlice=createSlice({
    name:"getcoord",
    initialState:{
    Arrlatlng:[],
    latloading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(getCoordinates.pending, (state, action) => {
        state.latloading=true;
    })
     .addCase(getCoordinates.fulfilled, (state, action) => {
        state.latloading=false;
        state.Arrlatlng=action.payload;
    })
     .addCase(getCoordinates.rejected, (state, action) => {
        state.latloading=false;
    })
  }
})

export default GetLanLongSlice.reducer