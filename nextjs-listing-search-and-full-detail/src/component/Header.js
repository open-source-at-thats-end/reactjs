"use client"
import React,{useRef,useEffect,useState,useMemo} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import parse from 'html-react-parser';
import { postHeaderFooterList } from '../ThunkSlices/PostHeaderFooterSlice';

function Header() {
    const dispatch = useDispatch();
    const[userId,setUserId]=useState(Cookies.get('_ul'));
    const {HFOptions,HFLoading,}=useSelector((state)=>state.HeaderFooterList);
    //useMemo(() => postHeaderFooterList(), []);


    useEffect(() => {
         var uID = Cookies.get('_ul');
       
         if(uID != undefined){
            setTimeout(() => {
                dispatch(postHeaderFooterList({IsUserLogged:true, user_id:uID}));
             setUserId(uID) 
            }, 500);
            
         }else{
             dispatch(postHeaderFooterList());
         }
       
     },[Cookies.get('_ul'), userId]);

 

  return (
    <>
    {('header' in HFOptions  && Object.keys(HFOptions.header).length > 0) ? parse(HFOptions.header.toString()) :""}
     </>
  )
}

export default Header
