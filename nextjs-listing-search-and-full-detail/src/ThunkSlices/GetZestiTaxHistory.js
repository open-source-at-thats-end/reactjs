import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getZestimateTaxList = createAsyncThunk('getzestimatetax/getZestimateTaxList',
async(postdata,{rejectWithValue})=>{
 

try {
   /*  const postdata = {
        "access_token":"20f191c2e280cf0480aa8be72f021d88",
        "address":"5+Harborage+Isle"
    }; */
    
 
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
    }
    
   const res = await axios.get("https://api.bridgedataoutput.com/api/v2/pub/assessments",{params:postdata},{headers});
   //console.log("getZestimateTaxList++++++++++++++",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const GetZestiTaxHistory=createSlice({
    name:"getzestimatetax",
    initialState:{
    arrZestax:[],
    taxLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(getZestimateTaxList.pending, (state, action) => {
        state.taxLoading=true;
    })
     .addCase(getZestimateTaxList.fulfilled, (state, action) => {
        state.taxLoading=false;
        state.arrZestax=action.payload;
    })
     .addCase(getZestimateTaxList.rejected, (state, action) => {
        state.taxLoading=false;
    })
  }
})

export default GetZestiTaxHistory.reducer