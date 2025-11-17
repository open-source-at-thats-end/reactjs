import React,{useState,useEffect,useRef} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { postAutoSearchList } from '../ThunkSlices/AutoSearchSlice';
import { RotatingLines } from  'react-loader-spinner';
import { AutoComplete } from "primereact/autocomplete";
import { selectFilter } from '../ThunkSlices/PropertyLIstSlice';

function Autosuggetion({setFilters}) {
const dispatch = useDispatch();
const[showing,setShowing]=useState(false);
const[location,setLocation]=useState(false);
const ref = useRef(null);
const refParent = useRef(null);
const addRef = useRef(null);
const refLoc = useRef(null);
const {optionGrp,SearchLoading}=useSelector((state)=>state.AutoSearchList);
const objSelFilters = useSelector(selectFilter);
const [selectedCity, setSelectedCity] = useState(null);
const [filteredCities, setFilteredCities] = useState();
const [queryVal, setQueryVal] = useState();
const [isFocused, setIsFocused] = useState(false);

useEffect(() => {
 if(('addval' in objSelFilters) == true){
    setSelectedCity(objSelFilters['addval']);
 }else{
    setSelectedCity("");
 }
 if('latitude' in objSelFilters && 'longitude' in objSelFilters){
    setSelectedCity("Current Location")
  }
  
}, [objSelFilters])

useEffect(() => {
    let _filteredCities = [];

    if(optionGrp.length>0){
        for (let country of optionGrp) {
            let filteredItems = country.items.filter((item) => item.label.toLowerCase().indexOf(queryVal.toLowerCase()) !== -1);
     
            if (filteredItems && filteredItems.length) {
                _filteredCities.push({ ...country, ...{ items: filteredItems } });
            }
        }
    }
   
   setFilteredCities(_filteredCities);
}, [optionGrp])




  useEffect(() => {
   if (ref.current !=undefined) {
  document.addEventListener("click", handleClickOutside, false);
  return () => {
    document.removeEventListener("click", handleClickOutside, false);
  };
} 
}, []); 

const handleFocus = () => {
    setIsFocused(true);

  };
const handleBlur = () => {
    setIsFocused(false);
  };

useEffect(()=>{
    if(isFocused){
        document.body.classList.add('input-focused'); //to add class in body
    }else{
        document.body.classList.remove('input-focused')  
    }
   
},[isFocused]);

 const handleClickOutside = event => {
  if (ref.current && !ref.current.contains(event.target)) {
    setLocation(false);
    setShowing(false)
  }
}; 


const filterSearch=(val)=>{
    //setSelectedCity(val)
    setSelectedCity(val)
   
}

const onSearchButton=()=>{
    setShowing(false)
    let objSearchBtn={};
    if('addtype' in objSelFilters){
        objSearchBtn['addtype']= objSelFilters.addtype
    }else{
        objSearchBtn['addtype']='all'
    }
    objSearchBtn['addval']=addRef.current.props.value;
    objSearchBtn['ptype']='residential';
    objSearchBtn['isNewSearch'] = '1';
    setFilters(objSearchBtn)
    
if('latitude'in objSelFilters && 'longitude' in objSelFilters){
    let objLocation={};
    objLocation['latitude']=objSelFilters['latitude'];
    objLocation['longitude']=objSelFilters['longitude'];
    objLocation['ptype']=objSelFilters['ptype'];
    objLocation['addtype']='all';
    setFilters({ ...objLocation})
}
  
    
}

const onInputClick=()=>{
    setLocation(true);
}

const onCurrentLocation=()=>{
   setIsFocused(true);
    let objGeoLocation={};
    objGeoLocation['currentLocation']=true;
    setFilters({...objGeoLocation, ...objSelFilters})
    setSelectedCity("Current Location")
    setLocation(false)
}

const groupedItemTemplate = (item) => {
    return (
        <div className="flex align-items-center f-16 pl-2">
        <div>{item.label}</div>
        </div>
    );
};

const itemTemplate=(item)=> {
    var opt=item.label
    if(opt!="" && opt.includes('#')===true){
        opt=opt.replace('# ','')
    }
    return (
        <div className="d-flex country-item pt-2 pb-2 pl-10">
            <div>
                {item.groupCode == "all" ?

                <img
                    alt={opt}
                    src="https://www.demosite.com/templates/images/oak-tree.png"
                />
            : <img
                    alt={opt}
                    src="https://www.demosite.com/templates/images/place-marker.png"
                />
                }
            </div>
            <div className='primelabel'>{opt}</div>
        </div>
    );
}
const search = (event) => {
    setQueryVal(event.query)
        if(event.query.length >= 2){
            dispatch(postAutoSearchList(event.query))
        }
            
       
}

const handleSelect=(val)=>{
    var ojbsearch={};
    setLocation(false);
    var cityadd=val.label
    if(val.groupCode==='add' && cityadd!='' && cityadd.includes('#')=== true){
        cityadd=cityadd.replace("# ",'')
    }
    ojbsearch['addtype'] = val.groupCode
    ojbsearch['addval'] =cityadd
    ojbsearch['isNewSearch'] = '1';
    setFilters((currentState) => {
        var dataFL = {...currentState, ...ojbsearch};
        delete dataFL['map'];
        if('addtype' in dataFL && (dataFL.addtype == 'cs' || dataFL.addtype == 'add' || dataFL.addtype == 'mls' || dataFL.addtype == 'bn' || dataFL.addtype == 'zip' || dataFL.addtype == 'area'))
            delete dataFL['latitude']; 
            delete dataFL['longitude'];
            delete dataFL['city']
            if('addtype' in dataFL &&  dataFL.addtype == 'sub'){
                 dataFL = {...currentState, ...ojbsearch};
            }
            return dataFL
    }) 
    
    
}




  const handleKeyDown = (e) => {
    setSelectedCity(e.target.value) 
    
    if (e.key === 'Enter') {
     search({ query:e.target.value});

     let objOnEnter={};
     if('addtype' in objSelFilters){
        objOnEnter['addtype']= objSelFilters.addtype
     }else{
        objOnEnter['addtype']='all'
     }
     objOnEnter['addval']=addRef.current.props.value;
     objOnEnter['ptype']='residential';
     objOnEnter['isNewSearch'] = '1';
     setFilters(objOnEnter)
    }
    
  };


 return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-4 px-0 text-left">

    <div className="search_input_block input-group rounded-0 mb-0" ref={ref}>
    <div className='position-relative w-100'>
    <AutoComplete   value={selectedCity}  
                    ref={addRef}
                    className={((SearchLoading)?'loading ':'')+ 'rounded-0 bg-white w-100'} 
                    onChange={(e) => filterSearch(e.target.value)}
                    onSelect={(e) =>handleSelect(e.value)}
                    onClick={(e)=>onInputClick()}
                    suggestions={filteredCities} 
                    completeMethod={search}
                    field="label"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    optionGroupLabel="label" 
                    optionGroupChildren="items"
                    itemTemplate={itemTemplate}
                    onKeyDown={handleKeyDown} 
                    optionGroupTemplate={groupedItemTemplate} 
                    placeholder="Enter city, neighbourhood, address, zipcode, MLS#, Area or Building Name" />

    <div className='loader'>
        {SearchLoading ?
            <RotatingLines
            strokeColor="gray"
            strokeWidth="3"
            animationDuration="0.75"
            width="25"
            visible={true}
            />
        :null}
          </div>
            
        <input name="addval" type="hidden" className="" id="addval" value={(("addval" in objSelFilters) === true )? objSelFilters.addval: ""}></input> 
        <input name="addtype" type="hidden" className="" id="addtype" value={(("addtype" in objSelFilters) === true) ? objSelFilters.addtype: ""}></input>
        <input name="latitude" type="hidden" className="" id="latitude" value={(("latitude" in objSelFilters) === true) ? objSelFilters.latitude: ""}></input>
        <input name="longitude" type="hidden" className="" id="longitude" value={(("longitude" in objSelFilters) === true) ? objSelFilters.longitude: ""}></input> 
    

    { (location || showing )?
            <div className="selectize-dropdown AddressName for-search single plugin-restore_on_type w-100 " style={{left:0,top:39}} >
                <div className={((showing)?'loading':'')+' selectize-dropdown-content shadow-sm filter_btn_group show'} ref={refLoc} >
                    {location?
                        <div data-value="Current Location" data-selectable="" className="dropdownrow active option" onClick={()=>onCurrentLocation()}>Current Location</div>
                        
                    :null}
                </div>
            </div>:null
    }
    </div> 
      
    <button className="btn btn-primary search_btn text-uppercase rounded-0 " type="button" id="button-addon2"  onClick={()=>onSearchButton()}>
          Search
    </button>
        </div>
    </div> 
  );
}

export default Autosuggetion