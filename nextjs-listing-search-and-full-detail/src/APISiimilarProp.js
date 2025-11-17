import axios from 'axios';
import { API_URL } from './constant'

export class APISiimilarProp{
 async getListingbyParam(filterObj){
    try {
            const postdata = {
                "key":"ABCDXYZ0011",
            };

            let data = {...postdata,...filterObj}
        
            let headers = {
                "Content-Type": "application/x-www-form-urlencoded",
            }

            const res = await axios.post( API_URL+"/similarproperty", data,{headers});
            //console.log("similarprop>>>>>>>>>>>>>>",(res.data));
            return (res.data)
            }catch(error){
                if(axios.isCancel(error)){
            }else{
                console.log(error)
            }

        }
    }
   
}