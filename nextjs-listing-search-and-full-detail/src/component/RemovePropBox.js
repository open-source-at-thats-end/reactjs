import React,{useState,useEffect,useRef,useMemo} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { LazyLoadImage,LazyLoadImageProvider  } from 'react-lazy-load-image-component';
import { format } from '../constant';

function RemovePropBox({data, userId, isInfo,delType}){
const [favData,setFavData]=useState({});
const [isUserLoggedIn,setIsUserLoggedIn]=useState(false);
const {favDataObj}=useSelector((state)=>state.FavouritesList);
let item=data;
var pricecir;
var str ;
var PhotoBaseUrl = 'https://www.demosite.com/pictures/property/';

useEffect(() => {
    if( userId !== undefined){
        setIsUserLoggedIn(true);
    }
  
}, [userId,isUserLoggedIn]);


useEffect(() => {
    // Sometime we might get undefined this variable after login, might some delay in API call and API call is managed from MapSearch file we used slice here to get that fetched data.
    if(favDataObj != undefined)
        setFavData(favDataObj)

},[favDataObj])



  return (
    <>

    <div className="item text-white overflow-hidden border-0 rounded-0 ls-card">
            <a 
                //href={urlLink}
                className='popup-modal-custom' 
                target="_blank"
                title={item.MLS_NUM}
               
            >
            
        <div className="test-block mb-0" >
       
            {
                (item.mls_is_pic_url_supported == 'Yes')?
                    (item.MainPicture && item.MainPicture.thumb.url != null) ?
                        <LazyLoadImage src={item.MainPicture.thumb.url} alt={'MLS# '+ item.MLS_NUM } key={item.MLS_NUM} className="card-img"  threshold={0}/>
                    :
                        <img  src={PhotoBaseUrl + 'no-photo/0/300/220/'}   className="card-img " alt="nophoto"/>
                :
                ("PhotoAll" in item  && item.PhotoAll.length > 0) ? 
                    item.PhotoAll.map((photo,i)=>{
                         return(
                            (i == 0)?
                                    <img  
                                    src={photo+'/300/220/'} 
                                    key={'img'+i+'-'+item.MLS_NUM} 
                                    alt={'MLS# '+item.MLS_NUM}
                                    className="card-img" 
                                    loading="lazy"
                                    />
                                    :
                                   null
                        )
                    })
                    :   <img  src={PhotoBaseUrl + 'no-photo/0/300/220/'}   className="card-img " alt="nophoto"/>
        
            }
           
           
            <div className="card-img-overlay anchort">
                <span className="sale-badge badge-primary badge-sale">For Sale</span> 
        
                <div className="description position-absolute dstyle ">
                    <h5>
                        ${format(item.ListPrice)} <del className="text-white font-size-16"> ${(item.Price_Diff !== 0 && item.Price_Diff !== '' && item.Old_Price > 0)? format(item.Old_Price):null}</del>
                    </h5>
                    {item.PropertyType ?<span className="badge badge-primary rounded-0 d-flex justify-content-center align-items-center text-uppercase">
                        {item.PropertyType}</span>:
                        <span className="badge badge-primary  text-uppercase">
                        </span>}
                   <h5 className="mb-0 mt-1 text-white">{item.StreetNumber}{" "}{item.StreetName}</h5>
                    <h6 className="text-white">{item.CityName}{" , "}{item.State}{" "}{item.ZipCode}</h6>
                    <span>
                        <span className="ls_icon-block">
                                <i className="fa fa-bed"></i>
                                 {" "}{(item.Beds > 0 ? item.Beds : 0)} &nbsp;
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
            
                        
            </div> 
           
        </div>
        </a> 
      
    </div>
 
</>  
   
  )
}

export default RemovePropBox
