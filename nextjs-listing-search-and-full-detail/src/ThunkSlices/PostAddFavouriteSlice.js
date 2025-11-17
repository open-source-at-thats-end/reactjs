import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const postAddToFavourite = createAsyncThunk('addToFavouriteList/postAddToFavourite',
async(pdata,{rejectWithValue})=>{
 


try {
    const postdata = {
        "key":"ABCDXYZ0011",
        "module":"user",
        "action":"managefavorite",
     
    };

    console.log(pdata);
    if(Object.keys(pdata).length > 0)
    postdata['filter']=JSON.stringify(pdata)
    //console.log(postdata);
 
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
      
    }

   const res = await axios.post("https://www.demosite.com/api/index.html",postdata ,{headers});
   //console.log("favouritelist---------------",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const PostAddFavouriteSlice=createSlice({
    name:"addToFavouriteList",
    initialState:{
    favouriteList:[],
    favLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(postAddToFavourite.pending, (state, action) => {
        state.favLoading=true;
    })
     .addCase(postAddToFavourite.fulfilled, (state, action) => {
        state.favLoading=false;
        state.favouriteList=action.payload;
    })
     .addCase(postAddToFavourite.rejected, (state, action) => {
       
        state.favLoading=false;
    })
  }
})

export default PostAddFavouriteSlice.reducer