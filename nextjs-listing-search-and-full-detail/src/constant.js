//export const API_URL = 'https://demositeapi.thatsend.net';


//export const API_URL = 'http://localhost:7777';
export const API_URL = 'https://api.demosite.com';

//export const DEF_URL_PARAM = 'buy-homes'
export const DEF_URL_PARAM = 'for-sale'
//export const DEF_URL_PARAM_NET = 'for-property'

export const DEAL_PAGE_ID=9;
export const SEARCH_PAGE_ID=8;
export const GLOB_META_KEYWORD="Boca Raton demo site, boca raton houses for sale, waterfront, la clara palm beach, townhomes, luxury, alina boca raton, demosite, demosite boca raton";
export const GLOB_META_DESCRIPTION="Search the latest listings of  Homes For Sale |  demo site having a 38498 for sale listings in";
export const GLOB_META_TITLE="Homes For Sale |  demo site"


export const VT_MAP= 'map';
export const VT_LIST= 'list';
export const VT_GALLERY= 'gallery';
export const VT_SITE_MAP= 'sitemap';

export const DEFAULT_SO= 'price';
export const DEFAULT_SD= 'desc';
export const DEFAULT_VT= VT_MAP;

export const ASTYPE_ADD= 'add';
export const ASTYPE_ZIP= 'zip';
export const ASTYPE_CITYSTATE= 'cs';
export const ASTYPE_MLS= 'mls';
export const ASTYPE_AREA= 'area';
export const ASTYPE_COUNTY= 'county';
export const ASTYPE_SCHOOL= 'school';
export const ASTYPE_SUB= 'sub';
export const ASTYPE_AGENT= 'agent';
export const ASTYPE_PRE= 'pc';
export const ASTYPE_ALL=  'all';
export const ASTYPE_BUILDINGNAME= 'bn';

export const SEARCH_URL= '/for-sale/';
export const SEARCH_PROP_URL='/for-sale/';
export const PROP_URL='for-sale';

export const DETAIL_PROP_URL='homes-for-sale';
export const DETAIL_URLPREFIX=' homes for sale ';
//export const SEARCH_URL= '/buy-homes/';
export const PRECONSTRUCTION_URL= '/pre-construction/';
export const FEATURED_LISTING_URL= '/featured-listings/';
export const PC_LST_NEW_URL= '/new-construction';
export const FL_LST_NEW_URL= '/featured-listings';
export const PRECONSTRUCTION_NEW_URL='/new-construction-pc-';
export const FL_LISTING_NEW_URL= '/fl-listing';
//export const PRECONSTRUCTION_NEW_URL='/pre-construction-new';
export const PS= '/ps/';



export const DATA_FROM_SITE= '1';
export const DATA_FROM_APP= '2';
export const P_SIZE= 'page_size';
export const GO_TO_PAGE= 'page';
export const S_RECORD = 'start_record';
export const V_TYPE= 'vt';
export const DEFAULT_SEARCH= 'true';
export const DEFAULT= 'defaultsearch';
export const SO= 'so';
export const SD= 'sd';
export const RESULT_PAGESIZE=24;
export const URL_SEPARATORBACKSLASE='/';
export const URL_SEPARATORDASH='-';
export const URL_SEPARATORCOMMA=',';
export const FIELD_SUBTYPE='type';
export const FIELD_PROP_CONDITION='pcondo';
export const URLFIELD_SALETYPE_SEPARATORCOMMA=',';
export const FIELD_STORIES_DESC='sdesc';
export const FIELD_SALETYPE='sale';
export const H_MAIN = 'https://www.demosite.com'
export const VIRTUAL_PATH = {'Host_Url' : H_MAIN}
export const PTYPE='ptype';
export const DEFAULT_PTYPE=['residential'];
export const DEFAULT1_PTYPE=['businessOpportunity', 'vacantland'];
export const OL_NON_STATIC_LOOK_UP  = ['pk','Search','page_size','result_count','search_title','user_id','search_datetime','options','addtocart','mapcenterlat','mapcenterlng','mapzoomlevel','addname','start_record','ismapsearch','ispolysearch','forrent','forsale','forincome','forcommercial','isPolySearch','maplistsearch','ListingID_MLS', 'isCluster', 'pc_type','ms-filter-form-check','msFilterFormChkColor','poly','citypolygon','safeURL','pres','linitialurl','isNewSearch',
                                        'clat','clng','nzoom'];
export const OL_DEFAUL_URL_PARAM   = ['addtype','pid',SO,SD,V_TYPE,GO_TO_PAGE];
export const OL_NON_SORTABLE_FIELD_IN_URL   = ['map'];
export const site_currency="$";

export const DETAILGLOB_META_Title="Harborage Isle Fort Lauderdale Homes For Sale";
export const DETAILGLOB_META_KEYWORD="highland beach homes for sale, homes for sale in zip code 33487, mls# r10906675, highland beach homes for sale, highland beach, highland beach fl"
export const DETAILGLOB_META_DESC="Highland Beach Homes For Sale at 2455 Ocean Boulevard highland Beach, FL 33487, MLS# R10906675"
export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
   });

/* export const format = num =>
   String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,'); */

export const extractZipCode = (str) => {
  const match = str.match(/\b\d{5}\b/);
  return match ? match[0] : null;
};

export const format = (num) => {
  const parts = String(num).split('.');
  const integerPart = parts[0];
  const fractionalPart = parts.length > 1 ? `.${parts[1]}` : '';
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedIntegerPart + fractionalPart;
};

export function converter (labelValue) {

      return Math.abs(Number(labelValue)) >= 1.0e+9
  
      ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
      
      : Math.abs(Number(labelValue)) >= 1.0e+6
  
      ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
      
      : Math.abs(Number(labelValue)) >= 1.0e+3
  
      ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(1) + "K"
  
      : Math.abs(Number(labelValue))
      
      ? (Math.abs(Number(labelValue)) / 1.0e+2).toFixed(1) + "K"
  
      : Math.abs(Number(labelValue));
    }

   export function capitalizeFirstLetter(str) {
      // converting first letter to uppercase
      const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
      return capitalized;
  }

  export function capsFLetters(input) {
    return input.replace(/\b\w/g, char => char.toUpperCase());
  }
  
  export function capitalize(str){
    str = str.toLowerCase();
    return str.replace(/([^ -])([^ -]*)/gi,function(v,v1,v2){ return v1.toUpperCase()+v2; });
}
   export function PriceFormat(nStr) {
   if (!isNaN(nStr)) {
     var tmpNo = '';
     var tmpStr = '';
     if (nStr > 1000000000000) {
       tmpNo = nStr / 1000000000000;
       tmpStr = 'T';
     } else if (nStr >= 1000000000) {
       tmpNo = nStr / 1000000000;
       tmpStr = 'B';
     } else if (nStr >= 1000000) {
       tmpNo = nStr / 1000000;
       tmpStr = 'M';
     } else if (nStr >= 1000) {
       tmpNo = nStr / 1000;
       tmpStr = 'K';
     }
     if (tmpNo != '') {
       if (Number.isInteger(tmpNo)) {
         return tmpNo.toFixed(0) + tmpStr;
       } else {
         tmpNo = tmpNo.toFixed(1);
         if (tmpNo.endsWith('.0')) {
           tmpNo = tmpNo.slice(0, -2);
         }
         return tmpNo + tmpStr;
       }
     } else {
       //console.log("last else");
       return nStr;
     }
   }
} 