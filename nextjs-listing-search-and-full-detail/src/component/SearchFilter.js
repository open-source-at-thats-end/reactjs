"use client"
import React,{useEffect, useRef, useState} from 'react';
import {useSelector } from 'react-redux';
import { selectFilter } from '../ThunkSlices/PropertyLIstSlice';

function SearchFilter({setFilters,callbackfrm}) {
const {filtersOptions,filterLoading}=useSelector((state)=>state.MenuFilterList);
//////console(filtersOptions);
let [objSelPType, setSelPType]=useState({});
let [arrCheckedGroup, setCheckedPTG]=useState([]);
let [objLocSelFilter, setLocSelFilters]=useState({});
let [objnewLocSelFilter, setnewLocSelFilters]=useState({});
const refMoreFltr=useRef();
const priceFilterRef= useRef();
const prTypeRef=useRef();
let [formData, setFormData] = useState({beds:"",baths:"",minsqft: "",maxsqft: "",minacreage: "",maxacreage: "",minyear: "",maxyear: "",hoafee:"",hoafqncy:"",kword:"",status:"",dom:"",petsallowed:"",ishoa:"",iswaterfront:"",
                                            oh:"",shortsale:"",closure:"",ispricereduce:"",maxprice:"",minprice:""});
let dataObj = {};
const objSelFilters = useSelector(selectFilter);

/**
 * This file has too many duplication of code to manage the selected filters and run time selected filter
 * We need to follow the reactjs hooks proper concept to manage this
 * Currently, it not properly follow the react hooks rules.
 */
useEffect(() => {
    //console.log(objSelFilters);
    //console.log(formData);
    // set selected filter in state variable so we can modifiy it.
     //setFormData({...formData, ...objSelFilters}) // Selected value for more filters
     setFormData({...objSelFilters}) // Selected value for more filters
     setSelPType({...objSelFilters})

    // When reload page that time only, at initially select property type and its parent which are in filters
    // When choosing from color filter that time it also go inside and set the group
   
     if((Object.keys(objLocSelFilter).length == 0 && Object.keys(filtersOptions).length > 0) || ('clfr' in objSelFilters == true))
        setSelectedFilters(objSelFilters)
//when clear filter that time reset localSelGroup variable
    if(!('ptype' in objSelFilters) && !('stype' in objSelFilters) ){
        setLocSelFilters({});
    }
     
}, [objSelFilters, filtersOptions])




/**
 * This function is called when reload page and that time its set selected filters with its parent group selected option
 * NOTE : Here we need some common logic to manage selected filter at initial and at run time.
 * @param {object of selected filters} objSF 
 */
const setSelectedFilters=(objSF)=>{
    if(Object.keys(objSF).length > 0 && Object.keys(filtersOptions).length>0){
        let objLocal={};
        // Just for SALE AND RENT
        Object.keys(filtersOptions['OL_Property_Type']).map((item)=>{
            var grpName = item.toLowerCase();
            objLocal[grpName] = {
                "options" : []
            }
            Object.keys(filtersOptions['OL_Property_Type'][item]['options']).map((sitem)=>{
                var iName = 'stype', iVal=sitem;
                // Here we get -ptype value which option is PropertyType
                if(sitem.indexOf('-') > 0){
                    iName = sitem.substring(sitem.indexOf('-')+1);
                    iVal = sitem.substring(0, sitem.indexOf('-'));
                }
                let selected=''
                if((iName in objSF) && objSF[iName].indexOf(iVal) >= 0){
                    selected = 'checked';
                    objLocal[grpName]["options"].push(iVal)
                }
            })
        })
        // Just for income
        Object.keys(filtersOptions['OL_Property_Type_income']).map((item)=>{
            var grpName = item.toLowerCase();
            objLocal[grpName] = {
                "options" : []
            }
            Object.keys(filtersOptions['OL_Property_Type_income'][item]['options']).map((sitem)=>{
                var iName = 'stype', iVal=sitem;
                /* // Here we get -ptype value which option is PropertyType
                if(sitem.indexOf('-') > 0){
                    iName = sitem.substring(sitem.indexOf('-')+1);
                    iVal = sitem.substring(0, sitem.indexOf('-'));
                } */
                let selected=''
                if((iName in objSF) && objSF[iName].indexOf(iVal) >= 0){
                    selected = 'checked';
                    objLocal[grpName]["options"].push(iVal)
                }
            })
        })
        // Just for commercial
        Object.keys(filtersOptions['OL_Property_Type_commercial']).map((item)=>{
            var grpName = item.toLowerCase();
            objLocal[grpName] = {
                "options" : []
            }
            Object.keys(filtersOptions['OL_Property_Type_commercial'][item]['options']).map((sitem)=>{
                var iName = 'stype', iVal=sitem;
                // Here we get -ptype value which option is PropertyType
                if(sitem.indexOf('-') > 0){
                    iName = sitem.substring(sitem.indexOf('-')+1);
                    iVal = sitem.substring(0, sitem.indexOf('-'));
                }
                let selected=''
                if((iName in objSF) && objSF[iName].indexOf(iVal) >= 0){
                    selected = 'checked';
                    objLocal[grpName]["options"].push(iVal)
                }
            })
        })
        
        ////console(objLocal);
        setLocSelFilters(objLocal);
    }
}

const handleInputChange = (event) => {
    ////console("==========");
   const {name,value,type}=event.target;
   if(type == "checkbox" && name in formData && (formData[name] === 'Yes' || formData[name] === 'yes') ){
    delete formData[name];
    
    setFormData({...formData});
   }else{
    setFormData((prevFormData) => ({ ...prevFormData, ...{[name]: value} }));
   }
   ////console(formData);
};

const __setPropFilter=(_k, val, gKey, filterKey='OL_Property_Type', refresh=true)=>{

    if(gKey in objnewLocSelFilter){
        if(objnewLocSelFilter[gKey]['seloptions'].indexOf(val) >= 0)
        objnewLocSelFilter[gKey]['seloptions'].splice(objnewLocSelFilter[gKey]['seloptions'].indexOf(val), 1)
        else
        objnewLocSelFilter[gKey]['seloptions'].push(val);
    }
    else{
        objnewLocSelFilter[gKey] = {
            seloptions : [val]
        }
    }
//////console(objnewLocSelFilter);
    setnewLocSelFilters(objnewLocSelFilter)
    var objData = {};
    // Prepare data for actual filter object
    Object.keys(objnewLocSelFilter).map((groupName) => {
        
        if(objnewLocSelFilter[groupName]['seloptions'].length >0)
            objData[groupName.toLowerCase()] = filtersOptions[filterKey][groupName]['value'];

        //////console(objData[groupName.toLowerCase()]);
        objnewLocSelFilter[groupName]['seloptions'].map((selval)=>{
            var iName = 'stype', iVal=selval;
            // Here we get -ptype value which option is PropertyType
            if(selval.indexOf('-') > 0){
                iName = selval.substring(selval.indexOf('-')+1);
                iVal = selval.substring(0, selval.indexOf('-'));
            }
            if((iName in objData) === false)
                objData[iName]=[]

            objData[iName].push(iVal);
           
        })
    })
    //////console(objData);
  
    objSelPType = objData;
    //////console(objSelPType);
    setSelPType(objSelPType)

    if(refresh === true){
        setFilters((currentState) => {
            //////console(currentState);
            //////console(objSelPType);
            return objSelPType
        })
    }

}

const setPropFilter=(_k, val, gKey, gVal, refresh=true)=>{
    objSelPType = {...objSelPType, ...objSelFilters}
  
    
    if(_k in objSelPType && !Array.isArray(objSelPType[_k])){
        //console.log("123");
        let arrType=[objSelPType[_k]]
        objSelPType[_k]=arrType
      }
    // Remove if already exist
    if(_k in objSelPType && objSelPType[_k].indexOf(val) >= 0){
        //console(val);
        // Here we can not directly modified Non-configurable list so insted of splice, we have to filter it and reassign in same key 
        objSelPType[_k] = objSelPType[_k].filter(item => item != val)
        //console(objSelPType);
        //objSelPType[_k].splice(objSelPType[_k].indexOf(val), 1)
    }
    else if( Array.isArray(objSelPType[_k])){
        //console(objSelPType[_k]);
        // We cannot directlty added data in Non-configurable list so here we need to copy that data in a variable and process data with that variable and reassign in oldobject. Otherwise it will return error
        let copy = Array.from(objSelPType[_k]);
        //console(copy);
        copy.push(val);
        objSelPType[_k] = copy
    }else{
        objSelPType[_k] = [val]
    }

    
    // This is only for select group (parent option) when clicking on any child option 
    if(gKey in objLocSelFilter){
        if(objLocSelFilter[gKey]['options'].indexOf(val) >= 0)
            objLocSelFilter[gKey]['options'].splice(objLocSelFilter[gKey]['options'].indexOf(val), 1)
        else
            objLocSelFilter[gKey]['options'].push(val);
    }
    else{
        objLocSelFilter[gKey] = {
            options : [val]
        }
        objSelPType[gKey] = gVal
    }
    

    //////console(objLocSelFilter);
    // When options are removed that time remove that group filter 
    if(objLocSelFilter[gKey]['options'].length <= 0)
        delete objSelPType[gKey];

////console(objSelPType);
    setLocSelFilters(objLocSelFilter);
    setSelPType(objSelPType);
    if(refresh === true){
        setFilters((currentState) => {
            //prTypeRef.current.className="filter_btn_group"
           /*  ////console(currentState);
            ////console(objSelPType);
            return {...currentState, ...objSelPType} */
            if(filterLoading == false){
                prTypeRef.current.className="filter_btn_group"
            }
            return objSelPType
            
        })
    }

}
/**
 * 
 * @param {*} olGroup - Parent Group like OL_Property_Type | OL_Property_Type_income | OL_Property_Type_commercial
 * @param {*} group - Child group like ForSale | ForRent | ForIncome | ForCommercial
 * @param {*} isChecked - Already checked or not
 */
const checkAll=(olGroup, group, isChecked)=>{
    //console('isChecked', isChecked);
    // If already selected then remove.
    if(isChecked === true){
        var groupLC = group.toLowerCase()
        // Remove all from filters
        objLocSelFilter[groupLC]['options'] = []
        objSelPType = {...objSelPType, ...objSelFilters}
      
       // delete objSelPType[groupLC]
        Object.keys(filtersOptions[olGroup][group]['options']).map((sitem)=>{
            var iName = 'stype', iVal=sitem;
            if(sitem.indexOf('-') > 0){
                iName = sitem.substring(sitem.indexOf('-')+1);
                iVal = sitem.substring(0, sitem.indexOf('-'));
            }
            // When type is in string
            if(!Array.isArray(objSelPType[iName])){
                var arrD = [objSelPType[iName]]
                objSelPType[iName] = arrD
            }
            let copy = Array.from( objSelPType[iName]);
            // If found selected option then remove it.
            if(objSelPType[iName].indexOf(iVal) >= 0)
                copy.splice(objSelPType[iName].indexOf(iVal), 1);
            
            objSelPType[iName] = copy
        })
        setLocSelFilters(objLocSelFilter);
        setSelPType(objSelPType);
    
        setFilters((currentState) => {
           
            return objSelPType
        })    
    }else{
        objSelPType = {...objSelPType, ...objSelFilters}
        if(olGroup in filtersOptions && group in filtersOptions[olGroup]){
            Object.keys(filtersOptions[olGroup][group]['options']).map((sitem)=>{
                var iName = 'stype', iVal=sitem;
                if(sitem.indexOf('-') > 0){
                    iName = sitem.substring(sitem.indexOf('-')+1);
                    //console(iName);
                    iVal = sitem.substring(0, sitem.indexOf('-'));
                    //console(iVal);
                }
                
                // If group is not set in localFilter then set it to blanck array so we can push the items in array
                if((group.toLowerCase() in objLocSelFilter) === false){
                    objLocSelFilter[group.toLowerCase()] = {
                        options:[]
                    } 
                }
                    
                // Push each value which are in group
                objLocSelFilter[group.toLowerCase()]['options'].push(iVal)
                
                // When filter key is not exist in filter. 
                if((iName in objSelPType) == false){
                    objSelPType[iName] = [iVal];
                }else{
                    // Convert string to array
                    if(!Array.isArray(objSelPType[iName])){
                        var arrPT = [objSelPType[iName]]
                        objSelPType[iName] = arrPT
                    }
                    // We can not directly modified array so we have to copy it in new variable and after that push the new value and re assign the value in same key.
                    let copy = Array.from( objSelPType[iName]);
                    //console(copy);
                    copy.push(iVal);
                    objSelPType[iName] = copy
                }
                //setPropFilter(iName, iVal, group.toLowerCase(), filtersOptions[olGroup][group]['value'], false);
            });
            objSelPType[group.toLowerCase()] = filtersOptions[olGroup][group]['value']
            setLocSelFilters(objLocSelFilter);
            setSelPType(objSelPType);
            setFilters((currentState) => {
              
                return objSelPType
            })
        }
    }
    if(filterLoading == false){
        prTypeRef.current.className="filter_btn_group"
    }
}

const setFilter=(_k,val, refersh=true)=>{
  
    dataObj[_k]=val; 
    if(filterLoading == false){
        priceFilterRef.current.className="filter_btn_group"
    }
 
   
    if(refersh){
        setFilters((currentState) => {
            let dataFilter={...currentState, ...dataObj};
            if('beds' in dataFilter && dataFilter['beds']=='0'){
                delete dataFilter['beds']
            }
        
            if('baths' in dataFilter && dataFilter['baths']=='0'){
                delete dataFilter['baths']
            }
            return dataFilter;
          
        })
    }
}

const handleSubmit=()=>{
refMoreFltr.current.className="filter_btn_group"
}

useEffect(() => {
    const handleClick = (event) => {
        if (event.target.classList.contains('select')) {
            event.stopPropagation();
            event.preventDefault();
          }
    };
  
    document.addEventListener('click', handleClick, true); // UseCapture set to true
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);
  


  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-6 px-0 text-center hidden-md-down">
        <div className="d-flex justify-content-center">
            <div className="filter_btn_group" ref={prTypeRef}>
                <button type="button"
                    className="btn bg-transparent dropdown-toggle text-uppercase text-black rounded-0"
                    key="pt" htmlFor="dropdownMenuButton0"
                    data-toggle="dropdown" aria-expanded="false">
                    Type
                </button>
                <ul className="dropdown-menu rounded-0 pType" key="pType" aria-labelledby="dropdownMenuButton0">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-6 col-lg-4 ptype">
                                {
                                    ('OL_Property_Type' in filtersOptions)?
                                    Object.keys(filtersOptions['OL_Property_Type']).map((item)=>{
                                        var grpName = item.toLowerCase();
                                        var isChecked = ((grpName in objLocSelFilter && objLocSelFilter[grpName]['options'].length > 0));
                                        //var isChecked = ((grpName in objSelPType) || (arrCheckedGroup.indexOf(grpName) >=0 ))?true:false;
                                        
                                        return(
                                            <li className="" key={"propType"+item}>
                                                <div className="form-check mb-0">
                                                    <input className="form-check-input ml-0" name={grpName}
                                                        value={filtersOptions['OL_Property_Type'][item]['value'] || ""} type="checkbox"
                                                        checked={isChecked?"checked":""}
                                                        onChange={(e)=>checkAll('OL_Property_Type', item, isChecked)}
                                                        key={"propTypeInp"+item}
                                                        id={grpName} />
                                                    <label className="form-check-label"
                                                        htmlFor={grpName}>
                                                        <span
                                                            className={'icon-'+filtersOptions['OL_Property_Type'][item]['title'].toLowerCase().replace(' ', '-')+' rounded-circle'}></span>
                                                        {filtersOptions['OL_Property_Type'][item]['title']}
                                                    </label>
                                                </div>
                                                {

                                                    (typeof filtersOptions['OL_Property_Type'][item]['options'] === 'object')?
                                                    <ul className=" sub_li ml-3 p-0">
                                                        {
                                                            Object.keys(filtersOptions['OL_Property_Type'][item]['options']).map((sitem)=>{
                                                                var iName = 'stype', iVal=sitem;
                                                                // Here we get -ptype value which option is PropertyType
                                                                if(sitem.indexOf('-') > 0){
                                                                    iName = sitem.substring(sitem.indexOf('-')+1);
                                                                    iVal = sitem.substring(0, sitem.indexOf('-'));
                                                                }
                                                                let selected=''
                                                                if(((iName in objSelPType) === true) && objSelPType[iName].indexOf(iVal) >= 0){
                                                                    selected = 'checked';
                                                                }
                                                                
                                                                return(
                                                                    <li key={"_propType"+sitem}>
                                                                        <input className="form-check-input ml-0"
                                                                        type="checkbox" 
                                                                        name={iName}
                                                                        value={iVal}
                                                                        id={sitem}
                                                                        checked={selected}
                                                                        onChange={(e)=>setPropFilter(iName,iVal, grpName, filtersOptions['OL_Property_Type'][item]['value'])}
                                                                        //onChange={(e)=>processFiltersForSearch(iName,iVal)}
                                                                        
                                                                        />
                                                                            
                                                                        <label className="form-check-label"
                                                                            htmlFor={sitem}>{filtersOptions['OL_Property_Type'][item]['options'][sitem]}
                                                                        </label>
                                                                        
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>:null
                                                }
                                            </li>
                                        
                                        )      
                                    }):null
                                }
                            </div>
                            <div className="col col-sm-12 col-md-6 col-lg-3 stype ">
                                {
                                    ('OL_Property_Type_income' in filtersOptions)?
                                    Object.keys(filtersOptions['OL_Property_Type_income']).map((item)=>{
                                        var grpName = item.toLowerCase();
                                        var isChecked = ((grpName in objLocSelFilter && objLocSelFilter[grpName]['options'].length > 0));
                                        return(
                                            <li className="" key={"ptypeincom" +item}>
                                                <div className="form-check mb-0">
                                                    <input className="form-check-input ml-0" name={grpName}
                                                        value={filtersOptions['OL_Property_Type_income'][item]['value'] || ""} type="checkbox"
                                                        checked={isChecked?'checked':''}
                                                        key={"propTypeInp"+item} 
                                                        id={filtersOptions['OL_Property_Type_income'][item]['value']}
                                                        onChange={(e)=>checkAll('OL_Property_Type_income', item, isChecked)}
                                                        />
                                                    <label className="form-check-label"
                                                        htmlFor={filtersOptions['OL_Property_Type_income'][item]['value']}>
                                                        <span
                                                            className="icon-for-sale rounded-circle"></span>
                                                        {filtersOptions['OL_Property_Type_income'][item]['title']}
                                                    </label>
                                                </div>
                                                {
                                                    (typeof filtersOptions['OL_Property_Type_income'][item]['options'] === 'object')?
                                                    <ul className=" sub_li ml-3 p-0">
                                                        {
                                                            Object.keys(filtersOptions['OL_Property_Type_income'][item]['options']).map((sitem)=>{
                                                                return(
                                                                    <li key={"_ptypeincom"+sitem}>
                                                                        <input className="form-check-input ml-0"
                                                                        type="checkbox" name="stype"
                                                                        value={sitem}
                                                                        id={sitem}
                                                                        onChange={(e)=>setPropFilter('stype',sitem, grpName, filtersOptions['OL_Property_Type_income'][item]['value'])}
                                                                        checked={((('stype' in objSelPType) === true) && objSelPType['stype'].indexOf(sitem) >=0)?'checked':''}
                                                                        />
                                                                            
                                                                        <label className="form-check-label"
                                                                            htmlFor={sitem}>{filtersOptions['OL_Property_Type_income'][item]['options'][sitem]}
                                                                        </label>
                                                                        
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>:null
                                                }
                                            </li>
                                        
                                        )      
                                    }):null
                                }
                            </div>
                            <div className="col col-sm-12 col-md-6 col-lg-5 stype ">
                                {
                                    ('OL_Property_Type_commercial' in filtersOptions)?
                                    Object.keys(filtersOptions['OL_Property_Type_commercial']).map((item)=>{
                                        var grpName = item.toLowerCase();
                                        var isChecked = ((grpName in objLocSelFilter && objLocSelFilter[grpName]['options'].length > 0));
                                        return(
                                            <li key={"Propertycom"+item}>
                                                <div className="form-check mb-0">
                                                    <input className="form-check-input ml-0" name={item.toLowerCase()} key={"com"+item}
                                                        value={filtersOptions['OL_Property_Type_commercial'][item]['value'] || ""} type="checkbox"
                                                        checked={isChecked?'checked':''}
                                                        id={item}
                                                        onChange={(e)=>checkAll('OL_Property_Type_commercial', item, isChecked)} 
                                                        />
                                                    <label className="form-check-label"
                                                        htmlFor={item}>
                                                        <span
                                                            className="icon-for-sale rounded-circle"></span>
                                                        {filtersOptions['OL_Property_Type_commercial'][item]['title']}
                                                    </label>
                                                </div>
                                                {
                                                    (typeof filtersOptions['OL_Property_Type_commercial'][item]['options'] === 'object')?
                                                    <ul className=" sub_li ml-3 p-0">
                                                        {
                                                            Object.keys(filtersOptions['OL_Property_Type_commercial'][item]['options']).map((sitem)=>{
                                                                var iName = 'stype', iVal=sitem;
                                                                // Here we get -ptype value which option is PropertyType
                                                                if(sitem.indexOf('-') > 0){
                                                                    iName = sitem.substring(sitem.indexOf('-')+1);
                                                                    iVal = sitem.substring(0, sitem.indexOf('-'));
                                                                }

                                                                return(
                                                                    <li  key={"_Propertycom"+sitem}>
                                                                        <input className="form-check-input ml-0"
                                                                                type="checkbox" name={iName}
                                                                                value={iVal}
                                                                                id={sitem}
                                                                                onChange={(e)=>setPropFilter(iName,iVal, grpName, filtersOptions['OL_Property_Type_commercial'][item]['value'])}
                                                                                checked={(((iName in objSelPType) === true) && objSelPType[iName].indexOf(iVal) >=0)?'checked':''}
                                                                                />
                                                                            
                                                                        <label className="form-check-label"
                                                                            htmlFor={sitem}>{filtersOptions['OL_Property_Type_commercial'][item]['options'][sitem]}
                                                                        </label>
                                                                        
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>:null
                                                }
                                            </li>
                                        
                                        )      
                                    }):null
                                }
                            </div>
                        </div>
                    </div>
                </ul>
            </div>

            <div className="filter_btn_group" ref={priceFilterRef}>
                <button type="button"
                className="btn bg-transparent dropdown-toggle text-uppercase text-black rounded-0"
                key="dropdownMenuButton1" htmlFor="dropdownMenuButton1"
                data-toggle="dropdown" aria-expanded="false">
                Price
                </button>
                <div className="dropdown-menu rounded-0 map-price" key="map-price" aria-labelledby="dropdownMenuButton1">
                    <div className="d-flex">
                    <select name="minprice" key="minprice" 
                            className="p-2 m-2 form-control select pull-left dropdown-toggle rounded-0"
                            value={(('minprice' in formData && formData['minprice'] != ''))?formData['minprice']:''}
                            onChange={(e)=>setFilter('minprice',e.target.value)} >
                            <option value="" defaultValue="" key="forsalenameMinPrice">Min Price</option>
                            {
                        ('OL_PriceRange_ForSale' in filtersOptions === true)?
                            Object.keys(filtersOptions['OL_PriceRange_ForSale']['options']).map((item)=>{
                            return(
                                <option value={item} key={"forsalename"+item}> 
                                    {filtersOptions['OL_PriceRange_ForSale']['options'][item]}
                                </option>
                                )      
                            }):null
                        }   
                        </select>
                       {/*  <span className="iconify minu_icon mx-1 text-black align-self-center"
                            data-icon="raphael:minus"></span> */}
                            <i className="fa fa-minus pt-2 m-1 pull-left"></i>

                        <select name="maxprice" key="maxprice" 
                            className="p-2 m-2 form-control select pull-left dropdown-toggle rounded-0"
                             onChange={(e)=>setFilter('maxprice',e.target.value)} 
                             value={(('maxprice' in formData && formData['maxprice'] != '')) ? formData['maxprice']:''}
                            >
                             <option value="" defaultValue="" key="forsaleMaxPrice">Max Price</option> 
                            {
                                ('OL_PriceRange_ForSale' in filtersOptions === true)?
                                    Object.keys(filtersOptions['OL_PriceRange_ForSale']['options']).map((item)=>{
                                    return(
                                        <option value={item} key={"forsale"+item} >{filtersOptions['OL_PriceRange_ForSale']['options'][item]}</option>
                                    )      
                                    })
                                :null
                            }   
                        </select>
                    </div>
                </div>                                                      
            </div>
            
            <div className="filter_btn_group">
            
                <button type="button"
                        className="btn bg-transparent dropdown-toggle text-uppercase text-black rounded-0"
                        key="dropdownMenuButton2" htmlFor="dropdownMenuButton2"
                        data-toggle="dropdown" aria-expanded="false">
                    {(formData.beds)?formData.beds:0}+ Beds
                </button>
                <div className="dropdown-menu f-beds rounded-0"
                    aria-labelledby="dropdownMenuButton2">
                    <li onClick={(e) => setFilter('beds', '0')} className="dropdown-item py-1">
                        <a data-value="0"
                            className="text-black text-decoration-none"
                            title="Studio">Studio</a>
                    </li>
                    {
                        ('OL_Bedrooms' in filtersOptions) ?
                            Object.keys(filtersOptions['OL_Bedrooms']['options']).map((item) => {
                                return (
                                    <li key={'beds-' + item} className={(('beds' in formData && formData['beds'] ===  item)?' active ':'')+'dropdown-item py-1 '} name='beds'
                                    value={item} 
                                    onClick={(e)=>setFilter("beds",e.target.value)}
                                    >{filtersOptions['OL_Bedrooms']['options'][item]}</li>
                                )
                            }) : null
                    }
                </div>
                <input type="hidden" name="beds" key="beds"  value={formData.beds || "0"} />
            </div>

            <div className="filter_btn_group">
                <button type="button"
                    className="btn bg-transparent dropdown-toggle text-uppercase text-black rounded-0"
                    key="dropdownMenuButton2" htmlFor="dropdownMenuButton2"
                    data-toggle="dropdown" aria-expanded="false">
                    {(formData.baths)?formData.baths:0}+ Baths
                </button>
                <div className="dropdown-menu f-beds rounded-0"
                    aria-labelledby="dropdownMenuButton2">
                    <li onClick={(e) => setFilter('baths', '0')} className="dropdown-item py-1">
                        <a data-value="0"
                            className="text-black text-decoration-none"
                            title="Studio">Studio</a>
                    </li>
                    {
                        ('OL_Bathrooms' in filtersOptions === true) ?
                            Object.keys(filtersOptions['OL_Bathrooms']['options']).map((item) => {
                                return (
                                    <li key={'baths-' + item} 
                                    className={(('baths' in formData && formData['baths'] ===  item)?' active ':'')+'dropdown-item py-1 '} name='baths'
                                    value={item} 
                                    onClick={(e)=>setFilter("baths",e.target.value)}
                                    >{filtersOptions['OL_Bathrooms']['options'][item]}</li>
                                )
                            }) : null
                    }
                </div>
                <input type="hidden" name="baths" key="baths"  value={formData.baths || "0"} />
            </div>

            <div className="filter_btn_group" key="moreFilter" ref={refMoreFltr}>
                    <button type="button"
                        className="btn bg-transparent dropdown-toggle text-uppercase text-black rounded-0"
                        key="dropdownMenuButton2" htmlFor="dropdownMenuButton2"
                        data-toggle="dropdown" aria-expanded="false"
                       
                        id="container"
                        >
                        More
                    </button>
                <div className="dropdown-menu rounded-0 more-filters" key="filters" aria-labelledby="dropdownMenuButton1"  id="myButton" >
                        <div className="row ">
                            <div className="col-7 more_filter">
                                <div className="row mx-1 pt-3">
                                    <div className="col-3">
                                        <label>Square Feet</label>
                                    </div>
                                    <div className="col-9">
                                        <input type="text" name="minsqft" key="minsqft" className="for-search py-2 mb-0" placeholder="Min" value={formData.minsqft || ""} onChange={handleInputChange} />
                                    {/*  <span className="iconify minu_icon  text-black align-self-center" data-icon="raphael:minus"></span> */}
                                        <i className="fa fa-minus m-1"></i>
                                        <input type="text" name="maxsqft" key="maxsqft" className="for-search py-2 mb-0"  placeholder="Max" value={formData.maxsqft || ""} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row mx-1 pt-1">
                                    <div className="col-3">
                                        <label>Acre(s)</label>
                                    </div>
                                    <div className="col-9">
                                        <input type="text" name="minacreage" key="minacreage" className="for-search py-2 mb-0"  placeholder="Min"  value={formData.minacreage || ""}  onChange={handleInputChange} /> 
                                        <i className="fa fa-minus m-1"></i>
                                        <input type="text" name="maxacreage" key="maxacreage" className="for-search py-2 mb-0" placeholder="Max"  value={formData.maxacreage || ""}  onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row mx-1 pt-1">
                                    <div className="col-3">
                                        <label>Year Built</label>
                                    </div>
                                    <div className="col-9">
                                        <input type="text" name="minyear" key="minyear" className="for-search py-2 mb-0"  placeholder="Min" value={formData.minyear || ""}  onChange={handleInputChange}/>
                                        <i className="fa fa-minus m-1"></i>
                                        <input type="text" name="maxyear" key="maxyear" className="for-search py-2 mb-0" placeholder="Max" value={formData.maxyear || ""}  onChange={handleInputChange}/>
                                    </div>
                                </div>
                                <div className="row mx-1 pt-1">
                                    <div className="col-3">
                                        <label>HOA Fee/Frequency</label>
                                    </div>
                                    <div className="col-9" >
                                        <input type="text" name="hoafee" key="hoafee" id='hoafee'  className="for-search py-2 mb-0 hoafee"  placeholder="HOA Fees" value={formData.hoafee || ""}  onChange={handleInputChange}/>
                                        <i className="fa fa-minus m-1"></i>
                                        <select key="hoafqncy" name="hoafqncy" id='hoafqncy' className="form-control for-search py-2 select -sdw-none " value={formData.hoafqncy || ""}  onChange={handleInputChange}> 
                                            <option value="Any">Any</option> 
                                            <option value="Annually">Annually</option> 
                                            <option value="Monthly">Monthly</option> 
                                            <option value="Quarterly">Quarterly</option> 
                                            <option value="Semi">Semi</option> 
                                        </select>
                                    </div>
                                </div>
                                <div className="row mx-1 pt-2">
                                    <div className="col-3"> <label>Keywords</label></div>
                                    <div className="col-9">
                                        <textarea key="kword" name="kword" rows="3" placeholder="Garage, pool, waterfront, etc." className="b-a-2 form-control py-2 mb-0"
                                                    value={formData.kword || ""}  onChange={handleInputChange}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-5 more_filter">
                                <div className="row mx-1 pt-1 ">
                                    <div className="col-12"> <label>Show Only</label> </div>
                                    <div className="col-6"> 
                                        <input className="mb-0"
                                                type="checkbox" name="iswaterfront"
                                                value="Yes"
                                                key="iswaterfront"
                                                id="iswaterfront"
                                                onChange={handleInputChange}
                                                checked={(("iswaterfront"  in formData) === true && formData['iswaterfront'] === 'Yes')?'checked':''}
                                                />
                                        <label>&nbsp; Is Waterfront</label>
                                    </div>
                                    <div className="col-6"> 
                                        <input type="checkbox" name="oh" key="oh" className="mb-0"  checked={(("oh"  in formData) === true && formData['oh'] === 'Yes' )?'checked':''}  value="Yes" onChange={handleInputChange}/> 
                                        <label>&nbsp; Is OpenHouse</label> 
                                    </div>
                                    <div className="col-6"> 
                                        <input type="checkbox" name="shortsale" key="shortsale"  checked={(("shortsale"  in formData) === true && formData['shortsale'] === 'Yes')?'checked':''}  value="Yes"  onChange={handleInputChange}/> 
                                        <label>&nbsp; Is Shortsale</label>
                                    </div>
                                    <div className="col-6"> 
                                        <input type="checkbox" name="closure" key="closure" className="mb-0"  checked={(("closure"  in formData) === true && formData['closure'] === 'Yes')?'checked':''}  value="Yes"  onChange={handleInputChange}/> 
                                        <label>&nbsp; Is Foreclosure</label>
                                    </div>
                                    <div className="col-6"> 
                                        <input type="checkbox" name="ispricereduce" key="ispricereduce" className="mb-0"  checked={(("ispricereduce"  in formData) === true && formData['ispricereduce'] === 'Yes')?'checked':''}  value="Yes"  onChange={handleInputChange}/> 
                                        <label>&nbsp; Price Reduced</label>
                                    </div>
                                </div>
                                <div className="row mx-1 pt-1">
                                    <div className="col-12 p-lr"> <span className="label_span">Listing Status</span>
                                        <select name="status"
                                            className="form-control mb-0 py-2 select sdw-none"
                                            //value={formData.status}  
                                            value={(('status' in formData && formData['status']!="") ? formData.status :"")}
                                            onChange={handleInputChange} 
                                            >
                                            <option value="Any" key="StatusAny">Any</option>
                                            {
                                                ('OL_Listing_Status' in filtersOptions === true)?
                                                Object.keys(filtersOptions['OL_Listing_Status']['options']).map((item)=>{
                                                return(
                                                    <option key={'LS'+item}
                                                            value={item}>
                                                        {filtersOptions['OL_Listing_Status']['options'][item]}</option>
                                                )      
                                                })
                                            :null
                                            }
                                        </select>
                                    </div>
                                    <div className="col-12 p-lr"> <span className="label_span">Day On Market</span>
                                        <select name="dom"
                                            className="form-control mb-0 py-2 select sdw-none"
                                            //value={formData.dom}
                                            value={(('dom' in formData && formData['dom']!="") ? formData.dom :"")} 
                                            onChange={handleInputChange} 
                                            >
                                            <option value="Any" key="domAny">Any</option>
                                            {
                                                ('OL_Days_Market' in filtersOptions === true && Object.keys(filtersOptions['OL_Days_Market']['options']).length > 0)?
                                            
                                                Object.keys(filtersOptions['OL_Days_Market']['options']).map((item)=>{
                                                return(
                                                    <option key={'dom'+item} value={item}>{filtersOptions['OL_Days_Market']['options'][item]}</option>
                                                )      
                                                })
                                            :null
                                            }
                                        </select>
                                    </div>
                                    <div className="row mx-1 pt-1 w-100">
                                        <div className="col-6 ps-0"> <span className="label_span">Pets Allowed</span>
                                            <select name="petsallowed"
                                                className="form-control py-2 select sdw-none"
                                                //value={formData.petsallowed}  
                                                value={(('petsallowed' in formData && formData['petsallowed']!="") ? formData.petsallowed :"")}
                                                onChange={handleInputChange} 
                                                >
                                                <option value="Any" key="petsAAny">Any</option>
                                                <option value="Yes" key="petsAYes">Yes</option>
                                                <option value="No" key="petsANo">No</option>
                                            </select>
                                        </div>
                                        <div className="col-6 pe-0"> <span className="label_span">Is HOA</span> 
                                            <select
                                                name="ishoa"
                                                className="form-control py-2 select sdw-none"
                                                //value={formData.ishoa} 
                                                value={(('ishoa' in formData && formData['ishoa']!="") ? formData.ishoa :"")} 
                                                onChange={handleInputChange} 
                                                >
                                                <option value="Any" key="ishoaAny">Any</option>
                                                <option value="Yes" key="ishoaYes">Yes</option>
                                                <option value="No" key="ishoaNo">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mx-1 pt-3 pb-4">
                            {/* <div className="col-12 text-center">
                                {
                                Object.keys(formData).map((item,i)=>{
                                return <div>{item}</div>
                                })}
                            </div> */}
                            <div className="col-12 text-center" >
                                <button type="submit"  onClick={()=>handleSubmit()}
                                    className="btn btn-primary SearchFormButton w-50 text-uppercase rounded-0" >Apply</button>
                            </div>
                        </div>

                    </div>
            </div>
        </div>
    </div>
  )
}

export default SearchFilter
