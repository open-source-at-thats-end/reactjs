import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const postRemoveFavourite = createAsyncThunk('removefavList/postRemoveFavourite',
async(data,{rejectWithValue})=>{
 


try {
    const postdata = {
        "key":"ABCDXYZ0011",
        "module":"user",
        "action":"managefavorite",
    };
    if(Object.keys(data).length > 0)
    postdata['filter']=JSON.stringify(data)
    //console.log(postdata);
 
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
      
    }

   const res = await axios.post("https://www.demosite.com/api/index.html",postdata ,{headers});
   //console.log("Removefavlist---------------",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const PostRemoveFavSlice=createSlice({
    name:"removefavList",
    initialState:{
    Removefav:[],
    RMLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(postRemoveFavourite.pending, (state, action) => {
        state.RMLoading=true;
    })
     .addCase(postRemoveFavourite.fulfilled, (state, action) => {
        state.RMLoading=false;
        state.Removefav=action.payload;
    })
     .addCase(postRemoveFavourite.rejected, (state, action) => {
       
        state.RMLoading=false;
    })
  }
})

export default PostRemoveFavSlice.reducer