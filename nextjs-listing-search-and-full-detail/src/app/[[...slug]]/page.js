
import { ClientOnly } from './client';
import axios from 'axios';
import Error from '../../component/Error';
let Hosturl="https://www.demosite.com/";
import {capitalize,format} from '../../constant';
import GenerateListingAttributes from '../../component/GenerateListingAttributes';


export async function getServerSideProps(val) {

  try {
    const postdata = {
        "key":"ABCDXYZ0011",
    };
    let lKey={"Listing_key" : val.mls}
    
    
    let data = {...postdata,...lKey}

    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
    }
  const res1 = await axios.post('https://api.demosite.com/property-details',data ,{headers})
  // Parse the responses into JSON
  var detailData = await res1.data;
 
  if(detailData.MLS_NUM == undefined){
    const res2 = await axios.post('https://api.demosite.com/offmarket-details',data ,{headers})
    detailData = await res2.data;
  }
 
  
   // detailData['PhotoAll'] = JSON.stringify(detailData['PhotoAll']);

    const jsonStringPhoto = JSON.stringify(detailData['PhotoAll']); // Step 1: Stringify the object
     detailData['PhotoAll'] = btoa(jsonStringPhoto);  


     const jsonStringMedia = JSON.stringify(detailData['media']); // Step 1: Stringify the object
     detailData['media'] = btoa(jsonStringMedia);  

     const jsonStringMainpic = JSON.stringify(detailData['MainPicture']); // Step 1: Stringify the object
     detailData['MainPicture'] = btoa(jsonStringMainpic);  


  return {
    props: {
      detailData
    },
  };

}catch(error){
  //console.log(error)
}

}

export default async function Page({params}) {
 const { slug } = params;
 if(slug == undefined || !(Array.isArray(slug)) || (Array.isArray(slug) && slug.length <= 0  ))
    return (<Error/>)

const firstSlugSegment = slug[0];
const lastSlugSegment = slug[1];

var popup = '';
if(slug.length >= 3)
  popup = slug[2];

  let arr;
  let cityStr;
  if(lastSlugSegment !=undefined && (lastSlugSegment.includes('mls-') === true) ){
    arr=lastSlugSegment.split(/-mls-(.*)/s);
  }
  if((firstSlugSegment.includes('homes-for-sale') === true) ){
    cityStr=firstSlugSegment.replace("-homes-for-sale", " ");
  cityStr=cityStr.replace('-'," ");
  } 

  let mlsNum
  if(arr!=undefined && arr.length > 0){
    mlsNum=arr[1]
  }
  let resData = await getServerSideProps({"city":cityStr,"mls":mlsNum}) 

  if(resData==undefined){
  resData = await getServerSideProps({"city":cityStr,"mls":mlsNum}) 
 } 
 
 return (
  <ClientOnly resData={resData}/>
  )

}

export async function generateMetadata({params}){
  const { slug } = params;
  if(slug == undefined || !(Array.isArray(slug)) || (Array.isArray(slug) && slug.length <= 0  ))
    return ;
  
  const firstSlugSegment = slug[0];
  const lastSlugSegment = slug[1];


  function formatAddressFromSlug(slugSegment) {
    const parts = slugSegment.split("-");
  
    const zipIndex = parts.findIndex((part) => /^\d{5}$/.test(part));
    if (zipIndex === -1 || zipIndex < 5) return null;
  
    const zip = parts[zipIndex];
    const state = parts[zipIndex - 1].toUpperCase();
    const city = parts[zipIndex - 2]
      .charAt(0).toUpperCase() + parts[zipIndex - 2].slice(1).toLowerCase();
  
    const streetParts = parts.slice(0, zipIndex - 2);
    const unit = streetParts.pop();
    const street = streetParts.map((word) => {
      const fixedCaps = ["sw", "se", "nw", "ne", "n", "s", "e", "w", "ter", "st", "rd", "ave", "blvd"];
      return fixedCaps.includes(word.toLowerCase())
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(" ");
  
    const formatted = `${street} #${unit}, ${city}, ${state} ${zip}`;
    return {
      city,
      fullAddress: formatted,
      addressLine: `${street} #${unit}`,
      state,
      zip,
    };
  }
  
  var popup = '';
  if(slug.length >= 3)
    popup = slug[2];

  const totalSlug=firstSlugSegment+"/"+lastSlugSegment


  let arr;
  let city;
  const CrawlerNoIndex=false;
  const CrawlerNoFollow=false;
  const POPUP_WIN=false;
  if((lastSlugSegment.includes('mls-') === true) ){
    arr=lastSlugSegment.split(/-mls-(.*)/s);
  }

  if((firstSlugSegment!=undefined && firstSlugSegment.includes('homes-for-sale') === true) ){
    city=firstSlugSegment.replace("-homes-for-sale", " ");
    city=city.replace('-'," ");
  }
  let mlsNum;
  if(arr!=undefined && arr.length > 0){
    mlsNum=arr[1]
  }
  let data;
  let resData = await getServerSideProps({"mls":mlsNum})
  
  

  if(resData!=undefined && Object.keys(resData).length>0){
   data = resData.props.detailData
  }

  let rsAttributeUrl = data && GenerateListingAttributes(data)


let propAdd;
let propFAddress;


const formatAddress = (address) => {
  const directional = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

  const parts = address.toLowerCase().trim().split(/\s+/);

  if (parts.length < 6) return "";

  // Extract zip, state, city (from end of parts)
  const zip = parts.pop();
  const state = parts.pop();
  const city = parts.pop();

  // Remaining parts = street
  const streetParts = parts.map(part =>
    directional.includes(part) ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)
  );

  const street = streetParts.join(' ');
  const cityFormatted = city.charAt(0).toUpperCase() + city.slice(1);
  const stateFormatted = state.toUpperCase() 

  return `${street}, ${cityFormatted}, ${stateFormatted} ${zip}`;
};


  if(data && data.MLS_NUM === undefined){
    let url=arr[0]
    url = url.replaceAll('-'," ")
    let add=formatAddress(url)
    add= add+" | "+"DemoSite"
    
    
    let configKey = 'sale';
    let delCity = city  && capitalize(city);
    
    return{
      title:(add!=null || add!=undefined || add !="") ? add: delCity+''+"homes for sale",
      description:'Browse homes in'+ ' '+delCity,
      keywords:'homes for sale in '+ ' '+delCity,
      robots:"index, follow, noimageindex",
      alternates: {
        canonical: Hosturl+totalSlug,
      },
      openGraph: {
        title: delCity+''+"homes for sale",
        description: 'Browse homes in'+ ' '+delCity,
        url:  Hosturl+totalSlug,
        images: [{url:""}],
       
      },
   }
 }

let mCity =data? (data.CityName).toLowerCase():"";
let mMLS = data? (data.MLS_NUM).toLowerCase():"";
let mState = data? (data.State).toLowerCase():"";
//console.log(data);


if(data.MLS_NUM !=undefined){
   propAdd=rsAttributeUrl.Addrs
  propAdd =propAdd+",  "+data.CityName+" , "+data.State+" "+data.ZipCode
  
   if(propAdd !="" && propAdd.includes("#")===true){
       propAdd=propAdd.replace("# ","")
   }

   let price=format(data.ListPrice)
   propFAddress=rsAttributeUrl.AddressFull;
   propFAddress=propFAddress+" | "+"For Sale"+" "+`($${price})`+" | "+'MLS '+data.MLS_NUM+" | "+"DemoSite"
   if(propFAddress !="" && propFAddress.includes("#")===true){
       propFAddress=propFAddress.replace("# ","")
   }
}

return{
    //title:data? data.Area+ ' ' +data.CityName+ ' '+"Homes For Sale":"Homes For Sale",
    title:propFAddress,
    description:data ?data.CityName+ ' '+"Homes For Sale at"+ ' '+data.StreetNumber+ " " +data.StreetName+ ", " +"MLS# "+ data.MLS_NUM:"",
    image:data ?(typeof (data.MainPicture)!='object' &&  data.MainPicture !== undefined )? data.MainPicture+"/800/500/30" : `https://www.demosite.com/pictures/property/no-photo/0/800/500/30`:"",
    url: Hosturl+totalSlug,
    alternates:Hosturl+totalSlug,
    robots:((CrawlerNoIndex) && (CrawlerNoFollow) || (POPUP_WIN === true)) ?
           "noindex,nofollow,noimageindex":
          ((CrawlerNoIndex) && !(CrawlerNoFollow) ) ? 
           "noindex,follow,noimageindex":
          (!(CrawlerNoIndex) && (CrawlerNoFollow) ) ?
           "noindex,follow,noimageindex":
           "index,follow,noimageindex",
    keywords:data ? mCity+" "+"homes for sale"+", "+"homes for sale in zip code"+" "+data.ZipCode+", "+"mls#"+" "+mMLS+", "+mCity+" "+"homes for sale, "+mCity+", "+mCity+" "+mState:"",
    alternates: {
      canonical: Hosturl+totalSlug,
    },
    twitter: {
      //card: 'summary_large_image',
      //site: '@mytwitterhandle',
      images: [{ url: data ?(typeof (data.MainPicture)!='object' && data.MainPicture !== undefined) ? data.MainPicture+"/800/500/30" : 
      `https://www.demosite.com/pictures/property/no-photo/0/800/500/30`:"",
      width: 1200,
      height: 600}],
    },
    facebook: {
      images: [{ url:data ?(typeof (data.MainPicture)!='object' && data.MainPicture !== undefined) ? data.MainPicture+"/800/500/30" : 
      `https://www.demosite.com/pictures/property/no-photo/0/800/500/30`:"",
      width: 1200,
      height: 600}],
      //appId: 'your-facebook-app-id',
    },
    openGraph: {
      //title:data? data.Area+ ' ' +data.CityName+ ' '+"Homes For Sale":"",
      title:propFAddress+" | "+"DemoSite",
      description:data? data.CityName+ ' '+"Homes For Sale at"+ ' '+data.StreetNumber+ " " +data.StreetName+ ", " +"MLS# "+ data.MLS_NUM:"",
      url: Hosturl+totalSlug,
      images: [{ url:data ?(typeof (data.MainPicture)!='object' && data.MainPicture !== undefined) ? data.MainPicture+"/800/500/30":"" : 
      `https://www.demosite.com/pictures/property/no-photo/0/800/500/30`,
      width: 1200,
      height: 600}],
     },
   }
}
  

 

/*
import { ClientOnly } from './client';
import axios from 'axios';
import Error from '../../component/Error';
let Hosturl="https://www.demosite.com/";
import {capitalize} from '../../constant'



export async function getServerSideProps(val) {

  try {
    const postdata = {
        "key":"ABCDXYZ0011",
    };
    let lKey={"Listing_key" : val.mls}
    
    
    let data = {...postdata,...lKey}

    let headers = {
       "Content-Type": "application/x-www-form-urlencoded"
    }
  const res1 = await axios.post('https://api.demosite.com/property-details',data ,{headers})
  // Parse the responses into JSON
  var detailData = await res1.data;
 
  if(detailData.MLS_NUM == undefined){
    const res2 = await axios.post('https://api.demosite.com/offmarket-details',data ,{headers})
    detailData = await res2.data;
  }
 
  
   // detailData['PhotoAll'] = JSON.stringify(detailData['PhotoAll']);

    const jsonStringPhoto = JSON.stringify(detailData['PhotoAll']); // Step 1: Stringify the object
     detailData['PhotoAll'] = btoa(jsonStringPhoto);  


     const jsonStringMedia = JSON.stringify(detailData['media']); // Step 1: Stringify the object
     detailData['media'] = btoa(jsonStringMedia);  

     const jsonStringMainpic = JSON.stringify(detailData['MainPicture']); // Step 1: Stringify the object
     detailData['MainPicture'] = btoa(jsonStringMainpic);  


  return {
    props: {
      detailData
    },
  };

}catch(error){
}

}

export default async function Page({params}) {
 const { slug } = params;
 if(slug == undefined || !(Array.isArray(slug)) || (Array.isArray(slug) && slug.length <= 0  ))
    return (<Error/>)

const firstSlugSegment = slug[0];
const lastSlugSegment = slug[1];

var popup = '';
if(slug.length >= 3)
  popup = slug[2];

  let arr;
  let cityStr;
  if(lastSlugSegment !=undefined && (lastSlugSegment.includes('mls-') === true) ){
    arr=lastSlugSegment.split(/-mls-(.*)/s);
  }
  if((firstSlugSegment.includes('homes-for-sale') === true) ){
    cityStr=firstSlugSegment.replace("-homes-for-sale", " ");
  cityStr=cityStr.replace('-'," ");
  } 

  let mlsNum
  if(arr!=undefined && arr.length > 0){
    mlsNum=arr[1]
  }
  let resData = await getServerSideProps({"city":cityStr,"mls":mlsNum}) 

  if(resData==undefined){
  resData = await getServerSideProps({"city":cityStr,"mls":mlsNum}) 
 } 
 
 return (
  <ClientOnly resData={resData}/>
  )

}

export async function generateMetadata({params}){
  const { slug } = params;
  if(slug == undefined || !(Array.isArray(slug)) || (Array.isArray(slug) && slug.length <= 0  ))
    return ;
  
  const firstSlugSegment = slug[0];
  const lastSlugSegment = slug[1];

  var popup = '';
  if(slug.length >= 3)
    popup = slug[2];

  const totalSlug=firstSlugSegment+"/"+lastSlugSegment

  let arr;
  let city;
  const CrawlerNoIndex=false;
  const CrawlerNoFollow=false;
  const POPUP_WIN=false;
  if((lastSlugSegment.includes('mls-') === true) ){
    arr=lastSlugSegment.split(/-mls-(.*)/s);
  }

  if((firstSlugSegment!=undefined && firstSlugSegment.includes('homes-for-sale') === true) ){
    city=firstSlugSegment.replace("-homes-for-sale", " ");
    city=city.replace('-'," ");
  }
  let mlsNum;
  if(arr!=undefined && arr.length > 0){
    mlsNum=arr[1]
  }
  let data;
  let resData = await getServerSideProps({"mls":mlsNum})

  if(resData!=undefined && Object.keys(resData).length>0){
   data = resData.props.detailData
  }
 
  if(data && data.MLS_NUM === undefined){
    
    let configKey = 'sale';
    let delCity = city  && capitalize(city);
    

    return{
      title:delCity+''+"homes for sale",
      description:'Browse homes in'+ ' '+delCity,
      keywords:'homes for sale in '+ ' '+delCity,
      robots:"index, follow, noimageindex",
      alternates: {
        canonical: Hosturl+totalSlug,
      },
      openGraph: {
        title: delCity+''+"homes for sale",
        description: 'Browse homes in'+ ' '+delCity,
        url:  Hosturl+totalSlug,
        images: [{url:""}],
       
      },
   }
 }

let mCity =data? (data.CityName).toLowerCase():"";
let mMLS = data? (data.MLS_NUM).toLowerCase():"";
let mState = data? (data.State).toLowerCase():"";


return{
    title:data? data.Area+ ' ' +data.CityName+ ' '+"Homes For Sale":"Homes For Sale",
    description:data ?data.CityName+ ' '+"Homes For Sale at"+ ' '+data.StreetNumber+ " " +data.StreetName+ ", " +"MLS# "+ data.MLS_NUM:"",
    image:data ?(typeof (data.MainPicture)!='object' &&  data.MainPicture !== undefined )? data.MainPicture+"/800/500/30" : `https://www.demosite.com/pictures/property/no-photo/0/800/500/30`:"",
    url: Hosturl+totalSlug,
    alternates:Hosturl+totalSlug,
    robots:((CrawlerNoIndex) && (CrawlerNoFollow) || (POPUP_WIN === true)) ?
           "noindex,nofollow,noimageindex":
          ((CrawlerNoIndex) && !(CrawlerNoFollow) ) ? 
           "noindex,follow,noimageindex":
          (!(CrawlerNoIndex) && (CrawlerNoFollow) ) ?
           "noindex,follow,noimageindex":
           "index,follow,noimageindex",
    keywords:data ? mCity+" "+"homes for sale"+", "+"homes for sale in zip code"+" "+data.ZipCode+", "+"mls#"+" "+mMLS+", "+mCity+" "+"homes for sale, "+mCity+", "+mCity+" "+mState:"",
    alternates: {
      canonical: Hosturl+totalSlug,
    },
    twitter: {
      images: [{ url: data ?(typeof (data.MainPicture)!='object' && data.MainPicture !== undefined) ? data.MainPicture+"/800/500/30" : 
      `https://www.demosite.com/pictures/property/no-photo/0/800/500/30`:"",
      width: 1200,
      height: 600}],
    },
    facebook: {
      images: [{ url:data ?(typeof (data.MainPicture)!='object' && data.MainPicture !== undefined) ? data.MainPicture+"/800/500/30" : 
      `https://www.demosite.com/pictures/property/no-photo/0/800/500/30`:"",
      width: 1200,
      height: 600}],
    },
    openGraph: {
      title:data? data.Area+ ' ' +data.CityName+ ' '+"Homes For Sale":"",
      description:data? data.CityName+ ' '+"Homes For Sale at"+ ' '+data.StreetNumber+ " " +data.StreetName+ ", " +"MLS# "+ data.MLS_NUM:"",
      url: Hosturl+totalSlug,
      images: [{ url:data ?(typeof (data.MainPicture)!='object' && data.MainPicture !== undefined) ? data.MainPicture+"/800/500/30":"" : 
      `https://www.demosite.com/pictures/property/no-photo/0/800/500/30`,
      width: 1200,
      height: 600}],
     },
   }
}
*/
  

 
