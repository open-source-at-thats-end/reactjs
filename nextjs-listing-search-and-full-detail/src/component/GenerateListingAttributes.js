import { capitalize } from "../constant";
import { DETAIL_URLPREFIX } from "../constant";
function GenerateListingAttributes(Record,strpop) {
    function buildSefString(str) {
        str = str.replace(/'/g, "-"); // replace ' with -
        str = str.replace(/"/g, "-"); // replace " with -
        str = str.replace(/[^a-zA-Z0-9_-~]/g, "-"); // convert non alphanumeric and non - _ to -
        str = str.replace(/-+/g, "-"); // convert multiple dashes to a single dash
        str = str.replace(/ +/g, " "); // convert multiple spaces to a single space
        str = str.toLowerCase();
        return str;
      }
   // //console.log(Record);
    if(!Record)
        return;
    var rsAttr = {};
    var bridge_id = 2;
    /* Define address */
    //rsAttr['SFPrefix'] = '';
    rsAttr['Street'] = '';
    rsAttr['AddressFull'] = '';
    rsAttr['AddressSmall'] = '';
    rsAttr['AddressSort'] = '';
    rsAttr['SFUrl'] = '';
    var street = '';
    var addrs=""
    // Sale Or Rent ?
    //var type = (Record['PropertyType'] == 'Residential Lease') ? 'Rent' : 'Sale';
    var type = (Record['Category'] && Record['Category'] == 'For Lease') ? 'Rent' : 'Sale';
    //if (Record['CityName'])
    //rsAttr['SFPrefix'] += "Home for " + type + " in " + ucwords(strtolower(Record['CityName']));
    
    if(Record['DisplayAddress'] && Record['DisplayAddress'] == 'Y') {
        if(Record['Address'] && Record['Address'].trim() != '') {
            street = Record['Address'].trim() + " ";
           
        } else {
            if (Record['UnitNo'] && Record['UnitNo'].trim() != '') {
                street += Record['UnitNo'].trim();
                //console.log(street);
            }
            if (Record['StreetNumber'] && Record['StreetNumber'].trim() != '')
                street += Record['StreetNumber'].trim() + " ";
            if (Record['StreetDirection'] && Record['StreetDirection'].trim() != '')
                street += Record['StreetDirection'].trim() + " ";
            if(Record['StreetDirPrefix'] && Record['StreetDirPrefix'].trim() != '')
                street += Record['StreetDirPrefix'].trim() + " ";
            if (Record['StreetName'] && Record['StreetName'].trim() != '')
                street += Record['StreetName'].trim() + " ";
            if (Record['StreetSuffix'] && Record['StreetSuffix'].trim() != '')
                street += Record['StreetSuffix'].trim() + " ";
            if(Record['StreetDirSuffix'] && Record['StreetDirSuffix'].trim() != '')
                street += Record['StreetDirSuffix'].trim();
            if(Record['UnitNo_2'] && Record['UnitNo_2'] > 0)
                street += "Unit " + Record['UnitNo_2'].trim() + " ";
        }
       
        //console.log(rsAttr);
        //console.log( Record['StreetSuffix']);
        //street=street.toLocaleLowerCase();
       
        //street = ucwords(street.toLowerCase());
        rsAttr['Street'] = street.replace(", ", "");
        //console.log(rsAttr);
    }
    
    var ads = '';
    /*if (Record['UnitNo'] && Record['UnitNo'].trim() != '') {
        ads += Record['UnitNo'].trim();
    }*/
    if (Record['StreetNumber'] && Record['StreetNumber'].trim() != '')
        ads += Record['StreetNumber'].trim() + " ";
    if (Record['StreetDirection'] && Record['StreetDirection'].trim() != '')
        ads += Record['StreetDirection'].trim() + " ";
    if(Record['StreetDirPrefix'] && Record['StreetDirPrefix'].trim() != '')
        ads += Record['StreetDirPrefix'].trim() + " ";
    if (Record['StreetName'] && Record['StreetName'].trim() != '')
        ads += Record['StreetName'].trim() + " ";
    if (Record['StreetSuffix'] && Record['StreetSuffix'].trim() != '')
        ads += Record['StreetSuffix'].trim() + " ";
    if(Record['StreetDirSuffix'] && Record['StreetDirSuffix'].trim() != '')
        ads += Record['StreetDirSuffix'].trim() + " ";
    if(Record['UnitNo_2'] && Record['UnitNo_2'] > 0)
        ads += "Unit " + Record['UnitNo_2'].trim() + " ";
   
    
    //ads=ads.toLowerCase().trim();
    /* ads=capitalizeFirstLetter(ads).trim() */
    //ads = ucwords(ads.toLowerCase().trim());
    //console.log(ads);
    
    rsAttr['AddressSort'] = ads;
    rsAttr['AddressFull'] = (street != '') ? street : ads;
    
    rsAttr['Addrs']=(street != '') ? street : ads;
    if(Record['MLSP_ID'] == bridge_id){
        //console.log(d.includes(Record['CityName'].trim()));
        if(rsAttr['Addrs'].includes(Record['CityName'].toLowerCase().trim()))
            rsAttr['Addrs'] = rsAttr['Addrs'].replace(Record['CityName'].toLowerCase().trim(), '')

        if(rsAttr['Addrs'].includes(Record['State'].toLowerCase().trim()))
            rsAttr['Addrs'] = rsAttr['Addrs'].replace(Record['State'].toLowerCase().trim(), '')

        if(rsAttr['Addrs'].includes(Record['ZipCode'].toLowerCase().trim()))
            rsAttr['Addrs'] = rsAttr['Addrs'].replace(Record['ZipCode'].toLowerCase().trim(), '')
  
        rsAttr['Addrs'] = rsAttr['Addrs'].slice(0,rsAttr['Addrs'].lastIndexOf(','))
        // Sometine in Address field doesn't have CityName that time, not getting comma and some address have that time we get comma at the end of the address so at above we removed comma if we found and at below we addded comma to join city name
    }
   
    rsAttr['AddressFull'] = rsAttr['Addrs'].trim()+', ';
   
    
    //rsAttr['AddressFull'] = capitalize(rsAttr['AddressFull'])
    rsAttr['Addrs']= rsAttr['Addrs'].trim().toUpperCase()

   // console.log(rsAttr['AddressFull']);
    if ( (Record['CityName'] && Record['CityName'].trim() != ''))
        rsAttr['AddressFull'] += Record['CityName'] + ", ";
    
    if(Record['State'] && Record['State'].trim() != '')
        rsAttr['AddressFull'] += Record['State'].trim();
    if (Record['ZipCode'] && Record['ZipCode'].trim() != '')
        rsAttr['AddressFull'] += " " + Record['ZipCode'].trim();
    //rsAttr['AddressSmall'] = street;
    if(Record['DisplayAddress'] && Record['DisplayAddress'] == 'Y') {
        rsAttr['AddressSmall'] = street;
    } else {
        rsAttr['AddressSmall'] = rsAttr['AddressFull'];
    }
    //console.log(rsAttr);
    rsAttr['AddressSmall'] = (street != '') ? street : ads;
    /* Search Friend Url */
    var urlPrefix = '';
    if (/*Record['MLSP_ID'] != bridge_id &&*/ Record['CityName'] && Record['CityName'].trim() != '')
        urlPrefix += Record['CityName'].trim() + " ";
    urlPrefix += DETAIL_URLPREFIX;
    urlPrefix = buildSefString(urlPrefix.trim());
    rsAttr['SFUrl'] = rsAttr['AddressFull'];
    //console.log(rsAttr['SFUrl']);
    rsAttr['SFUrl'] += " MLS ";
    if(Record['MLS_NUM'] && Record['MLSP_ID'])
        rsAttr['SFUrl'] += Record['MLS_NUM'] + "-" + Record['MLSP_ID'];
  
    //console.log(Record['MLSP_ID']);
    rsAttr['SFUrl'] = urlPrefix + "/" +buildSefString(rsAttr['SFUrl'].trim());
    if(strpop){
        rsAttr['SFUrl'] = urlPrefix + "/" +buildSefString(rsAttr['SFUrl'].trim());
        rsAttr['SFUrl'] = rsAttr['SFUrl']+"/popup"
    }
    
    rsAttr['Price_Diff_Amount'] = (Record['Old_Price'] > 0 ? Record['Old_Price'] - Record['ListPrice'] : 0);
    rsAttr['AddressSmall'] = rsAttr['AddressSmall'].replace('  ', ' ');
    // //console.log(rsAttr);return;
    //console.log(rsAttr);
    return rsAttr;
}
function GenerateListingAttributesOLD(Record, arrMetaData='') {

    function buildSefString(str) {
        str = str.replace(/'/g, "-"); // replace ' with -
        str = str.replace(/"/g, "-"); // replace " with -
        str = str.replace(/[^a-zA-Z0-9_-~]/g, "-"); // convert non alphanumeric and non - _ to -
        str = str.replace(/-+/g, "-"); // convert multiple dashes to a single dash
        str = str.replace(/ +/g, " "); // convert multiple spaces to a single space
        str = str.toLowerCase();
        return str;
      }
   // //console.log(Record);
    if(!Record)
        return;
    var rsAttr = {};
    var bridge_id = 2;
    /* Define address */
    //rsAttr['SFPrefix'] = '';
    rsAttr['Street'] = '';
    rsAttr['AddressFull'] = '';
    rsAttr['AddressSmall'] = '';
    rsAttr['AddressSort'] = '';
    rsAttr['SFUrl'] = '';
    var street = '';
    // Sale Or Rent ?
    //var type = (Record['PropertyType'] == 'Residential Lease') ? 'Rent' : 'Sale';
    var type = (Record['Category'] && Record['Category'] == 'For Lease') ? 'Rent' : 'Sale';
    //if (Record['CityName'])
    //rsAttr['SFPrefix'] += "Home for " + type + " in " + ucwords(strtolower(Record['CityName']));
    if(Record['DisplayAddress'] && Record['DisplayAddress'] == 'Y') {
        if(Record['Address'] && Record['Address'].trim() != '') {
            street = Record['Address'].trim() + " ";
            //console.log(street);
        } else {
            if (Record['UnitNo'] && Record['UnitNo'].trim() != '') {
                street += Record['UnitNo'].trim();
            }
            if (Record['StreetNumber'] && Record['StreetNumber'].trim() != '')
                street += Record['StreetNumber'].trim() + " ";
            if (Record['StreetDirection'] && Record['StreetDirection'].trim() != '')
                street += Record['StreetDirection'].trim() + " ";
            if(Record['StreetDirPrefix'] && Record['StreetDirPrefix'].trim() != '')
                street += Record['StreetDirPrefix'].trim() + " ";
            if (Record['StreetName'] && Record['StreetName'].trim() != '')
                street += Record['StreetName'].trim() + " ";
            if (Record['StreetSuffix'] && Record['StreetSuffix'].trim() != '')
                street += Record['StreetSuffix'].trim() + " ";
            if(Record['StreetDirSuffix'] && Record['StreetDirSuffix'].trim() != '')
                street += Record['StreetDirSuffix'].trim();
            if(Record['UnitNo_2'] && Record['UnitNo_2'] > 0)
                street += "Unit " + Record['UnitNo_2'].trim() + " ";
        }
        //console.log(street);
        street=street.toLocaleLowerCase()
        //street = ucwords(street.toLowerCase());
        rsAttr['Street'] = street.replace(", ", "");
        //console.log(rsAttr);
    }
    var ads = '';
    /*if (Record['UnitNo'] && Record['UnitNo'].trim() != '') {
        ads += Record['UnitNo'].trim();
    }*/
    if (Record['StreetNumber'] && Record['StreetNumber'].trim() != '')
        ads += Record['StreetNumber'].trim() + " ";
    if (Record['StreetDirection'] && Record['StreetDirection'].trim() != '')
        ads += Record['StreetDirection'].trim() + " ";
    if(Record['StreetDirPrefix'] && Record['StreetDirPrefix'].trim() != '')
        ads += Record['StreetDirPrefix'].trim() + " ";
    if (Record['StreetName'] && Record['StreetName'].trim() != '')
        ads += Record['StreetName'].trim() + " ";
    if (Record['StreetSuffix'] && Record['StreetSuffix'].trim() != '')
        ads += Record['StreetSuffix'].trim() + " ";
    if(Record['StreetDirSuffix'] && Record['StreetDirSuffix'].trim() != '')
        ads += Record['StreetDirSuffix'].trim() + " ";
    if(Record['UnitNo_2'] && Record['UnitNo_2'] > 0)
        ads += "Unit " + Record['UnitNo_2'].trim() + " ";
    //console.log(ads.toLowerCase().trim());
    ads=ads.toLowerCase().trim();
    /* ads=capitalizeFirstLetter(ads).trim() */
    //ads = ucwords(ads.toLowerCase().trim());
    rsAttr['AddressSort'] = ads;
    rsAttr['AddressFull'] = (street != '') ? street : ads;
    if (Record['MLSP_ID'] != bridge_id && (Record['CityName'] && Record['CityName'].trim() != ''))
        rsAttr['AddressFull'] += Record['CityName'] + ", ";
    rsAttr['AddressFull'] = rsAttr['AddressFull'].toLowerCase();
    if(Record['MLSP_ID'] != bridge_id && Record['State'] && Record['State'].trim() != '')
        rsAttr['AddressFull'] += Record['State'].trim();
    if (Record['MLSP_ID'] != bridge_id && Record['ZipCode'] && Record['ZipCode'].trim() != '')
        rsAttr['AddressFull'] += " " + Record['ZipCode'].trim();
    //rsAttr['AddressSmall'] = street;
    if(Record['DisplayAddress'] && Record['DisplayAddress'] == 'Y') {
        rsAttr['AddressSmall'] = street;
    } else {
        rsAttr['AddressSmall'] = rsAttr['AddressFull'];
    }
    //console.log(rsAttr);
    rsAttr['AddressSmall'] = (street != '') ? street : ads;
    /* Search Friend Url */
    var urlPrefix = '';
    if (/*Record['MLSP_ID'] != bridge_id &&*/ Record['CityName'] && Record['CityName'].trim() != '')
        urlPrefix += Record['CityName'].trim() + " ";
    urlPrefix += DETAIL_URLPREFIX;
    urlPrefix = buildSefString(urlPrefix.trim());
    rsAttr['SFUrl'] = rsAttr['AddressFull'];
    //console.log(rsAttr['SFUrl']);
    rsAttr['SFUrl'] += " MLS ";
    if(Record['MLS_NUM'] && Record['MLSP_ID'])
        rsAttr['SFUrl'] += Record['MLS_NUM'] + "-" + Record['MLSP_ID'];
  
    //console.log(Record['MLSP_ID']);
    rsAttr['SFUrl'] = urlPrefix + "/" +buildSefString(rsAttr['SFUrl'].trim());
    
    rsAttr['Price_Diff_Amount'] = (Record['Old_Price'] > 0 ? Record['Old_Price'] - Record['ListPrice'] : 0);
    rsAttr['AddressSmall'] = rsAttr['AddressSmall'].replace('  ', ' ');
    // //console.log(rsAttr);return;
    //console.log(rsAttr);
    return rsAttr;
}
export default GenerateListingAttributes

