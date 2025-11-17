import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getSaveSerchList = createAsyncThunk('getsave/getSaveSerchList',
async(pdata,{rejectWithValue})=>{
 

try {
    const postdata = {
        "key":"e655785894fde4dcd1c610d0a722e5bc",
        "module":"user",
        "action":"getsavesearch",
     
    };
    if(Object.keys(pdata).length > 0)
    postdata['filter']=JSON.stringify(pdata)
    console.log(postdata);
 
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
      
    }

   const res = await axios.post("https://www.demosite.com/api/index.html",postdata ,{headers});
   //console.log("getsavelist++++++++++++++",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const GetSaveSearchSlice=createSlice({
    name:"getsave",
    initialState:{
    savedList:[],
    saveLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(getSaveSerchList.pending, (state, action) => {
        state.saveLoading=true;
    })
     .addCase(getSaveSerchList.fulfilled, (state, action) => {
        state.saveLoading=false;
        state.savedList=action.payload;
    })
     .addCase(getSaveSerchList.rejected, (state, action) => {
        state.saveLoading=false;
    })
  }
})

export default GetSaveSearchSlice.reducer