import React,{useState,useEffect} from 'react';
import ValidateNew from './ValidateNew';
import { useDispatch,useSelector } from 'react-redux';
import { postOnlineBargainList,resetObjBargain } from '../ThunkSlices/PostOnlineBargain';

function OnlineBargainPopup({modallgref,item}) {
	const dispatch = useDispatch();
	const [msgSuccess,setMsgSuccess]=useState('');
	const [msgError,setMsgError]=useState('');
	const {objBargain,loadingBargain}=useSelector((state)=>state.onlineBargain);
	const [leadFormFields,setLeadFormFields]=useState(
		{
			lead_first_name:{
				type:'text',
				sel_val:"",
				isRequired: true,
				errorMsg: "Please enter name",
				isValid:true,
			},
			lead_email:{
				type:'email',
				sel_val:"",
				isRequired: true,
				errorMsg: "Please enter your email",
				isValid:true,
			},
			lead_home_phone:{
				type:'mobile',
				sel_val:"",
				isRequired: true,
				errorMsg: "Please enter phone number",
				isValid:true,
			},
			lead_offer_price:{
				type:'text',
				sel_val:"",
				isRequired: true,
				errorMsg: "Please enter offer price",
				isValid:true,
			},
			lead_comment:{
				type:'text',
				sel_val:"",
				isRequired:true,
				errorMsg:"Please enter your message",
				isValid:true,
			},
			lead_working_with_other_agent:{
				type:'text',
				sel_val:"",
			}
		});	

const hadleLGClose=()=>{
    if(modallgref.current !=undefined)
    modallgref.current.style.display = 'none';   
} 
const handleFormSubmit=(event)=>{
	if (event) event.preventDefault();
    var data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    let validForm = ValidateNew(leadFormFields,formObject);
	setLeadFormFields({...validForm.formData})
	if(validForm.isValid ){
        let bargainObj={"lead_first_name":formObject.lead_first_name,"lead_email":formObject.lead_email,"lead_comment":formObject.lead_comment,
                        "lead_home_phone":formObject.lead_home_phone ,"lead_offer_price":formObject.lead_offer_price };
        dispatch(postOnlineBargainList(bargainObj));
        event.target.reset();
	}
}

useEffect(() => {
    // Ensure the function is available
    if (typeof window.doInputMasking === 'function') {
      window.doInputMasking();
    } else {
      console.error('doInputMasking is not a function');
    }
  }, []);
useEffect(() => {
	/* if(typeof window !== undefined){
        window.doInputMasking();
    } */
if(Object.keys(objBargain).length !== 0){
    if( (!("messge") in objBargain)){
        setMsgError("Please, check all your input(s). Make sure you have entered all valid information.") 
    }else{
        setMsgSuccess(objBargain.message);
     }
     
	setTimeout(() => {
        dispatch(resetObjBargain())
        setMsgError("");
        setMsgSuccess("");
		modallgref.current.style.display = 'none';
    }, 2000);
}
}, [objBargain])

const handleFrmInput=(event)=>{
    const {name,value,type}=event.target;
    leadFormFields[name].sel_val = value;
    setLeadFormFields({...leadFormFields})
} 

  return (
    <>
       <div className="modal-header inq-header">
	<button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={hadleLGClose}>×</button>
	<div className="row w-100">
		<div className="col-12 col-sm-12">
			<div className="section-title h4 text-primary text-center">1 % demo site bonus rebate on select listings – online only. <br/>Sign up today!</div>
		</div>
	</div>
</div>
<div className="modal-body">
	<div className="row">
		<div className="col-12 col-sm-12 col-md-12">
			<div id="ob-alert"></div>
			<form  id="form_OBargain" role="form" method="post" noValidate="noValidate" >
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
				<div className="row">
					<div className="col-sm-6 col-md-6">
						<div className="form-group">
							<label for="fname">Name</label>
							<input 	type="text" 
									className="form-control required" 
									name="lead_first_name" 
									id="lead_first_name" 
									data-msg-required="Please enter name"
									onChange={handleFrmInput}
									/>
							{(leadFormFields.lead_first_name.sel_val === "" && leadFormFields.lead_first_name.isValid === false) &&(
								<label id="lead_first_name-error" className="error" htmlFor="lead_first_name">{leadFormFields.lead_first_name.errorMsg}</label>
								)}
						</div>
					</div>
					<div className="col-12 col-sm-6 form-group">
						<label for="email">Email</label>
						<input  type="email" 
								className="form-control required" 
								name="lead_email" id="lead_email" 
								data-msg-required="Please enter your email"
								onChange={handleFrmInput}
								/>
						{(leadFormFields.lead_email.sel_val === "" && leadFormFields.lead_email.isValid === false) &&(
								<label id="lead_email-error" className="error" htmlFor="lead_email">{leadFormFields.lead_email.errorMsg}</label>
								)}
					</div>
					<div className="col-sm-6 form-group">
						<label for="phone">Mobile</label>
						<input  type="text" 
								className="form-control phone_no required" 
								name="lead_home_phone" 
								id="lead_home_phone" 
								data-msg-required="Please enter phone number"
								onChange={handleFrmInput}/>
						{(leadFormFields.lead_home_phone.sel_val === "" && leadFormFields.lead_home_phone.isValid === false) &&(
								<label id="lead_home_phone-error" className="error" htmlFor="lead_home_phone">{leadFormFields.lead_home_phone.errorMsg}</label>
								)}
					</div>
					<div className="col-sm-6 form-group">
						<label for="phone">Offer Price</label>
						<input  type="text" 
								className="form-control required digits" 
								name="lead_offer_price" 
								id="lead_offer_price" 
								data-msg-required="Please enter offer price"
								onChange={handleFrmInput}
								/>
						{(leadFormFields.lead_offer_price.sel_val === "" && leadFormFields.lead_offer_price.isValid === false) &&(
								<label id="lead_offer_price-error" className="error" htmlFor="lead_offer_price">{leadFormFields.lead_offer_price.errorMsg}</label>
								)}
					</div>
					<div className="col-12 form-group">
						<label for="message">Message</label>
						<textarea   className="form-control required" 
									id="lead_comment" 
									rows="4" 
									name="lead_comment" 
									data-msg-required="Please enter your message"
									onChange={handleFrmInput}
									>
						</textarea>
						{(leadFormFields.lead_comment.sel_val === "" && leadFormFields.lead_comment.isValid === false) &&(
								<label id="lead_comment-error" className="error" htmlFor="lead_comment">{leadFormFields.lead_comment.errorMsg}</label>
								)}
					</div>
					<div className="col-sm-6">
						<label className="custom-control custom-checkbox">
							<input  type="checkbox" 
									name="lead_working_with_other_agent" 
									id="lead_working_with_other_agent" 
									className="custom-control-input" 
									value="Yes"/>
							<span className="custom-control-indicator"></span>
							<span className="custom-control-description">Are you working with another realtor?</span>
						</label>
					</div>
					<div className="col-sm-6 text-right">
						I agree to <a href="{$Host_Url}/{$pageTermsCondition.page_sef_url}" target="_blank" title="Terms and conditions">Terms and conditions</a> & <a href="{$Host_Url}/{$pagePrivacyPolicy.page_sef_url}" target="_blank" title="Privacy Policy">Privacy Policy</a>
					</div>
					<div className="col-12 loading-area text-center" ></div>
					<div className="col-12 form-group text-center">
						<button type="submit" className="btn btn-primary icon shadow btn-ob">Submit</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
    </>
  )
}

export default OnlineBargainPopup
