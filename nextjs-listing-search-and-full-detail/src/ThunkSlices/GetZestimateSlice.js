import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getZestimateList = createAsyncThunk('getzestimate/getZestimateList',
async(postdata,{rejectWithValue})=>{
 

try {
   /*  const postdata = {
        "access_token":"20f191c2e280cf0480aa8be72f021d88",
        "address":"5+Harborage+Isle"
    }; */
    
 
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
    }
    
   const res = await axios.get("https://api.bridgedataoutput.com/api/v2/zestimates_v2/zestimate",{params:postdata},{headers});
   //console.log("getzestimatelist++++++++++++++",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const GetZestimateSlice=createSlice({
    name:"getzestimate",
    initialState:{
    Objzestmate:{},
    zestLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(getZestimateList.pending, (state, action) => {
        state.zestLoading=true;
    })
     .addCase(getZestimateList.fulfilled, (state, action) => {
        state.zestLoading=false;
        state.Objzestmate=action.payload;
    })
     .addCase(getZestimateList.rejected, (state, action) => {
        state.zestLoading=false;
    })
  }
})

export default GetZestimateSlice.reducer