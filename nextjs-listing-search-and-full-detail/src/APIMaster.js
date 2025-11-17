import axios from 'axios';
import { API_URL } from './constant'

export class APIMaster{
 async getListingbyParam(filterObj){
    //console.log("filterobj=======",filterObj);
    const source = axios.CancelToken.source()
    try {
            const postdata = {
                "key":"ABCDXYZ0011",
                "limit":600
            };
            let data;

            if(filterObj !==undefined && (filterObj['addtype'] === 'mls' || filterObj['addtype'] === 'add' || filterObj['mlslist']) 
                                      && ((filterObj['addtype'] != '' && filterObj['addtype']) || (filterObj['mlslist'] !="" && filterObj['mlslist']))){
            let obj = {
                        "addval":filterObj["addval"] ? filterObj["addval"]:null, 
                        "addtype":filterObj["addtype"] ? filterObj["addtype"]:null,
                        "vt":filterObj["vt"] ? filterObj["vt"]:"map", 
                        "page_size":filterObj["page_size"] ? filterObj["page_size"]:1, 
                        "getMapData":filterObj["getMapData"] ? filterObj["getMapData"]:true,
                        "start_record":filterObj["start_record"] ? filterObj["start_record"]:0,
                        "mlslist":filterObj["mlslist"] ? filterObj["mlslist"]:null
                        }  
                data = {...postdata,...obj}
                
            }else{
                data = {...postdata,...filterObj}
            }
        
            let headers = {
                "Content-Type": "application/x-www-form-urlencoded",
            }

            const res = await axios.post( API_URL+"/search", data,{headers,cancelToken: source.token});
           // console.log("PropertyList>>>>>>>>>>>>>>",(res.data));
            return (res.data)
            }catch(error){
                if(axios.isCancel(error)){
            }else{
                console.log(error)
            }

        }
    }
   
}