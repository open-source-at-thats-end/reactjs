import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const CACHE_TTL = 60 * (60*3) * 1000; // 3 hours 
export const postHeaderFooterList = createAsyncThunk('HeaderFooterList/postHeaderFooterList',
  async(post={},{getState,rejectWithValue})=>{
  
try {
    const postdata = {
        "module":"headerfooter",
        "action":"getheaderfooter"
    };
    
    if(Object.keys(post).length > 0)
      postdata['filter'] = JSON.stringify(post)
 
    //console.log(postdata);
    let headers = {
       "Content-Type": "application/x-www-form-urlencoded",
    }
    let cacheKey = 'getheader';
    const  {HFcache} = getState().HeaderFooterList;

 if(HFcache != undefined){
      if( post.user_id != undefined)
        cacheKey = post.user_id+'-getheader';
      console.log(cacheKey);

      if (HFcache[cacheKey]) {
        console.log('CACHE KEY EXIST');
        const cachedData = HFcache[cacheKey];
        // Check if the cached data is valid
        if (cachedData && (Date.now() - cachedData.timestamp < CACHE_TTL)) {
          
        console.log('CACHE KEY VALID');
          return { data: cachedData.data, cacheKey, timestamp: cachedData.timestamp };
        }
      }
  }
    //console.log('API CALL INIT');
    const res = await axios.post("https://www.demosite.com/api/index.html",postdata ,{headers});
    return { data: res.data, cacheKey, timestamp: Date.now() }
  }catch(error){
        rejectWithValue(error.res.data)
        console.log('error');
      }
    }
);



export const PostHeaderFooterSlice=createSlice({
    name:"HeaderFooterList",
    initialState:{
      HFOptions:{},
      HFcache:((typeof window !== 'undefined') && localStorage.getItem('HFcache')) ? JSON.parse(localStorage.getItem('HFcache')): {},
      HFLoading:true,
      uID:'',
      IsUserLogged:false,
    },
    reducers:{
      SetUserID: (state, action) => {
        state.uID = ('user_id' in action.payload)?action.payload.user_id:'';
      },
      SetisUserLogin: (state, action) => {
        state.IsUserLogged = ('IsUserLogged' in action.payload)?action.payload.IsUserLogged:false;
      },
    },
    
    extraReducers:(builder)=>{
    builder
      .addCase(postHeaderFooterList.pending, (state, action) => {
        state.HFLoading=true;
    })
     .addCase(postHeaderFooterList.fulfilled, (state, action) => {
        state.HFLoading=false;
        if(typeof action.payload == 'object' &&  'data' in action.payload){
            state.HFOptions=action.payload.data.Result;
            state.HFcache = {[action.payload.cacheKey] : {
            data: action.payload.data,
            timestamp: action.payload.timestamp,
          }
          
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('HFcache', JSON.stringify(state.HFcache));
        }
      }

    })
     .addCase(postHeaderFooterList.rejected, (state, action) => {
        state.HFLoading=false;
    })
  } 
})
export const { SetUserID,SetisUserLogin } = PostHeaderFooterSlice.actions;
export const select_user_Id=(state)=>state.HeaderFooterList.getUserID;
export const select_UserLoggedIn=(state)=>state.HeaderFooterList.isUserLogin
export default PostHeaderFooterSlice.reducer