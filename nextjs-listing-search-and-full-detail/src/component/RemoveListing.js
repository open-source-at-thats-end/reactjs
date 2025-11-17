import React,{useState,useEffect} from 'react'
import { format } from '../constant'
import { useDispatch,useSelector } from 'react-redux';
import { postPropertyList } from '../ThunkSlices/PropertyLIstSlice';
import PropertyBox from './PropertyBox';
import '../styles/propDetail.css';
import RemovePropBox from './RemovePropBox';
function RemoveListing({objDelProp,ArrPropSearch,citynm,listingMLS}) {
let delType=true; 
let simType=true;

var delPCity=citynm &&  citynm.replaceAll("-" ," ")
delPCity=delPCity && delPCity.toLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
var delPMLS=listingMLS &&  listingMLS.toUpperCase();


  return (
    <div className="container">
    <div className="row" itemScope itemType="http://schema.org/Property">
        <h1 itemProp="text" className="col-xs-12 mt-2">Property Information
            {/* {isset(objDelProp)}{$arrAttributes.AddressFull}{else}Property Information:null */}
            </h1>
    </div>
    <div className="row" role="main">
        <div className="content full mb-2">
      
        <div id="pt-bar" class="row box-white mx-0 py-0 mt-3 delfs" >
         <div class="col-12">
            <div itemprop="place" class="h1">
                <h3>{delPMLS} <h1>{delPCity}</h1></h3>
            <hr class="my-2 p-0"/></div>
            </div>
        </div>

            <div className="col-xs-12" id="remove-listing">
            
                {/* { 
                (objDelProp.MLS_NUM != undefined) ?
                    <>
                    <p itemProp="text" className="off">Off Market</p>
                    <p itemProp="price"><span>Price </span> ${format(objDelProp.ListPrice)}</p>
                    {objDelProp.Baths?<p><span>Bathrooms </span> {objDelProp.Baths}</p>:null}
                    {objDelProp.Beds?<p><span>Bedrooms </span> {objDelProp.Beds}</p>:null}
                    {objDelProp.SQFT?<p><span>Square Footage </span> {format(objDelProp.SQFT)}</p>:null}
                    </> */}
                {/* : */}
        		 <div itemProp="message" className="alert alert-primary bg-primary text-white delfs">
                    This property is off market. Please check below similar listing(s) or start new 
                    <a href="https://www.demosite.com/for-sale/ptype-residential/so-price/sd-desc/vt-map/page-1" className="text-white font-weight-bold" target="_blank"> search</a> for your desired home.
                </div>
             {/*    } */}
                
             

                <section className="block"> 
                    <div className="container"> 
                        <div className="row">
                        {
            (ArrPropSearch.length > 0 ) ?    
            ArrPropSearch.map((item,i)=>{
                    //scrollRefs.current[item.ListingID_MLS] = createRef();
                    return(
                        <div className="col-sm-4 col-md-12 col-lg-4" key={item.ListingID_MLS}>
                        <PropertyBox data={item} delType={delType}/>
                        </div>
                       )
                   })
            :null
            }
             </div>
                    </div>
                </section>
                <input type="hidden" name="OnPage" id="OnPage" value="RandomResult" />
				{/* {IsUserLogged?
					<input type="hidden" name="isredirect" id="isredirect" value="true" />
				:null} */}
            </div>
        </div>
    </div>
    </div>
  )
}

export default RemoveListing
