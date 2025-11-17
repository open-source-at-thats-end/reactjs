import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constant";
import { APIMaster } from "../APIMaster";


export const postPropertyList = createAsyncThunk(
  'propertyList/postPropertyList',
  (objFilter, { signal })=>{
   // console.log("++++====== Post List Api=======++");
    console.log("filter===============",objFilter);
    var objAPI = new APIMaster();
    return objAPI.getListingbyParam(objFilter)
}
);

export const PropertyLIstSlice=createSlice({
    name:"propertyList",
    initialState:{
      listArr:[],
      arrPoints:[],
      objList:{},
      //cityBound:'',
      locationArr:[],
      pLoading:false,
      isSuccess:false,
      startRecord:1,
      totalRecord:"",
      objSelectedFilters:{},
      commnAddrsList:[],
      pCity:'',
    },
    reducers:{
      getSelectedFilters: (state, action) => {
        state.objSelectedFilters = action.payload;
       
      },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(postPropertyList.pending, (state, action) => {
          state.pLoading=true;
        })
        .addCase(postPropertyList.fulfilled, (state, action) => {
      
        if(action.payload === undefined){
          state.pLoading = false; 
          return;
        }
        state.listArr = action.payload.resdata;
        state.totalRecord = action.payload.total_record;
        //state.cityBound = action.payload.city_bound;
        state.commnAddrsList= action.payload.commonads;
        state.startRecord=action.payload;
        state.pLoading = false; 
        let arrHouse=[];
        let arrCondo=[];
        let arrOther=[];
        let arrPriceReduce=[];
        let arrJustListed=[];
        let arrMultiFamily=[];
        let arrRental=[];
        let arrCommercial=[];
        let arrClosed=[];
        let arrBackup=[];
        let arrMarkerPoints=[];
        let objGroup={};
       
       
        const checkFilterOptCheckOthCommon=(cGroup) => {
          // If color filter not set then create all cluster group else just create selected color group
          return (!('clfr' in state.objSelectedFilters))?true:(state.objSelectedFilters['clfr'].indexOf(cGroup) >= 0)
        }
        //console.log(objGroup);
        //console.log(arrJustListed);
        //console.log(action.payload);

        let PriceReducestyle={};
        PriceReducestyle['color']='#9c27b0';
        PriceReducestyle['textColor']='#ffffff';
        PriceReducestyle['strokeColor']='#ffffff';
        PriceReducestyle['height']=30;
        PriceReducestyle['width']=30;
        PriceReducestyle['padding']=2;
        PriceReducestyle['url']='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" height="32" width="32"%3E%3Ccircle cx="15.8" cy="15.8" r="15" stroke="%23ffffff" stroke-width="2" fill="%239c27b0" /%3E%3C/svg%3E';


       /*  let justListedstyle={};
        justListedstyle['color']='#ffa500';
        justListedstyle['textColor']='white';
        justListedstyle['strokeColor']='#ffffff';
        justListedstyle['height']=30;
        justListedstyle['width']=30;
        justListedstyle['padding']=2;
        justListedstyle['url']='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" height="32" width="32"%3E%3Ccircle cx="15.8" cy="15.8" r="15" stroke="%23ffffff" stroke-width="2" fill="%23ffa500" /%3E%3C/svg%3E'; */
        

        let justListedstyle = {};
        justListedstyle['color'] = '#3c505f'; // New circle color
        justListedstyle['textColor'] = 'white';
        justListedstyle['strokeColor'] = '#ffffff';
        justListedstyle['height'] = 30;
        justListedstyle['width'] = 30;
        justListedstyle['padding'] = 2;
        justListedstyle['url'] = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" height="32" width="32"%3E%3Ccircle cx="15.8" cy="15.8" r="15" stroke="%23ffffff" stroke-width="2" fill="%233c505f" /%3E%3C/svg%3E';

          let caStyle={};
          caStyle['color']='#0404f7';
          caStyle['textColor']='white';
          caStyle['strokeColor']='#ffffff';
          caStyle['height']=30;
          caStyle['width']=30;
          caStyle['padding']=2;
          caStyle['url']='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" height="32" width="32"%3E%3Ccircle cx="15.8" cy="15.8" r="15" stroke="%23ffffff" stroke-width="2" fill="%230404f7" /%3E%3C/svg%3E';
          
          let condoStyle={};
          condoStyle['color']='#0404f7';
          condoStyle['textColor']='white';
          condoStyle['strokeColor']='#ffffff';
          condoStyle['height']=30;
          condoStyle['width']=30;
          condoStyle['padding']=2;
          condoStyle['url']='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" height="32" width="32"%3E%3Ccircle cx="15.8" cy="15.8" r="15" stroke="%23ffffff" stroke-width="2" fill="%230404f7" /%3E%3C/svg%3E';

          let styleObj={};
          styleObj['color']='#096009';
          styleObj['textColor']='white';
          styleObj['strokeColor']='#ffffff';
          styleObj['height']=30;
          styleObj['width']=30;
          styleObj['padding']=2;
          styleObj['url']='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" height="32" width="32"%3E%3Ccircle cx="15.8" cy="15.8" r="15" stroke="%23ffffff" stroke-width="2" fill="%23096009" /%3E%3C/svg%3E';

          let multyFamilystyle={};
          multyFamilystyle['color']='#9f2626';
          multyFamilystyle['textColor']='white';
          multyFamilystyle['strokeColor']='#ffffff';
          multyFamilystyle['height']=30;
          multyFamilystyle['width']=30;
          multyFamilystyle['padding']=2;
          multyFamilystyle['url']='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" height="32" width="32"%3E%3Ccircle cx="15.8" cy="15.8" r="15" stroke="%23ffffff" stroke-width="2" fill="%239f2626" /%3E%3C/svg%3E';

          let rentalStyle={};
          rentalStyle['color']='#ffeb3b';
          rentalStyle['textColor']='black';
          rentalStyle['strokeColor']='#818181f5';
          rentalStyle['height']=30;
          rentalStyle['width']=30;
          rentalStyle['padding']=2;
          rentalStyle['url']='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" height="32" width="32"%3E%3Ccircle cx="15.8" cy="15.8" r="15" stroke="%23ffffff" stroke-width="2" fill="%23ffeb3b" /%3E%3C/svg%3E';

          let comStyle={};
          comStyle['color']='#7d7c7c';
          comStyle['textColor']='white';
          comStyle['strokeColor']='#ffffff';
          comStyle['height']=30;
          comStyle['width']=30;
          comStyle['padding']=2;
          comStyle['url']='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" height="32" width="32"%3E%3Ccircle cx="15.8" cy="15.8" r="15" stroke="%23ffffff" stroke-width="2" fill="%237d7c7c" /%3E%3C/svg%3E';

          let closedStyle={};
          closedStyle['color']='#ff0000';
          closedStyle['textColor']='white';
          closedStyle['strokeColor']='#ffffff';
          closedStyle['height']=30;
          closedStyle['width']=30;
          closedStyle['padding']=2;
          closedStyle['url']='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" height="32" width="32"%3E%3Ccircle cx="15.8" cy="15.8" r="15" stroke="%23ffffff" stroke-width="2" fill="%23ff0000" /%3E%3C/svg%3E';

          let backupStyle={};
          backupStyle['color']='#43A6C6';
          backupStyle['textColor']='white';
          backupStyle['strokeColor']='#ffffff';
          backupStyle['height']=30;
          backupStyle['width']=30;
          backupStyle['padding']=2;
          backupStyle['url']='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" height="32" width="32"%3E%3Ccircle cx="15.8" cy="15.8" r="15" stroke="%23ffffff" stroke-width="2" fill="%2343A6C6" /%3E%3C/svg%3E';

          let otherStyle={};
          otherStyle['color']='#0404f7';
          otherStyle['textColor']='white';
          otherStyle['strokeColor']='#ffffff';
          otherStyle['height']=30;
          otherStyle['width']=30;
          otherStyle['padding']=2;
          otherStyle['url']= 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" height="32" width="32"%3E%3Ccircle cx="15.8" cy="15.8" r="15" stroke="%23ffffff" stroke-width="2" fill="%230b1210" /%3E%3C/svg%3E';
          

     state.listArr.map((item,i)=>{
      
       if(item.Latitude > 0 && item.Longitude){
            arrMarkerPoints.push({position:{lat:item.Latitude, lng:item.Longitude}});
          
            var string = '';

            if (item['StreetNumber'].trim() != '' )
                string += item['StreetNumber'].trim()+" ";
            if (item['StreetDirection'].trim() != '')
                string += item['StreetDirection'].trim()+" ";
            if(item['StreetDirPrefix'].trim() != '' )
                string += item['StreetDirPrefix'].trim()+" ";
            if (item['StreetName'].trim() != '' )
                string += item['StreetName']+" ";
            if (item['StreetSuffix'].trim() != '' )
                string += item['StreetSuffix'].trim()+" ";
            if(item['StreetDirSuffix'].trim() != '' )
                string += item['StreetDirSuffix'].trim()+" ";
            if(item['CityName'].trim() != '' )
                string += item['CityName']+" ";
            if(item['State'].trim() != '')
                string += item['State'].trim()+" ";
            if(item['ZipCode'].trim() != '')
                string += item['ZipCode'].trim();

            item['UnitAddress'] = string;
            var add = item['UnitAddress'];
          
            if(action.payload.commonads.indexOf(item['UnitAddress']) != -1 ){
              

              if(typeof objGroup[add] === "undefined" || typeof objGroup[add] === undefined)
              {
                objGroup[add]= {data: []};
              }
              objGroup[add]['style']=caStyle
              objGroup[add]['class']='common_ads'
              objGroup[add]['title']=add
              objGroup[add]['data'].push(item);
              
            }//('clfr' in state.objSelectedFilters) && (state.objSelectedFilters['clfr'].indexOf('pr') >= 0)
            else if(item.Price_Diff < 0 && checkFilterOptCheckOthCommon('pr')){
             
              arrPriceReduce.push(item);
              objGroup['Price_reduced'] = {
                title: 'Price reduced',
                style: PriceReducestyle,
                data: arrPriceReduce,
                class:'price_reduced',
              }
            }else if(item.DOM <= 7 &&  item.DOM !==null  && checkFilterOptCheckOthCommon('jl')){
              //console.log(arrJustListed);
              arrJustListed.push(item);
              objGroup['Just_listed'] = {
                title: 'Just listed',
                style: justListedstyle,
                data: arrJustListed,
                class:'just_listed'
              }
            } 
            else if((item.SubType==='Condominium' || item.SubType==='Townhouse' || item.SubType==='Villa') && checkFilterOptCheckOthCommon('ctv')){
             
              arrCondo.push(item);
              objGroup['Condo'] = {
                title: 'Condo + Towhouse + villa',
                style: condoStyle,
                data: arrCondo,
                class:'condo'
              }

            }
            else if((item.PropertyType==='Residential' || item.SubType==='SingleFamilyResidence' || item.SubType==='Single Family Residence') && checkFilterOptCheckOthCommon('house')){
             
              arrHouse.push(item);
              objGroup['House'] = {
                title: 'House',
                style: styleObj,
                data: arrHouse,
                class:'house'
              }
            }
            else if((item.SubType === 'Multi Family' || item.SubType === 'MultiFamily' || item.SubType === 'Duplex' || item.SubType === 'Quadruplex' || item.SubType === 'Triplex') && checkFilterOptCheckOthCommon('mfi')){
              
             
              arrMultiFamily.push(item);
              objGroup['multifamily_duplex_triplex'] = {
                title: 'Multi Family + Income',
                style: multyFamilystyle,
                data: arrMultiFamily,
                class:'multifamily_duplex_triplex'
              }
            }
            else if((item.PropertyType === 'Rental' || item.PropertyType === 'ResidentialLease') && checkFilterOptCheckOthCommon('rent')){
              
             
              arrRental.push(item);
              objGroup['rental'] = {
                title: 'Rent',
                style: rentalStyle,
                data: arrRental,
                class:'rental'
              }
            }
            else if((item.PropertyType === 'Commercial' || item.PropertyType === 'Business Opportunity' || item.SubType === 'Commercial' || item.SubType === "Business" || item.ListingStatus === 'Active' ||
                    item.PropertyType === 'Vacant Land' || item.PropertyType === 'Land/Boat Docks') && checkFilterOptCheckOthCommon('cb')){
      
            
              arrCommercial.push(item);
              objGroup['commercial_business'] = {
                title: 'Commercial + Business',
                style: comStyle,
                data: arrCommercial,
                class:'commercial_business'
              }
            }
            else if((item.ListingStatus === 'closed' || item.ListingStatus === 'Closed' ) && checkFilterOptCheckOthCommon('cls')){
              
             arrClosed.push(item);
              objGroup['closed'] = {
                title: 'closed',
                style: closedStyle,
                data: arrClosed,
                class:'closed'
              }
            }
            else if((item.ListingStatus === 'Backup') && checkFilterOptCheckOthCommon('bu')){
              
             arrBackup.push(item);
              objGroup['Backup'] = {
                title: 'Backup',
                style: backupStyle,
                data: arrBackup,
                class:'backup'
              }
            }
            else{

              arrOther.push(item);
              objGroup['Other'] = {
                title: 'Other',
                style: otherStyle,
                data: arrOther,
                class:'other'
              }
            } 
          }
        }) 
   
        state.isSuccess=true;
        state.objList=objGroup;
        state.arrPoints = arrMarkerPoints;
        
        })
        .addCase(postPropertyList.rejected, (state, action) => {
        state.pLoading=false;
        state.isSuccess=false;
        })
    }
})
export const { getSelectedFilters } = PropertyLIstSlice.actions;
export const selectFilter=(state)=>state.propertyList.objSelectedFilters
export default PropertyLIstSlice.reducer