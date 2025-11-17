"use client"
import React,{useMemo,useState,useEffect,useRef} from 'react';
import PropBasicInfo from './PropBasicInfo';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {format,extractZipCode} from '../constant';
import PropInfo_Feature from './PropInfo_Feature';
import Slider from "react-slick";
import { postDetailList, simPropPrice, simPropSold, simPropType, simPropZip,simPropAction } from '../ThunkSlices/PostDetailSlice';
import { postPropertyList } from '../ThunkSlices/PropertyLIstSlice';
import GMapDetail from './GMapDetail'
import {Shimmer} from 'react-shimmer';
import PropertyBox from './PropertyBox';
import Cookies from 'js-cookie';
import { selectFilter} from '../ThunkSlices/PropertyLIstSlice';
import SharePopup from './Share';
import ScheduleTourPopup from './Schedule';
import PropRightBar from './PropRightBar';
import MedianPrice from './MedianPrice';
import CashbackPopup from './CashbackPopup';
import { postCensusRp } from '../ThunkSlices/postCensusRpSlice';
import { postZipStatisticList ,resetZip} from '../ThunkSlices/ZipStatisticSlice';
import { postCityStatatics,resetCity } from '../ThunkSlices/CityStatisticSlice';
import { getZestimateList } from '../ThunkSlices/GetZestimateSlice';
import { getZestimateTaxList } from '../ThunkSlices/GetZestiTaxHistory';
import { postNearbyDealsList } from '../ThunkSlices/PostNearByDeals';
import { postDealScore } from '../ThunkSlices/PostDealScoreSlice';
import { getWalkScore } from '../ThunkSlices/GetWalkscoreSlice';
import { getCoordinates } from '../ThunkSlices/GetLanLongSlice';
import { postWalkscorelogs } from '../ThunkSlices/postwalkSlice';
import Zestimate from './Zestimate';
import MortgageNew from './MortgageNew';
import MarketReport from './MarketReport';
import { useDispatch,useSelector } from 'react-redux';
import { postHeaderFooterList } from '../ThunkSlices/PostHeaderFooterSlice';
import { getConfigList } from '../ThunkSlices/GetConfigSlice';
import parse from 'html-react-parser';
import { DETAIL_PROP_URL } from '../constant';
import {useRouter, usePathname, useSearchParams } from 'next/navigation'
import DealScore from './DealScore';
import CircularProgress from '@mui/joy/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalking,faMotorcycle, faTrain, faL} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';


function DetailPage({data}) {
let detailObj=data!=undefined && data.props.detailData
let cityStr;
let simType=true;
let soldType=true;

const dispatch = useDispatch();
const pagecontentRef=useRef(null);
const [userId,setUserId]=useState(Cookies.get('_ul'));
const [toggleZip, setToggleZip] = useState(false);
const [showModalContent, setShowModalContent] = useState();
const [showSSModalContent, setSSShowModalContent] = useState();
const [showModalCashbContent, setShowModalCashbContent] = useState();
const [isLoggedinUser,setisLoggedinUser]=useState(false);
const [forceSignin,setForceSignin]=useState(false);
const [askSignin,setAskSignin]=useState();
const [allowRegNum,setallowRegNum]=useState();
const [sessionPropViewCount,setSessionPropViewCount]=useState(0);
const [sPCount,setsPCount]=useState(1);
const [toggleType, setToggleType] = useState(true);
const [togglePrice, setTogglePrice] = useState(false);
const [isDeleted, setIsDeleted] = useState(false);
const [citynm,setCitynm]=useState();
const [cityString,setCityString]=useState();
const [listingMLS,setListingMLS]=useState();
const {listSimPropByPrice,listSimPropByZip,listSimPropForSold,listSimPropByType,dLoading,listSimPropByAction}=useSelector((state)=>state.detailData);
const {listArr,pLoading}=useSelector((state)=>state.propertyList);
const {HFOptions,HFcache ,HFLoading}=useSelector((state)=>state.HeaderFooterList);
const {objCensus}=useSelector((state)=>state.censusRp);
const {zipStcList}=useSelector((state)=>state.zipStcList);
const {cityStcList}=useSelector((state)=>state.cityStcList);
const {objDelProp, delLoading}=useSelector((state)=>state.deleleprop);
const {configObj,cnfgLoading}=useSelector((state)=>state.getconfig);
const {Objzestmate,zestLoading}=useSelector((state)=>state.getzestimate);
const {arrZestax,taxLoading}=useSelector((state)=>state.getzestimatetax);
const {arrNearby,nearbyLoading,totalProperties}=useSelector((state)=>state.nearbyDeals);
const {propertyScore,scoreLoading}=useSelector((state)=>state.dealscore);
const {objWalkScore,scoreloading}=useSelector((state)=>state.getscore);
const {Arrlatlng,latloading}=useSelector((state)=>state.getcoord);
const objSelFilters = useSelector(selectFilter);
const headerRef = useRef(null);
const bannerRef = useRef(null);
const[isBlur,setIsBlur] = useState(false);
const[isBanner,setIsBanner] = useState(false);
const[isDisplayBanner,setisDisplayBanner] = useState("");
const [isClient, setIsClient] = useState(false);
const [propcity, setPropcity] = useState();
const [isFocused, setIsFocused] = useState(false);
const [photoAll,setPhotoAll] =useState([])
const [mainPic, setMainPic] = useState("");
const params = usePathname();
const searchParams = useSearchParams();
const Action = searchParams.get('Action');
var PhotoBaseUrl = 'https://www.demosite.com/pictures/property/';
let MLSNUM;
let cityName;
let  status = '', status_class = '';
const[sliderNav,setNav]=useState({
    nav1: null,
    nav2: null
  })

var slider1 = useRef(null);
var slider2 = useRef(null);
const modalShare = useRef(null);
const modalScheduleTour = useRef(null);
const modalLgContent = useRef(null);
const modalgetCashBack = useRef(null);


  useEffect(() => {
    if(typeof window != undefined){
        if (window.fancyboxAftercloseEvent)
            window.fancyboxAftercloseEvent()
    }
     setIsClient(true);
  }, []);


  useEffect(() => {
    // Use a default empty array if PhotoAll is undefined or empty
    let photoData = detailObj && detailObj.PhotoAll || '[]';
    
    // Check if PhotoAll exists in detailObj and has length greater than 0
    if (detailObj && "PhotoAll" in detailObj && photoData.length > 0) {
      try {
        // Decode the Base64 string
        let decodedString = atob(photoData);
  
        // Parse the JSON
        const parsedData = JSON.parse(decodedString);
        
        // Check if parsedData is an array before setting it
        if (Array.isArray(parsedData)) {
          setPhotoAll(parsedData);
        } else {
          console.error("Parsed data is not an array");
        }
      } catch (error) {
        console.error("Error decoding or parsing JSON:", error);
      }
    } else {
      console.error("PhotoAll is undefined or empty");
    }
  }, [detailObj.PhotoAll]);

  useEffect(() => {
  
    let photoMain = detailObj.MainPicture || ' ';
    
    
    if (detailObj && "MainPicture" in detailObj && photoMain != "") {
      try {
        
        let decodedString = atob(photoMain);
  
        
        const parsedData = JSON.parse(decodedString);
        
        if (typeof (parsedData) === 'string') {
          setMainPic(parsedData);
        } else {
          console.error("Parsed data is not an array");
        }
      } catch (error) {
        console.error("Error decoding or parsing JSON:", error);
      }
    } else {
      console.error("PhotoAll is undefined or empty");
    }
  }, [detailObj.MainPicture]);
  
  
const PriceCircl = useMemo(()=>{
    let pricecir ;
    if( detailObj?.Price_Diff != null && detailObj['Old_Price'] != undefined && detailObj['Old_Price'] !== 0){
        let str = "'"+detailObj["Price_Diff"]+"'";
       return pricecir = str.includes("-")?'Less':'More';
    }
},[detailObj])

useEffect(() => {
    var uID = Cookies.get('_ul');
    if(uID != undefined ){
        dispatch(postHeaderFooterList({IsUserLogged:true, user_id:uID}));
        setUserId(uID)

    }else{
        dispatch(postHeaderFooterList());
    }
  
},[dispatch,Cookies.get('_ul'), userId]);

useEffect(() => {
dispatch(getConfigList())
}, [])  

useEffect(()=>{
    document.body.classList.add('overflow-none'); //to remove scroll
});

useEffect(() => {
     var popup_status = ''
    
     function ptBarPosition() {
        // Check if jQuery is available
        if (typeof jQuery === 'undefined') {
            console.error('jQuery is not available');
            return;
        }
    
        // Check window width and height
        if (jQuery(window).width() > 1024  && jQuery(window).height() >= jQuery('#pd-sidebar').height()) {
            jQuery('#pd-sidebar').width(jQuery('#pr-bar').width());
           /*  jQuery(".te-prop-features").css({
                'margin-top': jQuery("#pt-bar").height() + 10
            }); */
            setTimeout(function () {
                 /* if(popup_status == 'true')
            {

                jQuery('#pt-bar').affix({
                    offset: {
                    }
                });
            }
            else{ */
                jQuery('#pt-bar').affix({
                    offset: {
                        bottom: jQuery('.footer-wrapper').outerHeight(true)-jQuery("#pt-bar").height()+110
                    }
                });
    
            }, 5000);
        //}
        } else {
            jQuery('#pd-sidebar').removeClass('affix');
        }
    
        if (jQuery(window).width() >= 767  && jQuery(window).height() >= jQuery('#pd-sidebar').height() ) {
            if (jQuery('#pt-bar').length > 0) {
                jQuery('#pt-bar').addClass('affix');
                jQuery('#pt-bar').width(jQuery('#pl-bar').width() - 30);
                jQuery(".te-prop-features").css({
                   
                    'margin-top': jQuery("#pt-bar").height() + 10
                });
    
                setTimeout(function () {
    
                    if (popup_status == 'true') {
                        jQuery('#pt-bar').affix({
                            offset: {}
                        });
                    } else {
                       /*  jQuery('#pt-bar').affix({
                            offset: {
                                bottom: jQuery('.footer-wrapper').outerHeight(true)-jQuery("#pt-bar").height()+110
                            }
                        }); */ 
                        jQuery('#pd-sidebar').affix({ //this run when fullview propertypage
                            offset: {
                                bottom: jQuery('.footer-wrapper').outerHeight(true) - jQuery("#pd-sidebar").height() + 110
                            }
                        });
                    }
    
                }, 5000);
            }
        }
    
        if (jQuery(window).width() < 768 || (jQuery(window).height() < jQuery('#pd-sidebar').height())) {
            if (jQuery('#pt-bar').length > 0) {
                jQuery("#pt-bar").removeClass("affix");
            }
        }
    }
    setTimeout(() => {
        ptBarPosition();
    }, 500);
  
    // Call ptBarPosition on window resize
    window.addEventListener('resize', ptBarPosition);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', ptBarPosition);
    };
},[]);

useEffect(() => {
   
    [cityName, MLSNUM] = getDetailParams(params);
    //console.log(cityName);
    setCityString(cityStr)
   
   // dispatch(postDetailList({"Listing_key" : MLSNUM}));
   dispatch(postDetailList(detailObj));
  //postDetailURl()
   setTimeout(() => {
      //window.ptBarPosition()
  }, 500); 

   
    if (typeof window !== 'undefined') {
        // Call the function if it exists on the window object
        if (window.callbackfunc) {
          window.callbackfunc();
        }
      }
}, [detailObj]);

useEffect(() => {
    if((Object.keys(objWalkScore).length > 0) && (Object.keys(detailObj).length > 0))
   dispatch(postWalkscorelogs({w1:objWalkScore,d1:detailObj}))

}, [objWalkScore,detailObj])

/* this below useeffect is run when detailpage property not found 
   and also when deleted property not found and also
   when nearbydeal property not found that time this call render
 */
useEffect(() => {
    //this useeffect run when main detailpage prop and also properrty not found in off market then it will display.
    [cityName, MLSNUM] = getDetailParams(params);
    let addr=cityName && cityName.replaceAll('-',' ')
    if(arrNearby.length === 0 && detailObj.MLS_NUM===undefined){
        
        dispatch(postPropertyList({ 
            "notmlsnum":MLSNUM,
            "status":(Action ==='good-deal' || detailObj.MLS_NUM === undefined)? "closed":'',
            "sd":"ASC",
            "ptype":"residential",
            "addval":cityStr,
            "addtype":"cs",
            "limit":"9"}));

            dispatch(postCensusRp({"city_name":cityStr}));
            dispatch(getCoordinates({"key":"AIzaSyDqcryeVS4mHApy8sZB9rhIQOho5_mtgGU",
                                     "address":addr
            }))      
    }
}, [arrNearby,detailObj])

useEffect(() => {
    [cityName, MLSNUM] = getDetailParams(params);
    let addr=cityName && cityName.replaceAll('-',' ')
    setPropcity(addr)
    {(Arrlatlng.length >0 &&  Arrlatlng[0] )&& 
       dispatch(getWalkScore(
        {
            format:"json",
            address:addr,
            lat:Arrlatlng[0].geometry.location.lat,
            lon:Arrlatlng[0].geometry.location.lng,
            transit:"1",
            bike:"1",
            wsapikey:"e6d7d750102614fe46b77cf99ebe72d5",
        } 
    )) 
}  
}, [Arrlatlng])

useEffect(() => {
   
    [cityName, MLSNUM] = getDetailParams(params);
    setNav({
        nav1: slider1,
        nav2: slider2
    })
    if(dLoading === false){
       
        
        if(detailObj.MLS_NUM === undefined){
            setIsDeleted(true)
            //dispatch(postDelPropList({"Listing_key" : MLSNUM}))
  
        }else{
            // When actual property page load that time required to get the similar properties
            var pType = (detailObj.PropertyType)? detailObj.PropertyType.toLowerCase():"";
            // For property type
          
            dispatch(simPropType({
                "latitude":detailObj.Latitude,
                "longitude":detailObj.Longitude,
                "notmlsnum":detailObj.MLS_NUM,
                "ptype":pType,
                "status":"Active",
                "showMiles":10,
                "so":"Miles",
                "sd":"ASC",
                "limit":"9",
            }))
            // For property price
            let price=""+detailObj['ListPrice']+"";
            let count = price.length;
            let result = price.substring(0, 1);
            let str = '5';
            if(count<= 4 || result <= 5){
                count = count -1;
            }
            str=str.padEnd(count, '0');
            str=parseInt(str)
            let Lprice=detailObj['ListPrice'];
            let minprice= Lprice-str;
            let maxprice = Lprice+str;
    
            dispatch(simPropPrice({
                "latitude":detailObj.Latitude,
                "longitude":detailObj.Longitude,
                "notmlsnum":detailObj.MLS_NUM,
                "status":"Active",
                "showMiles":10,
                "minprice":minprice,
                "maxprice":maxprice,
                "so":"ListPrice",
                "sd":"ASC",
                "limit":"9",
    
            }))
            // For property zip
            dispatch(simPropZip({
                "latitude":detailObj.Latitude,
                "longitude":detailObj.Longitude,
                "notmlsnum":detailObj.MLS_NUM,
                "status":"Active",
                "ZipCode":detailObj.ZipCode,
                "showMiles":10,
                "so":"Miles",
                "sd":"ASC",
                "limit":"9",
            }))
            // For property sold
            dispatch(simPropSold({
                "latitude":detailObj.Latitude,
                "longitude":detailObj.Longitude,
                "notmlsnum":detailObj.MLS_NUM,
                "ptype":pType,
                "status":"closed",
                "ZipCode":detailObj.ZipCode,
                "showMiles":10,
                "ListPrice":detailObj.ListPrice,
                "so":"Miles",
                "sd":"ASC",
                "limit":"9",
            }))
    
            //dispatch(resetCity());
           // dispatch(resetZip());  
            if(detailObj.CityName != undefined){
                dispatch(postCensusRp({"city_name":detailObj.CityName}));
                dispatch(postCityStatatics({"addtype":'cs',"addval":(detailObj.CityName+","+detailObj.State),"ptype":detailObj.PropertyType,"ptlreport":"report"}));
            }
            if(detailObj.ZipCode != undefined)
            dispatch(postZipStatisticList({"addtype":'zip',"addval":detailObj.ZipCode,"ptype":detailObj.PropertyType,"ptlreport":"report"}));
            dispatch(getZestimateList({ "access_token":"20f191c2e280cf0480aa8be72f021d88","address":zestAddrs}))
            dispatch(getZestimateTaxList({"access_token":"20f191c2e280cf0480aa8be72f021d88","address":zestAddrs}))
            if(detailObj.PropertyType === 'Rental'){
                status = "For Rent"; 
                status_class = 'badge-rental  badge-rent';
            }
            else if(detailObj.ListingStatus === "Active"){
                status = "For Sale";
                status_class="badge-primary  badge-sale";
    
                if ((detailObj['Price_Diff'] < 0) && ('clfr' in objSelFilters) === true  && (objSelFilters['clfr'].indexOf('pr') >= 0)) {
                    status_class = 'badge-price_reduced  badge-sale';
                } else if ((detailObj['DOM'] <= 7) && ('clfr' in objSelFilters) === true  && (objSelFilters['clfr'].indexOf('jl') >= 0)) {
                    status_class = 'badge-just_listed  badge-sale';
                } else if ((detailObj['SubType'] === 'Condominium' || detailObj['SubType'] === 'Townhouse' || detailObj['SubType'] === 'Villa') && (('clfr' in objSelFilters) === true  && objSelFilters['clfr'].indexOf('ctv') >= 0)) {
                    status_class = 'badge-condos_townhouses_villa badge-sale';
                } else if ((detailObj['PropertyType'] === 'Residential' || detailObj['SubType'] === 'Single Family Residence' || detailObj['SubType'] === 'SingleFamilyResidence') && (('clfr' in objSelFilters) === true  && objSelFilters['clfr'].indexOf('house') >= 0)) {
                    status_class = 'badge-house badge-sale';
                } else if ((detailObj['SubType'] === 'Multi Family' || detailObj['SubType'] === 'MultiFamily' || detailObj['SubType'] === 'Duplex' || detailObj['SubType'] === 'Quadruplex' || detailObj['SubType'] === 'Triplex' || detailObj.PropertyType === 'Income') && (('clfr' in objSelFilters) === true  && objSelFilters['clfr'].indexOf('mfi') >= 0)) {
                    status_class = 'badge-multifamily_duplex_triplex badge-sale';
                } else if ((detailObj["PropertyType"] === 'Commercial' || detailObj["PropertyType"] === 'Business Opportunity' || detailObj['SubType'] === 'Commercial' || detailObj['SubType'] === 'Business' || detailObj.PropertyType === 'Vacant Land' || detailObj.PropertyType === 'Land/Boat Docks') && (('clfr' in objSelFilters) === true  && (objSelFilters['clfr'].indexOf('cb') >= 0))) {
                    status_class = 'badge-commercial_business badge-sale';
                }else if((detailObj.PropertyType === 'Rental' ||  detailObj.PropertyType === 'ResidentialLease') && ('clfr' in objSelFilters) === true  && (objSelFilters['clfr'].indexOf('rent') >= 0)){
                    status_class = 'badge-rental  badge-rent';
                }else {
                    status_class="badge-primary  badge-sale";
                }
            }else if(detailObj['ListingStatus'] === "ComingSoon"){
                status = "Coming Soon"
                status_class = 'badge-primary';
            }else if(detailObj['ListingStatus'] === "Closed" && ('clfr' in objSelFilters) === true  && (objSelFilters['clfr'].indexOf('cls') >= 0)){
                status = "Sold"
                status_class = 'badge-danger';
            }

            if(Action ==='good-deal'){
                dispatch(postNearbyDealsList({
                "status": detailObj.ListingStatus, 
                "sdiv": detailObj.Subdivision,
                "price":detailObj.ListPrice,
                }))
            }
     }

       let lstatus=detailObj.ListingStatus ==='ActiveUnderContract' ? "Active Under Contract": detailObj.ListingStatus
        dispatch(postDealScore({
         'ListingStatus':lstatus,
         'Construction':detailObj.Construction ,
         'LotSize':detailObj.LotSize,
         'SQFT':detailObj.SQFT,
         'YearBuilt':detailObj.YearBuilt,
         'ListPrice':(detailObj.ListPrice == undefined ? "" : detailObj.ListPrice),
         'Beds':detailObj.Beds,
         'Baths':detailObj.Baths,
         'Is_Pool':detailObj.Is_Pool,
         'Garage':detailObj.Garage,
         'DOM':detailObj.DOM,
         'WaterfrontDesc':detailObj.WaterfrontDesc,
         'CityName':detailObj.CityName,
         'PropertyType':detailObj.PropertyType,
         'PropertyStyle':detailObj.PropertyStyle !=undefined ? detailObj.PropertyStyle:"",
         'Sold_Price':detailObj.Sold_Price,   
        }))

     
     if(detailObj.MLS_NUM!=undefined)
        dispatch(getWalkScore(
            {
                format:"json",
                address:(detailObj.Address && detailObj.Address!=undefined )&& encodeURIComponent(detailObj.Address),
                lat:detailObj.Latitude!=undefined && detailObj.Latitude,
                lon:detailObj.Longitude!=undefined && detailObj.Longitude,
                transit:"1",
                bike:"1",
                wsapikey:"e6d7d750102614fe46b77cf99ebe72d5",
            } 
        ))


    var zestAddrs=(detailObj.StreetNumber != undefined && detailObj.StreetName != undefined)?(detailObj.StreetNumber+ " " +detailObj.StreetName):null;
    zestAddrs=zestAddrs != undefined? zestAddrs.replaceAll(" ","+"):null;
    }
}, [dispatch,detailObj,dLoading]);  


useEffect(() => {
    calculatedHeight()
}, [HFOptions,isBanner]);


 useEffect(() => {
     var uID = Cookies.get('_ul');
     if(uID != undefined){
         setUserId(uID)
         //Cookies.remove('spvc')
        
     }else{
        const initialcount=parseInt(1);
        //var spCount=Cookies.get('spvc');
        setsPCount(Cookies.get('spvc'))
        if(configObj['pc_total_page_allowed_before_registration'] != undefined)
            setallowRegNum(configObj['pc_total_page_allowed_before_registration']);
        
        //spCount =(spCount !=undefined && spCount !=NaN && spCount != 3 && spCount > 0 && !(spCount>3)) ? parseInt(spCount)+1 : 1;

        let spCount =(sPCount === undefined || sPCount === NaN || sPCount === 0 || sPCount === '') ? parseInt(0) : parseInt(sPCount) + initialcount;
      /*   let spCount =1; */
        setSessionPropViewCount(spCount);
        setisLoggedinUser(false);
        setAskSignin(false)
       
        //console.log((parseInt(configObj['total_page_allowed_before_registration']) + 1) <= spCount)
        //console.log(spCount);
        if ((parseInt(configObj['pc_total_page_allowed_before_registration']) + 1) <= spCount) {
            // If enable_recurring == YES means we can show popup again so allow to close login pop up
            if (configObj['enable_recurring'] == "YES") {
                //console.log("ifffffffff");
                setAskSignin(true);
                setSessionPropViewCount(0);
            } // If enable_recurring == NO means once limit is crossed login is must required to view property
            else {
                //console.log("elseeeeee");
                setForceSignin(true);
                setisLoggedinUser(false);
                setIsBlur(true) //for set loginpopup background make blur to access
                //callBackFroBlur();
                //callBackFroPopup()
            }
        }
        Cookies.set('spvc', spCount, { expires: 0 });
        setTimeout(() => {
            if(typeof window != undefined){
                if(HideCloseBtn){
                    window.HideCloseBtn();
                }
            }
           
        },4000);
     }

    

  
},[Cookies.get('_ul'), userId, configObj]);

useEffect(() => {
    //dispatch(postMenuFilterList());
    setisDisplayBanner(sessionStorage.getItem("bannerClosedIcon"));
    if (isDisplayBanner != undefined && isDisplayBanner == "No"  &&  isDisplayBanner !== "") {
      setIsBanner(true);
      //bannerRef.current.style.display="none";
    }
    
    //this function use for header tab remove when make console up-down so using this func solve problem
    setTimeout(() => {
        if(typeof window != undefined){
            if (window.callbackfunc) 
                window.callbackfunc();

            if (window.rebindCustomEvents) //this is for whatsapp chat
                window.rebindCustomEvents()
            
        } 
      //make banner true,putting here because banner is display after calculate map height so map render properly
  }, 500);

  
}, [HFOptions,isDisplayBanner])


useEffect(() => {
    // Create a new script element
    const script = document.createElement('script');
    // Set the content of the script element
    script.innerHTML = `
    var ForceSignin = ${forceSignin};
    var AllowRegNum = ${allowRegNum};
    var SessionPropViewCount = ${sessionPropViewCount};
    var IsUserLogged = ${isLoggedinUser};
    var UnderMaintenanceNotice = 'No', InPopUp = 'No', CurDateTime = '2023/06/20 06:24:42', msgSuccess = '', msgError = '', TPL_images = 'https://www.demosite.com/templates/images', Site_Root = '', XHR_Url = 'https://www.demosite.com', YES = 'Yes', NO = 'No', ContactPhoneNum = '561-614-5353', jsonMapData = '', UrlSignInPage = '#sign-in', UrlSignUpPage = '#sign-up', Main_Host_Url = 'https://www.demosite.com', Isdisplaybanner = 'Yes', isPredefine = '', popup_status = '';
    `;

    // Get a reference to the first script tag in the document
    const firstScriptTag = document.querySelector('script');

    // Insert the new script element before the first script tag
    if (firstScriptTag) {
      firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
    } else {
      // If no script tags found, append the new script element to the end of the head
      document.head.appendChild(script);
    }

    // Clean up function to remove the script element when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
}, [sessionPropViewCount,forceSignin,isLoggedinUser,allowRegNum]);


useEffect(() => {
    if(!HFLoading && allowRegNum != undefined){

        setTimeout(() => {
            if(typeof window !== undefined ){
                if (window.forceLoginOnDetils) {
                    window.forceLoginOnDetils();
                }
            }
        },3000); 
    }
}, [HFLoading, allowRegNum]) 

 useEffect(() => {
        let slides;
        const slickTrack = document.querySelector('#carousel .slick-track');
       
        if (slickTrack) {
             slickTrack.classList.add('custom-slick-track');
             slides = slickTrack.querySelectorAll('#carousel .slick-slide');
          }
        if(isFocused && slides.length >= 10){
            slickTrack.classList.remove('custom-slick-track'); 
        }
  
  }, [isFocused]);


 const handlebeforechangeSlider=()=>{
    setIsFocused(true)
}

const handleafterChangeSlider=()=>{
    setIsFocused(true)
}
  
const getDetailParams=(params)=>{
    let arr;
  
    if(params.indexOf('/') !== -1){
        let arrPAram=params.split('/');
        arrPAram.map((item,i)=>{
            if(item === '')
            return;
        
            if((item.includes('mls-') === true) ){
                arr=item.split(/-mls-(.*)/s);
            }

            if((item.includes(DETAIL_PROP_URL) === true) ){
                 cityStr=item.replace("-"+DETAIL_PROP_URL, " ");
                cityStr=cityStr.replaceAll('-'," ");
            }
          
        })
    }
    setCitynm(arr[0]);
    setListingMLS(arr[1]);
    return arr;
}

const handlePriceToggle=()=>{
    setTogglePrice(!togglePrice);
    setToggleType(false);
    setToggleZip(false);
}
const handleTypeToggle=()=>{
    setToggleType(!toggleType)
    setTogglePrice(false);
    setToggleZip(false);
}
const handleZipToggle=()=>{
    setToggleZip(!toggleZip)
    setTogglePrice(false);
    setToggleType(false);
}
const SlickArrowLeft = ({ currentSlide, slideCount, mainSlider, ...props }) => {
    let disable = false;
    
    if(mainSlider != undefined)
        disable = (currentSlide === 0)
    else
        disable = (currentSlide === 0)
    
    return (
        <button 
        {...props}
        className={
        "slick-prev slick-arrow" +
        (disable ? " slick-disabled" : "")
        }
        aria-hidden="true"
        aria-disabled={disable}
        type='button'
        tabIndex="-1"
    >
        Previous
    </button>
    )
}
const SlickArrowRight = ({currentSlide, slideCount, mainSlider, ...props})=> {
    let disable = false;

    if(mainSlider != undefined)
        disable = (currentSlide+1 === slideCount)
    else
        disable = (currentSlide >= (slideCount-10))

    return (
    
        <button
            {...props}
            className={"slick-next slick-arrow" +((disable) ? " slick-disabled " :"")}
            aria-hidden="true"
            aria-disabled={ disable}
            type="button"
            tabIndex="-1"
        >
            Next
        </button>
        );
}
const responsiveSetting=
    [
        {
          breakpoint:1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
        }, 
        {
            breakpoint:844,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
            },
          }, 
          {
            breakpoint:912,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 1,
            },
          }, 
            
]

const responsiveSettingMain=
    [
        {
          breakpoint:1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
        }, 
        {
            breakpoint:844,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          }, 
          {
            breakpoint:912,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          }, 
            
]
const modelLGShow=(action)=>{
//console.log("showpopup====");
    if(action === 'share')
    setShowModalContent(<SharePopup  modalShare={modalShare} item={detailObj}/>)
    if(action === 'scheduletour')
    setSSShowModalContent(<ScheduleTourPopup  modalScheduleTour={modalScheduleTour} item={detailObj}/>)
    if(action === 'getcashback')
    setShowModalCashbContent(<CashbackPopup  modalgetCashBack={modalgetCashBack} item={detailObj}/>)
}
const ScheduletourModalPopup=()=>{
    modalScheduleTour.current.style.zIndex = 1040;
    modalScheduleTour.current.style.display = 'block';
    modalScheduleTour.current.style.backgroundcolor="rgba(0,0,0,0.6)"
    modelLGShow('scheduletour');
} 
const GetCashbackModalPopup=()=>{
    //console.log(modalgetCashBack);
    modalgetCashBack.current.style.zIndex = 1040;
    modalgetCashBack.current.style.display = 'block';
    modalgetCashBack.current.style.backgroundcolor="rgba(0,0,0,0.6)";
    document.body.style.overflow = 'hidden';
    modelLGShow('getcashback');
} 

 const calculatedHeight = useMemo(() => {
const calHeigh = () => {
if (headerRef.current) {
    if(headerRef.current.children.length > 0){
        let headerHeight;
        var findNav =  headerRef.current.querySelectorAll('nav');
        var findDiv= headerRef.current.querySelectorAll('div')
        let headNavheight;
        if(findNav && findNav[0] && findNav[0].clientHeight){
            headNavheight=findNav[0].clientHeight
        }
        //var headerHeight = findDiv[0].clientHeight+headNavheight;
        //(bannerRef && bannerRef.current!=null &&  bannerRef.current.clientHeight!=null)
        if(headNavheight && (isDisplayBanner !="No" || isDisplayBanner !=" " ||  isDisplayBanner != undefined && isDisplayBanner === null) && (isBanner !=true)){
            var bannerHeight = (bannerRef && bannerRef.current!=null &&  bannerRef.current.clientHeight!=null)? bannerRef.current.clientHeight:77;
            headerHeight = bannerHeight+headNavheight
    }else{
        headerHeight = headNavheight;
        if(headerRef.current && headerRef.current.children.length > 0 && headerRef.current.children[1]!=null && headerRef.current.children[1].id !=null && headerRef.current.children[1].id !=undefined){
            headerRef.current.children[1].style.top= 0+"px"
        }
    }
        //var headerHeight = findNav[0].clientHeight + bannerHeight
        pagecontentRef.current.style.top = headerHeight+"px";
    }
}
}
return calHeigh;
},[isDisplayBanner,isBanner]) 

/* const calHeigh = () => {
if (headerRef.current) {
    if(headerRef.current.children.length > 0){
        let headerHeight;
        var findNav =  headerRef.current.querySelectorAll('nav');
        var findDiv= headerRef.current.querySelectorAll('div')
        let headNavheight;
        if(findNav && findNav[0] && findNav[0].clientHeight){
            headNavheight=findNav[0].clientHeight
        }
        //var headerHeight = findDiv[0].clientHeight+headNavheight;
        //(bannerRef && bannerRef.current!=null &&  bannerRef.current.clientHeight!=null)
        if(headNavheight && (isDisplayBanner !="No" || isDisplayBanner !=" " ||  isDisplayBanner != undefined && isDisplayBanner === null) && (isBanner !=true)){
            var bannerHeight = (bannerRef && bannerRef.current!=null &&  bannerRef.current.clientHeight!=null)? bannerRef.current.clientHeight:77;
            headerHeight = bannerHeight+headNavheight
    }else{
        headerHeight = headNavheight;
        if(headerRef.current && headerRef.current.children.length > 0 && headerRef.current.children[1]!=null && headerRef.current.children[1].id !=null && headerRef.current.children[1].id !=undefined){
            headerRef.current.children[1].style.top= 0+"px"
        }
    }
        //var headerHeight = findNav[0].clientHeight + bannerHeight
        pagecontentRef.current.style.top = headerHeight+"px";
    }
}
} */

if(Object.keys(objCensus).length > 0 && objCensus[0]){
    var householdId   = 'cr-embed-'+objCensus[0].GEOID+'-economics-income-household_distribution';
    var householdhref = 'https://s3.amazonaws.com/embed.censusreporter.org/1.0/iframe.html?geoID='+objCensus[0].GEOID+'&chartDataID=economics-income-household_distribution&dataYear=2023&releaseID=ACS_2023_5-year&chartType=histogram&chartHeight=200&chartQualifier=&chartTitle=Household+income&initialSort=&statType=scaled-percentage';
    
    var employmentID = 'cr-embed-'+objCensus[0].GEOID+'-economics-employment-transportation_distribution';
    var employmenthref = 'https://s3.amazonaws.com/embed.censusreporter.org/1.0/iframe.html?geoID='+objCensus[0].GEOID+'&chartDataID=economics-employment-transportation_distribution&dataYear=2023&releaseID=ACS_2023_5-year&chartType=histogram&chartHeight=200&chartQualifier=Universe%3A+Workers+16+years+and+over&chartTitle=Means+of+transportation+to+work&initialSort=&statType=scaled-percentage';
}
const onCloseBanner=(e)=>{
    e.preventDefault();
    setIsBanner(true)
    let display="No"
    sessionStorage.setItem("bannerClosedIcon", display);
    if(bannerRef && bannerRef.current.children != undefined )
      bannerRef.current.style.display ="none"
}

const bannerDetail=
<div className="site-banner site-banner-def" style={{display:"block"}} ref={bannerRef}> 
        <div className="site-banner-title">
                Access 31% MORE Listings by Joining up and Use Our Rebates to Buy Homes Below Asking Price*!
          </div> 
          <div className="site-banner-text"> 
            <span className="commontext">
                Register to become eligible.
            <strong> 
                <a href="#"
                  title="Sign up" 
                  data-url="/register.html" 
                  data-toggle="modal" 
                  data-target="signup" 
                  data-dismiss="modal" 
                  className="popup-modal-md"
              > 
              <button role="button" className="popup-modal-md" data-toggle="modal" data-target="signup" id="modal-login-form" > 
                  <span className="d-none d-sm-block">Get Started</span> 
                  <i className="fa fa-sign-in d-block d-sm-none"></i> 
              </button> 
              </a> 
              </strong>
              </span> 
             </div> 
             <button id="siteBannerClose" className="site-banner-close" type="button" data-gtm-global="globalBanner"  onClick={(e)=>onCloseBanner(e)}>X</button>
</div>

const getMainPhoto = (item) => {
    return (item.MainPicture && item?.MainPicture?.thumb?.url != null) ?
    <img src={item.MainPicture.thumb.url} alt={'MLS# '+ item.MLS_NUM }  key={item.MLS_NUM} className="w-md-100"  width={750} height={550}  threshold={0} />
    : <img  src={PhotoBaseUrl + 'no-photo/0/300/220/'}  width={750} height={550}  className="w-md-100"  alt="nophoto" />
}

const getSinglePhoto = (item) => {
    return (item && item!=null) ?
    <img src={item} alt={'MLS# '+ item.MLS_NUM }  key={item.MLS_NUM} className="w-md-100"  width={750} height={550}  threshold={0}/>
    : <img  src={PhotoBaseUrl + 'no-photo/0/300/220/'}  width={750} height={550}  className="w-md-100" alt="nophoto" />
}

const getMainPhotoCarousel = (item) => {
    return (item?.MainPicture && item?.MainPicture?.thumb?.url != null) ?
    <img src={item.MainPicture.thumb.url} alt={'MLS# '+ item.MLS_NUM }  key={item.MLS_NUM} className="w-md-100"  width={120} height={100}  threshold={0} />
    : <img  src={PhotoBaseUrl + 'no-photo/0/300/220/'} width={120} height={100}  className="w-md-100"  alt="nophoto" />
}

const getSinglePhotoCarousel = (item) => {
    return (item && item!=null) ?
    <img src={item} alt={'MLS# '+ item.MLS_NUM }  key={item.MLS_NUM} className="w-md-100"  width={120} height={100} threshold={0}/>
    : <img  src={PhotoBaseUrl + 'no-photo/0/300/220/'} width={120} height={100}  className="w-md-100" alt="nophoto" />
}

return (

        <>
        
        <div id='detail' className={isBlur ? 'blur-list':'page-wrapper custom-wrapper idxwrapper d-block'}>
        {/*  <div ref={headerRef}>
        {(bannerDisplay === true  && ('header' in HFOptions)) ? bannerDetail : ""}
            <Header headerRef={headerRef}/>
            </div> */}
      <div ref={headerRef} >
       {(('header' in HFOptions) && !(params.includes('popup'))) ? bannerDetail : ""}

        {('header' in HFOptions  && Object.keys(HFOptions.header).length > 0 && !(params.includes('popup'))) ? parse(HFOptions.header.toString()) :""}
        </div>
         <div className="bg-off-white homepage navigation-fixed ">
            <div className="page-wrapper custom-wrapper d-block"
                /* style={{overflowX: 'hidden !important', overflowY: 'scroll !important'}} */
                >
                    
            {(Action ==='good-deal' && arrNearby != null )?
                <div id="page-content" className={"bg-white"}  style={{display:"block",}} ref={pagecontentRef}>
                    
                
                    <h2 className="text-center -d-none" id="property-listing-title">Less expensive then near by property </h2>
                  
                    {(totalProperties > 0 && arrNearby!=null)?
                        <h4 className="text-center -d-none" id="property-cnt">  
                            <span className="results-number result-size">{format(totalProperties)}</span>
                            <span className="result-size"> Properties found</span>
                        <div className='m-35'>
                            <p className="lesstext">
                            <strong>   
                            DemoSite.com is a leading source for buying and selling demo site properties online.
                            </strong>
                            </p> 
                            <p className='lesstext1'>
                            <strong>
                            Here you can access new listings, save searches, submit online offers, register for available discounts and more. We provide accurate data and for more information contact our licensed demo site professionals.
                            </strong>
                            </p>
                        </div> 
                        </h4>:
                        <h4 className="text-center">
                        {(totalProperties===0) ? <span className="result-size"> {format(totalProperties)? format(totalProperties) :0}  Properties found</span>:
                        <span className="result-size"> Apart from good deals, here are some similar properties.</span> }
                            <br/> 
                        </h4>
                    }

                    

                  { (arrNearby.length > 0 )?
                    
                    <div id="lessexp-result" className="row m-0 mt-md-2 pb-5" style={{padding:35}}>
                      {
                        arrNearby.map((item,i)=>{
                            return(
                                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12" id={item.MLS_NUM}>
                                    <PropertyBox data={item}  userId={userId} simType={simType}/>
                                </div>

                            )})
                        }

                    
                        </div>:

                        
                        <div id="lessexp-result" className="row m-0 mt-md-2 pb-5" style={{padding:35}}>
                            {
                        
                        listArr.map((item,i)=>{
                        
                                return(
                                    <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12" id={item.MLS_NUM}>
                                        <PropertyBox data={item}  userId={userId} simType={simType}/>
                                    </div>

                                )})
                                
                            }

                        {(nearbyLoading === true && pLoading) && 
                        <>
                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 position-relative">
                        <Shimmer className="lsx  card-img img-fluid" width={441.5} height={220}/>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 position-relative">
                        <Shimmer className="lsx   card-img img-fluid" width={441.5} height={220}/>
                        </div>
                        <div className=" col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 position-relative">
                        <Shimmer className="lsx  card-img img-fluid" width={441.5} height={220}/>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 position-relative">
                        <Shimmer className="lsx   card-img img-fluid" width={441.5} height={220}/>
                        </div>
                    </>
                    }
                        </div>}

                       
                   
                  

                   
                    <hr/>
                    <div style={{marginTop:70}}/>
                </div>:
                 <> 
                <div id="page-content" className={(dLoading || delLoading === false)? "bg-white padding_bottom":"bg-off-white"+ " padding_bottom"}  style={{display:"block",}} ref={pagecontentRef}>
                   
                            
                            <div className="container-fluid" style={{ overflowY: "auto"}}>
                                <div className="row mt-2">
                                    <div id="pl-bar" className="col-12 col-md-12 col-lg-12 col-xl-9" >
                                        
                                 
                                     <PropBasicInfo  data={detailObj} 
                                                        status={status} 
                                                        status_className={status_class} 
                                                        modalLgContent={modalLgContent} 
                                                        loadLG={(action)=>(modelLGShow(action))} 
                                                        modalShare={modalShare} 
                                                        modalgetCashBack={modalgetCashBack}
                                                        userId={userId}
                                                        isgetCashBack={configObj}
                                                        propcity={propcity}
                                                        listingMLS={listingMLS}
                                                      
                                                        /> 

                                                        

                                     {(detailObj !== false && detailObj !== null && typeof detailObj === 'object' && !('isoffmarket' in detailObj) ) &&
                                        <section className="mb-3">
                                            <div itemScope itemType="http://schema.org/Property" id="slider" className="flexslider mb-2" style={{textAlign:'center'}}>
                                            {PriceCircl ? 
                                            <figure itemScope itemType="http://schema.org/price" itemProp="price"
                                                    className="circle float-right price_percentage" style={{right:0,top:0}}> {detailObj.Price_Diff+"%"+" " +PriceCircl}</figure>
                                                    : null}
                                       
                                            <ul itemScope itemType="https://schema.org/SingleFamilyResidence" className="slides"> 
                                            {(detailObj.TotalPhotos > 1  && (('PhotoAll' in detailObj)=== true) ) ? 
                                                <Slider speed={500}
                                                        asNavFor={sliderNav.nav2}
                                                        ref={slider => (slider1 = slider)}
                                                        prevArrow={<SlickArrowLeft mainSlider={true} />}
                                                        nextArrow={<SlickArrowRight  mainSlider={true} />}
                                                        arrows={true}
                                                        centerPadding='0px'
                                                        infinite= {false}
                                                        centerMode= {true}
                                                        cssEase= 'ease-in-out'
                                                        slidesToShow= {1}
                                                        adaptiveHeight={false}
                                                        >
                                                {
                
                                                (detailObj && "PhotoAll" in detailObj  && photoAll.length > 0) ? 
                                                    
                                                 photoAll.map((item,i)=>{
                                                        return(

                                                            <li itemProp="itemListElement" key={"slider"+item}> 
                                                                <div data-val={item} className="fancy-box-image"
                                                                    id="gallery3-1" data-fancybox="gallery3-1"
                                                                    data-caption={detailObj.MLS_NUM+'-'+i}
                                                                    width="1500"
                                                                    height="1000"> 
                                                                
                                                                            <LazyLoadImage
                                                                            itemProp="image"
                                                                            threshold={i === 0 ? 0:1200}
                                                                            draggable="false"
                                                                            src={item+"/750/550/30"}
                                                                            loading="lazy"
                                                                            alt={`MLS# ${detailObj.MLS_NUM}`} 
                                                                            key={"SLIDER-"+detailObj.MLS_NUM+i}
                                                                            className="w-md-100"
                                                                            />
                                                                </div> 
                                                            </li> 

                                                        )

                                                    })
                                                    :
                                                           
                                                    <li itemProp="itemListElement" key={"slider-no-photo"}> 
                                                        <div className="fancy-box-image" 
                                                            data-val={PhotoBaseUrl + 'no-photo/0/600/320/'}
                                                            id="gallery3-1" 
                                                            data-fancybox="gallery3-1"
                                                            data-caption="Caption for single image" 
                                                            width="1500"
                                                            height="1000"> 
                                                        {   dLoading ?
                                                            null:   
                                                            <img itemProp="image"
                                                                src={PhotoBaseUrl + 'no-photo/0/600/320/'}
                                                                alt={"nophoto"} 
                                                                key={"NO-PHOTO- "+detailObj.MLS_NUM} 
                                                                className=" w-md-100 BannerImageWidth"/>
                                                                }
                                                        </div>  
                                                    </li> 
                                                           
                                                    }
                                               
                                                </Slider>:
                                                 (detailObj.mls_is_pic_url_supported == 'Yes' )?
                                                 <div 
                                                 id="gallery3"
                                                 className="fancy-box-image" 
                                                 data-width="1500"
                                                 data-height="1000"> 
                                                 {getMainPhoto(detailObj)}
                                                 </div>
                                                :
                                                 <div 
                                                id="gallery3" 
                                                className="fancy-box-image" 
                                                data-width="1500"
                                                data-height="1000"> 
                                                 {getSinglePhoto(mainPic)}
                                                 </div>}
                                            </ul>  
                                            </div>
                                            <div id="carousel" className="flexslider mb-0" >
                                            
                                            <ul itemScope itemType="https://schema.org/SingleFamilyResidence" className="slides">  
                                            {(detailObj.TotalPhotos > 1  && (('PhotoAll' in detailObj)=== true) ) ? 
                                                <Slider speed={500}
                                               asNavFor={sliderNav.nav1}
                                               ref={slider => (slider2 = slider)}
                                                        slidesToShow={10}
                                                        slidesToScroll={10}
                                                        swipeToSlide={true}
                                                        focusOnSelect={true}
                                                        arrows={true}
                                                        lazyLoad={true}
                                                        prevArrow={<SlickArrowLeft />}
                                                        nextArrow={<SlickArrowRight />}
                                                        centerMode={false}
                                                        adaptiveHeight={false}
                                                        cssEase= 'ease-in-out'
                                                        infinite={false}
                                                        beforeChange={handlebeforechangeSlider}
                                                        afterChange={handleafterChangeSlider}
                                                        accessibility= {false}
                                                        responsive= {responsiveSetting}
                                                        >
                                                   
                                                   
                                                {
                                            (detailObj && "PhotoAll" in detailObj  && photoAll.length > 0) ? 
                                            
                                     photoAll.map((item,i)=>{
                                                    
                                                    return(
                                                        
                                                    <li itemProp="itemListElement" alt={`MLS# ${detailObj.MLS_NUM}`}  key={"carousel"+item}> 
                                                        <div 
                                                            id="gallery7-1" 
                                                            data-caption="Caption for single image" 
                                                            data-width="1500"
                                                            data-height="1000"> 
                                                    {(item) ? <LazyLoadImage 
                                                            itemProp="image"
                                                            src={i === 0 ? item+"/120/100/30": item+"/120/100/70"}
                                                            draggable='false'
                                                            height={100} 
                                                            width={120}
                                                            alt={`MLS# ${detailObj.MLS_NUM}`} 
                                                            threshold={1000}
                                                            key={"CAROUSEL-"+detailObj.MLS_NUM+i}
                                                            className="p-1 w-md-100 BannerImageWidth"
                                                            />:
                                                            
                                                            <img itemProp="image"
                                                            src={PhotoBaseUrl + 'no-photo/0/120/100/'}
                                                            alt="no-photo"
                                                            height={100} 
                                                            width={120}
                                                            key={"NO-PHOTO "+detailObj.MLS_NUM} 
                                                            className=" w-md-100 BannerImageWidth"/>
                                                            }
                                                        </div>
                                                    </li>  
                                                        
                                                    )
                                                    
                                                }):
                                                
                                                    <li itemProp="itemListElement"> 
                                                        <div
                                                            id="gallery7-1" data-fancybox="gallery7-1"
                                                            data-caption="Caption for single image" data-width="1500"
                                                            data-height="1000"> 
                                                            {dLoading?
                                                            <Shimmer  className="lzl w-md-100 BannerImageWidth" width={120} height={100}> </Shimmer>   :
                                                            <img itemProp="image"
                                                            src={PhotoBaseUrl + 'no-photo/0/120/100/'}
                                                            height={120} width={100}
                                                            key={"NO-PHOTO "+detailObj.MLS_NUM} 
                                                            alt={`MLS# ${detailObj.MLS_NUM}`} className="lzl w-md-100 BannerImageWidth"/>} 
                                                        </div>
                                                    </li>  
                                            }
         
                                                </Slider>:
                                                (detailObj.mls_is_pic_url_supported == 'Yes' )?
                                               
                                                 <div 
                                                 id="gallery7" 
                                                 data-caption={detailObj.MLS_NUM}
                                                 data-width="1500"
                                                 data-height="1000"> 
                                                 {getMainPhotoCarousel(detailObj)}
                                                 </div>
                                                :
                                                 <div 
                                                id="gallery7" 
                                                data-caption={detailObj.MLS_NUM}
                                                data-width="1500"
                                                data-height="1000"
                                                > 
                                                { getSinglePhotoCarousel(mainPic)}
                                                 </div>}
                                            </ul>
                                            </div>
                                        </section>}
                
                                     {(detailObj.VirtualTourUrl && (detailObj.MLS_NUM != undefined ))?
                                        <section itemScope="" itemType="https://schema.org/video" className="box-white block virtual_block">
                                        <div className="virtual-tour mb-0"> <i className="fa fa-video-camera" aria-hidden="true"></i>&nbsp;
                                                <a itemProp="CreativeWork" style={{textTransform:'capitalize'}}
                                                    href={detailObj.VirtualTourUrl}
                                                    target="_blank" title="Click to start Virtual and 3D Tours"><strong>Click to start
                                                    Virtual and 3D Tours </strong></a>
                                            </div>
                                        </section>:null}

                                        {(detailObj.Description && (detailObj.MLS_NUM != undefined ))?<section itemScope="" itemType="https://schema.org/description"
                                            className="box-white block prop_des">
                                            <h3 className="b-title"><strong>Property Description</strong></h3>
                                            <p itemProp="Text" className="text-justify prop-font" >
                                            {detailObj.CityName+" "+"Homes For Sale."}&nbsp;{detailObj.Description.replaceAll(',',', ')}
                                            </p>
                                        </section>:null}

                                        {(detailObj.MLS_NUM != undefined ) &&
                                        <PropInfo_Feature detailObj={detailObj}/>}

                                        {(detailObj !== false && detailObj !== null && typeof detailObj === 'object' && !('isoffmarket' in detailObj)) &&  
                                       <Zestimate Objzestmate={Objzestmate} arrZestax={arrZestax}/>}

                                     {(detailObj !== false && detailObj !== null && typeof detailObj === 'object' && !('isoffmarket' in detailObj)) &&  
                                        <section className="box-dark-gray block" id="sch-cal">
                                            <div className="row">
                                                <div className="col-12 col-sm-6 col-md-12 col-lg-7 col-xl-8">
                                                    <div className="text-center text-lg-left mt-lg-1 inquiry-font-size">Send a request to
                                                        Property Owner to visit the property</div>
                                                </div>
                                                <div className="col-12 col-sm-6 col-md-12 col-lg-5 col-xl-4 text-center text-lg-right"> <a
                                                        data-toggle="modal" href="#"
                                                        id="sch_top_btn"
                                                        className="btn btn-primary sch_tour-btn" 
                                                        data-target="modal-popup-ss" title={detailObj.ListingID_MLS}
                                                        onClick={ScheduletourModalPopup}
                                                        //data-url="https://www.demosite.com/north-palm-beach-homes-for-sale/12210-banyan-road-north-palm-beach-fl-33408-mls-r10825079-3?Action=Schedule&amp;mlsno=R10825079-3"
                                                        >I want to see your property</a> </div>
                                            </div>
                                        </section> }
                                      
                
                                        {(detailObj.MLS_NUM != undefined ) &&  
                                        <section className="box-white block">
                                            <MortgageNew item={detailObj}/>
                                        </section> }
                                        
                                        {detailObj !== false && detailObj !== null && typeof detailObj === 'object' &&
                                      <MedianPrice detailObj={detailObj}/>}

                                        {
                                        (configObj['deal_score'] === 'Yes' && (detailObj && detailObj.MLS_NUM != undefined )) && 
                                        <section id = "dealscoresection" className="box-white block deal_score_section">
                                                <DealScore detailObj={detailObj} score={propertyScore}/>
                                        </section>
                                        }

                                          {(detailObj !== false && detailObj !== null && typeof detailObj === 'object' &&  !('isoffmarket' in detailObj))&&
                                            <MarketReport detailObj={detailObj} cityStcList={cityStcList} zipStcList={zipStcList}/>
                                        }

                                      {((detailObj.Latitude != null && detailObj.Longitude != null) || Arrlatlng ) && 
                                        <section className="box-white block">
                                            <GMapDetail mapObj={detailObj} Arrlatlng={Arrlatlng}/>
                                        </section> } 
                                           
                                        
                              {(Object.keys(objCensus).length > 0 && objCensus[0]) && 
                               <section className="box-white block">
                                     <h3 className="b-title"><strong>Demographics</strong></h3>
                                            <div className="census-view" id="census-data">
                                                <iframe
                                                        title={"myFrame1 "+householdId}
                                                        id={householdId}
                                                        className="census-reporter-embed"
                                                        src={householdhref} 
                                                        width="100%" height="300" 
                                                        style={{margin: 1,border:0}}>
                                                </iframe> 
                                                <iframe
                                                        title={"myFrame2 "+employmentID}
                                                        id={employmentID}
                                                        className="census-reporter-embed"
                                                        src={employmenthref}
                                                        width="100%" height="300" 
                                                        style={{margin: 1,border:0}}>
                                                </iframe>
                                            </div>
                                </section>  } 

                                 <div  className="row  mx-0  box-white" 
                                          id="walkscore">
                                             <h3 className="col-12 b-title"><strong>Walkscore</strong></h3>  
                                            <div className='row text-center'>
                                            
                                            
                                            <div className={`col-12 col-sm-12 col-md-4 col-lg-4 mt-5`} > 
                                            <FontAwesomeIcon icon={faPersonWalking} size="3x" color='#454545'/>
                                                                        <h4 className='mt-2'><strong>Walk Score*</strong></h4>
                                                                        { (isClient) ?     <CircularProgress size="lg" 
                                                                                        determinate 
                                                                                        value={objWalkScore.walkscore ? objWalkScore.walkscore:0 } 
                                                                                        className={"background"}
                                                                                         >
                                                                                             
                                                                        <h5>{objWalkScore.walkscore ? objWalkScore.walkscore:0}</h5>
                                                                       </CircularProgress>:
                                                                        <h5>{objWalkScore.walkscore ? objWalkScore.walkscore:0}</h5>}
                                                                      
                                            </div>
                                       
                                        <div itemScope  
                                        className={`col-12 col-sm-12 col-md-4 col-lg-4 mt-5`}>
                                        <FontAwesomeIcon icon={faMotorcycle} size="3x" color='#454545'/>
                                                                        <h4 className='mt-2'><strong>Bike Score*</strong></h4>
                                                                        { (isClient) ?   <CircularProgress size="lg" 
                                                                                        className={"background"}
                                                                                        determinate 
                                                                                        value={(objWalkScore.bike && objWalkScore.bike.score !=null ) ? objWalkScore.bike.score:0} 
                                                                                        backgroundcolor='#ec9f32'>
                                                                                        <h5>{(objWalkScore.bike && objWalkScore.bike.score !=null ) ? objWalkScore.bike.score:0}</h5>
                                                                        </CircularProgress>:
                                                                         <h5>{(objWalkScore.bike && objWalkScore.bike.score !=null ) ? objWalkScore.bike.score:0}</h5>}
                                                            
                                            </div>
                                           
                                            <div itemScope 
                                            className={`col-12 col-sm-12 col-md-4 col-lg-4 mt-5`}>
                                                <FontAwesomeIcon icon={faTrain} size="3x" color='#454545'/>
                                                                        <h4 className='mt-2'><strong>Transit Score*</strong></h4>
                                                                        { (isClient) ?   <CircularProgress size="lg" 
                                                                                            determinate 
                                                                                            className={"background"}
                                                                                            value={(objWalkScore.transit && objWalkScore.transit.score !=null ) ? objWalkScore.transit.score:0} backgroundcolor='#ec9f32'>
                                                                        <h5>{(objWalkScore.transit && objWalkScore.transit.score !=null ) ? objWalkScore.transit.score:0}</h5>
                                                                        </CircularProgress>:
                                                                          <h5>{(objWalkScore.transit && objWalkScore.transit.score !=null ) ? objWalkScore.transit.score:0}</h5>}
                                                                       
                                            </div>
                                         
                                           <div className="col-12 disclaimer mt-4">
                                            DISCLAIMER: The content provided here in is from WalkScore and for informational purposes only. No representation or warranty is made regarding its accuracy or completeness and is subject to change without notice.
                                            </div>
                                            
                                            </div>   
                                </div>
                                {(detailObj.MLS_NUM != undefined) &&
                                <>
                                <section className="box-white block similar_homes_block">
                                    <h3 className="b-title"><strong>Similar Homes For Sale</strong></h3>
                                    <div className="col-12">
                                        <ul className="nav nav-tabs mb-3" id="myTab">
                                            <li className="nav-item te-pre-saveser" id="simi-price"> <a className="nav-link "
                                                    data-toggle="tab" href="" title="Price" onClick={()=>handlePriceToggle()}>Price</a> </li>
                                            <li className="nav-item te-pre-saveser " id="simi-type" > <a className="nav-link active"
                                                    data-toggle="tab" href="" title="Type" onClick={()=>handleTypeToggle()}>Type</a> </li>
                                            <li className="nav-item te-pre-saveser" id="simi-zipcode"> <a className="nav-link "
                                                    data-toggle="tab" href="" title="Zipcode" onClick={()=>handleZipToggle()}>Zipcode</a> </li>
                                        </ul>
                                    </div>
                                
                                {(detailObj.MLS_NUM != undefined) ? <>
                                <section className={`col-12 mt-4 ${toggleType ? "d-block":"d-none"}`} id="Similar_type_Listings">
                                    <div className="row">
                                            {(listSimPropByType.length > 0) ?
                                            listSimPropByType.map((item,i)=>{
                                                return(
                                                    <div className="col-12 col-sm-12 col-md-4 " key={item.ListingID_MLS} >
                                                    <PropertyBox data={item}  userId={userId} simType={simType}/>
                                                    </div>
                                                )
                                            })
                                        :
                                        <>
                                        
                                    
                                        
                                    </> 
                                        }
                                        
                                            
                                        </div>
                                </section>
                                <section className={`col-12 mt-4 ${togglePrice ? "d-block":"d-none"}`} id="Similar_price_Listings">
                                    <div className="row">
                                            {(listSimPropByPrice.length > 0) ?
                                            listSimPropByPrice.map((item,i)=>{
                                                return(
                                                    <div className="col-12 col-sm-12 col-md-4 " key={item.ListingID_MLS} >
                                                    <PropertyBox data={item}  userId={userId} simType={simType}/>
                                                    </div>
                                                )
                                            })
                                        :
                                        null
                                        
                                        }
                                        
                                            
                                        </div>
                                </section></>:
                                null
                                }
                                </section>
                                <section className="box-white block">
                                <div className="row quick-buttons">
                                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12"> <a href="tel:(+1)-561-614-5353"
                                            className="btn shadow te-quick-deal-btn py-2 w-100 text px-1 mb-2"
                                            title="Tel Phone">
                                            <div className="text-white wrap-font text-center-qd">Contact Us</div>
                                        </a> </div>
                                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12"> 
                                    <button type="button" 
                                            name="Submit"
                                            onClick={()=>GetCashbackModalPopup()}
                                            className="btn icon shadow btn-inquiry py-2 get-cashback-2" 
                                            data-toggle="modal"
                                            id="get-cashback-2" 
                                            >GET CASHBACK</button> </div>
                                </div>
                                </section>
                                </>}

                                {(detailObj.MLS_NUM != undefined ) ?
                                <section className="box-white block" id="Similar_Sold_Listings">
                                    <h3 className="b-title"><strong>Similar Sold Homes</strong></h3>
                                    <div className="row">
                                    {(listSimPropForSold.length > 0) ?
                                            listSimPropForSold.map((item,i)=>{
                                                return(
                                                    <div className="col-12 col-sm-12 col-md-4" key={item.ListingID_MLS} >
                                
                                                    <PropertyBox data={item} userId={userId} soldType={soldType}/>
                                                    </div>
                                                )
                                            })
                                        :
                                        null
                                        
                                        }
                                        
                                    </div>
                                </section>
                                :
                                <section className="box-white block" id="Similar_Sold_Listings">
                                <h3 className="b-title"><strong>Similar Sold Homes</strong></h3>
                                <div className="row">
                                {(listArr.length > 0) ?
                                        listArr.map((item,i)=>{
                                            return(
                                                <div className="col-12 col-sm-12 col-md-4" key={item.ListingID_MLS} >
                            
                                                <PropertyBox data={item} userId={userId} soldType={soldType}/>
                                                </div>
                                            )
                                        })
                                    :
                                    null
                                    
                                    }
                                    
                                </div>
                                </section>}
                                {(detailObj.MLS_NUM != undefined) &&
                                <section className='mb-5'>
                                    <p><small>{ detailObj.Agent_FullName !== "" && "Listing courtesy of "+ detailObj.Agent_FullName}, {detailObj.Office_Name !== "" && detailObj.Office_Name}.  </small></p>
                                </section> }
                                </div>
                
                               <PropRightBar detailObj={detailObj} 
                                modalScheduleTour={modalScheduleTour} 
                                loadLG={(action)=>(modelLGShow(action))} 
                                modalgetCashBack={modalgetCashBack} 
                                isgetCashBack={configObj}/> 
                               

                                </div>
                            </div>
                         
                </div> 
                <section>
                    <div className="row modal right fade show" id="sideopening" role="dialog" aria-labelledby="myModalLabel2"
                        style={{zIndex: 1040, display: "none"}} ref={modalgetCashBack}>
                        <div className="modal-dialog m-0" role="document">
                            <div className="modal-content">
                                {showModalCashbContent}
                            </div>
                        </div>
                    </div>
                    <style> </style>
                </section>
                </> 
            }
               
            <div className="modal fade-"   id="modal-popup-lg" role="dialog" aria-hidden="true" ref={modalShare}
                    style={{zIndex: 1040, display:"none"}} title="Modalshare">
                    <div className="modal-dialog modal-popup modal-lg">
                        <div className="modal-content p-3" ref={modalLgContent}>
                            {showModalContent}
                        </div>
                    </div>
            </div>
                
            <div className="modal fade show modal-stack " id="modal-popup-ss" role="dialog" aria-hidden="true" title="ModalSchedule"
             style={{zIndex: 1040, display:"none"}} ref={modalScheduleTour}>
                    <div className="modal-dialog modal-popup modal-md share_modal">
                        <div className="modal-content">
                        {showSSModalContent}
                    </div>
                    </div>
            </div> 

            <div className="modal" id="saveSearch" style={{zIndex: 1040, display:"none"}}>
            <div className="modal-dialog modal-popup align-top"> 
            <div className="modal-content">
                <div className="modal-header"> 
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{zIndex: 1040, display:"none"}}>
                    <span aria-hidden="true">×</span>
                    </button> 
                    <div className="modal-title"> 
                    <h2>Save This Search</h2> 
                    </div> 
                </div> 
                <div className="modal-body"> 
                    <div className="text-center" id="save_search_response">
                    </div> 
                    <div className="row"> 
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 form-group">
                    <p> <strong>Property Type: </strong>residential<br/> </p> 
                    </div> 
                    </div> 
                    <form id="frmSaveSearch" name="frmSaveSearch" action="" method="post" className="" > 
                    
                        <div className="row"> 
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 form-group form-group">
                                
                                <input type="text" className="form-control rounded required" 
                                        id="search_title" aria-describedby="search_title" 
                                        name="search_title" 
                                        key="search_title"
                                        placeholder="Enter your save search title" 
                                        data-msg-required="Please enter search title" 
                                        aria-required="true"
                                        /> 
                                </div> 
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 form-group form-group"> 
                                    <button type="submit" className="btn bg-primary text-white rounded-0 w-100"
                                
                                            >Save</button> 
                                    <input name="Reset" type="reset" className="d-none" value="Reset"/> 
                                </div> 
                        </div> 
                    </form> 
                </div>
            </div> 
            </div>
            </div>                      
            </div>
         
         </div>
        </div>

        {!isBlur ? 
            ('popup' in HFOptions  && Object.keys(HFOptions.popup).length > 0) && parse(HFOptions.popup.toString()) 
            :
            ('popup_backdrop' in HFOptions  && Object.keys(HFOptions.popup_backdrop).length > 0) && parse(HFOptions.popup_backdrop.toString())
            } 

          {('detailfooter' in HFOptions && Object.keys(HFOptions.detailfooter).length > 0 && !(params.includes('popup')))? parse(HFOptions.detailfooter.toString()):''} 
          
        </>
         
       )
 
}

export default DetailPage


 