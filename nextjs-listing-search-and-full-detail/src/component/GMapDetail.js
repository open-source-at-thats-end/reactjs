import React,{useState,Component} from 'react';
import { GoogleMap, LoadScript,OverlayViewF ,OverlayView, MarkerF, InfoWindowF, OVERLAY_MOUSE_TARGET} from '@react-google-maps/api';
import { useSelector,useDispatch } from 'react-redux';

const GMapDetail = ({mapObj,Arrlatlng}) => {
 const [activeMarker, setActiveMarker] = useState(null);
 const [, setLoaded] = useState(true);
 const [Loading, setLoading] = useState(true);
 const [map, setMap] = React.useState(null);

 const mapStyles = {        
    height: "250px",
    width: "100%",
    visibility: "off"
  };
 

 const onLoad = React.useCallback(function callback(map) {
 
    setMap(map)
    //console.log('map',map);
    setLoaded(false)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])



 return(
    <LoadScript id="script-loader"
       googleMapsApiKey='AIzaSyDqcryeVS4mHApy8sZB9rhIQOho5_mtgGU'>
       <GoogleMap
      // googleMapsApiKey='AIzaSyDqcryeVS4mHApy8sZB9rhIQOho5_mtgGU'
        mapContainerStyle={mapStyles}
        zoom={15}
        center={{lat:(Arrlatlng.length >0 &&  Arrlatlng[0]) ? parseFloat(Arrlatlng[0].geometry.location.lat) : parseFloat(mapObj.Latitude),
                 lng:(Arrlatlng.length >0 &&  Arrlatlng[0]) ? parseFloat(Arrlatlng[0].geometry.location.lng) : parseFloat(mapObj.Longitude)}}
        onLoad={onLoad}
        onUnmount={onUnmount}
        draggable={false}
        options={{mapTypeControl:false}}
        >
            <MarkerF draggable={false}
                     key={mapObj.ListingID_MLS} 
                     position={{lat:(Arrlatlng.length >0 &&  Arrlatlng[0]) ? parseFloat(Arrlatlng[0].geometry.location.lat) : parseFloat(mapObj.Latitude),
                                lng:(Arrlatlng.length >0 &&  Arrlatlng[0]) ? parseFloat(Arrlatlng[0].geometry.location.lng) : parseFloat(mapObj.Longitude)}}
                       >
             </MarkerF>
     
           </GoogleMap>
          </LoadScript>  
 )

 


}

export default GMapDetail;