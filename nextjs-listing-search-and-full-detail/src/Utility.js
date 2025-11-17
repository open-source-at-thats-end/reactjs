
import {
	VIRTUAL_PATH, 
	OL_DEFAUL_URL_PARAM, 
	OL_NON_STATIC_LOOK_UP, 
	OL_NON_SORTABLE_FIELD_IN_URL,
	P_SIZE,GO_TO_PAGE,
	S_RECORD,SEARCH_URL,DEFAULT_SD,DEFAULT_SO,
	DEFAULT_VT,V_TYPE,SO,SD,ASTYPE_CITYSTATE,
	ASTYPE_SUB,ASTYPE_ALL,RESULT_PAGESIZE,
	VT_MAP, ASTYPE_AREA,
	URL_SEPARATORCOMMA,
	URL_SEPARATORBACKSLASE,
	URL_SEPARATORDASH,
	FIELD_SUBTYPE,
	FIELD_PROP_CONDITION,
	FIELD_STORIES_DESC,
	FIELD_SALETYPE,
	PTYPE,
	DEFAULT_PTYPE,
	DEFAULT1_PTYPE,
	DEFAULT,
	DEFAULT_SEARCH
} from '../src/constant';
export class Utility{
    SearchParamAndURL(url=false, arr_search=false)
	{
		
		//global virtual_path;
		let is_redirect = false;
        let ret_Param = {};
		if(((url === '') || url === false) && (typeof arr_search != 'object' || (typeof arr_search === 'object' && (Object.values(arr_search).length <= 0) )))
			is_redirect = true;
		else
		{
			if(((url != '') || url != false) && (typeof arr_search != 'object' || (arr_search === '') || arr_search === false))
			{
				ret_Param['sparam'] = this.GetSearchParam(url);
				
				ret_Param['sparam'][P_SIZE] = RESULT_PAGESIZE;

				ret_Param['sparam'][GO_TO_PAGE] = (ret_Param['sparam'][GO_TO_PAGE]) && parseInt(ret_Param['sparam'][GO_TO_PAGE]) > 1 ? parseInt(ret_Param['sparam'][GO_TO_PAGE]) : 1;
				ret_Param['sparam'][S_RECORD]  = (ret_Param['sparam'][GO_TO_PAGE] - 1) * ret_Param['sparam'][P_SIZE];
			}
			else if(typeof arr_search === 'object' && (Object.values(arr_search).length > 0) && (url === '' || url === false))
			{
				//console.log("url elseiffff===",url);
				ret_Param['sparam'] = this.objFilterBlankKey(arr_search)//arr_search.values().filter((val)=> val != '');
			}
			else if((url != '') && typeof arr_search === 'object' && (Object.values(arr_search).length > 0))
			{
				//console.log("url iffff2===",url);
				let urlparam = url;
				//is_redirect = false;
				if(url.indexOf(SEARCH_URL) >=0) //	if(strpos(url, SEARCH_URL) != false)
				{
					//urlparam = explode(SEARCH_URL,url)[1];
                    urlparam=url.split(SEARCH_URL)[1];
				}

				let old_param = this.GetSearchParam(urlparam);
				//console.log(old_param);
				//_SESSION['page_size'] = arr_search['page_size']   =   RESULT_PAGESIZE;
				if((arr_search['addtocart']) && arr_search['addtocart'] == true){
					ret_Param['sparam'] = arr_search;
					//console.log(ret_Param['sparam']);
				}
					
				else
				{   
					arr_search[GO_TO_PAGE] = (arr_search[GO_TO_PAGE]) ? arr_search[GO_TO_PAGE] : ((old_param[GO_TO_PAGE]) ? old_param[GO_TO_PAGE] : 1);
					arr_search[S_RECORD]  = (arr_search[GO_TO_PAGE] - 1) * arr_search[P_SIZE];

					ret_Param['sparam'] = {...old_param,...arr_search};
					
					if((old_param[V_TYPE]) && old_param[V_TYPE] != arr_search[V_TYPE])
					{
						is_redirect = true;
					}

				}
				if(((arr_search['AddressName']) || (arr_search['addval'])) && ((arr_search['addtype']) && (arr_search['addtype'] === ASTYPE_CITYSTATE || arr_search['addtype'] === ASTYPE_SUB || arr_search['addtype'] == ASTYPE_ALL)))
				{
					if(((old_param['AddressName']) &&  (old_param['addval']) && (old_param['AddressName'].toLowerCase()) != (arr_search['AddressName'].toLowerCase())) && (old_param['addval'].toLowerCase()) != (arr_search['addval'].toLowerCase()))
					{
						ret_Param['sparam']['isPolySearch'] = 'NEW';
					}
					else
					{
						ret_Param['sparam']['isPolySearch'] = 'OLD';
					}
				}
				else
				{
					ret_Param['sparam']['isPolySearch'] = '';
				}

			}
		}
		if(!('sparam' in ret_Param)){
			ret_Param = {'sparam':{}}
		}
		//console.log(ret_Param['sparam']);
		if( !(SO in ret_Param['sparam']) || ((SO in ret_Param['sparam']) && ret_Param['sparam'][SO] == ''))
		{
			/* ret_Param['sparam'] = {
				[SO] : DEFAULT_SO
			};
			console.log(ret_Param['sparam']); */
			ret_Param['sparam'][SO] = DEFAULT_SO
		}
		if(!(SD in ret_Param['sparam']) || ((SD in ret_Param['sparam']) && ret_Param['sparam'][SD] == ''))
		{
			ret_Param['sparam'][SD] = DEFAULT_SD;
		}
		if(!(V_TYPE in ret_Param['sparam']) || ((V_TYPE in ret_Param['sparam']) && ret_Param['sparam'][V_TYPE] == ''))
		{
			ret_Param['sparam'][V_TYPE] = DEFAULT_VT;
		}
		
		//console.log(ret_Param);
		//console.log(ret_Param['sparam'][PTYPE]);
		/* if(!(PTYPE in ret_Param['sparam']) || ((PTYPE in ret_Param['sparam'])))
		{
			ret_Param['sparam'][PTYPE] = DEFAULT_PTYPE;
		}  */
		/* if(Array.isArray(ret_Param['sparam'][PTYPE]) && (ret_Param['sparam'][PTYPE].length===0))
		{
			delete ret_Param['sparam'][PTYPE]
		}else
		{
			ret_Param['sparam'][PTYPE] = DEFAULT_PTYPE;
		} */
		if(!(GO_TO_PAGE in ret_Param['sparam']) || ((GO_TO_PAGE in ret_Param['sparam']) && ret_Param['sparam'][GO_TO_PAGE] == ''))
		{
			//console.log("====");
			ret_Param['sparam'][GO_TO_PAGE] = 1;
		}

		ret_Param['sparam'][P_SIZE]   =  RESULT_PAGESIZE;
		if(ret_Param['sparam'][V_TYPE] == VT_MAP)
		{
			ret_Param['sparam']['getMapData'] = true;
			ret_Param['sparam']['getAllPhoto'] 	= true;
		}
		 /* if(ret_Param['sparam'][V_TYPE] == VT_MAP)
			{
				ret_Param['sparam']['defaultsearch'] = true;
			}  */
		
		if((ret_Param['sparam']['poly']) && (ret_Param['sparam']['poly'] != " "))
		{
			ret_Param['sparam']['poly'] = (ret_Param['sparam']['poly']).replace(/^\~|\~$/g, '');  //trim(ret_Param['sparam']['poly'], "~");
		}
		if((ret_Param['sparam']['cir']) && (ret_Param['sparam']['cir'] != " "))
		{
            // Remove ~ charactor from string start and end.
			ret_Param['sparam']['cir'] = (ret_Param['sparam']['cir']).replace(/^\~|\~$/g, '');
		}
//console.log(ret_Param['sparam']);
		ret_Param['url'] = this.GetSearchURL(ret_Param['sparam']);
//console.log(ret_Param['url']);

		if((is_redirect) && is_redirect == true)
		{
			
			let purl = VIRTUAL_PATH['Host_Url']+SEARCH_URL+ret_Param['url'];
			//router.push(purl, { scroll: false })
			
			 return purl;
			/* header("location: "+VIRTUAL_PATH['Host_Url']+SEARCH_URL+ret_Param['url']);
			exit(0); */
		}
		else
			return ret_Param;
	}
    GetSearchParam(URLparam)
	{
		//console.log(URLparam);
		let ret_param = {};
		let s_param = {};
		let is_add_search = false;
	    URLparam = URLparam.trim();
		//isRedirect = false;
		/*if(empty(URLparam) || !is_string(URLparam))
        {
            return false;
        }*/
		if(URLparam != " ")
		{
			//console.log(URLparam);
			let state;
			//URLparam = (VIRTUAL_PATH['Host_Url']+SEARCH_URL).replace('/',URLparam);
			//console.log(URLparam);
			if((URLparam.indexOf(URL_SEPARATORBACKSLASE+"addtype"+URL_SEPARATORDASH) >= 0 ))
			{
				is_add_search = true;
			}
			//console.log(is_add_search);
            let qp = URLparam.trim().replace(/^\/|\/$/g, '').split(URL_SEPARATORBACKSLASE);
			//console.log(qp);
			// qp = explode(URL_SEPARATORBACKSLASE,ltrim(rtrim(trim(URLparam),URL_SEPARATORBACKSLASE),URL_SEPARATORBACKSLASE));//need to change
            qp.map((val, key)=>{
				//console.log(val.includes(URL_SEPARATORDASH));
				
				if(val.includes(URL_SEPARATORDASH) === false  || ( is_add_search == true))
				{
					//console.log("innn======if");
                    //When get city based url such as /FL/Riviera_Beach
                    if (key == 0 && val.length == 2)
                    {
                        state = val;
                    }
                    else
                    {
						// When get city based url such as /FL/Riviera_Beach
                        if(typeof val != 'number' && state != '' && state !=undefined) 
                        {
                            s_param['addval'] = val.replaceAll('_',' ')+", "+state;
							//console.log(val.replaceAll('_',' ')+", "+state);
							//console.log("iff",s_param);
                            is_add_search = false;
                        }
                        else
                        {
							// Added for TEMP
							if(val.includes(URL_SEPARATORDASH) === true)
								val = val.replaceAll('-', ' ');

                            s_param['addval'] = val;
							//console.log("else",s_param);
                            is_add_search = false;
                        }
                    }
				}
				else
				{
					//args = explode(URL_SEPARATORDASH,val,2);
                    // Split string from first occurnce only "-"
                    let args=val.split(/-(.*)/s);
					s_param[args[0]] = args[1];
				}

				if(typeof s_param=='object' && Object.keys(s_param).length > 0)
				{
					Object.keys(s_param).map((value, field)=>{
						//console.log(value);
						if(s_param[value] == '' )
							delete s_param[value];

						if(value !== 'addval' && value !== 'addname' && value !=='map')
						{
							if(!Array.isArray(s_param[value]) && s_param[value].indexOf(URL_SEPARATORCOMMA) >= 0)
							{
								//delete s_param[value];   //delete for  TEMP
								let v= s_param[value].split(URL_SEPARATORCOMMA);
								s_param[value] = v.sort();
								//console.log(s_param[value]);
							}
						} 
                    })
				}
			})
		}
		
		if(s_param['addval'] && !('addtype' in s_param))
		{
			s_param['addtype'] = ASTYPE_CITYSTATE;
		}

		/* if(!(s_param['ptype']) && !(s_param['clfr'])){
			s_param['ptype'] = ['residential']
		} */
	
		if(typeof s_param === 'object' && Object.keys(s_param).length > 0)
		{
			//console.log( Object.keys(s_param)); //need to check
            Object.keys(s_param).map((F_Key)=>{
                if(Array.isArray(s_param[F_Key]) && (F_Key == FIELD_SUBTYPE || F_Key == FIELD_PROP_CONDITION || F_Key == FIELD_SALETYPE || F_Key == FIELD_STORIES_DESC))
					ret_param[F_Key] =  [s_param[F_Key]];
				else
					ret_param[F_Key] =  s_param[F_Key];
            })
		}
		return this.objFilterBlankKey(ret_param);
	}
    objFilterBlankKey(obj) {
		//console.log(obj);
        for (var propName in obj) {
          if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
          }
        }
        return obj
      }
    GetSearchURL(arr_Param)
	{
		//console.log(arr_Param);
		let url_param ={};
		if(typeof arr_Param != 'object')
			return false;

		//init_order = asset['URL_ORDER'];

		// Order all URL params so URL can be in same way every time
		let Param = this.OrderUrlParams(arr_Param,false);
		

		let arrParam = this.objFilterBlankKey(Param);
		let def_url_param = {};
        Object.keys(arrParam).map((key)=>{
            if(OL_NON_STATIC_LOOK_UP.indexOf(key) < 0){
                if(OL_DEFAUL_URL_PARAM.indexOf(key) >= 0){
                    def_url_param[key] = arrParam[key];
					def_url_param = this.OrderUrlParams(def_url_param,OL_DEFAUL_URL_PARAM);
					arrParam[key] = '';
                }
                if(arrParam[key] !== 'Any' && typeof arrParam[key] != 'boolean' && arrParam[key] != '' )
				{
					if(Array.isArray(arrParam[key]) && arrParam[key].length > 0)
					{
						let temp_array = arrParam[key];
						arrParam[key] = this.objFilterBlankKey(temp_array);
						//if(OL_NON_SORTABLE_FIELD_IN_URL.indexOf(arrParam[key]) <= 0);
						if(OL_NON_SORTABLE_FIELD_IN_URL.indexOf(arrParam[key]) >= 0) //change TEMP
						{
							arrParam[key].sort();
						}
						if(arrParam[key].length > 0)
							url_param[key] = arrParam[key].join(URL_SEPARATORCOMMA);
					}
					else
					{
						url_param[key] = arrParam[key];
					}
				}
            }
        })
		
		url_param = {...url_param, ...def_url_param};
		let turl_args;
		let arr=[];
		if(typeof url_param == 'object' && Object.keys(url_param).length > 0)
		{
		//console.log("========================================inn");
			let turl_param = this.objFilterBlankKey(url_param);
			//console.log(turl_param);
		
			Object.keys(turl_param).map((f,k)=>{
				if(f == 'addval'){
					// Added for TEMP
					//console.log(turl_param[f]);
					let str=turl_param[f].replace(/\s+/g,'-');
					arr.push(str)
					 /* if(str.indexOf('--')>0){
						str=turl_param[f].replaceAll('--','-');
						arr.push(str)
					}  */
					
					//arr.push(turl_param[f]);
				}
				else
				{
					////console.log(f+URL_SEPARATORDASH+turl_param[f]);
					turl_args = f+URL_SEPARATORDASH+turl_param[f];
				
					arr.push(f+URL_SEPARATORDASH+turl_param[f]);
					
					//turl_args =  [f+URL_SEPARATORDASH+turl_param[f]];
					 //console.log("else",turl_args);
				}
			
			})
			
		}
		let url_args = this.objFilterBlankKey(arr);

        //unset(url_args[1]);
		//console.log(url_args);
		let url = url_args.join(URL_SEPARATORBACKSLASE);
		//console.log(url);
        //url = implode("&",url_args);
		//echo url;die;
		return url;
	}
	OrderUrlParams(param, init_order=false)
	{
		let out={};
		let intersect;
		//array_intersect
		if(init_order == false)
		{
			intersect = Object.keys(param).sort();
			
		}else{
			intersect = init_order.filter(value => Object.keys(param).includes(value)); 
			//console.log(intersect);
		}
		//console.log(intersect);
		intersect.map((value, key) => {
			out[value] = param[value];
			// If found list here
			if(Array.isArray(out[value]) && out[value].length > 0 && OL_NON_SORTABLE_FIELD_IN_URL.indexOf(value) < 0)
			{
				var arrSort = [...out[value]]
				out[value] = arrSort.sort();
			}else if(typeof out[value] == 'object' && Object.keys(out[value]).length > 0 && OL_NON_SORTABLE_FIELD_IN_URL.indexOf(value) < 0){
				Object.keys(out[value]).map((v, k)=>{
					//console.log("kdmskldfmskdmfmds");
					if(typeof v == 'object'){
						//var arrSort = [...Object.keys(out[value])]
						//out[value] = arrSort.sort();
						out[value] =Object.keys(out[value]).sort();
					}
					else
						out[value] = out[value].sort();
						

					if(typeof out[value][v] == 'object')
					{
						out[value][v] = Object.keys(out[value][v]).sort();
						out[value][v] = Object.values(out[value][v]).sort();
					}
				}) 
			}
		})
		return out;
	}
	_OrderUrlParams(param, init_order=false) {
		let out = {};
		let intersect = init_order.filter(key => param.hasOwnProperty(key));
		if (init_order == false) {
			 intersect = Object.keys(param).sort();
		} 
		for (let key of intersect) {
			out[key] = param[key];
			if (Array.isArray(out[key]) && out[key].length > 0 && OL_NON_SORTABLE_FIELD_IN_URL.indexOf(key) < 0) {
				for (let i = 0; i < out[key].length; i++) {
					if (Array.isArray(out[key][i])) {
						out[key][i].sort();
					} else {
						out[key][i].sort();
					}
					if (Array.isArray(out[key][i])) {
						out[key][i].sort();
						out[key][i].sort();
					}
				}
			}
		}
		return out;
	}

	_getDynamicPageTitleAndDescription1(ParamsObj, arrAreaSubCity) {
		//console.log("arrParam------------",arrParam);
		//console.log("arrAreaSubCity==========",arrAreaSubCity);
		let page = {};
		const arr = arrParam;
	
		// Convert addval to lowercase and replace spaces with hyphens
		arr.addval = arr.addval.toLowerCase().replace(/ /g, '-');
	
		// Define constants for area types
	/* 	const ASTYPE_AREA = 'area';
		const ASTYPE_SUB = 'sub';
		const ASTYPE_CITYSTATE = 'cs';
		const ASTYPE_ALL = 'all'; */
	
		// Define a function to capitalize the first letter of each word
		function capitalize(str) {
			return str.replace(/\b\w/g, char => char.toUpperCase());
		}
	
		// Define a function to format property types
		function formatPropertyType(ptype) {
			let formattedType = '';
			switch (ptype) {
				case 'residential':
					formattedType = 'Residential Homes For Sale | Residential demo site';
					break;
				case 'businessopportunity':
				case 'commercial':
				case 'income':
					formattedType = `${capitalize(ptype)} Properties For Sale | ${capitalize(ptype)} demo site`;
					break;
				case 'vacantland':
					formattedType = `${capitalize(ptype)} For Sale | ${capitalize(ptype)} demo site`;
					break;
				case 'rental':
					formattedType = `Properties for Rent and Lease | ${capitalize(ptype)} demo site`;
					break;
				default:
					formattedType = capitalize(ptype);
			}
			return formattedType;
		}
	
		// Define a function to generate the page title and description
		function generateTitleAndDescription(commonTitle) {
			console.log("++++++++++++++++++++",commonTitle);
			var pageTitle = `${capitalize(commonTitle)} ${arr.stype === 'Any' || !arr.stype ? 'Homes' : capitalize(arr.stype)} ${arr.status === 'sold' ? 'Sold' : 'For Sale'}`;
			let metaDesc = 'Search the latest listings of ';
			if (arr.ptype && !Array.isArray(arr.ptype)) {
				const formattedType = formatPropertyType(arr.ptype);
				pageTitle += ` ${formattedType}`;
				metaDesc += formattedType;
				if (arr.stype) {
					metaDesc += ', ';
				}
			}
			if (!arr.stype || arr.stype === 'Any') {
				metaDesc += ' homes';
			} else {
				metaDesc += ` ${arr.stype}s`;
			}
			metaDesc += arr.status === 'sold' ? ' sold information' : ' for sale';
			if (arr.city) {
				const cityStr = Array.isArray(arr.city) ? arr.city.join(', ') : arr.city;
				commonTitle += `, ${capitalize(cityStr)}`;
			}
			return { pageTitle, metaDesc };
		}
	//console.log("arr>>>",arr);
	console.log(arrAreaSubCity);
	console.log([arr.addval]);
		// Generate page title and description based on addtype
		switch (arr.addtype) {
			case ASTYPE_AREA:
				page = generateTitleAndDescription(arrAreaSubCity.Area[arr.addval].city);
				break;
			case ASTYPE_SUB:
				page = generateTitleAndDescription(arrAreaSubCity.Subdivision[arr.addval].city);
				break;
			case ASTYPE_CITYSTATE:
				page = generateTitleAndDescription(arrAreaSubCity.City[arr.addval].city);
				break;
			case ASTYPE_ALL:
				// Default page title and description
				if (arr.status === 'sold') {
					page.pageTitle = 'Florida, Homes Sold | DemoSite';
					page.metaDesc = 'DemoSite provides the latest MLS listings of houses, townhomes, duplexes, and condos sold information in Florida. View Florida homes sold prices and more.';
				} else {
					page.pageTitle = 'Florida, Homes For Sale | DemoSite.com';
					page.metaDesc = 'DemoSite provides the latest MLS listings of houses, townhomes, duplexes, and condos for sale in Florida. View Florida homes for sale.';
				}
				break;
			default:
				// Handle other cases here if needed
				break;
		}
	
		return page;
	}

	
 getDynamicPageTitleAndDescription(objectParam, arrAreaSubCity,lstcount) {
	console.log("+++++++++++");
	//console.log("objPram====",objectParam);
	const objPram = objectParam;
	let page = {};
  
	// we need - in sub-area and area name while searching city
	objPram['addval'] = objPram['addval'].toLowerCase().replace(/ /g, '-');
    console.log(arrAreaSubCity['Area']);
	// when addtype = area/city/sub-are only that time page title and description this is use
	if (objPram['addtype'] === ASTYPE_AREA || objPram['addtype'] === ASTYPE_SUB || objPram['addtype'] === ASTYPE_CITYSTATE || objPram.hasOwnProperty('city') || objPram.hasOwnProperty('stype') || objPram.hasOwnProperty('status') || objPram.hasOwnProperty('ptype') || objPram['addtype'] === ASTYPE_ALL) {
	  // it will take array of AreaCity when area is searched same for sub-area.
	  let arrCity=[]
	  console.log("iiiiiiiiiiiiiiiiinnnnnnnnnnnn");
	  //console.log(arrAreaSubCity);
	  if (objPram['addtype'] === ASTYPE_AREA) {
		arrCity = arrAreaSubCity['Area'];
	  } else if (objPram['addtype'] === ASTYPE_CITYSTATE) {
		arrCity = arrAreaSubCity['City'];
	  } else if (objPram['addtype'] === ASTYPE_SUB) {
		arrCity = arrAreaSubCity['Subdivision'];
	  }
 
	  // Because We need space in title
	  var commonTitle = objPram['addval'].replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  //console.log("cmnti______________",commonTitle);
	  // This common title is also used to make dynamic description.

	  //////NEED TO CHECK THIS CASE/////

	  if (objPram['addtype'] === ASTYPE_AREA || objPram['addtype'] === ASTYPE_SUB) {
		//console.log("********************",[objPram['addval']]);
		console.log("arrCity>>>>>>>",arrCity[objPram['addval']]);
		let areastr=arrCity[objPram['addval']] ? arrCity[objPram['addval']]:""
		commonTitle += ', ' + areastr.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
	  }
   console.log(commonTitle);
	  page['pgtitle'] = commonTitle.replace(/N\./g, 'North');
	  //console.log(page['pgtitle'] );
	  page['pgtitle'] += (objPram['stype'] === 'Any' || !objPram.hasOwnProperty('stype') || Array.isArray(objPram['stype'])) ? ' Homes ' : ' ' + objPram['stype'].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + ' ';
	  page['pgtitle'] += (objPram.hasOwnProperty('status') && objPram['status'] === 'sold') ? ' Sold' : 'For Sale';
  
	  if (objPram.hasOwnProperty('city')) {
		let city = Array.isArray(objPram['city']) ? objPram['city'].join(", ") : objPram['city'];
		if (commonTitle !== '' && commonTitle !== undefined) {
		  commonTitle += ', ';
		}
		commonTitle += city.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
	  }
  
	  commonTitle = commonTitle.replace(/,\s*$/, '');
	  page['metadesc'] = "Search the latest listings of ";
  
	  if (!Array.isArray(objPram['city'])) {
		// Replaced N. with 'North' in area and city name.
		page['title'] = commonTitle.replace(/N\./g, 'North') + " ";
	  }
  
	  // Description
	  /**
	   * In PHP script its getting everytime array even single property type set in filter so this condition not setisfied 
	   * so we commented this code because in our filter we set simple string in property type if selected single
	   * */
	 /*  if (objPram.hasOwnProperty('ptype') && !Array.isArray(objPram['ptype'])) {
		console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
		var ptype = objPram['ptype'];
		let ptype1;
		if (ptype === 'residential') {
		  ptype1 = ptype.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); //function used to convert in first letter capital
		  ptype = `${ptype1} Homes For Sale | ${ptype1} demo site`;
		}
		if (ptype === 'businessopportunity' || ptype === 'commercial' || ptype === 'income') {
		  ptype1 = ptype.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		  ptype = `${ptype1} Properties For Sale | ${ptype1} demo site`;
		}
		if (ptype === 'vacantland') {
		  ptype1 = ptype.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		  ptype = `${ptype1} For Sale | ${ptype1} demo site`;
		}
		if (ptype === 'rental') {
		  ptype1 = ptype.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		  ptype = `Properties for Rent and Lease | ${ptype1} demo site`;
		}

		ptype = ptype.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		console.log(ptype);
		page['title'] += ptype;
		page['metadesc'] += ptype;
		if (objPram.hasOwnProperty('stype') && objPram['stype'] !== '') {
		  page['metadesc'] += ", ";
		}
	  } */
  

	  /**
	   * 
	   * php getting every time array even single property type set in filter
	   * /
	  /* if (Array.isArray(objPram['ptype'])) {
		page['title'] += " Homes For Sale | DemoSite ";
	  } */
	  // Added this line new insted of commented above
	  if('ptype' in objPram){
		page['title'] += " Homes For Sale | DemoSite ";
	  }
  

	  if ((!objPram.hasOwnProperty('stype') || objPram['stype'] === 'Any') && !objPram.hasOwnProperty('ptype')) {
		// Because commonDesc area used in both places.
		let commonDesc = commonTitle.replace(/N\./g, 'North') + ' View ' + objPram['addval'].replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		if (objPram['status'] === 'sold') {
		  page['description'] = 'DemoSite provides the latest MLS listings of houses, townhomes, duplexes, and condos sold information in ';
		  page['description'] += commonDesc;
		  page['description'] += ' homes sold prices and more.';
		  page['metadesc'] = `DemoSite provides the latest MLS listings of houses, townhomes, duplexes, and condos having a ${lstcount} sold listings information in ` + commonTitle + ' .';
		} else {
		  page['description'] = 'DemoSite provides the latest MLS listings of houses, townhomes, duplexes, and condos for sale in ';
		  page['description'] += commonDesc;
		  page['description'] += ' homes for sale.';
		  page['metadesc'] = `DemoSite provides the latest MLS listings of houses, townhomes, duplexes, and condos having a ${lstcount} listings for sale in ` + commonTitle + '.';
		}
	  } else {
		page['description'] = ' Find all';
		// when ajax call execute at that time [stype] wil be 'Any'
		var stype = objPram['ptype'];
		if (objPram.hasOwnProperty('stype') && objPram['stype'] !== '' && !Array.isArray(objPram['stype'])) {
		  let stype2 = objPram['stype'];
		  let stype1;
		  if (!objPram.hasOwnProperty('ptype') && !Array.isArray(objPram['ptype'])) {
			stype1 = stype2.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
			stype = ` ${stype1} Properties For Sale | ${stype1} demo site`;
		  }
		  stype = stype2.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		  page['title'] += stype;
		  page['metadesc'] += stype;
		  page['description'] += ' ' + stype + 's ';
		}
  
		if (objPram.hasOwnProperty('status') && objPram['status'] !== '') {
		  page['description'] += (objPram['status'] === 'active') ? 'for sale in ' : 'sold in ';
		  page['metadesc'] += (objPram['status'] === 'active') ? `having a ${lstcount} for sale listings in `: `having a ${lstcount} sold listings information in `;
		} else {
		  page['metadesc'] += ` having a ${lstcount} for sale listings in `;
		}
  
		// Replaced N. with 'North' in area and city name.
		page['description'] += commonTitle.replace(/N\./g, 'North');
		page['metadesc'] += commonTitle.replace(/N\./g, 'North') + '.';
  
		if (objPram['status'] === 'sold') {
		  page['description'] += ' Check out sold price, sold date & sold history information for your own research.';
		} else {
		  page['description'] += ' Check out photos, prices & open house information of your favourites homes.';
		}
	  }
  
	  // sapnil comment
	  // seo - website Audit  in excel file//
	  page['title'] += (objPram.hasOwnProperty('status') && objPram['status'] === 'sold') ? ' Sold | DemoSite.com' : ' For Sale | DemoSite.com';
	} else {
	  // Default Page title and Description
	  if (objPram['status'] === 'sold') {
		page['title'] = ' Florida, Homes Sold | DemoSite';
		page['pgtitle'] = ' Florida, Homes Sold';
		page['description'] = ' DemoSite provides the latest MLS listings of houses, townhomes, duplexes, and condos sold information in  Florida. View Florida homes sold prices and more.';
		page['metadesc'] = ` DemoSite provides the latest MLS listings of houses, townhomes, duplexes, and condos having a ${lstcount} sold listings information in Florida.`;
	  } else {
		page['title'] = ' Florida, Homes For Sale | DemoSite.com';
		page['pgtitle'] = ' Florida, Homes For Sale';
		page['description'] = ' DemoSite provides the latest MLS listings of houses, townhomes, duplexes, and condos for sale in Florida. View Florida homes for sale.';
		page['metadesc'] = ` DemoSite provides the latest MLS listings of houses, townhomes, duplexes, and condos having a ${lstcount} listings for sale in Florida. View homes for sale.`;
	  }
	}
	console.log(page);
	return page;
  }
  
  
	
}