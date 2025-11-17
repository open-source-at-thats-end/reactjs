import React,{useRef,useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { postShare,resetObjshare } from '../ThunkSlices/PostShareSlice';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton ,FacebookIcon,LinkedinShareButton,PinterestShareButton, TwitterIcon,LinkedinIcon} from 'react-share';


import { loadCaptchaEngingeCus,LoadCanvasTemplateNoReloadCus,validateCaptchaCus } from './CaptchCustome';


function SharePopup({modalShare,item,metaImage}) {
const dispatch = useDispatch();
const [formerrors, setFormErrors] = useState({});
const {objShare,shareLoading}=useSelector((state)=>state.shareForm);
const [msgSuccess,setMsgSuccess]=useState('');
const [msgError,setMsgError]=useState('');
const [formshareField,setFormShareField]=useState({your_name:"",your_email:"",friend_name:"",friend_email:"",comment:"",user_captcha_input:""});
let user_captcha;
//const modalShare=useRef(null);
useEffect(() => {
  loadCaptchaEngingeCus(4,'#eee','black','numbers', 'shareCaptcha');
}, []);

useEffect(() => {
  if(Object.keys(objShare).length != 0){
      if((!("messge") in objShare)){
          setMsgError("Please, check all your input(s). Make sure you have entered all valid information.");
      }else{
          setMsgSuccess(objShare.message);
          setFormShareField({});
      }

      setTimeout(() => {
          dispatch(resetObjshare())
          setMsgError("");
          setMsgSuccess("");
          modalShare.current.style.display = 'none';
          //modalShare.current.style.overflowY = 'auto';
      }, 2000);
      
  }

}, [objShare])

const shareUrl = typeof window !== "undefined" ? "https://www.demosite.com"+window.location.pathname  : "";


 const hadleMLgClose=()=>{
    //console.log(modalShare.current.style.display);
    //modalShare.current.style.zIndex = 0;
    modalShare.current.style.display = 'none';
    setFormShareField({})
    setFormErrors({})
   }

   const handleFrmInput=(event)=>{
    const {name,value,}=event.target;
    setFormShareField((prevFormData) => ({ ...prevFormData, [name]: value }));
  }


  const validate = () => {
    let errors = {};
    let isValid = true;

    //name field
    if(!formshareField.your_name) {
      errors.your_name = "Please enter your name";
      isValid = false;
    }else{
      errors.your_name = ""
    }

    //email field
    if(!formshareField.your_email) {
      errors.your_email = "Please enter valid email";
      isValid = false;
    }else if (!/\S+@\S+\.\S+/.test(formshareField.your_email)) {
      errors.your_email = "Email address is invalid";
    }else{
      errors.your_email = "";
    }

     //friend name field
    if (!formshareField.friend_name) {
      isValid = false;
      errors.friend_name = "Please enter your friend name";
    }else{
      errors.friend_name = "";
    }

    //frnd email field
    if(!formshareField.friend_email) {
      isValid = false;
      errors.friend_email = "Please enter valid friend email";
    }else if (!/\S+@\S+\.\S+/.test(formshareField.friend_email)) {
      isValid = false;
      errors.friend_email = "Friend email address is invalid";
    }else{
      errors.friend_email = "";
    }

    if(!formshareField.comment) {
      isValid = false;
      errors.comment = "Please enter comments using 255 characters only";
    }else{
      errors.comment = ""
    }
    

    if(!formshareField.user_captcha_input) {
      isValid = false;
      errors.user_captcha_input = "Please enter Verification code";
    }else{
      errors.user_captcha_input = ""
    }
    setFormErrors(errors);
    return isValid;
  };

   const handleFormSubmit=(event)=>{
    if (event) event.preventDefault();
    let isValid = validate(formshareField);
    if(isValid === false){
      return false;
  }
  var data = new FormData(event.target);
  let formObject = Object.fromEntries(data.entries());
  doSubmit(formObject)
};
   
 const doSubmit = (formObject) => {
     user_captcha = formObject.user_captcha_input;//document.getElementById('user_captcha_input').value;
    if(validateCaptchaCus(user_captcha)===true) {
        
        loadCaptchaEngingeCus(4,'#eee','black','numbers', 'shareCaptcha'); 
        document.getElementById('user_captcha_input').value = "";
        let ShareObj={"lead_first_name":formObject.your_name,"lead_email":formObject.your_email,"lead_comment":formObject.comment,
        "friend_email":formObject.friend_email,"friend_name":formObject.friend_name, "Listing_key":item.ListingID_MLS ? item.ListingID_MLS:"0" };
        dispatch(postShare(ShareObj));
       
    }else{
        
        user_captcha="Captcha Does Not Match"
        document.getElementById('user_captcha_input').value = "";
        let errors = {};
        errors.user_captcha_input = "Please enter valid captcha";
        setFormErrors(errors);
    }
};

const loadCaptchaAgain = () => {
  loadCaptchaEngingeCus(4,'#eee','black','numbers', 'shareCaptcha');
};


  return (
    <>
    <div className="modal-header">
         <button className="close closelg" data-dismiss="modal" aria-label="Close" onClick={hadleMLgClose}>
            <span aria-hidden="true">&times;</span></button> 
       
        <div className="section-formshareField">
            <h2>{item !=undefined ?("Share  "+item.StreetNumber+ ' ' + item.StreetName):"Share"}</h2>
        </div>
    </div>
    <div className="modal-body bodystyle" >
    
        <form id="frmEmailFriend" method="post" role="form" onSubmit={(e)=>handleFormSubmit(e)}>

     {/*    {(formshareField.user_captcha_input) ?
                            <div id="schedule-alert" class="col-12 p-0">
                                 <div class="alert alert-dismissible alert-danger " role="alert">
                            <button type="button" class="alert-close p-0" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <strong class="fa"></strong>
                            <i class="fa fa-close"></i>&nbsp;Please re-enter verification code.
                            </div>  
                            </div>:null} */}
          {(msgSuccess )? 
           <div className="form-group"> 
              <div className="text-center" role="alert" id="email_message">
                <div className="alert alert-dismissible alert-success " role="alert">
                  <button type="button" className="alert-close p-0" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">×</span>
                  </button>
                  <strong className="fa"></strong>
                  <i className="fa fa-check"></i>&nbsp;{msgSuccess}
                </div>
              </div> 
            </div>
        :(msgError )? 
        <div className="form-group"> 
           <div className="text-center" role="alert" id="email_message">
             <div className="alert alert-dismissible alert-danger " role="alert">
               <button type="button" className="alert-close p-0" data-dismiss="alert" aria-label="Close">
               <span aria-hidden="true">×</span>
               </button>
               <strong className="fa"></strong>
               <i className="fa fa-close"></i>&nbsp;{msgError}
             </div>
           </div> 
         </div>
     :null}  
            <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 form-group">
                    <label >Your Name:</label>
                    <input type="text"
                           className="form-control required" 
                           name="your_name" 
                           id="your_name" 
                           value={formshareField.your_name || ""}
                           data-msg-required="Please enter your name" 
                           placeholder="Your Name"
                           onChange={handleFrmInput}/>
                    {formerrors.your_name && (
                        <label id="your_name-error" className="error" for="your_name">{formerrors.your_name}</label>
                        )}
                  </div>
               
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 form-group">
                    <label>Your Email:</label>
                    <input type="email" 
                           name="your_email" 
                           id="your_email" 
                           className="form-control required" 
                           placeholder="Your Email" 
                           data-msg-required="Please enter valid email"
                           value={formshareField.your_email || ""}
                           onChange={handleFrmInput}
                           />
                    {formerrors.your_email && (
                        <label id="your_email-error" className="error" for="your_email">{formerrors.your_email}</label>
                        )}
                  </div>
                  
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 form-group">
                    <label>Friend Name:</label>
                    <input type="text" 
                           name="friend_name" 
                           id="friend_name" 
                           className="form-control required" 
                           placeholder="Friend Name" 
                           data-msg-required="Please enter your friend name"
                           value={formshareField.friend_name || ""}
                           onChange={handleFrmInput}
                           />
                      {formerrors.friend_name && (
                           <label id="friend_name-error" className="error" for="friend_name">{formerrors.friend_name}</label>
                          )}
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 form-group">
                    <label>Friend Email: </label>
                    <input type="email" 
                           name="friend_email" 
                           id="friend_email" 
                           className="form-control required" 
                           placeholder="Friend Email" 
                           data-msg-required="Please enter valid friend email"
                           value={formshareField.friend_email || ""}
                           onChange={handleFrmInput}
                           />
                    {formerrors.friend_email && (       
                           <label id="friend_email-error" className="error" for="friend_email">{formerrors.friend_email}</label>
                           )}
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 form-group">
                    <label>Comments:</label>
                    <textarea name="comment" 
                              type="text" 
                              id="comment" 
                              className="form-control required" 
                              data-msg-required="Please enter comments using 255 characters only"
                              value={formshareField.comment || ""}
                              onChange={handleFrmInput}
                              ></textarea>
                    {formerrors.comment && (            
                              <label id="comment-error" className="error" for="comment">{formerrors.comment}</label>
                              )}
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 form-group">
                  <div className='d-flex' >
                    <label>Verification Code:</label>
                    <LoadCanvasTemplateNoReloadCus
                      canid="shareCaptcha"
                    />
                    </div> {/* {$Site_Root}/captcha.php?t={time()} */}
                    
                    <small>Can't read text? <a href="#" formshareField="Try another" onClick={() =>loadCaptchaAgain()}>Try another</a></small> {/* href="javascript:reloadCaptcha('email_capatch');" */}
                    {/* <input type="text" 
                           name="code_of_image" 
                           id="code_of_image" 
                           value={formshareField.code_of_image || ""}
                           className="form-control required" 
                           data-msg-required="Please enter Verification code" 
                           size="23" maxLength="4" 
                           placeholder="Enter the code shown in image"
                           onChange={handleFrmInput}/>
                    {formerrors.code_of_image && (          
                    <label id="code_of_image-error" className="error" for="code_of_image">{formerrors.code_of_image}</label>
                    )} */}
                </div> 
                <div className="col ">
                       <input placeholder="Enter the code shown in image" 
                              id="user_captcha_input" 
                              name="user_captcha_input" 
                              type="text"
                              value={formshareField.user_captcha_input || ""}
                              className="form-control required" 
                              data-msg-required="Please enter Verification code" 
                              size="23" maxLength="4" 
                              onChange={handleFrmInput}></input>
                       {formerrors.user_captcha_input && (          
                    <label id="user_captcha_input-error" className="error" for="user_captcha_input">{formerrors.user_captcha_input}</label>
                    )}
                   </div>
            

            </div>
            <div className="form-group">
                <div className="col-xs-12 email-loading-area text-center" ></div>
            </div>
            <div className="form-group center d-block d-md-flex justify-content-center">
                <input type="submit" name="Submit" value="Send" className="btn btn-primary btn-emailtofriend" />
            
                <input type="reset" className="d-none"/>
                <input type="hidden" name="mlsNum" id="mlsNum" value="MLSNUM"/>
            </div>
        </form>
        <div id="social_media">
      
          <a href={`https://www.facebook.com/share.php?u=${shareUrl}`}  target='_blank' title='facebook'><i class="fa fa-facebook-square fa-3x "></i></a>
     

          
					<a href={`https://twitter.com/share?url=${shareUrl}`} target='_blank' title='twitter'><i class="fa fa-twitter-square fa-3x"></i></a>
         
           
					<a href={`https://pinterest.com/pin/create/button/?url=${shareUrl}`} target='_blank' title='pinterest'><i class="fa fa-pinterest fa-3x"></i></a>
          
      
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`} target='_blank' title="linkedin"><i class="fa wp-icon fa-linkedin-square fa-3x"></i></a>
    
        </div>  

       {/*  <div className="share-buttons" id="social_media">
        <FacebookShareButton  url={shareUrl} 
                              quote={title} 
                              hashtag="#demosite" 
                              image={shareimage}
                              summary={descr}
                              className="m-2"
                              title='facebook'>
        <FacebookIcon size={34}/>
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title} className="m-2" >
        <TwitterIcon size={34}/>
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} title={title} source={shareimage} summary={descr} className="m-2">
        <LinkedinIcon size={34}/>
        </LinkedinShareButton>
      </div>
 */}
      
        
    </div>
    
    </>
  )
}

export default SharePopup
