import React,{useState,useEffect,useMemo} from 'react';
import {capitalize, format,capitalizeFirstLetter,DETAIL_PROP_URL,capsFLetters} from '../constant';
import { useDispatch,useSelector } from 'react-redux';
import { postAddToFavourite } from '../ThunkSlices/PostAddFavouriteSlice';
import { postRemoveFavourite } from '../ThunkSlices/PostRemoveFavSlice';
import { getFavouriteList } from '../ThunkSlices/GetFavouriteSlice';
import GenerateListingAttributes from './GenerateListingAttributes'
import { config } from '../../config';


function PropBasicInfo({data,modalShare,loadLG,modalgetCashBack,userId,propcity}) {
    const [favData,setFavData]=useState({});
    const [isUserLoggedIn,setIsUserLoggedIn]=useState(false);
    const {favDataObj}=useSelector((state)=>state.FavouritesList);
    const {configObj,cnfgLoading}=useSelector((state)=>state.getconfig);
    let mortgageUrl;
    let rsAttributeUrl;
    const dispatch = useDispatch();
    let Solddate=new Date(data.Sold_Date).toDateString();
    Solddate=Solddate.split(' ').slice(1).join(' ');
    Solddate=Solddate.replace(' ',",");
    let stName=data.StreetName && data.StreetName;
    let sNumber=data.StreetNumber && data.StreetNumber
    const specialChars = ['*', '#', '@', '%', '$'];
    const SpecialCharforStreetname = specialChars.some(char => stName !=undefined &&  stName.includes(char));
    const SpecialCharforStreetNumber = specialChars.some(char => sNumber !=undefined && sNumber.includes(char));

    if(stName !=undefined && SpecialCharforStreetname){
        stName=stName.replaceAll(/[ *#@%$]/g, "")
    }
    if(sNumber !=undefined && SpecialCharforStreetNumber){
        sNumber=sNumber.replace(/[ *#@%$]/g, "")
    }
    
    let NearbyDealsUrl=
    (data.CityName !==undefined && data.StreetName !==undefined && data.ListingID_MLS !==undefined)? 
    data.CityName.replaceAll(" ","-")+"-"+DETAIL_PROP_URL+"/"+sNumber.replaceAll(" ","-")+"-"+stName.replaceAll(" ","-")+"-"+"mls-"+data.ListingID_MLS:"";
  
    NearbyDealsUrl=NearbyDealsUrl.toLowerCase();
    NearbyDealsUrl="https://www.demosite.com/"+NearbyDealsUrl+"?Action=good-deal&page=1";
   //NearbyDealsUrl="http://localhost:3000/"+NearbyDealsUrl+"?Action=good-deal&page=1";
   var propAdd;
   var propFAddress;
   
  

    if(data!=null && Object.keys(data).length > 0 && data.Address!=null && data.MLS_NUM !=undefined){
        rsAttributeUrl = GenerateListingAttributes(data);
          mortgageUrl=`/${rsAttributeUrl.SFUrl+"/#mortgage"}`
     }
        
     if(data.MLS_NUM !=undefined){
       propAdd=rsAttributeUrl.Addrs
       propAdd =propAdd+",  "+data.CityName+" , "+data.State+" "+data.ZipCode
       
        if(propAdd !="" && propAdd.includes("#")===true){
            propAdd=propAdd.replace("# ","")
        }
        propFAddress=rsAttributeUrl.AddressFull
        if(propFAddress !="" && propFAddress.includes("#")===true){
            propFAddress=propFAddress.replace("# ","")
        }
     }


     const { Agent_Commission,
        Buyers_Rebate,
        Home_Warranty,
        Closing_Costs,
        Moving_Costs,
        End_of_summer_special,
        Total_Buyer_savings,
        First_Time_DemoSite_Client,
    }= useMemo(()=>{
        let Agent_Commission= 0; 
        let savings = 0;
        let Buyers_Rebate;
        let Closing_Costs;
        let Moving_Costs;
        let Home_Warranty;
        let End_of_summer_special=0;
        let First_Time_DemoSite_Client;
        
      
         Agent_Commission=((2.5/100)*data.ListPrice);
        if(configObj.Buyers_rebate_of_gross_commission ==='Y' ){
            Buyers_Rebate =((18/100)*Agent_Commission);
            savings=(parseInt(Buyers_Rebate) + parseInt(savings));
        }
        
        if(configObj.Free_home_warranty ==='Y' ){
            Home_Warranty= configObj.rebcalc_free_home_warrenty_value ? configObj.rebcalc_free_home_warrenty_value:0
            savings=(parseInt(Home_Warranty) + parseInt(savings));
        }
        
        if(configObj.Closing_cost === 'Y'){
            Closing_Costs=configObj.rebcalc_free_closing_costs_value ? configObj.rebcalc_free_closing_costs_value :0;
           savings=(parseInt(Closing_Costs) + parseInt(savings));
       }
       
        if(configObj.Towards_moving_cost === 'Y'){
             Moving_Costs=configObj.rebcalc_towards_moving_cost_value ? configObj.rebcalc_towards_moving_cost_value :0;
            savings=(parseInt(Moving_Costs) + parseInt(savings));
        }
        if( configObj.End_of_summer_special === 'Y'){
            End_of_summer_special=500;
            savings=(parseInt(End_of_summer_special) + parseInt(savings));
        }
        if( configObj.First_Time_DemoSite_Client === 'Y'){
            First_Time_DemoSite_Client=configObj.First_Time_DemoSite_Client_value? configObj.First_Time_DemoSite_Client_value:0
            savings=(parseInt(First_Time_DemoSite_Client) + parseInt(savings));
        }
        let Total_Buyer_savings=savings;
        return {
            Agent_Commission,
            Buyers_Rebate,
            Home_Warranty,
            Closing_Costs,
            Moving_Costs,
            End_of_summer_special,
            Total_Buyer_savings,
            First_Time_DemoSite_Client,
          };
    },[data.ListPrice,configObj])

    //console.log(detailAddress);
    useEffect(() => {
        if( userId !== undefined){
            dispatch(getFavouriteList({"user_id":userId}))
            setIsUserLoggedIn(true);
        }
      
    }, [userId,isUserLoggedIn]);
    
    
    useEffect(() => {
        // Sometime we might get undefined this variable after login, might some delay in API call and API call is managed from MapSearch file we used slice here to get that fetched data.
        if(favDataObj !== undefined)
            setFavData(favDataObj)
    
    },[favDataObj])
    

   const handleShareModalPopup=()=>{
        modalShare.current.style.zIndex = 1040;
        modalShare.current.style.display = 'block';
        modalShare.current.style.backgroundColor="rgba(0,0,0,0.6)"
        loadLG('share')
   } 

    const handleCashbackPopup=()=>{
        modalgetCashBack.current.style.zIndex = 1040;
        modalgetCashBack.current.style.display = 'block';
        modalgetCashBack.current.style.backgroundColor="rgba(0,0,0,0.6)"
        document.body.style.overflow = 'hidden';
        loadLG('getcashback');    
    } 

    const handleAddToFavourite=()=>{
        var post  ={ "user_id":userId,
                    "mls_num":data.ListingID_MLS,
                    "action":"Add"
                    }
        dispatch(postAddToFavourite(post));
        let d={}
        
        var key = data.ListingID_MLS;
        d[key]=data;
        
        setFavData({...d, ...favData})
    }
    
    const handleRemoveToFavourite=()=>{
        dispatch(postRemoveFavourite({"user_id":userId,
                                        "mls_num":data.ListingID_MLS,
                                        "action":"Remove"})) 
        var rData = {...favData};
        delete rData[data.ListingID_MLS];
        setFavData(rData)
       
    }
  return (
    <>
        {Object.keys(data).length > 0 ?
        <>
        <div id="pt-bar" className={`row box-white mx-0 affix py-0 `} >
        <div itemScope itemType="http://schema.org/RealEstateListing" className="col-12 "> 
            <span>
            <a itemProp="url" 
                href="/for-sale/"
                title="demo site">demo site
            </a>
            </span>
            <span>
            <a itemProp="place"
            href={`/for-sale/${data.CityName !== undefined ? data.CityName.replaceAll(" ","-"):"" },-${data.State !== undefined ?
             data.State.replaceAll(" ","-"):"" }/ptype-residential/addtype-cs/so-price/sd-desc/vt-map/page-1`}> {`${">"}`} 
            {data.CityName !== undefined ? data.CityName: ""}
            </a>
            </span>
           {/*  <span> {`${">"}`} 
            {data.StreetNumber !== undefined ? data.StreetNumber: ""}&nbsp;{(data.StreetName)}&nbsp;{data.CityName},&nbsp;{data.State}&nbsp;{data.ZipCode}
            </span>  */}
           
            <span> {(data.MLS_NUM != undefined && data.DisplayAddress == "Y") ? ">" :""}
            {(data.MLS_NUM !== undefined && data.DisplayAddress == "Y") ? 
            (propFAddress):
            (propFAddress == undefined) ?
            propcity && capsFLetters(propcity)
            :""
            }
            </span> 
           
            
            </div>
            <div className="col-12">
           
           {/*  <span itemProp="place" className='float-left badge badge-primary rounded-0 justify-content-center  text-uppercase mr-2'
             >
                <h5>OFF  MARKET</h5>
                </span>  */}
            <div itemProp="place" className='h1'>
            {(data !== false && data !== null && typeof data === 'object' && 'isoffmarket' in data ) &&   
            <span className="float-left justify-content-center badge badge-danger sale-badge p-1 mt-1 mr-2">OFF  MARKET</span>
        }
                {/* <h1>{data.StreetNumber}&nbsp;{(data.StreetName)},&nbsp;{data.CityName},&nbsp;{data.State}&nbsp;{data.ZipCode}</h1> */}
                <h1> {(data.MLS_NUM !== undefined && data.DisplayAddress == "Y") ? 
                    (propFAddress):
                    (propFAddress == undefined) ?
                    propcity && capsFLetters(propcity)
                    :"No Address Available"
                    }
                </h1>
                {/* <h1>{capitalize(detailAddress.Addrs)+" "+data.CityName+" "+data.State+" "+data.ZipCode}</h1> */}
                {(data !== false && data !== null && typeof data === 'object' && !('isoffmarket' in data )) &&  <hr className="my-1 p-0"></hr>}
            </div>
        </div>
       
        {/* <div className="col-12 col-md-12 col-lg-3 d-none">
            <div itemProp="name" className="h6">North Palm Beach, FL&nbsp;33408</div>
        </div> */}

        {(data !== false && data !== null && typeof data === 'object' && !('isoffmarket' in data)) &&  
                <div className="col-12 col-md-12 col-lg-12 text-sm-left text-md-center">
                    <ul itemScope itemType="http://schema.org/RealEstateListing"
                        className="p-0 mb-0 quick-access">
                        <li itemProp="itemListElement" className="list-inline-item col-xs-6">
                            <div id={`full-fav-link-container-${data.ListingID_MLS}`} className="fav-full-container">
                                <div className="like-icon"> 
                                {(isUserLoggedIn === true)?
                            
                (data.ListingID_MLS in favData) ?
                    <>
                                <a href="#" 
                                onClick={()=>handleRemoveToFavourite()}
                                    data-toggle="tooltip" 
                                    title="Remove from favorites">
                                    <span>
                                        <i className="fa fa-heart" style={{color:'#cb661d'}}>&nbsp;Remove to Favorite</i>
                                    </span>
                                </a>  
                                
                            </>
                            :
                            <a onClick={()=>handleAddToFavourite()}
                                data-toggle="tooltip" 
                                title="Add to favorites"
                                href="#" >
                                <span>
                                    <i className="fa fa-heart-o" style={{color:'#cb661d'}}>Add to favorite</i>
                                </span>
                            </a>
                            :
                            <a className="popup-modal-md" href="#" 
                            data-url={`https://www.demosite.com/member-login.html?ReqType=AddFav&amp;mlsNum=${data.ListingID_MLS}`}
                            id="modal-login-form" data-toggle="modal" title="Add to favorite"
                            data-target="signin"
                            > 
                            <i className="fa fa-heart-o"></i> Add to Favorite
                            </a>
                        }
                                </div>
                            </div>
                        </li>

                        <li itemProp="itemListElement" className="list-inline-item col-xs-6 ml-1" onClick={()=>handleShareModalPopup()}> 
                            <a  itemProp="url"
                                href="#" className="py-1 pr-1 popup-modal-lg visible-xs"
                                title="share" id="share_popup" 
                                data-toggle="modal" data-target="Share"> <span className="fa fa-envelope"
                                    itemProp="name" ></span> Share</a>
                        </li>
                    
                        <li itemProp="itemListElement" className="list-inline-item ml-1"> 
                            <a itemProp="url" href="#dealscoresection" title="Deal Score" id="DealScore" className="py-1 pr-1  visible-xs" > 
                            <span className="fa fa-info-circle fa-md" itemProp="name"></span> Deal Score
                            </a>
                        </li>
                        {/* <li itemProp="itemListElement" className="list-inline-item"> <a itemProp=""
                        href='#'
                                //href="/north-palm-beach-homes-for-sale/12210-banyan-road-north-palm-beach-fl-33408-mls-r10825079-3?Action=Print"
                                title="print listing" className="py-1 pr-1  visible-xs" target=""> <span
                                    className="fa fa-print" itemProp="name"></span> Print Listing</a> </li>
                        <li itemProp="itemListElement" className="list-inline-item"> <a
                                href="https://www.demosite.com/mortgage-lending"
                                className="py-1 pr-1 visible-xs" target="_blank" title="Get pre-approved"> <span
                                    className="fa fa-check-circle" itemProp="name"></span> Get Pre-Approved</a>
                        </li>*/}
                        <li itemProp="itemListElement" className="list-inline-item" > <a itemProp="url"
                                href="#mortgage" className="py-1 pr-1 visible-xs" id="MortgageClac"
                                title="mortgage calculator"> <span className="fa fa-calculator"
                                    itemProp="name"></span> Mortgage Calculator</a> </li>
                    <li itemProp="itemListElement" className="list-inline-item"> <a itemProp="url"
                                href={NearbyDealsUrl} 
                                className="py-1 pr-1 visible-xs" title="Nearby Deals" target='_blank' rel="noreferrer"> 
                                <span   className="fa fa-building-o" 
                                        itemProp="name"></span> Nearby Deals</a> </li>
                                    
                            <li itemProp="itemListElement" className="list-inline-item ml-1" onClick={handleCashbackPopup}> 
                                <a href="#" className="py-1 pr-1 visible-xs" id="Save_price"
                                    title="mortgage calculation" 
                                >
                                <i className="fa fa-dollar fa-md"></i>
                                
                                        &nbsp;Save ${format(parseInt((Total_Buyer_savings !=undefined) ? Total_Buyer_savings:"0"))}</a> 
                            </li>
                    </ul>
                </div>}
         </div>


         {(data.MLS_NUM === undefined )&& 
         <div className='te-prop-features'></div>}

        {(data.MLS_NUM!=undefined )&&
          <div itemScope itemType="https://schema.org/accommodationCategory"
        className="row text-center mx-0 pt-sm-1 te-prop-features" 
      
        >
        <div className="col-6 col-sm-3 col-md-6 col-lg-3 box-white"> <i className="fa fa-home fa-3x"
                aria-hidden="true"></i>
            <h3 itemProp="name" className="f-c-black mb-1 f-w-normal">{data.PropertyType}</h3>
            <h5 className="f-c-black">Type</h5>
        </div>
        {/* <div itemScope itemType="http://schema.org/price"
            className="col-6 col-sm-3 col-md-6 col-lg-3 box-white"> <i className="fa fa-money fa-3x"
                aria-hidden="true"></i>
            <h3 className="listing-detail-head-price-value mb-1 "><b>${format(data.ListPrice)}</b></h3>
            <h5 itemProp="text" className="f-c-black mb-1">List Price</h5> 
            <span className={`sale-badge  ${status}   badge-primary b-sale `}>{status}</span> </div> */}
           {/*  <span className={`sale-badge ${status_class} badge-sale `} style={{bottom:3,left:"40%",marginTop:2}}>
            {status}
          </span> */}
                {/* //className="sale-badge badge-primary b-sale" */}
                
        

  
     <div itemScope itemType="http://schema.org/price" className="col-6 col-sm-3 col-md-6 col-lg-3 box-white">
					<i className="fa fa-money fa-3x" aria-hidden="true"></i>
					<h3 className={`listing-detail-head-price-value mb-1 ${data.ListingStatus === 'Closed' ? "text-danger":""}`}>
                        <b>${(data.ListingStatus !== 'Closed' ? format(data.ListPrice):format(data.Sold_Price))}</b></h3>
					{data.ListingStatus === 'Closed'?
						<h3 className="list-price-strike mb-0"><del>${format(data.ListPrice)}</del></h3>
				    :null}
                    
					{/* {*<h3 itemProp="Price" className="f-c-black mb-1 f-w-normal {$blur}">{$Config.site_currency}{if $Record.ListingStatus == 'Closed'}{$Record.Sold_Price|number_format:'0'}{else}{$Record.ListPrice|number_format:'0'}{/if}</h3>*} */}
					<h5 itemProp="text" className="f-c-black mb-1">{data.ListingStatus === 'Closed' ? "Sale Price":"List Price"}</h5>
					{/* {if $rsAttributes.Price_Diff_Amount != 0 && $Record.ListingStatus == 'Active'}
						<p className="listing-content-head-price-fluctuation {if $rsAttributes.Price_Diff_Amount < 0}text-primary {else}text-danger{/if}">{if $rsAttributes.Price_Diff_Amount > 0}<i className="fa fa-arrow-down"></i>{else}<i className="fas fa-arrow-up"></i>{/if} {$Config.site_currency}{abs($rsAttributes.Price_Diff_Amount)|number_format:0}</p>
					{/if} */}
					{data.ListingStatus === 'Active' ?
						data.PropertyType === 'Rental' ?
							<span className="sale-badge badge-rental b-sale">For Rent</span>
					:
							/* {$c = 'badge-primary'} */
							<span className="sale-badge badge-primary b-sale">For Sale</span>
						:null}

					 {data.ListingStatus === 'Closed' ?
                     <>
						<span className="text-danger sale-badge sold-date">{Solddate}</span>
						<span className="sale-badge badge-danger b-sale">Sold</span>
                        </>
					:null}
				</div>
        <div itemScope itemType="https://pending.schema.org/numberOfBedrooms"
            className="col-6 col-sm-3 col-md-6 col-lg-3 box-white"> <i className="fa fa-bed fa-3x"
                aria-hidden="true"></i>
            <h3 itemProp="number" className="f-c-black mb-1 f-w-normal">{(data.Beds > 0 ? data.Beds : 0)}</h3>
            <h5 className="f-c-black">Beds</h5>
        </div>
        <div itemScope itemType="https://pending.schema.org/numberOfFullBathrooms"
            className="col-6 col-sm-3 col-md-6 col-lg-3 box-white"> <i className="fa fa-bath fa-3x"
                aria-hidden="true"></i>
            <h3 itemProp="Number" className="f-c-black mb-1 f-w-normal">{(data.BathsFull > 0 ? data.BathsFull : 0)+'.'+(data.BathsHalf > 0 ? data.BathsHalf : 0)}</h3>
            <h5 className="f-c-black">Baths</h5>
        </div>
       
        </div>}
        </>
        :null}
    </>
  )
}

export default PropBasicInfo
