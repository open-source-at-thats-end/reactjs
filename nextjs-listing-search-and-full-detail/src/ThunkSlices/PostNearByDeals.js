import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIMaster } from "../APIMaster";


export const postNearbyDealsList = createAsyncThunk(
  'nearbyDeals/postNearbyDealsList',
  async(objFilter, { signal })=>{
    var objAPI = new APIMaster();
    return objAPI.getListingbyParam(objFilter)
  }
);

export const PostNearByDeals=createSlice({
    name:"nearbyDeals",
    initialState:{
    arrNearby:[],
    nearbyLoading:true,
    totalProperties:''
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
    .addCase(postNearbyDealsList.pending, (state, action) => {
        state.nearbyLoading=true;
    })
    .addCase(postNearbyDealsList.fulfilled, (state, action) =>  {
        state.nearbyLoading=false;
        state.arrNearby=action.payload.resdata;
        state.totalProperties=action.payload.total_record;
    })
    .addCase(postNearbyDealsList.rejected, (state, action) => {
        state.nearbyLoading=false;
    })

  }
})

export default PostNearByDeals.reducer