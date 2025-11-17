import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";

export const postAutoSearchList = createAsyncThunk('AutoSearchList/postAutoSearchList',
async(Keyword,{rejectWithValue})=>{
 //console.log("++++++++++++++Post AutosearchList Api+++++++++++");

try {
    const postdata = {
        "key":"ABCDXYZ0011",
        "keywords":Keyword
       };

   
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
      
       }

   
   const res = await axios.post(API_URL+"/autosuggetion",postdata ,{headers});
   //console.log("serchlist---------------",(res.data));
    return (res.data)
    }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);

export const AutoSearchSlice=createSlice({
    name:"AutoSearchList",
    initialState:{
      Searchlist:[],
      optionGrp: [],
      SearchLoading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(postAutoSearchList.pending, (state, action) => {
        state.SearchLoading=true;
     })
     .addCase(postAutoSearchList.fulfilled, (state, action) => {
         state.SearchLoading=false;
         /* var prepareData = {};
        let optgroupOrder= ['cs','sub', 'zip', 'address', 'mls', 'area', 'bn']
         if(Array.isArray(action.payload) && action.payload.length > 0){
            action.payload.map((item,i)=>{ 
               //console.log(item);
               if(optgroupOrder.indexOf(item) < 0){
              if(!(item.type in prepareData)){
               
                  var gTitle = (item.type === 'cs')?'CITIES':(item.type === 'sub')?'NEIGHBOURHOODS':(item.type === 'zip')?'ZIPCODE':(item.type === 'address')?'Address':(item.type === 'mls')?'MLS #':(item.type === 'area')?'AREA':(item.type === 'bn')?'BUILDING NAME':"Address";
                
                  prepareData[item.type] = {
                     title:gTitle,
                     cType:item.g_title,
                     options:[item.title],
                  }
               }else{
                  prepareData[item.type]['options'].push(item.title)
               }
               //return prepareData;
          } })
         } */
         state.optionGrp = action.payload;
     })
     .addCase(postAutoSearchList.rejected, (state, action) => {
        state.SearchLoading=false;
      
     })
    }
})

export default AutoSearchSlice.reducer