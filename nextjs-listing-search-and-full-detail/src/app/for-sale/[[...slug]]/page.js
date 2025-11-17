'use server'
import React from 'react'
import {ClientPage} from './mainpage';
import { Utility } from '../../../Utility';
import axios from 'axios';
let Hosturl="https://www.demosite.com/";

import { PROP_URL, capitalize } from '../../../constant';
const API_URL = 'https://api.demosite.com';

export async function getData(filterObj) {
  try {
    const postdata = {
      "key":"ABCDXYZ0011",
      "limit":600,
      "getcountonly":"true"
    };
      let data;

      if(filterObj !==undefined && (filterObj['addtype'] === 'mls' || filterObj['addtype'] === 'add' || filterObj['mlslist']) 
                                && ((filterObj['addtype'] != '' && filterObj['addtype']) || (filterObj['mlslist'] !="" && filterObj['mlslist']))){
      let obj = {
                  "addval":filterObj["addval"] ? filterObj["addval"]:null, 
                  "addtype":filterObj["addtype"] ? filterObj["addtype"]:null,
                  "vt":filterObj["vt"] ? filterObj["vt"]:"map", 
                  "page_size":filterObj["page_size"] ? filterObj["page_size"]:1, 
                  "getMapData":filterObj["getMapData"] ? filterObj["getMapData"]:true,
                  "start_record":filterObj["start_record"] ? filterObj["start_record"]:0,
                  "mlslist":filterObj["mlslist"] ? filterObj["mlslist"]:null
                  }  
                  
          data = {...postdata,...obj}
          
      }else{
          data = {...postdata,...filterObj}
      }

      let headers = {
          "Content-Type": "application/x-www-form-urlencoded",
      }
  const res = await axios.post(API_URL+'/search',data ,{headers})
  // Parse the responses into JSON
  var mapObj = await res.data;
 //console.log(mapObj);
  
  return {
    props: {
      mapObj,
    },
  };

}catch(error){
  console.log(error)
}

}

export async function GetConfigs(){
  try {
    const postdata = {
        "key":"ABCDXYZ0011"
    };
     let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
    }
    
   const res = await axios.get(API_URL+"/config",{params:postdata},{headers});
   //console.log("getconfiglist++++++++++++++",(res.data));
   var configData = await res.data;
    return {
      props: {
        configData,
      },
    };

    }catch(error){
        console.log('error');
      }
    
}

export async function getPredefinedData(ID) {

try{
  const postdata = {
    "key":"ABCDXYZ0011",
    "pid":ID,
  };
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  }

  const res = await axios.post(API_URL+"/predefineId",postdata ,{headers});
  //console.log("predefID---------------",(res.data));
  var pIDSearch = await res.data;
  return {
    props: {
      pIDSearch,
    },
  };
   }catch(error){
    //console.log(error)
  }
   
}

export async function getSubdivisionData(ID) {

  try{
    const postdata = {
      "key":"ABCDXYZ0011",
    };
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  
    const res = await axios.post(API_URL+"/subdivisionkeyval",postdata ,{headers});
    //console.log("predefID---------------",(res.data));
    var subObj = await res.data;
    return {
      props: {
        subObj,
      },
    };
     }catch(error){
      //console.log(error)
    }
     
}

export async function getCityData(ID) {

  try{
    const postdata = {
      "key":"ABCDXYZ0011",
    };
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  
    const res = await axios.post(API_URL+"/citykeyval",postdata ,{headers});
    //console.log("predefID---------------",(res.data));
    var cityObj = await res.data;
    return {
      props: {
        cityObj,
      },
    };
     }catch(error){
      //console.log(error)
    }
     
}

export async function getAreaData(post) {

  try{
    const postdata = {
      "key":"ABCDXYZ0011",
      "limit":10
    };
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  
    const res = await axios.post(API_URL+"/areakeyval",postdata ,{headers});
    //console.log("predefID---------------",(res.data));
    var areaObj = await res.data;
    return {
      props: {
        areaObj,
      },
    };
     }catch(error){
      //console.log(error)
    }
     
}

export default async function mpage({params}) {
  var { slug } = params;
  //console.log("slug>>>>>>>>>>>>>",slug);
 if(typeof slug === undefined){
  return <Error/>
 }

return (
   <ClientPage />
  )
 
}

 export async function generateMetadata({params}){
  var { slug } = params;
  const CrawlerNoIndex=false;
  const CrawlerNoFollow=false;
  const POPUP_WIN=false;
  const ASTYPE_AREA = 'area';
  const ASTYPE_SUB = 'sub';
  const ASTYPE_CITYSTATE = 'cs';

 if(typeof slug === undefined){
  return ;
 }

 const objUtility = new Utility();

  const decodeAndReplaceCommas = str => decodeURIComponent(str).replace('%2C', ',');

// Map over the array and decode URL components

 if(Array.isArray(slug) && slug.length > 0){
  //console.log(slug);
const result = slug.map((item, index) => {
  if (index === 0) {
    // Handle the first item separately to remove the '%2C' encoding
    return '/' + decodeAndReplaceCommas(item);
  } else {
    // For other items, split by '%2C' and join with commas if necessary
    return decodeAndReplaceCommas(item).split('%2C').join(',');
  }
});

// Join the array with slashes to form the final string  
let finalString = result.join('/');
var lParam="";

//below case when url contain addtype-cs,sub,zip,add,mls,etc..
if(finalString !="" && finalString.includes('addtype') === true){
  const strParam = finalString.split("/");
  let dynamicParam = strParam[1].replace(/-/g, ' ');
  lParam = dynamicParam.toLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}
let PropCount;
let propUrl=Hosturl+PROP_URL+finalString

let dataParam = objUtility.SearchParamAndURL(finalString);
let Data = await getData(dataParam.sparam);
if(Data !=undefined && Object.keys(Data).length>0){
  PropCount= Data.props.mapObj.total_record;
}

let configObj={};
let preData={};
let objMetaData={};
let arrsubcityArea=[];
/* if(dataParam.sparam && (dataParam.sparam['addtype'] == ASTYPE_AREA || dataParam.sparam['addtype'] == ASTYPE_CITYSTATE || dataParam.sparam['addtype'] == ASTYPE_SUB)){

  let AreaData = await getAreaData();
 
  let CityData = await getCityData();
  
  let SubData = await getSubdivisionData();

   arrsubcityArea={...{'Area':AreaData.props.areaObj},...{"City":CityData.props.cityObj},...{"Subdivision":SubData.props.subObj}}
 //console.log(arrsubcityArea);
  objMetaData = objUtility.getDynamicPageTitleAndDescription(dataParam.sparam,arrsubcityArea,PropCount);
} */
//console.log("objAreaSubCity>>>>",objAreaSubCity);

if(finalString !=undefined && finalString.includes('pid')=== true){
  const preID = finalString.split("/");

 let pid = null;
  
  //  find the one containing "pid-"
  preID.map(item => {
    if (item.startsWith("pid-")) {
      // Extract the pid value
      pid = item.substring(4);
    }
  });
  let PIDObj = await getPredefinedData(pid);
  if(PIDObj !=undefined && Object.keys(PIDObj.props.pIDSearch).length>0){
    preData=PIDObj.props.pIDSearch
  }
   

  return{
    title:" Home For Sale | demo site",
    description:preData.psearch_meta_desc,
    image:[{url:""}],
    url: preData.psearch_url,
    alternates: {
      canonical: preData.psearch_url,
    },
    robots:((CrawlerNoIndex) && (CrawlerNoFollow) || (POPUP_WIN === true)) ?
          "noindex,nofollow,noimageindex":
          ((CrawlerNoIndex) && !(CrawlerNoFollow) ) ? 
          "noindex,follow,noimageindex":
          (!(CrawlerNoIndex) && (CrawlerNoFollow) ) ?
          "noindex,follow,noimageindex":
          "index,follow,noimageindex",
    keywords:preData.psearch_meta_keyword,
    
    twitter: {
      images: [{ url:"",
      width: 1200,
      height: 600}],
    },
    facebook: {
      images: [{url:"",
      width: 1200,
      height: 600}],
    },
    openGraph: {
      title: "  Homes For Sale |  demo site",
      url: propUrl,
      images: [{url:"",
      width: 1200,
      height: 600}],
    },
  }

}

if(PropCount < 0 || Object.keys(preData)=== null){
  configObj=await GetConfigs();
  let cData;
  if(configObj!=undefined){
     cData=configObj.props.configData
  }

  return{
    title:"  Homes For Sale |  demo site",
    description:cData.meta_description,
    image:[{url:""}],
    url: propUrl,
    alternates: {
      canonical: propUrl,
    },
    robots:((CrawlerNoIndex) && (CrawlerNoFollow) || (POPUP_WIN === true)) ?
          "noindex,nofollow,noimageindex":
          ((CrawlerNoIndex) && !(CrawlerNoFollow) ) ? 
          "noindex,follow,noimageindex":
          (!(CrawlerNoIndex) && (CrawlerNoFollow) ) ?
          "noindex,follow,noimageindex":
          "index,follow,noimageindex",
    keywords:cData.meta_keyword,
    
    twitter: {
      images: [{ url:"",
      width: 1200,
      height: 600}],
    },
    facebook: {
      images: [{url:"",
      width: 1200,
      height: 600}],
    },
    openGraph: {
      title: "  Homes For Sale |  demo site",
      url: propUrl,
      images: [{url:"",
      width: 1200,
      height: 600}],
    },
  }
} 
return{
  title: lParam ? `${lParam}  Homes For Sale |  demo site` :" Home For Sale | demo site",
  description:`Search the latest listings of  Homes For Sale |  demo site having a ${PropCount} for sale listings in ${lParam}.`,
  image:[{url:""}],
  url: propUrl,
  alternates: {
    canonical: propUrl,
  },
  robots:((CrawlerNoIndex) && (CrawlerNoFollow) || (POPUP_WIN === true)) ?
        "noindex,nofollow,noimageindex":
        ((CrawlerNoIndex) && !(CrawlerNoFollow) ) ? 
        "noindex,follow,noimageindex":
        (!(CrawlerNoIndex) && (CrawlerNoFollow) ) ?
        "noindex,follow,noimageindex":
        "index,follow,noimageindex",
  keywords:`boca raton demo site, boca raton houses for sale, waterfront, la clara palm beach, townhomes, luxury, alina boca raton, demosite, demosite boca raton`,
  
  twitter: {
    images: [{ url:"",
    width: 1200,
    height: 600}],
  },
  facebook: {
    images: [{url:"",
    width: 1200,
    height: 600}],
  },
  openGraph: {
    title: lParam ? `${lParam}  Homes For Sale |  demo site` :" Home For Sale | demo site",
    url: propUrl,
    images: [{url:"",
    width: 1200,
    height: 600}],
  },
  
}

}
 
}
