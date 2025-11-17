import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getFavouriteList = createAsyncThunk('FavouritesList/getFavouriteList',
async(post={},{rejectWithValue})=>{
 


try {
    const postdata = {
        "key":"e655785894fde4dcd1c610d0a722e5bc",
        "module":"user",
        "action":"getuserfavorite",
        "test1":"true",
       
    };
    if(Object.keys(post).length > 0)
    postdata['filter']=JSON.stringify(post)
    //console.log(postdata);
 
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
      
    }

   const res = await axios.get("https://www.demosite.com/api/index.html",{params:postdata},{headers});
   //console.log("getfavlist---------------",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error',error.res.data);
      }
    }
);

export const GetFavouriteSlice=createSlice({
    name:"FavouritesList",
    initialState:{
      favDataObj:{},
      fLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(getFavouriteList.pending, (state, action) => {
        state.fLoading=true;
    })
     .addCase(getFavouriteList.fulfilled, (state, action) => {
      //console.log(action.payload.Result);
        state.fLoading=false;
        state.favDataObj=action.payload.Result;
    })
     .addCase(getFavouriteList.rejected, (state, action) => {
       
        state.fLoading=false;
    })
  }
})

export default GetFavouriteSlice.reducer