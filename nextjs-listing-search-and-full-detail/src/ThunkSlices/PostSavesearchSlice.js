import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const postSaveSerchList = createAsyncThunk('saveSearch/postSaveSerchList',
async(pdata,{rejectWithValue})=>{
 

try {
    const postdata = {
        "key":"ABCDXYZ0011",
        "module":"user",
        "action":"savesearch",
     
    };
    if(Object.keys(pdata).length > 0)
    postdata['filter']=JSON.stringify(pdata)
    //console.log(postdata);
 
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
      
    }

   const res = await axios.post("https://www.demosite.com/api/index.html",postdata ,{headers});
   //console.log("saveSearch---------------",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const PostSavesearchSlice=createSlice({
    name:"saveSearch",
    initialState:{
    saveSerchList:[],
    searchLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(postSaveSerchList.pending, (state, action) => {
        state.searchLoading=true;
    })
     .addCase(postSaveSerchList.fulfilled, (state, action) => {
        state.searchLoading=false;
        state.saveSerchList=action.payload;
    })
     .addCase(postSaveSerchList.rejected, (state, action) => {
        state.searchLoading=false;
    })
  }
})

export default PostSavesearchSlice.reducer