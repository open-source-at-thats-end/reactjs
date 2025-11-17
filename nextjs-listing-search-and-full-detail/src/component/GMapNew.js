import React,{useState,useEffect,useRef, useCallback,useMemo} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Slider from "react-slick";
import { selectFilter } from '../ThunkSlices/PropertyLIstSlice';
import { GoogleMap, MarkerClusterer,Marker,
         DrawingManager,Polygon,CircleF,InfoWindowF,OverlayView} from '@react-google-maps/api';
import PropertyBox from './PropertyBox';
import CommonAdsBox from './CommonAdsBox';


function GMapNew({setFilters, mapHeight,objCllbackRef,objCallbackClose,callbackCluster,callbackgridView,userId,callbackeditbtn,callbackCancel}) {
  const dispatch = useDispatch();
  const drawingManagerRef = useRef(null);
  const {pLoading,objList, arrPoints,listArr,commnAddrsList,totalRecord}=useSelector((state)=>state.propertyList);
  const {cityBound,boundLoading}=useSelector((state)=>state.ctbound);
  const [map, setMapState] = React.useState(null);
  const [circle, setCircle] = useState(null);
  const [colorFilter, setColorFilter] = useState(false);
  const [drawingMode, setDrawingMode] = useState(null);
  const [onDrawingComp, setOnDrawingComp] = useState(false);
  const [onCancelEdit, setOnCancelEdit] = useState(false);
  let   [activeMarker, setActiveMarker] = useState(null);
  const [polygon, setPolygon] = useState(null);
  const objSelFilters = useSelector(selectFilter);
  const [allClusterMarkers,setAllClusterMarkers]=useState([]);
  const [listArrnw,setListArrNw]=useState([]);
  const [commnAds_str,setCommnAds_str]=useState("");
  const [toggleViewMode, setToggleViewMode] = useState(false);
  const[userLat, setUserLat]= useState();
  const[userLong, setUserLong]= useState();
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [circleObj, setCircleObject] = useState({});
  const [isUserLoggedIn,setIsUserLoggedIn]=useState(false);
  const [toggleBtn,setToggleBtn]=useState(false)
  const [zoom, setZoom] = useState(() => {
    const savedZoom = localStorage.getItem('mapZoom');
    return savedZoom ? parseInt(savedZoom, 10) : 10; // Default zoom level
  });
  
  let [polyObj, setPolyObj]=useState({});
  let [objCircle, setCirObj]=useState({});
  let [isInitSearch, setNewSearch]=useState(false);
  let [bindBound, setBindBound]=useState(true);
  let [enableDisableZoom, setEDZoom] = useState(false);
  const mapRef = useRef(null);
  let objFilterNew = {}
  let isNewSearch = false;
  let zoomListenerEnabled = true;
  let allClusterMarkersold = [];
  var addrsData = [];
  var addrs=[]
  if(typeof window!==undefined){
    window.google = window.google || {};
  }
 
  if(commnAddrsList.length > 0 ){
    commnAddrsList.map((sitem,i)=>{
     addrs = listArr.filter(val =>{
        return val.Address == sitem;
      
      });
      
    })
    
  }
 
  const ColorIndicatorArr=[
    {
      id:1,
      property:'Price reduced',
      color:'#9c27b0',
      key:'pr'
    },
    {
      id:2,
      property:'Just listed',
      color:'#3c505f',
      key:'jl'
    },
    {
      id:3,
      property:'Condo +Town home + Villa',
      color:'#0404f7',
      key:'ctv'
    },
    {
      id:4,
      property:'House',
      color:'#096009', 
      key:'house'
    },
    {
      id:5,
      property:'Multi Family + Income',
      color:'#9f2626',
      key:'mfi'
    },
    {
      id:6,
      property:'Rent',
      color:'#ffeb3b',
      key:'rent'
    },
    {
      id:7,
      property:'Commercial + Business',
      color:'#7d7c7c',
      key:'cb'
    },
    {
      id:8,
      property:'Closed',
      color:'#ff0000',
      key:'cls'
    },
    {
      id:9,
      property:'Back up',
      color:'#43A6C6',
      key:'bu'
    },
  ]

  var mapStyles =
  [
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#222222"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#ECEBE9"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.business",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#B1BDD6"
              },
              {
                  "visibility": "on"
              }
          ]
      }
  ];

  const memoizedCallbackColorArr = useMemo(() => ColorIndicatorArr, []);
  const callbackMapStyle = useMemo(() => mapStyles, []);

  let [defaultCenter,setDefauldCenter]= useState({
    //lat: 25.761681, 
    //lng: -80.191788
    lat: ('clat' in objSelFilters)?objSelFilters.clat:('latitude' in objSelFilters)?parseFloat(objSelFilters.latitude):25.761681, 
    lng: ('clng' in objSelFilters)?objSelFilters.clng:('longitude' in objSelFilters)?parseFloat(objSelFilters.longitude):-80.191788
    // lat:25.758010000000000, 
    //lng:-80.192420000000000
  })
  
  

  function converter (labelValue) {

    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(0) + "K"

    : Math.abs(Number(labelValue))
    
    ? (Math.abs(Number(labelValue)) / 1.0e+2) + "K"

    : Math.abs(Number(labelValue));
  }

  useEffect(() => {
 
  if(('cir' in objSelFilters) == true ){
    let dCircle = objSelFilters['cir'].split('~');
    var radius = parseFloat(dCircle[0])
    const latLng = { lat: parseFloat(dCircle[1]), lng: parseFloat(dCircle[2]) };
    setCircleObject({ radius: radius, center: latLng})

  }
   
  }, [])

  useEffect(() => {
    if( userId !== undefined){
     setIsUserLoggedIn(true);
   }
 }, [userId,isUserLoggedIn]);

  useEffect(() => {
    //console.log("2]objSelFilters------------");
    // When we search with filter and after that search with city that time isInitSearch is getting TRUE at initial so our bound logic is not working because useEffect concider there is no chane with this variable so when we new filter in selected filter object that time we will set isInitSearch to false.
    // In sort, isInitSearch variable state is same that's why we false here to run bound logic.
    // TODO: Check with DRAG event and with other filter also on cluster click and if fond anything wrong then need some logic here.
    isNewSearch=false;
    setNewSearch(isNewSearch);
    var objFl = {...objSelFilters};
    if(objFl && 'currentLocation' in objFl){
     if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position =>{
        setUserLat(position.coords.latitude);
        setUserLong(position.coords.longitude);
        map.panTo({lat:position.coords.latitude,lng:position.coords.longitude})
        var latlng = {latitude:position.coords.latitude, longitude:position.coords.longitude};
        if('addtype' in objFl && ( objFl.addtype == 'cs' || objFl.addtype == 'zip' || objFl.addtype == 'mls' || objFl.addtype == 'bn' || objFl.addtype == 'add' || objFl.addtype == 'area'))
          delete objFl['addtype']; delete  objFl['addval']; delete objFl['currentLocation'];
       
       performSearch({...latlng, ...objFl})
       /* if('addtype' in objSelFilters && 'addval' in objSelFilters && objSelFilters['addtype']=='cs'){
        let d={};
        d['isNewSearch']=1
        objSelFilters={...d}
       } */
       //////console.log({...latlng, ...objFl});
     })
     }
   }

  }, [objSelFilters])

  useEffect(() => {
    setListArrNw([])
    setAllClusterMarkers([])
    if(arrPoints.length > 0){
      if('isNewSearch'  in objSelFilters && objSelFilters['isNewSearch'] === "1"){
        isNewSearch=true
        setNewSearch(isNewSearch);
        setEDZoom(false);
        setBindBound(true)
       
      }else if (defaultCenter.lat == '25.761681' && defaultCenter.lng == '-80.191788'){ 

        isNewSearch=true
        setNewSearch(isNewSearch);
        setEDZoom(false);
        setBindBound(true)
      }
    }
   
  }, [arrPoints])

 useEffect(() => {

    if(cityBound !== ''){
      var polygonArray = cityBound.split('~');
      var coordinate = [];
        for(var i=0; i< polygonArray.length; i++)
        {
            var point =  polygonArray[i].split(" ");
            var LatLng = {lat: parseFloat(point[0]), lng: parseFloat(point[1])};
  
            coordinate.push(LatLng);
        }
        setPolygonCoordinates(coordinate);
    }
    else{
      clearPolygon()
    }
  }, [cityBound])  
  
  useEffect(() => {
    if(isInitSearch){
      
      if(listArr.length > 0){
        const bounds = calculateBounds();
       if(map!=undefined && bounds !=undefined)
        map.fitBounds(bounds);
      } 
    }else if(!bindBound){
      setEDZoom(true)
    }

  }, [isInitSearch])


 /*  const handleMapLoad = (map) => {
    setMapState(map);
  }; */

  const handleMapLoad = useCallback((mapInstance) => {
    setMapState(mapInstance);
    mapInstance.addListener('zoom_changed', () => {
      const newZoom = mapInstance.getZoom();
      setZoom(newZoom);
      localStorage.setItem('mapZoom', newZoom);
    });
  }, []);
  
/*   const onUnmount = useCallback((mapInstance) => {
    mapInstance.removeListener('zoom_changed');
    setMapState(null);
  }, []); */

  const onDragEnd=(k,val)=>{
    console.log("drag end<<<<<<<<<<<<<<<");
    
    let bound = map.getBounds();
    let ne = bound.getNorthEast();
    let sw = bound.getSouthWest();
    let mapCenter = map.getCenter();
    let NElat=ne.lat();
    let NElng=ne.lng();
    let SWlat=sw.lat();
    let SWlng=sw.lng();
    let dragbound={};
    var add= SWlat+ ',' +SWlng+ ','+NElat + ',' + NElng
    dragbound[k]=add;
    dragbound['clat']=mapCenter.lat();
    dragbound['clng']=mapCenter.lng(); 

    setDefauldCenter({
      lat: (dragbound['clat'])?dragbound['clat']:25.761681, 
      lng: (dragbound['clng'])?dragbound['clng']:-80.191788
    })
    handleFilters(dragbound);
  }

 const onZoomChanged=()=> {
    if(bindBound === true && isInitSearch === true){
      setBindBound(false)
      setNewSearch(false)
    }

    if (enableDisableZoom) {
      handleZoomChange()
    }
  }

 
  const handleZoomChange = () => {
    console.log("zooom changed>>>>>>>>>>>>>");
    
    if(zoomListenerEnabled == true){
      console.log("ifffffff");
      var newZoom = map.getZoom()
      let bound = map.getBounds();
      let ne = bound.getNorthEast();
      let sw = bound.getSouthWest();
      let mapCenter = map.getCenter();
      let NElat=ne.lat();
      let NElng=ne.lng();
      let SWlat=sw.lat();
      let SWlng=sw.lng();
      let dragZoombound={};

      var add= SWlat+ ',' +SWlng+ ','+NElat + ',' + NElng
      dragZoombound['map']=add;

      dragZoombound['clat']=mapCenter.lat();
      dragZoombound['clng']=mapCenter.lng();
      dragZoombound['nzoom']=newZoom; 
      setDefauldCenter({
        lat: (dragZoombound['clat'])?dragZoombound['clat']:25.761681, 
        lng: (dragZoombound['clng'])?dragZoombound['clng']:-80.191788
      })
      
      handleFilters(dragZoombound);
    }
    else{
      console.log("elseeeeeeeeee");
      
      zoomListenerEnabled = true
    }
    
  };
  const handleFilters = (filterVal) => {
    
    objFilterNew = {...objFilterNew, ...objSelFilters, ...filterVal};
   
    if(isNewSearch === false || 'currentLocation' in objFilterNew ){
      delete objFilterNew['isNewSearch']
      delete objFilterNew['currentLocation']
      performSearch(objFilterNew)
      
    }else{
      isNewSearch=false
      setNewSearch(isNewSearch);
    }
  }
       
  const handleCheckbox=(item,uncheck)=>{
   let Id=item.id;

   var objFltr = {}
    // We can not directly edit objSelFilteres objetc, so to edit selected filter we have to merge it with new created object, even we didnt assign that variable directly.
    objFltr = {...objFltr, ...objSelFilters}
    if(('clfr' in objFltr) == false){
      objFltr['clfr'] = [];
    }
   
    if(!Array.isArray(objFltr['clfr']) && objFltr['clfr'] != ''){
      let arrClfr=[objFltr['clfr']]
      objFltr['clfr']=arrClfr
    }
    
    if('ptype' in objFltr && !Array.isArray(objFltr['ptype'])){
      let arrClfr=[objFltr['ptype']]
      objFltr['ptype']=arrClfr
    }
    if('stype' in objFltr && !Array.isArray(objFltr['stype'])){
      let arrClfr=[objFltr['stype']]
      objFltr['stype']=arrClfr
    }

    if('status' in objFltr && !Array.isArray(objFltr['status'])){
     let arrClfr=[objFltr['status']]
      objFltr['status']=arrClfr
    }

    if('clfr' in objFltr && objFltr['clfr'].indexOf(item.key) >= 0 ){
      var spliced = objFltr['clfr'].filter((val) => val!=item.key)
      objFltr['clfr'] = spliced;
    }else{
      objFltr['clfr'] = [...objFltr['clfr'], ...[item.key]];
   
    }
    
 
  if( Id===1 ){
      if(('ispricereduce' in objFltr) === true ){
        delete objFltr['ispricereduce'];
      }else{
        let PriceDiff="Yes";
        objFltr['ispricereduce']=PriceDiff;
      }
  }else  if( Id===2 ){
      if(('dom' in objFltr) === true ){
        delete objFltr['dom'];
        
      }else{
        let doms=7+"-";
        objFltr['dom']=doms;
       
      }
  }else  if( Id===3){
    var arrST = ["Condominium", "Townhouse" , "Villa"];   
    if( ('stype' in objFltr) === true && objFltr['stype'].length > 0 ){
      var resultST = arrST.filter((val) =>  (objFltr['stype'].indexOf(val) >= 0)?val:'')
      if(resultST.length > 0){
        objFltr['stype'] = objFltr['stype'].filter((val) => (arrST.indexOf(val) < 0)?val:'');
      }else{
        objFltr['stype'] = [...objFltr['stype'], ...arrST];
      }
    }else {
      // If stype is not set
      objFltr['stype']=arrST; 
    }
  }else  if( Id===4){
    var arrPT = ["residential"];
    var arrST = ["SingleFamilyResidence"]
    // Remove on uncheck
   if(uncheck){
      objFltr['ptype'] = objFltr['ptype'].filter((val) => (arrPT.indexOf(val) < 0)?val:'')
      objFltr['stype'] = objFltr['stype'].filter((val) => (arrST.indexOf(val) < 0)?val:'');
    }else{
      if(('ptype' in objFltr) === true && objFltr['ptype'].length > 0 && objFltr['ptype'].indexOf('residential') == -1)
        objFltr['ptype'] = [...objFltr['ptype'], ...arrPT];
      else
        objFltr['ptype']=arrPT

      if( ('stype' in objFltr) === true && objFltr['stype'].length > 0 )
        objFltr['stype'] = [...objFltr['stype'], ...arrST];
      else
        objFltr['stype']=arrST
    }
     
  }else  if( Id===5){
    var arrSH = ["MultiFamily","Duplex","Quadruplex","Triplex"];
    if( ('stype' in objFltr) === true && objFltr['stype'].length > 0){
      var resultSH = arrSH.filter((val) =>  (objFltr['stype'].indexOf(val) >= 0)?val:'');
      //objFltr['ptype']=arrRes
    
      if(resultSH.length > 0){
        objFltr['stype'] = objFltr['stype'].filter((val) => (arrSH.indexOf(val) < 0)?val:'');
      }
      else{
        objFltr['stype'] = [...objFltr['stype'], ...arrSH];
        
      }
    }else {
        objFltr['stype']=arrSH;
    }
  }else  if( Id===6){
    const arrPR = ["rental"]
    if( ('ptype' in objFltr) === true && objFltr['ptype'].length > 0 ){
    
    var resultPR = arrPR.filter((val) => (objFltr['ptype'].indexOf(val) >= 0)?val:'')
    //objFltr['ptype']=arrRes
    var resultPR = arrPR.filter((val) => (objFltr['ptype'].indexOf(val) >= 0)?val:'')
      if(resultPR.length > 0){
        objFltr['ptype'] = objFltr['ptype'].filter((val) => (arrPR.indexOf(val) < 0)?val:'')
      }
      else{
        objFltr['ptype'] = [...objFltr['ptype'], ...arrPR];
      }
    }else {
      objFltr['ptype']=arrPR;
    } 
  }else  if( Id===7){
  

    var arrPC = ["businessOpportunity","vacantland"];
    var arrST = ["Commercial","BuildingBusiness"];
    
      if( ('ptype' in objFltr) === true && objFltr['ptype'].length > 0  ){
        var resultPC = arrPC.filter((val) =>  (objFltr['ptype'].indexOf(val) >= 0)?val:'')
        //objFltr['ptype']=arrRes
        // Remove
        if(resultPC.length > 0){
          objFltr['ptype'] = objFltr['ptype'].filter((val) => (arrPC.indexOf(val) < 0)?val:'')
        }
        else{
          // Add to filter
          objFltr['ptype'] = [...objFltr['ptype'], ...arrPC];
        }

      }else {
        // Add to filter
        objFltr['ptype']=arrPC
      }
      
      
      if( ('stype' in objFltr) === true && objFltr['stype'].length > 0  ){
        var resultPC = arrST.filter((val) =>  (objFltr['stype'].indexOf(val) >= 0)?val:'');
        //objFltr['ptype']=arrRes
        // Remove
        if(resultPC.length > 0){
          objFltr['stype'] = objFltr['stype'].filter((val) => (arrST.indexOf(val) < 0)?val:'');

        }
        else{
          // Add to filter
          objFltr['stype'] = [...objFltr['stype'], ...arrST];
        }
      }
      else {
        // Add to filter
        objFltr['stype']=arrST
      }
  }else  if( Id===8){
  
  if(('status' in objFltr) === true && Array.isArray(objFltr['status']) && objFltr['status'].indexOf("Closed") >= 0 && uncheck==true){
      objFltr['status'] = objFltr['status'].filter((val) => (val != 'Closed' && val != 'closed')?val:'');
      //objFltr['ptype']=arrRes
      
      }else{
        let status=["Closed","closed"]
        if(('status' in objFltr) === true && Array.isArray(objFltr['status']))
        objFltr['status'] = [...objFltr['status'], ...status];
        else
          objFltr['status'] = status;
        
      }

  }else  if( Id===9){
      if(('status' in objFltr) === true && Array.isArray(objFltr['status']) && objFltr['status'].indexOf('Backup') >= 0 && uncheck==true){
        objFltr['status'] = objFltr['status'].filter((val) => (val != 'Backup')?val:'');
        //objFltr['ptype']=arrRes  
      }else{
        let status= ["Backup"];
        if(('status' in objFltr) === true && Array.isArray(objFltr['status']))
            objFltr['status'] = [...objFltr['status'], ...status];
        else
            objFltr['status'] = status;
            
      }
  }

  
  if(objFltr['clfr'].length == 0){
    delete objFltr['clfr']
  }
  performSearch(objFltr)
}

const performSearch= (objFltr) =>{
  
  setFilters((currentState) => {
    return objFltr;
  })
}
const handleActiveMarker= (marker) =>{
  if (marker === activeMarker) {
    return;
  }
  setActiveMarker(marker);
};

const selectedItem=(item,i)=>{
  //setMapZoomLevel(mapZoomLevel)
  objCllbackRef(item.ListingID_MLS); 
  handleActiveMarker(item.ListingID_MLS)

  setTimeout(() =>{
    if(typeof window!==undefined){
      window.bindMDpopup();
    }
   
  
  }, 2000)
}

const onCloseClick=(item)=>{
  setActiveMarker(null);
  objCallbackClose(item.ListingID_MLS);
 }

const onLoad = (drawingManager) => {
   drawingManagerRef.current = drawingManager;
};

const onPolygonComplete =(polygon,mode) => {
  setDrawingMode(mode);
  setOnDrawingComp(true);
  setOnCancelEdit(true);
  setPolygon(polygon);
  const path = polygon.getPath();
  const coordinates = path.getArray().map((coord) => ({ lat: coord.lat(), lng: coord.lng() }));
  setPolygonCoordinates(coordinates);
  const polyData = coordinates.reduce((result, item) => {
   return `${result}${item.lat}${item.lng}~`
  }, "");

  polyObj['poly']=polyData;
}


const onCircleComplete = (circle,mode) => {
  setOnDrawingComp(true);
  setOnCancelEdit(true);
  setDrawingMode(mode);
  if (!circle) return null;
  setCircle(circle);
  const center = circle.getCenter();
  const radius = circle.getRadius();
  const latLng = { lat: center.lat(), lng: center.lng() };
  let cir=radius+"~"+center.lat()+"~"+center.lng();
  objCircle['cir']=cir;
  //handleFilters(objCircle)
  
  setCircleObject({ radius: radius, center:latLng})
  return {
    center: latLng,
    radius: radius,
    circle: circle,
  };
}

const handleCustomButtonClick = (mode) => {
  setToggleBtn(true)
  callbackeditbtn(toggleBtn)
  setDrawingMode(mode);
  setOnDrawingComp(true);
  };

  const removeMapKey=()=>{
    let objFilterNew={}
    objFilterNew={...objFilterNew,...objSelFilters}
    if('poly' in objFilterNew || 'cir' in objFilterNew){
      delete objFilterNew['map']
    }
    handleFilters(objFilterNew)
  }

const handleApply=()=>{
  //removeMapKey()
 
  if(polyObj){
    if('cir' in objSelFilters){
      delete objFilterNew.cir
      }
   handleFilters(polyObj);
  }
  if(objCircle){
   handleFilters(objCircle);
  }
  
  setOnDrawingComp(false);
  setDrawingMode(null);
  
  callbackCancel(toggleBtn)
  setToggleBtn(false)
};

const clearPolygon=()=>{
  setDrawingMode(null);
  setOnDrawingComp(false);
  setPolygonCoordinates([]);
  setOnCancelEdit(false);
}

 const handleCancel=()=>{

  clearPolygon()

  if (polygon) {
    polygon.setMap(null);
    setPolygon(null);
    setPolyObj({})
}

  if (circle) {
    circle.setMap(null);
    setCircle(null);
    setCirObj({})
    setCircleObject({})
  }
  setToggleBtn(false)
  callbackCancel(toggleBtn)
}

const handleRemoveDrawing=()=>{
  setOnCancelEdit(false);
  setPolygonCoordinates([]);
  setDrawingMode(null);
  setOnDrawingComp(false);
  if (polygon) {
    objFilterNew = {...objFilterNew, ...objSelFilters}
    delete objFilterNew.poly;
    if('map' in objSelFilters){
    delete objFilterNew.map
    }
 //delete objFilterNew.cir;
    polygon.setMap(null);
    setPolyObj({})
    setPolygon(null);
    performSearch(objFilterNew)
  }
 
  if('center' in circleObj){
    objFilterNew = {...objFilterNew, ...objSelFilters}
    delete objFilterNew.cir;
    setCircle(null);
    setCircleObject({})
    performSearch(objFilterNew)
  }

  if (circle) {
    circle.setMap(null);
  }

  callbackCancel(toggleBtn)
  setToggleBtn(false)
 
 
}

const calculateBounds = () => {
  const bounds = new window.google.maps.LatLngBounds();
  arrPoints.forEach((marker) => {
    bounds.extend(marker.position);
  });
  return bounds;
};


const handleGridView=()=> {
  setToggleViewMode(!toggleViewMode)
  callbackgridView(toggleViewMode);
}



const onClusterClick=(cluster,title)=>{
  if(cluster != undefined){
    zoomListenerEnabled = false;
   if(cluster.clusterIcon.className =="common_ads"){
      //////console.log("+++++++++++++");
      setCommnAds_str(title);
    }else{
      allClusterMarkersold = cluster.getMarkers();
      if(allClusterMarkersold.length > 0){
        var arrProcData = [];
  
        allClusterMarkersold.map((item,i)=>{
          var d = listArr.filter(val => val.ListingID_MLS == item.title);
          arrProcData = [...arrProcData,...d];
        })
        callbackCluster(arrProcData);
        setAllClusterMarkers(allClusterMarkersold);
        setListArrNw(arrProcData);
        setCommnAds_str("")
    }
    var bounds = cluster.getBounds();
    map.fitBounds(bounds);
   
  }   
}
}



return (
  
    <div>     

 {colorFilter ? 
 <form id="ms-filter-form-color" method="post" role="form" className="ms-filter-form-color" >
        <div className="pro-type-info" > 
          <ul className="list-unstyled" >
            {memoizedCallbackColorArr.map((item,i)=>{
              return(<>
                <li className="colorind_price_reduced d-flex" key={"colorarr" +item}>
                  <div>
                  <input type="checkbox" 
                         id={item.id} 
                         name="clfr[]"
                         value={item} 
                         key={"clrfltr"+item}
                         onChange={()=>handleCheckbox(item,('clfr' in objSelFilters)==true  && (objSelFilters['clfr'].indexOf(item.key) >= 0))} 
                         checked={('clfr' in objSelFilters)==true  && (objSelFilters['clfr'].indexOf(item.key) >= 0) ? 'checked' :""}/>       {/*  (array.indexOf(val)>=0) check value in index of array true hoi to */}
                  </div> 
                 
                  <span>
                 <div style={{backgroundColor:item.color,padding:7,margin:3,}}>
                 
                  </div>
                  </span>&nbsp;&nbsp;{item.property}
                 
                </li> 
                <>
                  {item.property == 'Multi Family + Income'? <hr className='bg-secondary m-0' style={{width:'100%'}}/> :null}  
                  </> 
                </>
              )
            })}
          </ul>
        </div> 
  </form>:null}

 {onDrawingComp ?
  <div id="draw-shape" className="draw-shape" style={{display:'block'}}>
    <div className="pull-right draw-opt"> 
    <a href="#/" className="draw-cancel f-c-white ml-2" id="draw-cancel" title="Cancel" onClick={()=>handleCancel()}>Cancel</a> 
    <a href="#/" className="draw-apply f-c-white ml-2" id="draw-apply" title="Apply" onClick={()=>handleApply()}>Apply</a> 
    </div>
  </div>
  :null}
        
  <div className="map-control-btn position-absolute ">
    <div className="mb-2 grid_view_btn ">
    <a className="btn bg-white btn-sm btn-grid text-uppercase rounded-0 " id="btn_grid_on" data-mode="grid"  title="Grid View" 
       onClick={() => handleGridView()}>
      <i className="fa fa-th fa-md"></i> Grid View</a>
    </div> 
          

 {polygonCoordinates.length <= 0  && !('center' in circleObj) ? 
    <a className="btn bg-primary rounded-0 btn-draw text-white" id="btn_draw" data-mode="draw" href="#!"
      title="Draw"   onClick={() => handleCustomButtonClick(window.google.maps.drawing.OverlayType.POLYGON)}>
     <i className="fa fa-pencil fa-lg"></i>
  </a>
  :null}
  {polygonCoordinates.length <= 0 && !('center' in circleObj) ? <a className="btn rounded-0 btn-circle m-1 text-white" id="btn_circle" data-mode="draw" href="#!"
      title="Circle Draw"  onClick={() => handleCustomButtonClick(window.google.maps.drawing.OverlayType.CIRCLE)}>
      <i className="fa fa-circle-o fa-lg"></i>
  </a>
  :null}


  { polygonCoordinates.length > 0 || ('center' in circleObj) ?  
      <a className="btn btn-danger btn-remove mr-1 text-white" id="btn_remove" data-mode="draw" href="#/" title="Clear Polygon" 
        onClick={()=>handleRemoveDrawing()}>
        <i className="fa fa-close fa-lg"></i>
      </a>
  :null}
      
      <a className="btn btn-indicator rounded-0 text-white" id="btn_color_indicator" href="#!"
          title="Color Indicator" onClick={()=>setColorFilter(!colorFilter)}>
         <i className="fa fa-info fa-lg"></i>
      </a>
  </div> 
  
 
           
  <GoogleMap
      onLoad={handleMapLoad}
      onDragEnd={(e)=>onDragEnd('map',e)}
      onZoomChanged={onZoomChanged}
      mapContainerStyle={{ width: '100%', height: mapHeight+'px' }}
      center={defaultCenter}
      zoom={zoom}
     // onUnmount={onUnmount}
      options={{gestureHandling:'greedy', styles: callbackMapStyle,streetViewControl:true,mapTypeControlOptions:{style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,position:window.google.maps.ControlPosition.LEFT_BOTTOM}}}>

      {
         (commnAds_str != "" &&  commnAds_str in objList) ? 
        
          <InfoWindowF mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                       position={{lat:parseFloat(objList[commnAds_str]['data'][0].Latitude),lng:parseFloat(objList[commnAds_str]['data'][0].Longitude)}}
                       options={{ pixelOffset: new window.google.maps.Size(0, 2), minHeight:220, maxWidth:664 }}
                       onCloseClick={()=>setCommnAds_str('')}
                       onLoad={(infoWindow)=>{}}>
                     <> 
                <CommonAdsBox  data={objList[commnAds_str]['data']} />
             </>
                </InfoWindowF>
                
                :null } 
                  
                 
       
         { allClusterMarkers.length > 0 ? 
           allClusterMarkers.map((marker,i)=>{
            return(
              <Marker
                key={"markerlist"+listArrnw[i].ListingID_MLS}
                position={marker.position}
                label={marker.label}
                id={i}
                onClick={()=>selectedItem(listArrnw[i],i)} 
                title={marker.title}
                icon={marker.icon}>
                {activeMarker == marker.title ? (
                  <InfoWindowF mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                              position={{lat:parseFloat(marker.lat),lng:parseFloat(marker.lng)}}
                              options={{ pixelOffset: new window.google.maps.Size(0, 2)}}
                              onCloseClick={()=>onCloseClick(listArrnw[i])}
                              onLoad={(infoWindow)=>{
                          }} >
                        <>
                      <PropertyBox  data={listArrnw[i]} isInfo={true} />
                      {(isUserLoggedIn == false ) ? <div className="SigninView">
                        <a className="popup-modal-md" data-url="https://www.demosite.com/member-login.html"
                        data-target="signin" id="modal-login-form" data-toggle="modal" title={"MLS#" +listArrnw[i].ListingID_MLS} >
                          Sign in
                        </a>to view this home
                      </div>: null}
                      </>  
              </InfoWindowF>) : null}  
            </Marker>
            )}
        )
          :
          Object.keys(objList).map((item,i)=>{
         // ////console.log(objList[item]);
          let clusterStyle= objList[item]['style']; 

          //////console.log(clusterStyle);
          if('data' in objList[item] && objList[item]['data'].length > 0)
       
          return(
            <MarkerClusterer  key={"cluster"+item}
                              gridSize={33}
                              options={{ imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                              styles: [clusterStyle],
                              clusterClass:objList[item]['class'] }}
                              onClick={(cluster)=>onClusterClick(cluster,objList[item]['title'])}
                              zoomOnClick={false}>
             {(clusterer) =>
          
            objList[item]['data'].map((marker,i)=>{
              let colorCode=clusterStyle['textColor'];
              // Aena border color and font color same 6e demosite.com ma
              return(
              <Marker
                  key={marker.ListingID_MLS}
                  position={{lat:parseFloat(marker.Latitude),lng:parseFloat(marker.Longitude)}}
                  clusterer={clusterer}
                  label={{text:""+"$"+""+converter(marker.ListPrice)+"",color:colorCode, fontSize: "12px",}}
                  id={"id - "+i}
                  onClick={()=>selectedItem(marker,i)} 
                  title={marker.ListingID_MLS}
                  icon={{
                      path: 'M -3,-1.1 3,-1.1 3,1.1 -3,1.1 z',
                      fillColor:clusterStyle['color'],
                      fillOpacity: 1,
                      strokeColor:clusterStyle['strokeColor'],
                      strokeWeight: 2.6,
                      scale: 9,
                      strokeWeight:2,
                      size:10,
                      strokeOpacity:1
                     }}>
                    {activeMarker == marker.ListingID_MLS ? (
                     
                    <InfoWindowF mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                 onCloseClick={()=>onCloseClick(marker)}
                                 position={{lat:parseFloat(marker.Latitude),lng:parseFloat(marker.Longitude)}}
                                  //options={infoBoxOpts}
                                 options={{ pixelOffset: new window.google.maps.Size(0, 2)}}
                                 onLoad={(infoWindow)=>{
                            }} >
                               <>
                              <PropertyBox data={marker} key={marker.ListingID_MLS} isInfo={true}/>
                              {(isUserLoggedIn == false ) ? 
                              <div className="SigninView">
                                <a className="popup-modal-md" 
                                  data-url="https://www.demosite.com/member-login.html"
                                  data-target="signin" id="modal-login-form" data-toggle="modal" title={'MLS#'+marker.ListingID_MLS}>
                                    Sign in
                                  </a>to view this home
                              </div>: null}  
                          </>
                 </InfoWindowF>
                  
                 ) : null}  
              </Marker>
              
                )
                
              }
          )
    } 
            </MarkerClusterer>
          )
          })
        } 

  <div className='map-pager-container d-flex justify-content-center w-100 '>
      <div className='map-pager '> 
        {(listArr.length>0 && totalRecord!==0)&& 
          <span className='text-white px-2'>Only Showing 600 Properties. Zoom in or narrow your search.</span> 
         
        }
      </div>
  </div>
          
  {(pLoading === true)?   
        <div itemScope="" itemType="https://schema.org/Property" id="lr-result-loader" className="hide-me d-flex justify-content-center w-100" > 
        <div className='px-5 py-1' id="lr-result-loader-child">
          <img src="https://www.demosite.com/templates/images/ajax-loader2.gif"  alt="loader" height={40} width={40}/>&nbsp;&nbsp;<span className='fs-16'>Loading...</span>
        </div> 
      </div>
    :null}


<div>
 <DrawingManager
    ref={drawingManagerRef}
      onLoad={onLoad}
      onPolygonComplete={onPolygonComplete}
      onCircleComplete={onCircleComplete}
      options={{
        drawingControl: false,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_RIGHT,
          drawingModes: [window.google.maps.drawing.OverlayType.POLYGON,window.google.maps.drawing.OverlayType.CIRCLE]
        },
        polygonOptions: { editable: false ,},
        circleOptions: { editable: false ,}
      }}
      drawingMode={drawingMode}
      onDrawingModeChanged={(newMode) => setDrawingMode(newMode)}
    />
</div>

{polygonCoordinates.length > 0 && (
          <Polygon  path={polygonCoordinates} options={{ fillColor:'rgba(0,0,0,0.7)', fillOpacity: 0.3 }} />
        )}

    
{'center' in circleObj && (
          <CircleF
            center={circleObj.center}
            radius={circleObj.radius}
            options={{ fillColor: 'rgba(0,0,0,0.7)'}}
          /> )}

   
  </GoogleMap>
 
    </div>
  )
}

export default GMapNew;
