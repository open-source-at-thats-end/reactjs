"use client"
import React,{useRef,useEffect,useState,createRef,useMemo, useLayoutEffect} from 'react';
import PropertyBox from './PropertyBox';
import Autosuggetion from './Autosuggetion';
import SearchFilter from './SearchFilter';
import GMapNew from './GMapNew';
import { useDispatch,useSelector } from 'react-redux';
import { postPropertyList } from '../ThunkSlices/PropertyLIstSlice';
import { postMenuFilterList } from '../ThunkSlices/FilterMenuSlice';
import { postOfficeIDList } from '../ThunkSlices/PageIDSlice';
import { LoadScript} from '@react-google-maps/api';
import { getSelectedFilters,selectFilter } from '../ThunkSlices/PropertyLIstSlice';
import { postHeaderFooterList } from '../ThunkSlices/PostHeaderFooterSlice';
import { getFavouriteList } from '../ThunkSlices/GetFavouriteSlice';
import parse from 'html-react-parser';
import {Image,Shimmer} from 'react-shimmer';
import Cookies from 'js-cookie';
import { postSaveSerchList } from '../ThunkSlices/PostSavesearchSlice';
import { postZipStatisticList ,resetZip} from '../ThunkSlices/ZipStatisticSlice';
import { postCityStatatics,resetCity } from '../ThunkSlices/CityStatisticSlice';
import Statistic from './Statistic';
import {DEAL_PAGE_ID,SEARCH_PAGE_ID,SEARCH_PROP_URL,SEARCH_URL} from '../constant';
import {useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getConfigList } from '../ThunkSlices/GetConfigSlice';
import { Utility } from '../Utility';
import ModalFilters from './ModalFilters';
import OnlineBargainPopup from './OnlineBargainPopup';
import { postPredefineIDList } from '../ThunkSlices/PostPredefineIDSlice';
import { postCityBounds } from '../ThunkSlices/postCityboundSlice';
import { format } from '../constant';
import '../styles/mapsearch.css'
let simType=true;
let maintype=true;
import Head from 'next/head';


function MapSearch() {
    const router=useRouter()
    const mapRef = useRef();
    const frmFilterRef = useRef();
    const listRef = useRef();
    const statisticRef =useRef();
    const scrollRefs = useRef({});
    const menuRefs = useRef(null);
    const modallgref = useRef(null)
    const switchRef = useRef(null);
    const filterRef = useRef(null);
    const headerRef = useRef(null);
    const bannerRef = useRef(null);
    const[isBlur,setIsBlur] = useState(false);
    const[isBanner,setIsBanner] = useState(false);
    const[isDisplayBanner,setisDisplayBanner] = useState("");
    const[bannerDisplay,setBannerDisplay] = useState(false);
    const[userId,setUserId]=useState(Cookies.get('_ul'));
    const dispatch = useDispatch();
    const {pLoading,listArr,totalRecord,cityBound,startRecord}=useSelector((state)=>state.propertyList);
    const {HFOptions,HFLoading,}=useSelector((state)=>state.HeaderFooterList);
    const {favDataObj}=useSelector((state)=>state.FavouritesList);
    const {zipStcList}=useSelector((state)=>state.zipStcList);
    const {cityStcList}=useSelector((state)=>state.cityStcList);
    const {idLoading,objPage}=useSelector((state)=>state.pIDList);
    const {pidLoading,objPredefID}=useSelector((state)=>state.predefID);
    const {configObj,cnfgLoading}=useSelector((state)=>state.getconfig);
    const [mapHeight, setmapHeight] = useState(0);
    const [headHeight, setHeadHeight] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showPages, setShowPages] = useState([]);
    const [listPages, setListPages] = useState([]);
    const [pageSize, ] = useState(24);
    const [lastpage,setLastPage ] = useState(0);
    const [libraries] = useState(["geometry", "drawing", "places"]);
    const[resultData,setResultData]=useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [frmSubmitted, setFrmSubmitted] = useState(false);
    const [isLoggedinUser,setisLoggedinUser]=useState(false);
    const [title,setTitle]=useState({search_title:''})
    let [objFilter, setFilters]=useState({});
    let [formObj, setformObj]=useState(false);
    let [listData, setListData]=useState([]);
    let [sortItem, setSortItem]=useState([]);
    const objSelFilters = useSelector(selectFilter);
    const [totalRecordCL, setTotalRecordCL] = useState(0);
    const [toggleSwitch, setToggleSwitch] = useState(false);
    const [toggleGrid, setToggleGrid] = useState(false);
    const [refresPage, setRefresPage] = useState(true);
    const [mapnw,setMapnw]=useState();
    const [fromUrl, setFromUrl] = useState(false);
    const [favProperty, setFavProperty] = useState({});
    const [toggleBtn, setToggleBtn] = useState(false);
    const [showLGPopup, setShowLGPopup] = useState();
    const [newtitle, newSetTitle] = useState('homes for sale');
    const params = usePathname();
    let defaultPages = 5;
    let activeIndex;
    const mapSortOpt = {
        'price|desc': 'Price (High to Low)',
        'price|asc': 'Price (Low to High)',
        'sqft|desc': 'Sqft (High to Low)',
        'sqft|asc': 'Sqft (Low to High)',
        'beds|desc': 'Beds (High to Low)',
        'beds|asc': 'Beds (Low to High)',
        'baths|desc': 'Bath (High to Low)',
        'baths|asc': 'Bath (Low to High)',
    }

    const memoizedMapSortOpt = useMemo(() =>mapSortOpt, []);

    const handleSortOption = ( val) => {
        let sortby = val.split("|");
        setSortItem(sortby);
        let objSortby={};
        objSortby['so'] = sortby[0];
        objSortby['sd'] = sortby[1];
        objFilter={...objFilter, ...objSortby}
        setFilters(objFilter)
    }

    useEffect(() => {
        //console.log("===================1-hflist");
         var uID = Cookies.get('_ul');
       
             //getParam(params);
         if(uID != undefined){
            //Cookies.remove('spvc')
            setTimeout(() => {
                dispatch(postHeaderFooterList({IsUserLogged:true, user_id:uID}));
             setUserId(uID) 
            }, 1500);
            /* const handleBeforeUnload = () => {
                Cookies.remove('_ul');
              };
          
              window.addEventListener('beforeunload', handleBeforeUnload);
          
              return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
              }; */
         }else{
             dispatch(postHeaderFooterList());
         }
       
     },[Cookies.get('_ul'), userId]);


    useEffect(() => {
         
        let promise;
            dispatch(getSelectedFilters(objFilter));
           
           if('our' in objFilter && objFilter.our == 'listing' && 'office' in objFilter){
            dispatch(postOfficeIDList(DEAL_PAGE_ID));
            setTimeout(() => {
                    modallgref.current.style.zIndex = 1040;
                    modallgref.current.style.display = 'block';
                    modallgref.current.style.backgroundColor="rgba(0,0,0,0.6)"
                    modelLGShow('onlinebargain');
                }, 10000);
           
           }else{
            //dispatch(postOfficeIDList(SEARCH_PAGE_ID));
           }

           if(Object.keys(objFilter).length > 0 && ('pid' in objFilter) === true){
            dispatch(postPredefineIDList(objFilter['pid']))
           }
        
            if(Object.keys(objFilter).length > 0 && ('currentLocation' in objFilter) == false ){
                //if(('city' in objFilter)=== false ){ //currently this is commented because when pid in url that time i want to make call this posrurlparam function  
                    ///when prepare get filters that time we do not post posturlparam
                    if(fromUrl === false)
                        postUrlParam(objFilter)
                    else
                        setFromUrl(false);
                //}
           
            promise=dispatch(postPropertyList(objFilter))
            if('addval' in objFilter && objFilter['addval'] != '')
                dispatch(postCityBounds(objFilter))
            }

            let lParam = (objFilter['addval']!=null) && objFilter['addval'].toLowerCase().split(' ').map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
              }).join(' ');
             /*  if(lParam!='' && lParam.includes('#')=== true){
                lParam=lParam.replace("# ",'')
            } */
            document.title=lParam ?`${lParam}  Homes For Sale |  demo site` :" Home For Sale | demo site"
            newSetTitle(document.title);
            
            return()=>{
                if(promise != undefined)
                promise.abort();
            
            }
       
       
    }, [dispatch,objFilter]); 

    useEffect(()=>{
        document.body.classList.add('overflow-hidden'); //to remove scroll
    });


    useEffect(() => {
        if ( menuRefs.current && headerRef.current){
             calHeight();
        }
        
    },[HFOptions,isBanner]);

   
  useEffect(() => {
        setisDisplayBanner(sessionStorage.getItem("bannerClosedIcon"));
        if (isDisplayBanner != undefined && isDisplayBanner == "No" && isDisplayBanner != null &&  isDisplayBanner !== "" ) {
          setIsBanner(true);
          //bannerRef.current.style.display="none";
        }
        //this function use for header tab remove when make console up-down so using this func solve problem
        setTimeout(() => {
        
            if(typeof window !== undefined){
                window.callbackfunc();
                window.rebindCustomEvents()
            }
        
          //setBannerDisplay(true)  
          //make banner true,putting here because banner is display after calculate map height so map render properly
      }, 500);
      
      }, [HFOptions,isDisplayBanner])


    useEffect(() => {
        dispatch(resetCity());
        dispatch(resetZip());
        if(objFilter.addval != '' ){
            if(objFilter.addtype ==  'cs'){
                dispatch(postCityStatatics({addtype:'cs',addval:objFilter.addval,ptype:objFilter.ptype}));
            }
            
            if( 'addtype' in objFilter && objFilter.addtype == 'zip'){
                dispatch(postZipStatisticList({addtype:'zip',addval:objFilter.addval,ptype:objFilter.ptype}));
            }
        }
       
    }, [objFilter.addval,objFilter.ptype])

     useEffect(() => {
        //var uID = Cookies.get('_ul');
        //dispatch(postMenuFilterList());
       getParam(params);

              
        if(userId != undefined){
            dispatch(getFavouriteList({"user_id":userId}))
        }else{
            //dispatch(postHeaderFooterList());
      
        }
        
    },[Cookies.get('_ul'),userId]);

  
    useEffect(() => {
        if(favDataObj !=undefined)
            setFavProperty(favDataObj)
    }, [favDataObj])

    useEffect(() => {
        dispatch(getConfigList())
        dispatch(postMenuFilterList());
       }, [])


   // TODO: Reset page as initial page at every where when get new data from API.
   

    useEffect(() => {
        ////console.log("===================4-pagination for both listarr");
        setTotalRecordCL(0);
    
        if(listArr.length > 0){
            setDataForView(listArr, refresPage)
            setRefresPage(false)
        }
        else{
            setListData([])
            setShowPages([]);
        }
    }, [listArr]); 


 
  const getParam=(params)=>{
    const objUtility = new Utility();
    if( (params.includes('ptype') === false) ){
        if ( (params.includes('clfr') !== false) || (params.includes('ispricereduce-Yes') !== false) || (params.includes('ispricereduce-1') !== false)) 
            params += '';
        else
            params += '/ptype-residential';
    }
    if((params.includes(SEARCH_URL) === true) ){
        params = params.replace(SEARCH_URL,'')
    }
    

    if( (params.includes('/addtype') === true) ){
        params += "/isNewSearch-1"
       //console.log(params); 
    }
    
    var dataParam = objUtility.SearchParamAndURL(params);
    /* if(('ptype' in dataParam.sparam) === true && dataParam.sparam['ptype']=='residential' || ('clfr' in dataParam.sparam)===true){
        let defObj={'defaultsearch':true}
        dataParam.sparam={...dataParam.sparam,...defObj}
    } */
   
    setFilters(dataParam.sparam);
    setFromUrl(true);
    if (typeof window !== 'undefined'){
        window.history.pushState({},'',SEARCH_PROP_URL+dataParam.url)
        
    }
 
 }
  
  const postUrlParam=(params)=>{
    let d = {}
    const objUtility = new Utility();
    var objParam = {}
    objParam = {...params}

   if('pid' in objParam){
    delete objParam['pid']
   }

   //below is because if in url get # then it is remove from url and its not working
  if('addval' in objParam && objParam['addval'].includes("#")==true){
    objParam['addval']=objParam['addval'].replace("#","")  
   } 

    let dataParam = objUtility.SearchParamAndURL(false,objParam)
    
    if(typeof window !=undefined){
        window.history.pushState({},'',SEARCH_PROP_URL+dataParam.url)
    }
 
  }
   const setDefaultFilter = (objParam) => {
        // Set default params
   
        if(!('page' in objParam))
            objParam['page'] = 1
        if(!('so' in objParam))
            objParam['so'] = 'price'
        if(!('sd' in objParam))
            objParam['sd'] = 'desc'
        if(!('ptype' in objParam) && !('clfr' in objParam) ){
            objParam['ptype'] = ['residential']
        }
           
         return objParam
  }
    // Everytime at new call
    const setDataForView = (arrItems, resetPage=false) => {
        var initialPage = 1;
        if('page' in objFilter && resetPage === true)
            initialPage = parseInt(objFilter['page']);
       
 
        if(resetPage === false){
                var resetSrtFilter={};
                resetSrtFilter['so']=objSelFilters.so
                resetSrtFilter['sd']=objSelFilters.sd
            }
           
       
        if(resetPage === false){
            var resetFilter={};
            resetFilter['page'] =  initialPage
             resetFilter = {...objFilter, ...resetFilter};
           //postUrlParam(resetFilter);
        }
        setCurrentPage(initialPage);
        var start_record = (initialPage-1)*pageSize;
        setResultData(arrItems)
        setListData(arrItems.slice(start_record, (pageSize*initialPage)));
      
        getTotalPages(arrItems.length, initialPage);
        
    }

    const calHeight = () => {
        
        if (menuRefs.current.clientHeight ) {
            var  height = (window.innerHeight - (menuRefs.current.clientHeight));
            if(headerRef && headerRef.current.children.length > 0 ){ 
                let headNavheight;
                var headerHeight;
                    var findDiv= headerRef.current.querySelectorAll('div')
                    var findNav = headerRef.current.querySelectorAll('nav');
                    if(findNav !=null && findNav[0] && findNav[0].clientHeight){
                        headNavheight=findNav[0].clientHeight;
                    }
                    if((bannerRef && bannerRef.current!=null) && (isDisplayBanner !="No" || isDisplayBanner !=" " ||  isDisplayBanner != undefined || isDisplayBanner === null) && (isBanner !=true) ){
                        //console.log(bannerRef.current.clientHeight);
                        var bannerHeight = (bannerRef && bannerRef.current!=null &&  bannerRef.current.clientHeight!=null) && bannerRef.current.clientHeight;
                        headerHeight = bannerHeight + headNavheight;
                       //headerHeight = bannerRef.current.clientHeight + headNavheight;
                    }else{
                        headerHeight = headNavheight;
                        if(headerRef.current && headerRef.current.children.length > 0 && headerRef.current.children[1]!=null && headerRef.current.children[1].id !=null && headerRef.current.children[1].id !=undefined){
                            headerRef.current.children[1].style.top= 0+"px"
                        }
                    };
                    
                     height=height-(headerHeight);;
                     setHeadHeight(headerHeight); 
                    // OLD LOGIC BUT WHEN ADDED SOMETHING IN HEADER THAT TIME THE NAV TAG INDEX IS CHANGED.
            }
           
            mapRef.current.style.height = height + 'px';
            listRef.current.style.height = height + 'px';
            
            if(switchRef.current.clientHeight){;
                height=height-switchRef.current.clientHeight
            } 
            setmapHeight(height);  
        }
    }
 
 
    const getTotalPages = (total_reords, cpage=1) => {
        listRef.current.scrollTo(0, 0);
        setCurrentPage(cpage)
       
        var pages = [];
        let total_pages = Math.ceil(total_reords / pageSize);
        setLastPage(total_pages);
       

        for (var i = 1; i <= total_pages; i++) {
            pages.push(i)
        }
    
        setListPages(pages);
       
        if (cpage < defaultPages) {
            setShowPages(pages.slice(0,defaultPages))
        }
        else if (cpage >= defaultPages && (pages.length - cpage) > 0 && cpage != pages.length) {
            setShowPages(pages.slice(cpage-4,cpage+1))
        }
        else if(cpage === pages.length ){
            setShowPages(pages.slice(cpage-5,cpage))
        }
       
    }

    const handleIMarkerClick = (index) => {
        if (activeIndex != null && activeIndex in scrollRefs.current && scrollRefs.current[activeIndex].current != null){
            scrollRefs.current[activeIndex].current.children[0].className = 'item ls-card '
        }
        
        if(index in scrollRefs.current &&  scrollRefs.current[index].current!=null){
            
            scrollRefs.current[index].current.scrollIntoView({ behavior: "smooth", block: "end"});
            scrollRefs.current[index].current.children[0].className = 'item ls-card result-property-border imgScroll overflow-hidden';
        }
        activeIndex = index; 
    }

    const handleMarkerRemoveClick=(id)=>{
        activeIndex = id;
       if(id in scrollRefs.current &&  scrollRefs.current[id].current != null){
        scrollRefs.current[id].current.children[0].className = 'item border-0 text-white overflow-hidden rounded-0 ls-card ';
       }
    }
    
    const  handleclusterClick=(arr)=>{
            getSelectedFilters(objFilter)
            setTotalRecordCL(arr.length);
            setDataForView(arr, true);
    }
 
    const onClickPages= (val) => {
        listRef.current.scrollTo(0, 0);
        let c_page = parseInt(val);
        var start_record=(val - 1) * pageSize;

        getTotalPages(resultData.length, c_page, lastpage)
        setListData(resultData.slice(start_record, (pageSize*val)));
        setPageInURL(c_page)
    }

    const setPageInURL=(page)=>{
    var url = typeof window!=undefined && window.location.href
    var sUrl = url.substring(url.indexOf('page') + 0)
    var newStr = sUrl
    if(sUrl != ''){
        // Split string with first occurance (/)
        var arrData = sUrl.split(/\/(.*)/s);
        // Filter blank value from array
        arrData = arrData.filter((val) => val != '')

        if(arrData.length > 0){
            arrData[0] = 'page-'+page           
        }
        newStr = arrData.join('/')
       // if(arrData[0] == 'page')
    }
    if(typeof window !== undefined){
        window.history.pushState(null, null, url.replace(sUrl, newStr));
    }
   
    
    }
    
    const formSubmit=(event)=>{

    event.preventDefault();
    setIsSubmitted(true);
    var data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
   // For multi selectionbox to getting all selected option value required to do below 
   if('ptype' in formObject){
    formObject['ptype'] = data.getAll('ptype')
   }

   if('ispricereduce' in formObject){
    delete formObject['ptype']
   }

   if('stype' in formObject){
    formObject['stype'] = data.getAll('stype')
    }

   if('beds' in formObject && formObject['beds']=='0'){
    delete formObject['beds']
    }

    if('baths' in formObject && formObject['baths']=='0'){
        delete formObject['baths']
    }
   
   var formData = cleanObj(formObject);
   

    // HIDDEN FORM DATA
    var filterParam=new FormData(frmFilterRef.current);
    
    let filterObj=Object.fromEntries(filterParam.entries());
    if(!Array.isArray(filterObj['clfr']) && filterObj['clfr'] != ''){
        let arrClfr=filterObj['clfr'].split(',')
        filterObj['clfr']=arrClfr
    }  
    
    var filterData=cleanObj(filterObj);
    setFilters({...formData,...filterData})
   
    }

    const  onSubmit=(submit)=>{
        setFrmSubmitted(submit)
    } 

    const cleanObj = (obj) => {
    
        for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '' || obj[propName] === 'Any') {

            delete obj[propName];
        }
        }
        return obj
    }

    const modelLGShow=(action)=>{
        if(action == 'onlinebargain')
            setShowLGPopup(<OnlineBargainPopup  modallgref={modallgref} item={listArr}/>)
        if(action == 'filters')
            setShowLGPopup(<ModalFilters filterRef={filterRef} setFilters={setFilters} callbackfrm={onSubmit}/>)
    }

    const onToggleChange = () => {
        var newToggle = (toggleSwitch) ? false : true;
        setToggleSwitch(newToggle);
    }

    const handleModalFilter=()=>{
        filterRef.current.style.display="block";
        filterRef.current.style.zIndex="1040";
        filterRef.current.style.backgroundColor="rgba(0,0,0,0.6)"
        //filterRef.current.style.overflowY = 'auto';
        modelLGShow('filters');
    }

    const  handleGridViewClick=(toggle)=>{
        setToggleGrid(true);
    }

    const handleMapviewClick=()=>{
    setToggleGrid(false);
    }
    const handleCurrentLocation=(map)=>{
        setMapnw(map);
    }

    const nextPage = () => {
        if(currentPage != lastpage) 
            onClickPages(currentPage + 1)
    }

    const onClearFilters=()=>{
       const objDefFilter = setDefaultFilter({});
       if('poly' in objFilter){
        objDefFilter['poly']=objFilter['poly']
       }
       if('cir' in objFilter){
        objDefFilter['cir']=objFilter['cir']
       }


        if('ptype' in objDefFilter){
            delete objDefFilter['ptype'];
        } 

        if('so' in objFilter){
            objDefFilter['so']=objFilter['so'];
        }

        if('sd' in objFilter){
            objDefFilter['sd']=objFilter['sd'];
        }

       setFilters(objDefFilter)
       //postUrlParam(objFilter)
     
    }

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        var data = new FormData(event.target);
        let formObject = Object.fromEntries(data.entries());
        
        dispatch(postSaveSerchList({"user_id":userId, "search_title":formObject.search_title,
        "filter":{"addval":(('addval' in objSelFilters)===true) ? objSelFilters.addval :"","addtype":(('addtype' in objSelFilters)===true) ? objSelFilters :""}
    }))
  
        if(formObject['search_title']!='') 
            setformObj(true); 
    }

    const handleFrmInput=(event)=>{
        const {name,value,}=event.target;
        setTitle((prevFormData) => ({ ...prevFormData, [name]: value }));

    }

    const handleMarketPrice=()=>{
        statisticRef.current?.scrollIntoView({ behavior: "smooth" , block: "end"});
        
    }

    const handleBlureffect=()=>{
        setToggleBtn(true)
    }

    const handleBlureffCancel=()=>{
        setToggleBtn(false)
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

return (
    <>
     <Head>
      <title>{newtitle}</title>
      <meta name="description" content={`Page with title ${title}`} />
    </Head>
    
    <div className={isBlur ? 'blur-list':'page-wrapper custom-wrapper idxwrapper d-block'}>
   {/*  <div ref={headerRef}>
    {(bannerDisplay === true  && ('header' in HFOptions)) ? bannerDetail : ""}
       <Header headerRef={headerRef}/>
    </div> */}
        <div ref={headerRef}>
        {(('header' in HFOptions)) ? bannerDetail : ""}
        {('header' in HFOptions  && Object.keys(HFOptions.header).length > 0) ? parse(HFOptions.header.toString()) :""}
        </div>
        <div id="page-content" className=" padding_bottom" style={{display:'block',top:headHeight}} >
        <div className="container-fluid">
        <div className= {toggleBtn == true ? "row blursb":"row"} id="msb-1" >
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"  ref={menuRefs} >
        <form id="ms-filter-form" method="post" role="form" className="ms-filter-form w-100" onSubmit={formSubmit}>
        <div className="row">
            <Autosuggetion  setFilters={setFilters}/>
            <SearchFilter setFilters={setFilters} callbackfrm={onSubmit}/>

            <div className="col-12 col-sm-12 col-md-12 col-lg-2 save-clear -px-0 text-end hidden-md-down d-flex justify-content-end">
            { (isLoggedinUser === true) ?
                <button  
                        type="button" 
                        className="btn btn-primary rounded-0 "
                        data-toggle="modal" 
                        data-target="#saveSearch"
                        //data-url="https://www.demosite.com/save-search.html"
                        >  Save 
                            &nbsp;<i className="fa fa-download nav-icon"></i>
                            
                </button>
                :
                    <button id="save_search" 
                        type="button" 
                        className="btn btn-primary nav-save-this-search text-uppercase rounded-0 popup-modal-md"
                        data-toggle="modal" 
                        data-url="https://www.demosite.com/member-login.html?ReqType=SaveSearch"
                        data-target="signin">  Save 
                            &nbsp;<i className="fa fa-download nav-icon"></i>
                </button>
                }

                <button type="button" className="btn rounded-0 bg-transparent" id="cleare-search" onClick={onClearFilters}>
                    Clear
                    &nbsp;<i className="fa fa-rotate-right nav-icon"></i>
                </button>
            </div> 
        </div>
        </form>
        <form name="frmFilter" id="frmFilter" method="post" role='form'  ref={frmFilterRef}>
        <input type="hidden" name="page" id="page" value={(('page' in objSelFilters)===true) ? objSelFilters.page :""}/> 
        <input type="hidden" name="so" id="so" value={(('so' in objSelFilters)===true) ? objSelFilters.so :""}/>
        <input type="hidden" name="sd" id="sd" value={(('sd' in objSelFilters)===true) ? objSelFilters.sd :""}/>
        <input type="hidden" name="vt" id="vt" value={(('vt' in objSelFilters)===true) ? objSelFilters.vt :""}/>
        <input type="hidden" name="poly" id="poly" value={(('poly' in objSelFilters)===true) ? objSelFilters.poly :""}/>
        <input type="hidden" name="cir" id="cir" value={(('cir' in objSelFilters)===true) ? objSelFilters.cir :""}/>
        <input type="hidden" name="clfr" id="clfr" value={(('clfr' in objSelFilters)===true ) ? objSelFilters.clfr :""}/>  
        </form>
        </div>
        </div>

        <div id="msb-3" className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
        <div className='row'> 

        <div className={'col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 hidden-md-up align-items-center '}>
        <button type="button" className="btn rounded btn-outline-light btn-sm filterbtn" data-toggle="modal" data-target="#exampleModal" onClick={handleModalFilter}>
        <i className="fa fa-filter" aria-hidden="true"></i>&nbsp;
        <span style={{textTransform:'capitalize'}}>filter</span>
        </button>
        </div> 

        <div className={'col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 hidden-md-up'} ref={switchRef}>
        <div className="text-right form-check form-switch mb-0 mt-3 w-100">
        <label className="switch">
            <input className="switch-checkbox" type="checkbox"
                    onChange={onToggleChange}/>
            <span className="switch-slider round"></span>
        </label>
        <span>Map</span>
        </div>
        </div>

        <div id="ms-lp" className= {(toggleSwitch ? " " : " hidden-sm-down ") + 'col-12 col-sm-12 '+ (toggleGrid?' hidden-md-up':'col-xl-6 col-md-6 col-lg-6 px-0 ')} itemType="http://schema.org/RealEstateListing" ref={mapRef}>

        <LoadScript id="script-loader" googleMapsApiKey='AIzaSyDqcryeVS4mHApy8sZB9rhIQOho5_mtgGU' libraries={libraries}>
        <GMapNew mapHeight={mapHeight} setFilters={setFilters}  objCllbackRef={handleIMarkerClick} objCallbackClose={handleMarkerRemoveClick} callbackCluster={handleclusterClick}  
                    callbackgridView={handleGridViewClick} callbackLocation={handleCurrentLocation} isCurrentLocation={objFilter} userId={userId} callbackeditbtn={handleBlureffect} callbackCancel={handleBlureffCancel}/>
        </LoadScript>
        </div>
        <div id="ms-rp" className={(toggleSwitch ?  "hidden-sm-down" : "px-0")+ ' col-12 col-sm-12 px-0 '+(toggleGrid?' col-md-12 col-lg-12 col-xl-12 ':' col-xl-6 col-md-6 col-lg-6 ')  }>
        <section id="lr-container" className={toggleBtn == true ? "blurrp m-0":" m-0"}>
        <div id="lr-data" className="mapscroller" ref={listRef}>
            <div id="lr-res">
            <h1 className="text-center text-black" id="property-listing-title"> {(('addval' in objSelFilters)===true) ? (objSelFilters.addval+" "+ "Homes For Sale") :"Homes For Sale"}</h1>
            {listArr.length > 0?
            <h2 className="text-center" id="property-cnt">
                <span className="results-number result-size text-black">{(totalRecordCL > 0)?format(totalRecordCL):format(totalRecord)} </span>
                <span className="result-size text-black"> Properties found</span>
            </h2>
            :null}
                
            <form id="lr-criteria-form" className="  mb-lg-3 " name="sm-criteria-form" method="post"
                    autoComplete="off" role="search" action="">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 hidden-sm-down">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-4 col-lg-6 lr-sort-by-1">
                                <ul className="list-inline m-0" id="so_sd">
                                    <li className="list-inline-item">
                                        <div className="h6">Sort By : </div>
                                    </li>
                                    <li className="list-inline-item">
                                        <select name="sort_by" id="sort_by" 
                                            className="pdmSelect mw-100 py-0 sdw-none custom-select mb-1 rounded-0"
                                            value={(('so' in objSelFilters && objSelFilters['so']!="") ? objSelFilters['so']+'|'+objSelFilters['sd']:"")}
                                            onChange={(e) => handleSortOption( e.target.value)}>
                                                {
                                                Object.keys(memoizedMapSortOpt).map((item, i) => { 
                                                    return(
                                                    <option key={"sort-" + item} value={item} >
                                                    {memoizedMapSortOpt[item]}
                                                    </option>
                                                )})
                                                }
                                            </select>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12 col-sm-12 col-md-4 col-lg-3 lr-sort-by-1"> 
                            {(('addtype' in objSelFilters == true && (objSelFilters.addtype=='cs'|| objSelFilters.addtype=='zip'))) ?
                            <button   onClick={()=>handleMarketPrice()}
                                    id="market_prices" type="button"
                                    className="btn btn-primary rounded-0 ">Market Prices
                            </button>:null} 
                            </div>
                            
                            <div className={"col-12 col-sm-12 col-md-4 col-lg-3 lr-sort-by-1 map_view "+ (toggleGrid?' d-block ':'d-none ') }>
                                    <a className="btn btn-secondary btn-sm float-right btn-grid"
                                        id="btn_grid_off" data-mode="grid" onClick={()=>handleMapviewClick()}
                                        title="Grid View"><i className="fa fa-globe fa-md"></i> Map View
                                    </a>
                            </div>
                        </div>
                    </div>
            </form>

            
            <div id="lr-result" className="row m-0 mt-md-2" >
                {
                    
                    (listData.length > 0 ) ?    
                        listData.map((item,i)=>{
                            scrollRefs.current[item.ListingID_MLS] = createRef();
                            return(
                                <div className={"col-12 col-sm-12 "+(toggleGrid?'col-md-4 col-lg-3 col-xl-3':'col-md-12 col-lg-6 col-xl-6')+" -lr-items position-relative"} 
                                key={"prop"+item.ListingID_MLS}
                                ref={scrollRefs.current[item.ListingID_MLS]}>
                           
                            <PropertyBox data={item} userId={userId} maintype={maintype}/>
                        
                            </div>
                            )
                        })
                    :
                    (!pLoading && totalRecord === 0)?
                        <>
                    
                        <div className="col-12 hidden-md-up">
                        <div className="text-right mb-2"></div>
                        </div>
                        <div className="col-12 text-center h6">
                        <br/>Please modify your search criteria and try again.
                        </div>
                        </>
                        :
                        
                        <>
                        
                            <div className={"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 lr-items position-relative"} >
                            <div className="card- border-0 rounded-0 ls-card">
                                <Shimmer className="card-img img-fluid" width={441.5} height={220}/>
                            </div>
                            </div>
                            <div className={"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 lr-items position-relative"} >
                            <div className="card- border-0 rounded-0 ls-card">
                                <Shimmer className="card-img img-fluid" width={441.5} height={220}/>
                            </div>
                            </div>
                            <div className={"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 lr-items position-relative"} >
                            <div className="card- border-0 rounded-0 ls-card">
                                <Shimmer className="card-img img-fluid" width={441.5} height={220}/>
                            </div>
                            </div>
                            <div className={"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 lr-items position-relative"} >
                            <div className="card- border-0 rounded-0 ls-card">
                                <Shimmer className="card-img img-fluid" width={441.5} height={220}/>
                            </div>
                            </div>
                            <div className={"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 lr-items position-relative"} >
                            <div className="card- border-0 rounded-0 ls-card">
                                <Shimmer className="card-img img-fluid" width={441.5} height={220}/>
                            </div>
                            </div>
                            <div className={"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 lr-items position-relative"} >
                            <div className="card- border-0 rounded-0 ls-card">
                                <Shimmer className="card-img img-fluid" width={441.5} height={220}/>
                            </div>
                            </div> 
                            
                        </> 
                }
            </div>
              
            {((showPages.length > 0) && (totalRecordCL  ? (totalRecordCL > 20):(totalRecord > 20)) ) ?
                <div className="lr-pagination mt-4">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item mx-1 align-self-center ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link border-0 text-black rounded-circle "  
                                    aria-label="Previous"  onClick={()=>onClickPages(currentPage-1)}
                                        >
                                    
                                    <i className="fa fa-chevron-left"></i>
                                </a>
                            </li>
                            {showPages.map((item,i)=>{
                                return(
                                <li className={`page-item  ${currentPage === item  ? 'active' : ""}`} key={"newpage"+item} value={item}>
                                <a className="page-link " title={item}
                                onClick={(e) => onClickPages( e.target.dataset.val)} data-val={item}>{item}</a>
                                </li>
                                )
                                })}
                            

                            <li className={`page-item mx-1 align-self-center ${currentPage === lastpage ? 'disabled' : ''}`}>
                                <a className="page-link border-0 text-black rounded-circle"  
                                    aria-label="Next"  onClick={()=>nextPage()}>
                                        <i className="fa fa-chevron-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>:null}

            <div id="lr-result-content" className="p-4" ref={statisticRef}>
                {
                (zipStcList.length > 0 || cityStcList.length > 0 )?
                <Statistic arr={(zipStcList.length > 0 && 'addtype' in objSelFilters && (objSelFilters.addtype=='zip' || objSelFilters.addtype=='cs'))?zipStcList:cityStcList}/>:null
                }
            </div> 
            
            
            </div>
            {(('page_content' in objPage && Object.keys(objPage.page_content).length > 0)? parse(objPage.page_content.toString()):'')}
            {('footer' in HFOptions && Object.keys(HFOptions.footer).length > 0)?parse(HFOptions.footer.toString()):''}

            <div className="modal" id="saveSearch" >
                <div className="modal-dialog modal-popup align-top"> 
                <div className="modal-content">
                    <div className="modal-header"> 
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>setformObj(false)}>
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
                        <form id="frmSaveSearch" name="frmSaveSearch" action="" method="post" className=""  onSubmit={handleFormSubmit}> 
                        {formObj == true ? <div className="alert alert-success alert-dismissible">
                                    <strong>Success!</strong> search has been saved successfully!
                                    </div> :null} 
                            <div className="row"> 
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 form-group form-group">
                                    
                                    <input type="text" className="form-control rounded required" 
                                            id="search_title" aria-describedby="search_title" 
                                            name="search_title" 
                                            key="search_title"
                                            onChange={handleFrmInput}
                                            value={title.search_title || ""}
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
        
        
        <div className="modal fade-"  id="modal-popup-lg" role="dialog" aria-hidden="true"   scrollable="true"
                            style={{zIndex: 1040, display:"none",height:'100%',}} ref={modallgref} title="ModalSavesearch">
                            <div className="modal-dialog modal-popup modal-lg" >
                                <div className="modal-content" >
                                {showLGPopup}
                                </div>
                            </div>
        </div>
        </div>
        </section>
        </div>

        <div className="modal fade- d-lg-none d-xl-none d-md-none"  id="modal-popup-lg" role="dialog" aria-hidden="true" 
                            style={{zIndex: 1040, display:"none"}} ref={filterRef} title="ModalFilter">
                            <div className="modal-dialog modal-popup modal-lg" >
                                <div className="modal-content p-2" >
                                {showLGPopup}
                                </div>
                            </div>
        </div>
        {('popup' in HFOptions )?parse(HFOptions.popup.toString()):''}
        </div>
        </div>
        </div>
        </div>
        </div>
    </div>
    
    </>
  )
}

export default MapSearch
