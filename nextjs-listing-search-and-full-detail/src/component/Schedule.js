import React,{useRef,useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { PostScheduleTour,resetObjstour } from '../ThunkSlices/PostStourSlice';
import validate from './Validation';
import ValidateNew from './ValidateNew';
//import "react-datepicker/dist/react-datepicker.css";
import { loadCaptchaEngingeSchedule,LoadCanvasTemplateNoReloadSchedule,validateCaptchaSchedule } from './CaptchaSchedule';
//import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from 'moment';

function ScheduleTourPopup({modalScheduleTour,item}) {
const dispatch = useDispatch();
let user_captcha;
const {objSTour,sTourLoading}=useSelector((state)=>state.sTour);
const [msgSuccess,setMsgSuccess]=useState('');
const [msgError,setMsgError]=useState('');
const [sel_date,setSel_date]=useState();
const [schFormFields,setSchFormFields]=useState(
    {
        lead_first_name:{
            type:'text',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter your name",
            isValid:true,
        },
        lead_email:{
            type:'email',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter valid email",
            isValid:true,
        },
        lead_home_phone:{
            type:'mobile',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter phone number",
            isValid:true,
        },
        lead_subject:{
            type:'text',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter your subjects",
            isValid:true,
        },
        lead_date_time:{
            type:'dt',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter Date time",
            isValid:true,
        },
        lead_working_with_other_agent:{
            type:'text',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter first name",
            isValid:true,
        },
        ListingID_MLS:{
            type:'text',
            sel_val:""
        },
        lead_comment:{
            type:'text',
            sel_val:""
        },
        user_captcha_input:{
            type:'text',
            sel_val:"",
            isRequired: true,
            errorMsg: "Please enter Verification code",
            isValid:true,
        }
    });
    var yesterday = moment().subtract( 1, 'day' );
    
    const validDT = ( current ) => {
        return current.isAfter( yesterday );
    };
    var currentDT = new Date();
  


      useEffect(() => {
        // Ensure the function is available
        loadCaptchaEngingeSchedule(4,'#eee','black','numbers','schedulecaptcha');
        if (typeof window.doInputMasking === 'function') {
          window.doInputMasking();
        } else {
          console.error('doInputMasking is not a function');
        }
      }, []);

const hadleMDClose=()=>{
    if(modalScheduleTour.current !=undefined)
        modalScheduleTour.current.style.display = 'none';
        let validForm = validate(schFormFields)
        let resetData = resetFormData(validForm.formData);
        setSchFormFields({...resetData});
        setMsgSuccess('');
}

const loadCaptchaAgain = () => {
       loadCaptchaEngingeSchedule(4,'#eee','black','numbers','schedulecaptcha');
  };

const handleFrmInput=(event)=>{
    const {name,value,type}=event.target;
    schFormFields[name].sel_val = value;
    setSchFormFields({...schFormFields})
}

const handleOnClose=(momentObj)=>{
    if(typeof momentObj == 'object'){
        let  value = momentObj.format('YYYY-MM-DD HH:mm:ss');
        setSel_date(value)
        console.log(value);
        schFormFields['lead_date_time'].sel_val = value;
        setSchFormFields({...schFormFields})
    }
    
}

const handleFormSubmit=(event)=>{
    if (event) event.preventDefault();
    let captchaValid = false;
    var data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    let validForm = ValidateNew(schFormFields,formObject)

    if(validateCaptchaSchedule(formObject.user_captcha_input)===true) {
        captchaValid = true;
        //alert('Captcha Matched');
        loadCaptchaEngingeSchedule(4,'#eee','black','numbers',"schedulecaptcha"); 
        //document.getElementById('user_captcha_input').value = "";
    }else{
        //alert('Captcha Does Not Match');
        //user_captcha=formObject.user_captcha_input.errorMsg
        validForm.formData.user_captcha_input.isValid = false;
        validForm.formData.user_captcha_input.errorMsg = "Please enter verification code.";
        //setFormPrFields({...formObject});
        //document.getElementById('user_captcha_input').value = "";
    }
    setSchFormFields({...validForm.formData});
    if(validForm.isValid && captchaValid){
        let StourObj={"lead_first_name":formObject.lead_first_name,"lead_email":formObject.lead_email,"lead_comment":formObject.lead_comment,
        "lead_home_phone":formObject.lead_home_phone,"lead_subject":formObject.lead_subject,"lead_date_time":sel_date,
        "listingid_mls":item.ListingID_MLS,"Listing_key":item.ListingID_MLS ? item.ListingID_MLS:"0" };
        dispatch(PostScheduleTour(StourObj));
        event.target.reset();
    }
}

useEffect(() => {
    if(Object.keys(objSTour).length != 0){
        if((!("messge") in objSTour)){
            setMsgError("Please, check all your input(s). Make sure you have entered all valid information.");
        }else{
            setMsgSuccess(objSTour.message);
        }

        setTimeout(() => {
            dispatch(resetObjstour())
            setMsgError("");
            setMsgSuccess("");
            modalScheduleTour.current.style.display = 'none';
        }, 2000);
        
    }

}, [objSTour])

const resetFormData = (formData) => {
    Object.keys(formData).map((item)=>{
        formData[item].sel_val = ''
      if(formData[item].isRequired){
        formData[item].isValid = true
      }
    });
    return formData;
  };

const doSubmit = () => {
    user_captcha = document.getElementById('user_captcha_input').value;
   if(validateCaptchaSchedule(user_captcha)===true) {
       alert('Captcha Matched');
       loadCaptchaEngingeSchedule(4,'#eee','black','numbers','schedulecaptcha'); 
       document.getElementById('user_captcha_input').value = "";
   }else{
       alert('Captcha Does Not Match');
       user_captcha="Captcha Does Not Match"
       document.getElementById('user_captcha_input').value = "";
   }
};

  return (
    <>
      <div className="modal-header"> <button type="button" className="close" data-dismiss="modal"
                            aria-label="Close" onClick={hadleMDClose}><span aria-hidden="true">×</span></button>
                        <div className="section-schFormFields">
                            <h2 style={{marginBottom:10}}>Schedule a Tour</h2>
                        </div>
                    </div>
                    <div className="modal-body">
                        <form role="form" id="form_Schedule" method="post" noValidate="noValidate" onSubmit={(e)=>handleFormSubmit(e)}>
                          {/* {(schFormFields.user_captcha_input.sel_val != "" && schFormFields.user_captcha_input.isValid === false) ?
                            <div id="schedule-alert" classname="col-12 p-0">
                                 <div classname="alert alert-dismissible alert-danger " role="alert">
                            <button type="button" classname="alert-close p-0" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <strong classname="fa"></strong>
                            <i classname="fa fa-close"></i>&nbsp;Please re-enter verification code.
                            </div>  
                            </div>:null} */}
                            
                            
                       
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
                             
                            <div className="form-group"> 
                            <input type="text" id="lead_first_name" name="lead_first_name"
                                    maxLength="50" className="form-control required"
                                    data-msg-required="Please enter your name"  placeholder="Full Name"
                                    aria-required="true" //value={schFormFields.lead_first_name.sel_val || ""} 
                                    onChange={handleFrmInput}
                                    />
                                    {(schFormFields.lead_first_name.sel_val === "" && schFormFields.lead_first_name.isValid === false) &&(
                                        <label id="lead_first_name-error" className="error" htmlFor="lead_first_name">{schFormFields.lead_first_name.errorMsg}</label>
                                        )}
                            </div>
                            <div className="form-group"> <input name="lead_email" type="email" id="lead_email"
                                    data-msg-required="Please enter valid email" className="form-control required"
                                    placeholder="Email" aria-required="true" //value={schFormFields.lead_email.sel_val || ""} 
                                    onChange={handleFrmInput}
                                    />
                                    {((schFormFields.lead_email.sel_val === "" && schFormFields.lead_email.isValid === false)  || (schFormFields.lead_email.sel_val != "" && schFormFields.lead_email.isValid === false)) &&(
                                        <label id="lead_email-error" className="error" htmlFor="lead_email">{schFormFields.lead_email.errorMsg}</label>
                                        )}
                                    </div>
                            <div className="form-group"> 
                            <input type="text" 
                                    className="form-control phone_no required"
                                    name="lead_home_phone" id="lead_home_phone"
                                    data-msg-required="Please enter phone number" placeholder="Phone No."
                                    aria-required="true" 
                                    //value={schFormFields.lead_home_phone.sel_val || ""} 
                                    onChange={handleFrmInput}
                                    maxLength={10}/>
                                    {((schFormFields.lead_home_phone.sel_val === "" && schFormFields.lead_home_phone.isValid === false) || (schFormFields.lead_home_phone.sel_val != "" && schFormFields.lead_home_phone.isValid === false))&&(
                                        <label id="lead_home_phone-error" className="error" htmlFor="lead_home_phone">{schFormFields.lead_home_phone.errorMsg}</label>
                                        )}
                                    </div>
                             <div className="form-group"> <input type="text" placeholder="Subject"
                                    className="form-control required" name="lead_subject" id="lead_subject"
                                    data-msg-required="Please enter your subjects" aria-required="true"
                                    //value={schFormFields.lead_subject.sel_val || ""} 
                                    onChange={handleFrmInput}
                                    />
                                    {(schFormFields.lead_subject.sel_val === "" && schFormFields.lead_subject.isValid === false) &&(
                                        <label id="lead_subject-error" className="error" htmlFor="lead_subject">{schFormFields.lead_subject.errorMsg}</label>
                                        )}
                                    </div>
                            <div className="form-group"> 
                            <Datetime 
                                      initialValue={currentDT}
                                      locale="en-US"
                                      dateFormat="DD MMM YYYY"
                                      input={true}
                                      inputProps={{name:'lead_date_time'}}
                                      //inputValue = {schFormFields.lead_date_time.sel_val || ""} 
                                      //value = {schFormFields.lead_date_time.sel_val || ""} 
                                      closeOnSelect={true}
                                      isValidDate={validDT}
                                      onClose={handleOnClose}
                                      />
                                      {(schFormFields.lead_date_time.sel_val === "" && schFormFields.lead_date_time.isValid === false) &&(
                                        <label id="lead_date_time-error" className="error" htmlFor="lead_date_time">{schFormFields.lead_date_time.errorMsg}</label>
                                        )} 
                           {/*  <DateTimePicker  className="form-control required " onChange={date=>setDate(date)} value={date} /> */}
                            {/* <DatePicker 
                                placeholderText="Date and Time"
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                showTimeInput="false"
                                showTimeSelect={false}
                                /> */}
                            {/* <input type="text" placeholder="Date and Time"
                                    className="form-control required datetimepicker" name="lead_date_time"
                                    id="lead_date_time" data-msg-required="Please enter Date time" aria-required="true"
                                    value={schFormFields.lead_date_time.sel_val || ""} onChange={handleFrmInput}/>
                                    {(schFormFields.lead_date_time.sel_val === "" && schFormFields.lead_date_time.isValid === false) &&(
                                        <label id="lead_date_time-error" className="error" for="lead_date_time">{schFormFields.lead_date_time.errorMsg}</label>
                                        )} */}
                            </div>
                            <div> <label>Are you currently working with a demo site agent?</label><br/>
                                <div className="form-check form-check-inline"> <input type="radio"
                                        name="lead_working_with_other_agent"
                                        value="Yes" onChange={handleFrmInput}
                                        /> <label
                                        htmlFor="lead_working_with_other_agent">Yes</label> </div>
                                <div className="form-check form-check-inline"> <input type="radio"
                                        name="lead_working_with_other_agent"  defaultChecked="checked"
                                        value="No" onChange={handleFrmInput}/> <label
                                        htmlFor="lead_working_with_other_agent">No</label> </div>
                            </div>
                            <div className="form-group"> <textarea name="lead_comment" id="lead_comment"
                                    placeholder="Message" className="form-control" rows="4"
                                    //value={schFormFields.lead_comment.sel_val || ""} 
                                    onChange={handleFrmInput}
                                    ></textarea>
                            </div>
                           
                            <div className="form-group"> <label>Verification Code:</label>
                                <div className="input-group" > 
                                {/* <img src="images/captcha1.jpg" alt="capatch"
                                        id="schedule_capatch" className="input-group-addon p-0"/>  */}
                                      <LoadCanvasTemplateNoReloadSchedule
                                            canid="schedulecaptcha"
                                            />
                                        {/* <input type="text"
                                               name="user_captcha_input"
                                               id="user_captcha_input" 
                                               className="form-control required"
                                               data-msg-required="Please enter Verification code" maxLength="4"
                                               placeholder="Type the character" aria-required="true"
                                               value={schFormFields.user_captcha_input.sel_val || ""} 
                                               onChange={handleFrmInput}/>  */}
                                               
                                               <input placeholder="Type the character" 
                                                        id="user_captcha_input" 
                                                        name="user_captcha_input" 
                                                        type="text"
                                                        //value={schFormFields.user_captcha_input.sel_val || ""}
                                                        className="form-control required" 
                                                        data-msg-required="Please enter Verification code"  maxLength="4" 
                                                        //onChange={handleFrmInput}
                                                        ></input>
                                               
                                    </div> 
                                    
                                        <small>Can't read text? 
                                            <a href="#"
                                               schFormFields="try another"
                                               onClick={() =>loadCaptchaAgain()}>Try another
                                        </a>
                                        </small>
                                        {((schFormFields.user_captcha_input.sel_val === "" && schFormFields.user_captcha_input.isValid === false) || (schFormFields.user_captcha_input.sel_val != "" && schFormFields.user_captcha_input.isValid === false)) &&(
                                                    <label id="user_captcha_input-error" className="error" htmlFor="user_captcha_input">{schFormFields.user_captcha_input.errorMsg}</label>
                                                    )}
                                </div>
                            <div>
                                <div className="col-12 loading-schedule text-center"></div>
                            </div>
                            <div className="form-group">
                                <div className="btn-group-justified center"> <button name="Submit" type="submit"
                                        className="btn btn-primary btn-schedule" value="Schedule">Confirm Tour</button>
                                    <input name="ListingID_MLS" id="ListingID_MLS" type="hidden" defaultValue="R10825079-3"/>
                                    <input type="reset" className="d-none"/>
                                </div>
                            </div>
                        </form>
                    </div>
    </>
  )
}

export default ScheduleTourPopup
