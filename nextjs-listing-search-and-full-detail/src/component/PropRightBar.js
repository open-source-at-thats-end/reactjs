import React,{useState,useEffect,useRef} from 'react';

import { useDispatch,useSelector } from 'react-redux';
import { format } from '../constant';
import ValidateNew from './ValidateNew';
import { postContact,resetobjContact } from '../ThunkSlices/PostContactSlice';
import { loadCaptchaEngingeCus,LoadCanvasTemplateNoReloadCus,validateCaptchaCus } from './CaptchCustome'; 


function PropRightBar({detailObj,modalScheduleTour,loadLG,modalgetCashBack,isgetCashBack}) {
const dispatch = useDispatch();
const {objContact,dLoading}=useSelector((state)=>state.checkavailability);
const {configObj,cnfgLoading}=useSelector((state)=>state.getconfig);
let user_captcha;
let OffMarketMls_ID;

const [msgSuccess,setMsgSuccess]=useState('');
const [msgError,setMsgError]=useState('');
const [isEdge, setIsEdge] = useState(false);
useEffect(() => {
    const userAgent = navigator.userAgent;
    const isEdgeBrowser = userAgent.includes('Edg');

    setIsEdge(isEdgeBrowser);
  }, []);

  
if(detailObj !== false && detailObj !== null && typeof detailObj === 'object' && 'isoffmarket' in detailObj){
     OffMarketMls_ID=(detailObj.MLS_NUM+"-"+detailObj.MLSP_ID)
     
}
const [formPrFields,setFormPrFields]=useState(
    {
       lead_email:{
            type:'email',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter valid email",
            isValid:true,
        }, 
        lead_first_name:{
            type:'text',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter your name",
            isValid:true,
        },
        lead_home_phone:{
            type:'mobile',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter your phone number",
            isValid:true,
        },
        lead_comment:{
            type:'text',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter comment",
            isValid:true,
        },
        user_captcha_input:{
            type:'text',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter verification code",
            isValid:true,
        }
    });   
useEffect(() => {
    loadCaptchaEngingeCus(4,'#eee','black','numbers','rightCap');
}, []);

const loadCaptchaAgain = () => {
    loadCaptchaEngingeCus(4,'#eee','black','numbers', 'rightCap');
};  
      
      
const ScheduletourModalPopup=()=>{
    modalScheduleTour.current.style.zIndex = 1040;
    modalScheduleTour.current.style.display = 'block';
    modalScheduleTour.current.style.backgroundColor="rgba(0,0,0,0.6)"
    loadLG('scheduletour');
     
}  


const getCashbackModalPopup=()=>{
    modalgetCashBack.current.style.zIndex = 1040;
    modalgetCashBack.current.style.display = 'block';
    modalgetCashBack.current.style.backgroundColor="rgba(0,0,0,0.6)"
    document.body.style.overflow = 'hidden';
    loadLG('getcashback');
}
const handleFrmInput=(event)=>{
    const {name,value,type}=event.target;
   // console.log(value);
    formPrFields[name].sel_val = value;
    setFormPrFields({...formPrFields})
} 



const handleFormSubmit=(event)=>{
    if (event) event.preventDefault();
  
    let captchaValid = false;
    var data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    let validForm = ValidateNew(formPrFields, formObject)
    if(validateCaptchaCus(formObject.user_captcha_input)===true) {
        captchaValid = true;
        loadCaptchaEngingeCus(4,'#eee','black','numbers',"rightCap");
    }else{
        validForm.formData.user_captcha_input.isValid = false;
        validForm.formData.user_captcha_input.errorMsg = "Please enter verification code.";
    }
    setFormPrFields({...validForm.formData});
    if(validForm.isValid && captchaValid){
        let ContactObj={"lead_first_name":formObject.lead_first_name,"lead_email":formObject.lead_email,"lead_comment":formObject.lead_comment,
                        "lead_home_phone":formObject.lead_home_phone ,
                        "Listing_key":(detailObj !== false && detailObj !== null && typeof detailObj === 'object' && detailObj.ListingID_MLS  && !('isoffmarket' in detailObj)) ? detailObj.ListingID_MLS:OffMarketMls_ID, 
                        "lead_key":(detailObj !== false && detailObj !== null && typeof detailObj === 'object' &&'isoffmarket' in detailObj) ? "offMarket":"contactUs"};
        dispatch(postContact(ContactObj));
        event.target.reset();
      
    }
  
}

useEffect(() => {
    // Ensure the function is available
    if (typeof window != undefined) {
        if( window.doInputMasking)
            window.doInputMasking();
    } 
  }, []);

useEffect(() => {
   /*  if(typeof window !== undefined){
        window.doInputMasking();
    } */
  
if(Object.keys(objContact).length !== 0){
    if( (!("messge") in objContact)){
        setMsgError("Please, check all your input(s). Make sure you have entered all valid information.") 
    }else{
        setMsgSuccess(objContact.message);
     }
     

    setTimeout(() => {
        if(typeof window !== undefined){
            window.location.replace('https://www.demosite.com/thankyou.php');
        }
       
        dispatch(resetobjContact())
        setMsgError("");
        setMsgSuccess("");
        
    }, 2000);
}
}, [objContact])



const doSubmit = (formObject) => {
     user_captcha = formObject.user_captcha_input.errorMsg;
    if(validateCaptchaCus(user_captcha)===true) {
        loadCaptchaEngingeCus(4,'#eee','black','numbers'); 
    }else{
        formObject.user_captcha_input.isValid = false;
        setFormPrFields({...formObject});
     }
};
  return (
    <div id="pr-bar" className="col-12 col-md-12 col-lg-12 col-xl-3">
    <div id="pd-sidebar" className="affix">
        <section className="box-gray block py-lg-0">
            <div className="row">
                <div className={` ${detailObj.MLS_NUM === undefined ? 'col-12 text-center offers mt-1' :'col-12 text-center offers'}`}>
                {(detailObj.MLS_NUM !=undefined) &&
                <>
                    <div className="h7 f-c-primary text-uppercase mls-form">MLS&nbsp;#&nbsp;
                    {detailObj.MLS_NUM}&nbsp;&nbsp;&nbsp;&nbsp;<span className="font-color-black mls-form">$ 
                        &nbsp;{format(detailObj.ListPrice)}</span>
                    </div>
                    <div className="h6"></div>
                    <hr className="my-1"/>
                    </>
                }
                </div>
                <div
                    className="col-4 col-sm-3 offset-sm-3 col-md-4 offset-md-0 col-lg-4 col-xl-4 px-1-">
                    <a href="#" title={detailObj.MLS_NUM}> 
                        <img
                            src="https://www.demosite.com/pic/admin/1/200/200/f/100/0/201806112036321622399592-30932-006-lesres.jpg"
                            className="rounded-circle" height={75} width={75} alt="agent"/> </a>
                </div>
                <div
                    className="col-8 col-sm-4 col-md-8 col-lg-8 col-xl-8 pl-xl-0- agent-detail pl-0 pr-0">
                    <div className=" contact_details h6 mb-0">
                        The Day &amp; Jekov Group at CRR<br/>
                        DemoSite Level Agent<br/> <span className="fa fa-phone"></span><a
                            href="tel:561-614-5353" title="561-614-5353"> {configObj ? configObj.contact_number :"561-614-5353"}  </a><br/>
                        <span className="fa fa-envelope"></span><a className="font-size-14 ml-1"
                            href="mailto:info@demosite.com" title="info@demosite.com">
                            {configObj ? configObj.contact_email :"info@demosite.com"}</a>
                    </div>
                </div>
                <div itemScope="" itemType="http://schema.org/Offer" className="col-12 mt-0">
                    <form itemProp="InquryForm" itemScope=""
                        itemType="http://schema.org/InqueryForm" 
                        className="form" id="frmInquiry"
                        method="post" 
                        role="form" 
                        aria-label="frmInquiry form"
                        noValidate="noValidate" 
                        onSubmit={(e)=>handleFormSubmit(e)}>

                    {(msgSuccess)?
                    <div id="message-container" className="col-12 p-1">
                        <div className="alert alert-dismissible alert-success " role="alert">
                            <button type="button" className="alert-close p-0" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <strong className="fa"></strong>
                            <i className="fa fa-check"></i>&nbsp;{msgSuccess}
                        </div>
                    </div>:
                    (msgError)?
                    <div id="message-container" className="col-12 p-1">
                        <div className="alert alert-dismissible alert-danger " role="alert">
                            <button type="button" className="alert-close p-0" data-dismiss="alert" aria-label="Close" onClick={()=>setMsgError("")}>
                                <span aria-hidden="true">×</span>
                            </button>
                            <strong className="fa"></strong>
                            <i className="fa fa-close"></i>&nbsp;{msgError}
                        </div>
                    </div>:null}     

                        <div id="message-container" className="col-12 p-1"></div>
                        <div className="col-12 loading-area text-center mb-0"></div>
                        <div className="form-group full-view-form"> 
                        <input className="form-control required"
                                itemProp="lead_email" 
                                name="lead_email" 
                                id="lead_email"
                                data-msg-required="Please enter valid email" 
                                placeholder="Email"
                                type="email"
                                aria-required="true"
                                onChange={handleFrmInput}
                                />
                                 {((formPrFields.lead_email.isValid === false && formPrFields.lead_email.sel_val==="") || (formPrFields.lead_email.isValid === false && formPrFields.lead_email.sel_val !="")) &&(
                                        <label id="lead_email-error" className="error" htmlFor="lead_email">{formPrFields.lead_email.errorMsg}</label>
                                        )} 
                        </div>
                        <div className="form-group full-view-form"> 
                        <input className="form-control required"
                                itemProp="lead_first_name" name="lead_first_name"
                                id="lead_first_name" data-msg-required="Please enter your name"
                                placeholder="Name" type="text" aria-required="true"
                                onChange={handleFrmInput}
                                />
                                {(formPrFields.lead_first_name.sel_val === "" && formPrFields.lead_first_name.isValid === false) &&(
                                        <label id="lead_first_name-error" className="error" htmlFor="lead_first_name">{formPrFields.lead_first_name.errorMsg}</label>
                                        )}
                        </div>
                        <div className="form-group full-view-form"> 
                         <input className="form-control phone_no required"
                                itemProp="lead_home_phone" name="lead_home_phone" 
                                id="lead_home_phone" 
                                placeholder="Phone Number" 
                                type="text" 
                                aria-required="true"
                                onChange={handleFrmInput}
                                />
                                 {((formPrFields.lead_home_phone.isValid === false && formPrFields.lead_home_phone.sel_val==="") || (formPrFields.lead_home_phone.isValid === false && formPrFields.lead_home_phone.sel_val !="")) &&(
                                        <label id="lead_home_phone-error" className="error" htmlFor="lead_home_phone">{formPrFields.lead_home_phone.errorMsg}</label>
                                        )} 
                        </div>
                        <div className="form-group full-view-form"> 
                        <textarea className="form-control required" rows="1" itemProp="lead_comment"
                                name="lead_comment" 
                                id="lead_comment" 
                                placeholder="Comments"
                                data-msg-required="Please enter comment"
                                aria-required="true"
                                onChange={handleFrmInput}
                                >
                        </textarea> 
                        {(formPrFields.lead_comment.sel_val === "" && formPrFields.lead_comment.isValid === false) &&(
                                        <label id="lead_comment-error" className="error" htmlFor="lead_comment">{formPrFields.lead_comment.errorMsg}</label>
                                        )} 
                        </div>
                        <div className="-form-group full-view-form">
                            <div className="input-group flex-wrap "> 
                                     <LoadCanvasTemplateNoReloadCus  className="text-center"
                                        canid="rightCap"
                                        />
                                    <input type="text"
                                           itemProp="captch" name="user_captcha_input" id="user_captcha_input"
                                           className="form-control required" 
                                           style={{fontSize:13}}
                                           aria-describedby="basic-addon1"
                                           data-msg-required="Please enter Verification code"
                                           maxLength="4"
                                           placeholder="Type the character" 
                                           aria-required="true"
                                           /> 
                                    
                            </div>
                           
                            <small className="text-black">Can't read text? <a onClick={() =>loadCaptchaAgain()}
                                    href='#'
                                    title="Try another" className="text-secondary">Try
                                    another{"   "}
                                    {((formPrFields.user_captcha_input.sel_val === "" && formPrFields.user_captcha_input.isValid === false) || (formPrFields.user_captcha_input.sel_val != "" && formPrFields.user_captcha_input.isValid === false)) &&(
                                        <label id="user_captcha_input-error" className="error" htmlFor="user_captcha_input">{formPrFields.user_captcha_input.errorMsg}</label>
                                        )}  
                                    </a></small>
                        </div>
                        

                        {(detailObj !== false && detailObj !== null && typeof detailObj === 'object' && "isoffmarket" in detailObj ) &&
                     <>
                     <div className="row text-center my-1 contact_btns-block">
                           <div className={`col-12 px-3 my-2 d-flex`}>
                               <button type="submit" name="Submit" 
                                   className="btn btn-primary icon shadow btn-inquiry py-2 text-center p-0"
                                   style={{width: "100%"}}  
                                   value="selling consultation"
                                  >Schedule a selling consultation
                                  </button>
                           </div> 
                           </div> 
                             
                     <div class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 px-1 my-2 d-flex mb-3"  style={{backgroundColor:'#17365D'}}>
                            <a href={(isEdge) ? "callto:(+1)-561-614-5353":"tel:(+1)-561-614-5353"} class="btn shadow te-quick-deal-btn py-2 w-100 text px-1" title="Tel Phone">
                                <div class="text-white wrap-font text-center-qd" >Call for Action
                                    </div>
                            </a> 
                            </div>
                           </>
                               }
                        {(detailObj !== false && detailObj !== null && typeof detailObj === 'object' && !("isoffmarket" in detailObj)) &&
                       <>
                        <div className="row text-center my-1 contact_btns-block">
                            <div className={` ${isgetCashBack.Get_cash_back === "N" ? "col-12":"col-6"}  px-1 my-2 d-flex`}>
                                <button type="submit" name="Submit" 
                                    className="btn btn-primary icon shadow btn-inquiry py-2 text-center p-0"
                                    style={{width: "100%"}}  
                                    value="MAKE AN OFFER"
                                   >CHECK
                                    AVAILABILITY</button>
                            </div> 
                            <input itemProp="ListingID_MLS" type="hidden"
                                name="ListingID_MLS" defaultValue="R10825079-3"/> <input type="reset"
                                className="d-none"/>
                           {isgetCashBack.Get_cash_back === "Y" ?
                            <div className="col-6 px-1 my-2 d-flex">
                               
                                <button type="button" name="Submit"  
                                       onClick={getCashbackModalPopup} 
                                    className="btn w-100 icon shadow btn-inquiry py-2 get-cashback w-100 "
                                    data-toggle="modal" id="get-cashback"><i className="fa fa-dollar fa-lg"></i> 
                                        GET CASHBACK</button>
                            </div> :null}
                        </div>
                        <div className="row te-prop-agent-buttons text-center my-1 d-flex">
                            <div className="col-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 px-1 my-2 d-flex">
                                <a data-toggle="modal" href="#"
                                    title="Schedule tour"
                                    className="btn shadow btn-inquiry te-prop-get-approved-btn sch_tour-btn text-white py-2 w-100 px-1" 
                                     id=""
                                     data-target="modal-popup-ss" 
                                     onClick={ScheduletourModalPopup}
                                    >
                                    <span className="text-white wrap-font text-center-qd"
                                        itemProp="name"> Schedule Tour </span></a>
                                        
                            </div>
                            <div
                                className="col-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 px-1 my-2 d-flex ">
                                <a href={`https://www.demosite.com/make-an-offer/${detailObj.ListingID_MLS}`}
                                    title={detailObj.ListingID_MLS} role="button"
                                    className="btn shadow btn-inquiry te-prop-check-availibility-btn py-2 w-100 px-1"
                                    target="_blank">
                                    <div className="text-white wrap-font text-center-mao">Make An Offer
                                    </div>
                                </a>
                            </div>
                            <div className="col-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 px-1 my-2 d-flex">
                                <a href={(isEdge) ? "callto:(+1)-561-614-5353":"tel:(+1)-561-614-5353"}
                                    className="btn shadow te-quick-deal-btn py-2 w-100 text px-1"
                                    title="Tel Phone">
                                    <div className="text-white wrap-font text-center-qd">Call Now
                                    </div>
                                </a> <input type="hidden" name="ListingID_MLS" defaultValue={detailObj.ListingID_MLS}/>
                                <input type="reset" className="d-none"/>
                            </div>
                        </div>
                        </> } 
                      
                       
                               
                    </form>
                </div> 
                <a href="#" data-toggle="modal" data-target="Inquiry"
                    data-url="https://www.demosite.com/north-palm-beach-homes-for-sale/12210-banyan-road-north-palm-beach-fl-33408-mls-r10825079-3?Action=Inquiry&amp;mlsno=R10825079-3"
                    className="popup-modal-lg d-none" id="inquiry-frm" title="R10825079-3"></a>
            </div>
        </section>
    </div>
</div>
  )
}

export default PropRightBar
