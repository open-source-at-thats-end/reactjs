import React,{useState,useEffect,useMemo} from 'react'
import { format } from '../constant';
import { useDispatch,useSelector } from 'react-redux';
import { getCityList } from '../ThunkSlices/getCityListSlice';
import ValidateNew from '../component/ValidateNew';
import { postRebatePriceList } from '../ThunkSlices/PostRebatecalslice';
import { config } from '../../config';

function CashbackPopup({modalgetCashBack,item}) {
const dispatch = useDispatch();
let [total, setTotal] = useState(0);
const {cityList,ctLoading}=useSelector((state)=>state.getcity);
const {configObj,cnfgLoading}=useSelector((state)=>state.getconfig);
var PhotoBaseUrl = 'https://www.demosite.com/pictures/property/';
const [photoAll,setPhotoAll] =useState([]);
const [hasUpdated, setHasUpdated] = useState(false);

useEffect(() => {
    // Use a default empty array if PhotoAll is undefined or empty
    let photoData = item.PhotoAll || '[]';
    
    // Check if PhotoAll exists in detailObj and has length greater than 0
    if ("PhotoAll" in item && photoData.length > 0) {
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
  }, [item.PhotoAll]);


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
    
  
     Agent_Commission=((2.5/100)*item.ListPrice);
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
    console.log(savings);
    
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
},[item.ListPrice,configObj]) 


const [cashFormFields,setCashFormFields]=useState(
    {
        rebcal_purchased:{
            type:'text',
            sel_val:item.ListPrice ? (item.ListPrice) :0,
        },
        rebcal_estimate:{
            type:'text',
            sel_val:Agent_Commission ? Agent_Commission :0,
        },
        rebcal_gross_commisission:{
            type:'text',
            sel_val:Buyers_Rebate ? Buyers_Rebate:0,
        },
        rebcal_home_warrenty:{
            type:'text',
            sel_val:Home_Warranty ? Home_Warranty:0,
        },
        rebcal_closing_cost:{
            type:'text',
            sel_val:Closing_Costs ? Closing_Costs:0,
        },
        rebcal_moving_cost:{
            type:'text',
            sel_val:Moving_Costs ? Moving_Costs:0,
        },
        rebcal_end_of_summer_special:{
            type:'text',
            sel_val:End_of_summer_special ?End_of_summer_special:0,
        },
        rebcal_first_time_demosite_client:{
            type:'text',
            sel_val:First_Time_DemoSite_Client ? First_Time_DemoSite_Client:0,
        },
        rebcal_total_buyer_savings:{
            type:'text',
            sel_val:Total_Buyer_savings ? Total_Buyer_savings:0,
        },
        rebcal_firstname:{
            type:'text',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter first name",
            isValid:true,
        },
        rebcal_lastname:{
            type:'text',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter last name",
            isValid:true,
        },
        rebcal_email:{
            type:'email',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter valid email",
            isValid:true,
        },
        rebcal_phone:{
            type:'mobile',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter phone number",
            isValid:true,
        },
        rebcal_zipcode:{
            type:'text',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter your zipcode",
            isValid:true,
        },
        rebcal_city:{
            type:'date',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please select city",
            isValid:true,
        },
       
    });
    

useEffect(() => {
    dispatch(getCityList());
    if (typeof window.doInputMasking === 'function') {
      window.doInputMasking();
    } else {
      console.error('doInputMasking is not a function');
    }
  }, []);

const hadleMDClose=()=>{
    if(modalgetCashBack.current !=undefined)
    modalgetCashBack.current.style.display = 'none';
    document.body.style.overflow = 'auto';
}



const handleFrmInput_=(event)=>{
    const {name,value,type}=event.target;
    cashFormFields[name].sel_val = value;
    let summerSpecial=0;
    let homeWarranty =0;
    let closingCost=0;
    let firstTimeClient=0;
    let estimatedbuyer=0;
    let movingCost=0;
    if( configObj.End_of_summer_special === 'Y'){
        summerSpecial = parseInt(cashFormFields['rebcal_end_of_summer_special']?.sel_val || '0', 10);
     }
    if(configObj.Free_home_warranty ==='Y' ){
     homeWarranty = parseInt(cashFormFields['rebcal_home_warrenty']?.sel_val || '0', 10);
     }
     if(configObj.Closing_cost === 'Y'){
     closingCost = parseInt(cashFormFields['rebcal_closing_cost']?.sel_val || '0', 10);
     }
     if( configObj.First_Time_DemoSite_Client === 'Y'){
     firstTimeClient = parseInt(cashFormFields['rebcal_first_time_demosite_client']?.sel_val || '0', 10);
     }
     if(configObj.Buyers_rebate_of_gross_commission ==='Y' ){
     estimatedbuyer = parseInt(cashFormFields['rebcal_gross_commisission']?.sel_val || '0', 10);
     }
     if(configObj.Towards_moving_cost === 'Y'){
        movingCost = parseInt(cashFormFields['rebcal_moving_cost']?.sel_val || '0', 10);
    }
    
    let totalnew = summerSpecial + homeWarranty + closingCost + firstTimeClient + estimatedbuyer + movingCost;
    console.log(totalnew);
    
    setTotal(totalnew)
    setCashFormFields({...cashFormFields})
   
} 

const handleFrmInput = (event) => {
    setHasUpdated(true);
    const { name, value } = event.target;
     
    cashFormFields[name].sel_val = value;

    const parseVal = (key) => parseInt((cashFormFields[key]?.sel_val || '0').replace(/,/g, ''), 10);

    let summerSpecial = configObj.End_of_summer_special === 'Y' ? parseVal('rebcal_end_of_summer_special') : 0;
    let homeWarranty = configObj.Free_home_warranty === 'Y' ? parseVal('rebcal_home_warrenty') : 0;
    let closingCost = configObj.Closing_cost === 'Y' ? parseVal('rebcal_closing_cost') : 0;
    let firstTimeClient = configObj.First_Time_DemoSite_Client === 'Y' ? parseVal('rebcal_first_time_demosite_client') : 0;
    let estimatedbuyer = configObj.Buyers_rebate_of_gross_commission === 'Y' ? parseVal('rebcal_gross_commisission') : 0;
    let movingCost = configObj.Towards_moving_cost === 'Y' ? parseVal('rebcal_moving_cost') : 0;

    let totalnew = summerSpecial + homeWarranty + closingCost + firstTimeClient + estimatedbuyer + movingCost;
    setTotal(totalnew);
    setCashFormFields({ ...cashFormFields });
}


const handleFormSubmit=(event)=>{
    if (event) event.preventDefault();
    //let validForm = validate(cashFormFields);
    var data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    //console.log(formObject);
    let validForm = ValidateNew(cashFormFields,formObject);
    let rebateObj={
        "cal_purchased":formObject.rebcal_purchased,"cal_gross_commisission":formObject.rebcal_gross_commisission,"cal_home_warrenty":formObject.rebcal_home_warrenty,
        "cal_estimate":(formObject.rebcal_estimate ? formObject.rebcal_estimate :0),"cal_moving_cost":(formObject.rebcal_moving_cost ? formObject.rebcal_moving_cost:0),
        "cal_closing_cost":formObject.rebcal_closing_cost,
        "cal_total_buyer_savings":formObject.rebcal_total_buyer_savings,"cal_firstname":formObject.rebcal_firstname,"cal_lastname":formObject.rebcal_lastname,
        "cal_friend_email":formObject.rebcal_email,"cal_phone":formObject.rebcal_phone,"cal_zipcode":formObject.rebcal_zipcode,"cal_city":formObject.rebcal_city,
        "Listing_key":item.ListingID_MLS ? item.ListingID_MLS:"0" }
    setCashFormFields({...validForm.formData});
    dispatch(postRebatePriceList(rebateObj));
    event.target.reset();
     
    /* let resetData = resetFormData(validForm.formData);
    setCashFormFields({...resetData}); */
    setTimeout(() => {
        modalgetCashBack.current.style.display = 'none'; 
        document.body.style.overflow = 'auto';
    }, 2000);
  
}
//let Newstreetname=item.StreetName && item.StreetName.includes('*') === true ? item.StreetName.replace(/\*/g, ""):item.StreetName
console.log(total);

console.log(Total_Buyer_savings);


  return (
    <>
    <div className="modal-header"> </div>
    <div className="modal-body">
        <div className="row" style={{backgroundColor:" black", color: "white", textAlign: "center"}}>
            <div className="info col-8 d-flex"> <span className="d-flex"><i
                        className="fa fa-question-circle fa-2x mt-2" aria-hidden="true"></i></span>
                <span className="text-left pl-1">Need Help?
                    <p className="p-0 rebate-number">Call us at <a href="tel:561-614-5353" title="561-614-5353">
                            561-614-5353 </a> </p>
                </span>
            </div>
            <div className="col-4 text-right mt-3"  > 
                <button type="button" onClick={hadleMDClose}
                        className="cancel"
                        id="getcashback-close">
                    <i className="fa fa-times" aria-hidden="true"></i> Cancel
                </button>
            </div>
        </div> <br/>
        <div className="side-pro-details">
            <div className="row">
                <div className="image col-sm-12 col-md-6 col-lg-6 col-xl-6 px-0 sideopening-image">
                   
                {
                                (item &&  "PhotoAll" in item  && photoAll.length > 0) ? 
                                    
                              (photoAll).map((photo,i)=>{
                                            return(
                                              <>
                                                {(i==0) &&  (<img 
                                                            itemProp="image"
                                                            key={"main"+photo}
                                                            src={photo}
                                                            draggable='false'
                                                            height={185}
                                                            width={370}
                                                            alt={item.CityName} 
                                                            className="w-md-100 BannerImageWidth"/>)
                                                    } </> 
                                                    )
                                                    })
                                                    : <img  itemProp="image"
                                                            src={PhotoBaseUrl + 'no-photo/0/'}
                                                            key={"nophoto"}
                                                            alt="nophoto"
                                                            height={185}
                                                            width={370}
                                                            className="w-md-100 BannerImageWidth"/>}
                                                   
                 
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 side-desc">
                    <div className="h5"> ${item.ListPrice ? format(item.ListPrice):format(item.Sold_Price)}
                    
                        <del className="f-s-16">$ 0</del>
                    </div> <span className="badge badge-primary text-uppercase">{item.PropertyType}</span>
                    <div className="h5 mb-0 mt-1">{(item.DisplayAddress ==='Y') ? item.StreetNumber+" "+item.StreetName:""} </div>
                    <div className="h6"> {item.CityName},&nbsp;{item.State}&nbsp;{item.ZipCode} </div>
                    <div className="h7"> <span><i className="fa fa-bed"></i> {(item.Beds > 0 ? item.Beds : 0)}&nbsp;&nbsp;</span>
                        <span><i className="fa fa-bath"></i>&nbsp;{(item.BathsFull > 0 ? item.BathsFull : 0)+'.'+(item.BathsHalf > 0 ? item.BathsHalf : 0)} &nbsp;&nbsp;</span> <span><i
                                className="fa fa-arrows-alt"></i> &nbsp;{format(item.SQFT)} &nbsp;&nbsp;</span>
                    </div>
                </div>
            </div>
            <form itemProp="InquryForm" itemScope="" itemType="http://schema.org/InqueryForm"
                className="form mt-3 sideopening-form" id="rebate_calculate" method="post"
                role="form" onSubmit={(e)=>handleFormSubmit(e)} > 
                <input type="hidden" name="rebcal_url"
                defaultValue=""/>
                <input type="hidden" name="rebcal_address" defaultValue="12210 Banyan Road "/> <input
                    type="hidden" name="rebcal_address2" defaultValue="North Palm Beach, FL 33408"/>
                <input type="hidden" name="rebcal_image" defaultValue=""/>
               
                <div className="form-group full-view-form d-flex mb-1 row"> 
                
                <label className="sideopening-lable mt-2 text-uppercase col-sm-12 col-md-7 col-lg-7 col-xl-7">
                Purchased Price
                </label> 
                        <span className="col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex">$&nbsp;&nbsp;&nbsp;
                        <input className="form-control required p-0 text-center rebcalculate"
                                name="rebcal_purchased" 
                                id="rebcal_purchased" 
                                type="text"
                                onChange={handleFrmInput}
                                value={cashFormFields.rebcal_purchased.sel_val.toLocaleString()}/>
                        </span> 
                </div>

               
                {(configObj.Estimated_agent_commission ? (configObj.Estimated_agent_commission == 'Y'):(config.Estimated_agent_commission == 'Y')) ?
                <div className="form-group full-view-form d-flex mb-1 row"> 
                <label className="sideopening-lable mt-2 text-uppercase col-sm-12 col-md-7 col-lg-7 col-xl-7">
                Estimated Agent Commission</label> 
                        <span className="col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex">$&nbsp;&nbsp;&nbsp;
                        <input className="form-control required p-0 text-center rebcalculate"
                                name="rebcal_estimate" 
                                id="rebcal_estimate"
                                type="text" 
                                onChange={handleFrmInput}
                                value={cashFormFields.rebcal_estimate.sel_val.toLocaleString()}/>
                        </span> 
                </div>:null}
                
                {(configObj.Buyers_rebate_of_gross_commission === "Y") ?
                <div className="form-group full-view-form d-flex mb-1 row"> 
                <label className="sideopening-lable mt-2 text-uppercase col-sm-12 col-md-7 col-lg-7 col-xl-7">
                        ESTIMATED BUYER REBATE</label> 
                        <span className="col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex">$&nbsp;&nbsp;&nbsp;
                        <input className="form-control required p-0 text-center rebcalculate"
                                name="rebcal_gross_commisission" 
                                id="rebcal_gross_commisission"
                                type="text" 
                                onChange={handleFrmInput}
                                value={cashFormFields.rebcal_gross_commisission.sel_val.toLocaleString()}/>
                        </span> 
                </div>:null}

                {( configObj.Free_home_warranty === 'Y') ?
                <div className="form-group full-view-form d-flex mb-1 row"> 
                {/* {assign var="Home_Warranty" value=$config.rebcalc_free_home_warrenty_value}
                {assign var="savings" value= $savings + $Home_Warranty } */}
                <label className="sideopening-lable mt-2 text-uppercase col-sm-12 col-md-7 col-lg-7 col-xl-7">
                Complimentary Home Warranty</label> 
                        <span className="col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex">$&nbsp;&nbsp;&nbsp;
                        <input className="form-control required p-0 text-center rebcalculate"
                                name="rebcal_home_warrenty" 
                                id="rebcal_home_warrenty" 
                                type="text"
                                onChange={handleFrmInput}
                                value={cashFormFields.rebcal_home_warrenty.sel_val}/>
                        </span> 
                </div>:null}

                {(configObj.Closing_cost ? (configObj.Closing_cost == 'Y'):(config.Closing_cost == 'Y'))?
                <div className="form-group full-view-form d-flex mb-1 row"> 
                {/* {assign var="Closing_Costs" value=$config.rebcalc_free_closing_costs_value}
                {assign var="savings" value= $savings + $Closing_Costs } */}
                <label className="sideopening-lable mt-2 text-uppercase col-sm-12 col-md-7 col-lg-7 col-xl-7">$200
                        off closing costs</label> 
                        <span className="col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex">$&nbsp;&nbsp;&nbsp;
                        <input className="form-control required p-0 text-center rebcalculate"
                                name="rebcal_closing_cost" 
                                id="rebcal_closing_cost" 
                                type="text"
                                onChange={handleFrmInput}
                                value={cashFormFields.rebcal_closing_cost.sel_val}/>
                        </span>
                </div>:null}

                
                {(configObj.Towards_moving_cost ? (configObj.Towards_moving_cost == 'Y'):(configObj.Towards_moving_cost == 'Y'))?
                        <div className="form-group full-view-form d-flex mb-1 row">
                           {/*  {assign var="Moving_Costs" value=$config.rebcalc_towards_moving_cost_value}
                            {assign var="savings" value= $savings + $Moving_Costs } */}
                            <label className="sideopening-lable mt-2 text-uppercase col-sm-12 col-md-7 col-lg-7 col-xl-7">{config.site_currency}{configObj.rebcalc_towards_moving_cost_value} {config.rebcalc_towards_moving_cost_txt}</label>
                            <span className="col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex">{configObj.site_currency}&nbsp;&nbsp;&nbsp;
                            <input className="form-control required p-0 text-center rebcalculate" 
                                    name="rebcal_moving_cost" 
                                    id="rebcal_moving_cost" 
                                    type="text" 
                                    onChange={handleFrmInput}
                                    value={cashFormFields.rebcal_moving_cost.sel_val}/>
                           </span>
                        </div> :null}
                       
                        { (configObj.End_of_summer_special ? (configObj.End_of_summer_special == 'Y'):(configObj.End_of_summer_special == 'Y')) ?
                            <div className="form-group full-view-form d-flex mb-1 row">
                               {/*  {assign var="End_of_summer_special" value=500}
                                {assign var="savings" value= $savings + $End_of_summer_special } */}
                                <label className="sideopening-lable mt-2 text-uppercase col-sm-12 col-md-7 col-lg-7 col-xl-7">{configObj.site_currency}{configObj.End_of_summer_special_value} {configObj.End_of_summer_special_txt}</label>
                                <span className="col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex">{configObj.site_currency}&nbsp;&nbsp;&nbsp;
                                <input className="form-control required p-0 text-center rebcalculate" 
                                        name="rebcal_end_of_summer_special" 
                                        id="rebcal_end_of_summer_special" 
                                        type="text" 
                                        onChange={handleFrmInput}
                                        value={cashFormFields.rebcal_end_of_summer_special.sel_val}/>
                                </span>
                            </div> :null}

                            { (configObj.First_Time_DemoSite_Client ? (configObj.First_Time_DemoSite_Client == 'Y'):(configObj.First_Time_DemoSite_Client == 'Y')) ?
                            <div className="form-group full-view-form d-flex mb-1 row">
                                <label className="sideopening-lable mt-2 text-uppercase col-sm-12 col-md-7 col-lg-7 col-xl-7">{configObj.site_currency}{configObj.First_Time_DemoSite_Client_value} {configObj.First_Time_DemoSite_Client_txt}</label>
                                <span className="col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex">{configObj.site_currency}&nbsp;&nbsp;&nbsp;
                                <input className="form-control required p-0 text-center rebcalculate" 
                                        name="rebcal_first_time_demosite_client" 
                                        id="rebcal_first_time_demosite_client" 
                                        type="text" 
                                        onChange={handleFrmInput}
                                        value={cashFormFields.rebcal_first_time_demosite_client.sel_val}/>
                                </span>
                            </div> :null}

                           

                            <div className="form-group full-view-form d-flex mb-1 row"> 
                            <label className="sideopening-lable mt-2 text-uppercase col-sm-12 col-md-7 col-lg-7 col-xl-7">
                                <strong>Total Buyer savings</strong></label> 
                                <span className="col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex">$&nbsp;&nbsp;&nbsp;
                                <input className="form-control required p-0 text-center rebcalculate"
                                        name="rebcal_total_buyer_savings" 
                                        id="rebcal_total_buyer_savings"
                                        type="text" 
                                      // value={total === 0 ? Total_Buyer_savings.toLocaleString() : total.toLocaleString()}
                                      value={
                                            hasUpdated
                                                ? total.toLocaleString()
                                                : Total_Buyer_savings.toLocaleString()
                                        } 
                                        readOnly=""/>
                                </span> 
                            </div>

                           

                <div className="form mt-3 lead-form">
                    <div className="lead-heading">
                        <h3>Want a More Accurate price?</h3>
                    </div>
                    <div className="lead-capture">
                        <div className="row col-12 ml-2"> 
                                <input
                                    className="form-control required text-uppercase col-sm-11 col-lg-5 col-xl-5 mr-4 ml-2 mb-2"
                                    data-msg-required="Please enter First name"
                                    name="rebcal_firstname" id="rebcal_firstname" type="text"
                                    placeholder="First Name" required={true} 
                                    aria-required="true"
                                    //value={cashFormFields.rebcal_firstname.sel_val || ""} 
                                    //onChange={handleFrmInput}
                                    /> 
                                     
                                    
                                <input
                                    className="form-control required text-uppercase col-sm-11 col-lg-5 col-xl-5 mb-2"
                                    name="rebcal_lastname" id="rebcal_lastname" type="text"
                                    placeholder="Last Name" required={true} 
                                    //value={cashFormFields.rebcal_lastname.sel_val || ""} 
                                    //onChange={handleFrmInput}
                                    /> 
                        
                        </div>
                        {((cashFormFields.rebcal_firstname.isValid === false && cashFormFields.rebcal_firstname.sel_val==="")) &&(
                                        <label id="rebcal_firstname-error" className="error" for="rebcal_firstname">{cashFormFields.rebcal_firstname.errorMsg}</label>
                                        )} 
                        <div className="row col-12 ml-2"> 
                                <input
                                    className="form-control required text-uppercase col-sm-11 col-lg-5 col-xl-5 mr-4 ml-2 mb-2"
                                    name="rebcal_email" id="rebcal_email" type="email"
                                    placeholder="Email" required={true}
                                    //value={cashFormFields.rebcal_email.sel_val || ""} 
                                    //onChange={handleFrmInput}
                                    /> 
                                <input
                                    className="form-control required text-uppercase col-sm-11 col-lg-5 col-xl-5 mb-2 phone_no"
                                    name="rebcal_phone" id="rebcal_phone" type="tel"
                                    placeholder="Phone" required={true}
                                    maxLength={10}
                                    //value={cashFormFields.rebcal_phone.sel_val || ""} 
                                    //onChange={handleFrmInput}
                                    /> 
                        </div>
                        <div className="row col-12 ml-2"> <input
                                className="form-control required text-uppercase col-sm-11 col-lg-5 col-xl-5 mr-4 ml-2 mb-2"
                                name="rebcal_zipcode" id="rebcal_zipcode" type="text"
                                placeholder="Zipcode" required=""/> 
                                <select name="rebcal_city"
                                className="form-control required text-uppercase col-sm-11 col-lg-5 col-xl-5 mr-4 mb-2"
                                        id="rebcal_city" 
                                        style={{width:150}} 
                                        required={true}
                                        //value={cashFormFields.rebcal_city.sel_val || ""} 
                                        //</div>onChange={handleFrmInput}
                                        >
                                <option value="" key="reb_cal">-- Select --</option>
                                {(cityList.length > 0) ?
                                cityList.map((item,i)=>{
                                    return(
                                        <option value={item} key={"citynm"+item}>{item}</option>
                                    )
                                  
                                }):null}
                                </select> 
                            </div>
                        <div className="col-12 mb-3 mt-1 text-center"> 
                        <button type="submit"
                                id="rebate_cal_btn" className="btn btn-primary rounded"
                                name="rebate_calculator"
                                value="CALCULATE &amp; EMAIL ME MY OFFER">CALCULATE &amp; EMAIL
                                ME MY OFFER</button> </div>
                        <div className="liability">
                            <p className="p-2">All Savings and Refunds Programs are estimated and
                                subject to change or cancelation based on Agent’s Commission,
                                State Laws, Lender’s Approval, and other. <a className="moreLink"
                                    href="/disclaimer" target="_self" title="Learn More">Learn
                                    More</a></p>
                        </div>
                        <div className="form-group">
                            <div className="text-center" role="alert" id="rebate_message"></div>
                        </div>
                       
                    </div>
                </div>
            </form>
           
        </div>
    </div>
    </>
  )
}

export default CashbackPopup
