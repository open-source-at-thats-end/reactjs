 import { DETAIL_URLPREFIX } from "../constant";
 function generateListingAttributes(Record, arrMetaData='')
{

    if(!Record)
        return;

        if (!Record)
        return;
    var rsAttr = {};
    var bridge_id = 4;
    rsAttr['Street'] = '';
    rsAttr['AddressFull'] = '';
    rsAttr['AddressSmall'] = '';
    rsAttr['AddressSort'] = '';
    rsAttr['SFUrl'] = '';
    var street = '';
    
    var type = (Record['Category'] && Record['Category'] == 'For Lease') ? 'Rent' : 'Sale';


    if (Record['DisplayAddress'] !== undefined && Record['DisplayAddress'] === 'Y') {

        if (('Address' in Record) && Record['Address'] !== undefined && Record['Address'].trim() !== '') {
            street = Record['Address'].trim() + " ";
        } else {
            if (Record['UnitNo'] !== undefined && Record['UnitNo'].trim() !== '') {
                street += Record['UnitNo'].trim().replace("#", "") + " ";
            }
            if (Record['StreetNumber'] !== undefined && Record['StreetNumber'].trim() !== '') {
                street += Record['StreetNumber'].trim() + " ";
            }
            if (Record['StreetDirection'] !== undefined && Record['StreetDirection'].trim() !== '') {
                street += Record['StreetDirection'].trim() + " ";
            }
            if (Record['StreetDirPrefix'] !== undefined && Record['StreetDirPrefix'].trim() !== '') {
                street += Record['StreetDirPrefix'].trim() + " ";
            }
            if (Record['StreetName'] !== undefined && Record['StreetName'].trim() !== '') {
                street += Record['StreetName'].trim() + " ";
            }
            if (Record['StreetSuffix'] !== undefined && Record['StreetSuffix'].trim() !== '') {
                street += Record['StreetSuffix'].trim() + " ";
            }
            if (Record['StreetDirSuffix'] !== undefined && Record['StreetDirSuffix'].trim() !== '') {
                street += Record['StreetDirSuffix'].trim();
            }
            if (Record['UnitNo_2'] !== undefined && Record['UnitNo_2'] > 0) {
                street += "Unit " + Record['UnitNo_2'].trim();
            }

        }
        let street = street.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        rsAttr['Street'] = street.replace(", ", "");
    }

    let ads = '';

        if (Record['StreetNumber'] !== undefined && Record['StreetNumber'].trim() !== '') {
            ads += Record['StreetNumber'].trim() + " ";
        }
        if (Record['StreetDirection'] !== undefined && Record['StreetDirection'].trim() !== '') {
            ads += Record['StreetDirection'].trim() + " ";
        }
        if (Record['StreetDirPrefix'] !== undefined && Record['StreetDirPrefix'].trim() !== '') {
            ads += Record['StreetDirPrefix'].trim() + " ";
        }
        if (Record['StreetName'] !== undefined && Record['StreetName'].trim() !== '') {
            ads += Record['StreetName'] + " ";
        }
        if (Record['StreetSuffix'] !== undefined && Record['StreetSuffix'].trim() !== '') {
            ads += Record['StreetSuffix'].trim() + " ";
        }
        if (Record['StreetDirSuffix'] !== undefined && Record['StreetDirSuffix'].trim() !== '') {
            ads += Record['StreetDirSuffix'].trim() + " ";
        }
        if (Record['UnitNo_2'] !== undefined && Record['UnitNo_2'] > 0) {
            ads += "Unit " + Record['UnitNo_2'].trim() + " ";
        }
        ads = ads.toLowerCase().trim().split(' ').map(function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
        rsAttr['AddressSort'] = ads;
        rsAttr['AddressFull'] = (street !== '') ? street : ads;

        if (Record['MLSP_ID'] !== bridge_id && (Record['CityName'] !== undefined && Record['CityName'].trim() !== '')) {
            rsAttr['AddressFull'] += Record['CityName'] + ", ";
        }
        rsAttr['AddressFull'] = rsAttr['AddressFull'].toLowerCase().split(' ').map(function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
        if (Record['MLSP_ID'] !== bridge_id && Record['State'] !== undefined && Record['State'].trim() !== '') {
            rsAttr['AddressFull'] += Record['State'].trim();
        }
        if (Record['MLSP_ID'] !== bridge_id && Record['ZipCode'] !== undefined && Record['ZipCode'].trim() !== '') {
            rsAttr['AddressFull'] += " " + Record['ZipCode'].trim();
        }

        if((Record['DisplayAddress']) && Record['DisplayAddress'] == 'Y')
        {
            rsAttr['AddressSmall'] = street;
        }
        else
        {
            rsAttr['AddressSmall'] = rsAttr['AddressFull'];
        }

        rsAttr['AddressSmall'] = (street != '')? street : ads;

          let urlPrefix = '';
          
          function buildSefString(str) {
            str = str.replace("'", "-"); //replace ' with -
            str = str.replace('"', "-"); //replace " with -
            str = str.replace(/[^a-zA-Z0-9_-~]/g, "-"); //convert non alphanumeric and non - _ to -
            str = str.replace(/-+/g, "-"); //convert multiple dashes to a single dash
            str = str.replace(/ +/g, " "); //convert multiple spaces to a single space
            str = str.toLowerCase();
            return str;
          }
          
          if (Record['CityName'] && (Record['CityName']).trim() != '' )
              urlPrefix += (Record['CityName']).trim()+" ";
  
          urlPrefix += DETAIL_URLPREFIX;
  
          urlPrefix = buildSefString(urlPrefix.trim());
  
          rsAttr['SFUrl'] = rsAttr['AddressFull'];
  
          rsAttr['SFUrl'] += " MLS ";

          if(Record['MLS_NUM'] && Record['MLSP_ID'])
          rsAttr['SFUrl'] += Record['MLS_NUM']+"-"+Record['MLSP_ID'];

      rsAttr['SFUrl'] = urlPrefix+ "/"+ buildSefString(rsAttr['SFUrl'].trim());

      rsAttr['Price_Diff_Amount'] = (Record['Old_Price'] > 0 ? Record['Old_Price'] - Record['ListPrice'] : 0);
      rsAttr['AddressSmall'] = rsAttr['AddressSmall'].replace('  ', ' ');
    
   
     return rsAttr;
}
export default generateListingAttributes;