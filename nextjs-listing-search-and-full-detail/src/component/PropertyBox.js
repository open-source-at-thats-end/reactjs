import React,{useState,useEffect,useRef,useMemo} from 'react';
import Slider from "react-slick";
import { useDispatch,useSelector } from 'react-redux';
import { postAddToFavourite } from '../ThunkSlices/PostAddFavouriteSlice';
import { postRemoveFavourite } from '../ThunkSlices/PostRemoveFavSlice';
import { LazyLoadImage,LazyLoadImageProvider  } from 'react-lazy-load-image-component';
import { format } from "../constant"
import { postDetailList } from '../ThunkSlices/PostDetailSlice';
import { getSelectedFilters,selectFilter } from '../ThunkSlices/PropertyLIstSlice';
import GenerateListingAttributes from './GenerateListingAttributes';
import { capitalizeFirstLetter,capitalize } from '../constant';
import Image from 'next/image'

function PropertyBox({data, userId, isInfo,simType,delType,soldType,maintype}){
const [favData,setFavData]=useState({});
const [isUserLoggedIn,setIsUserLoggedIn]=useState(false);
const [show,setShow]=useState(false);
const contentRef = useRef(null);
const dispatch = useDispatch();
const {favDataObj}=useSelector((state)=>state.FavouritesList);
const objSelFilters = useSelector(selectFilter);
//const navigate = useNavigate()
let item=data;
var pricecir;
var str ;
let addr=true;
let urlLink
let urlLinknew;
let rsAttributeUrl;
var PhotoBaseUrl = 'https://api.demosite.com/pictures/property/';
const parser = new DOMParser();

if(item!=null && Object.keys(item).length > 0 && item.Address!=null  ){
   rsAttributeUrl = GenerateListingAttributes(item);
     urlLinknew=`/${rsAttributeUrl.SFUrl}`
    
}

var propAdd=rsAttributeUrl.Addrs
if(propAdd !="" && propAdd.includes("#")===true){
    propAdd=propAdd.replace("# ","")
}

const load = async (url, selector) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`${url}: ${res.status} ${res.statusText}`);
    }
    const html = await res.text();
    const doc = parser.parseFromString(html, "text/html");
    return doc.querySelector(selector);
  };


useEffect(() => {
    if( userId != undefined){
        setIsUserLoggedIn(true);
    }else{

        if(typeof window !== undefined){
            if (window.bindMDpopup) {
                window.bindMDpopup()
        }
    }
          
    }
  
}, [userId,isUserLoggedIn]);


useEffect(() => {
    // Sometime we might get undefined this variable after login, might some delay in API call and API call is managed from MapSearch file we used slice here to get that fetched data.
    if(favDataObj != undefined)
        setFavData(favDataObj)

},[favDataObj])


const handlePopup=()=>{
    setShow(true);
    //console.log(contentRef);
    load(urlLink, ".modal-content")
      .then((content) => {
        //console.log(content);
        // empty out any previous content
        contentRef.current.innerHTML = "";
  
        contentRef.current.append(content);
        //console.log(contentRef.current.append(content));
      })
      .catch(console.error); 
}


const PStatus = useMemo(()=>{

    let  status = '', status_class = ''
   if(item.PropertyType === 'Rental'){
       status = "For Rent"; 
       status_class = 'badge-rental  badge-rent';
   }
   else if(item.ListingStatus === "Active" ){
       status = "For Sale";
       status_class="badge-primary  badge-sale";
   
       if ((item['Price_Diff'] < 0) && (('clfr' in objSelFilters) == false || (('clfr' in objSelFilters) == true  && objSelFilters['clfr'].indexOf('pr') >= 0))) {
            status_class = 'badge-price_reduced  badge-sale';
       } else if ((item['DOM'] <= 7) && (('clfr' in objSelFilters) == false || (('clfr' in objSelFilters)==true  && objSelFilters['clfr'].indexOf('jl') >= 0))) {
            status_class = 'badge-just_listed  badge-sale';
       } else if ((item['SubType'] === 'Condominium' || item['SubType'] === 'Townhouse' || item['SubType'] === 'Villa') && (('clfr' in objSelFilters) == false || (('clfr' in objSelFilters)==true  && objSelFilters['clfr'].indexOf('ctv') >= 0))) {
            status_class = 'badge-condos_townhouses_villa badge-sale';
       } else if ((item['PropertyType'] === 'Residential' || item['SubType'] === 'Single Family Residence' || item['SubType'] === 'SingleFamilyResidence') && (('clfr' in objSelFilters) == false ||(('clfr' in objSelFilters)==true  && objSelFilters['clfr'].indexOf('house') >= 0))) {
           status_class = 'badge-house badge-sale';
       } else if ((item['SubType'] === 'Multi Family' || item['SubType'] === 'MultiFamily' || item['SubType'] === 'Duplex' || item['SubType'] === 'Quadruplex' || item['SubType'] === 'Triplex' || item.PropertyType === 'Income') && (('clfr' in objSelFilters) == false || (('clfr' in objSelFilters)==true  && objSelFilters['clfr'].indexOf('mfi') >= 0))) {
           status_class = 'badge-multifamily_duplex_triplex badge-sale';
       } else if ((item["PropertyType"] === 'Commercial' || item["PropertyType"] === 'Business Opportunity' || item['SubType'] === 'Commercial' || item['SubType'] === 'Business' || item.PropertyType === 'Vacant Land' || item.PropertyType === 'Land/Boat Docks') && (('clfr' in objSelFilters) == false || (('clfr' in objSelFilters)==true  && objSelFilters['clfr'].indexOf('cb') >= 0))) {
           status_class = 'badge-commercial_business badge-sale';
       }else if((item.PropertyType === 'Rental' ||  item.PropertyType === 'ResidentialLease') && (('clfr' in objSelFilters) == false || (('clfr' in objSelFilters)==true  && objSelFilters['clfr'].indexOf('rent') >= 0))){
           status_class = 'badge-rental  badge-rent';
       }else {
           status_class="badge-primary  badge-sale";
       }
   }else if(item['ListingStatus'] === "ComingSoon"){
       status = "Coming Soon"
       status_class = 'badge-primary';
   }else if(item['ListingStatus'] === "Closed" ){     /*  && ('clfr' in objSelFilters)==true  && (objSelFilters['clfr'].indexOf('cls') >= 0) */
       status = "Sold"
       status_class = 'badge-danger';
   }
   return {status,status_class}

   },[item,objSelFilters])


   
if(item['Price_Diff'] !== 0 && item['Price_Diff'] !== '' && item['Price_Diff'] != undefined && item['Old_Price'] != undefined && item['Old_Price'] !== 0){
     str = "'"+item["Price_Diff"]+"'"
     pricecir = str.includes("-")?'Less':'More';
  
}

//objCllbackPriceDiff(pricecir); 
const handleAddToFavourite=()=>{
    var post  ={ "user_id":userId,
                "mls_num":item.ListingID_MLS,
                "action":"Add"
                }
    dispatch(postAddToFavourite(post));
    let d={}
    
    var key = item.ListingID_MLS;
    d[key]=item;
    
    setFavData({...d, ...favData})
}

const handleRemoveToFavourite=()=>{
    dispatch(postRemoveFavourite({"user_id":userId,
                                    "mls_num":item.ListingID_MLS,
                                    "action":"Remove"})) 
    var rData = {...favData};
    delete rData[item.ListingID_MLS];
    setFavData(rData)
   
}


const getMainPhoto = (item) => {
    return (item?.MainPicture && item?.MainPicture?.thumb?.url != null) ?
    <img src={item.MainPicture.thumb.url} alt={'MLS# '+ item.MLS_NUM }  key={item.MLS_NUM} className="card-img" height={200} width={300} threshold={0} />
    : <img  src={PhotoBaseUrl + 'no-photo/0/300/220/'} height={200} width={300}  className="card-img " alt="nophoto" />
}

const getSinglePhoto = (item) => {
    return (item.MainPicture && item.MainPicture!=null) ?
    <img src={item.MainPicture} alt={'MLS# '+ item.MLS_NUM } height={200} width={300} key={item.MLS_NUM} className="card-img"   threshold={0}/>
    : <img  src={PhotoBaseUrl + 'no-photo/0/300/220/'}  height={200} width={300} className="card-img " alt="nophoto" />
}
const getNoPhoto = () => {
    return <img  src={PhotoBaseUrl + 'no-photo/0/300/220/'}   className="card-img " alt="nophoto"/>
}
const attributes = (item.ListingStatus === "Closed" && isUserLoggedIn === false) 
  ? {   className:"popup-modal-md",
        "data-url":`https://www.demosite.com/member-login.html?ReqType=AddFav&amp;mlsNum=`+item.ListingID_MLS,
        id:"modal-login-form", 
        "data-target":"signin" }
  : {   href:urlLinknew,
        className:'popup-modal-custom',
        target:"_blank",
        title:(simType && maintype)?(item.MLS_NUM):("MLS#  " +item.MLS_NUM) };
  return (
    <>

    <div className="item ls-card">
    {((simType  && item.ListingStatus === 'Active') || delType)  ?
                 <span className={`sale-badge badge-primary badge-sale position-absolute`}>For Sale</span>:
                 ((simType  && item.ListingStatus === 'Closed') || delType)  ?
                 <span className={`sale-badge badge-primary badge-sale position-absolute`}>Sold</span>:
                 <span className={`sale-badge ${PStatus.status_class}  badge-sale position-absolute`}>{PStatus.status}</span>
                }
        
        <a  {...attributes}
        >

        <div className="test-block mb-0" >
            {(simType || soldType || delType) ?
                <div className='image'>
                {
                    (item.mls_is_pic_url_supported == 'Yes')?
                    getMainPhoto(item)
                    : 
                    ("PhotoAll" in item  && item.PhotoAll.length > 0) ?
                    <img src={item.PhotoAll[0]+'/300/220/30'} 
                        key={'img0-'+item.MLS_NUM} 
                        alt={'MLS# '+item.MLS_NUM}
                        width={300}
                        height={220}
                        className="card-img"
                        //priority={true}
                    />
                    :
                    <img  src={PhotoBaseUrl + 'no-photo/0/300/220/'}   width={300}
                    height={220} key={'MLSNum# '+item.MLS_NUM}  className="card-img " alt="nophoto"/>
                }
                </div>
                :
                (item.TotalPhotos > 1  && (('PhotoAll' in item)=== true) && item.mls_is_pic_url_supported == 'No') ? 
                    <Slider speed={200} 
                        lazyLoad= 'progressive'
                        cssEase= 'ease-in-out'
                        >
                    {
                        
                        ("PhotoAll" in item  && item.PhotoAll.length > 0 ) ? 
                        
                            item.PhotoAll.map((photo,i)=>{
                                return(
                                    (i == 0)?
                                        <img  
                                        src={photo+'/300/220/30'} 
                                        key={'img'+i+'-'+item.MLS_NUM} 
                                        alt={'MLS# '+item.MLS_NUM}
                                        width={300}
                                        height={220}
                                        threshold={0}
                                        className="card-img"
                                        //priority={true} 
                                        />
                                    :
                                        <LazyLoadImage  
                                        src={photo+'/300/220/70'} 
                                        key={'img'+i+'-'+item.MLS_NUM} 
                                        alt={'MLS# '+item.MLS_NUM}
                                        className="card-img" 
                                        threshold={1200}
                                        loading='lazy'
                                        />
                                )
                            })
                            : <img  src={PhotoBaseUrl + 'no-photo/0/300/220/'} key={'MLS# '+item.MLS_NUM}  className="card-img " alt="nophoto"/>
                
                    }
                    </Slider>:
                    (item.mls_is_pic_url_supported == 'Yes' )?
                    getMainPhoto(item)
                    :
                    getSinglePhoto(item)
                    }

           
                    <div className="description position-absolute dstyle">
                    <h5>
                        ${format(item.ListPrice)} 
                        <del className="text-white font-size-16"> {(item.Price_Diff !== 0 && item.Price_Diff !== '' && item.Old_Price > 0) ? "$"+format(item.Old_Price):null}</del>
                    </h5>
                    {item.PropertyType ?
                    <span className="badge badge-primary rounded-0 justify-content-center align-items-center text-uppercase">
                        {item.PropertyType}
                    </span>:
                    <span className="badge badge-primary  text-uppercase">
                    </span>}
                  
                   <h5 className="mb-0 mt-1 text-white">{capitalize(propAdd)}</h5>
                    {/* <h5 className="mb-0 mt-1 text-white">{item.StreetNumber}{" "}{item.StreetName}</h5> */}
                    <h6 className="text-white">{item.CityName}{" , "}{item.State}{" "}{item.ZipCode}</h6>
                    {/* <h5 className="text-white">{data.Address ? data.Address.split(",").join(",\n"):""}</h5> */}
                    <span>
                        <span className="ls_icon-block">
                            <i className="fa fa-bed"></i>
                            {" "}{(item.Beds > 0 ? item.Beds : 0)}
                        </span>
                        <span className="ls_icon-block ml-2">
                            <i className="fa fa-bath"></i>
                            {" "}{(item.BathsFull > 0 ? item.BathsFull : 0)+'.'+(item.BathsHalf > 0 ? item.BathsHalf : 0)} &nbsp;
                        </span> 
                        <span className="ls_icon-block ml-2">
                            <i className="fa fa-arrows-alt"></i>
                            {" "}{format(item.SQFT)} &nbsp;
                        </span>
                    </span>
                </div>
        
            {(pricecir && !delType && !soldType) ? 
                <div className="price-cir">
                    <figure className="circle ">
                    {item.Price_Diff+"%"+" " +pricecir}
                    </figure>
                </div>:null} 

           
        
        </div>
        </a> 
        
        
        {(!isInfo && !delType && !soldType) ?    
            <div className="fav-link-container">
            <div className="like-icon"  data-lb={item.ListingID_MLS in favData}>
            
            {(isUserLoggedIn === true)?
                (item.ListingID_MLS in favData) ?
                    <>
                        <a 
                        onClick={()=>handleRemoveToFavourite()}
                            data-toggle="tooltip" 
                            title="Remove from favorites">
                            <span>
                            <i className="fa fa-heart" style={{fontSize:24,color:'#3c505f'}}></i>
                            </span>
                        </a>  
                        
                    </>
                    :
                    <a onClick={()=>handleAddToFavourite()}
                        data-toggle="tooltip" 
                        title="Add to favorites">
                        <span>
                            <i className="fa fa-heart-o" style={{fontSize:24,color:'#3c505f'}}></i>
                        </span>
                    </a>
            :
                <a  className="popup-modal-md"
                    data-url={`https://www.demosite.com/member-login.html?ReqType=AddFav&amp;mlsNum=${item.ListingID_MLS}`}
                    id="modal-login-form" 
                    title="Add to favorites" 
                    data-target="signin">
                        <span>
                            <i className="fa fa-heart-o" style={{fontSize:24,color:'#3c505f'}}></i>
                        </span></a>}
            </div>
            </div>
        :
            null
        }
    </div>

</>  
   
  )
}

export default PropertyBox
