import React from 'react';
import { format, site_currency } from '../constant'

function Zestimate({Objzestmate,arrZestax}) {
  return (
    <div>
     
   
    { (Objzestmate.bundle && (Objzestmate.bundle.length > 0) && Objzestmate.bundle[0].zestimate && Objzestmate.bundle[0].zestimate != '') && 
    <>
     <span id="home-valuation"></span>
    <section id="pfeatures" className="box-white block">
        <h3 className="b-title"><strong>Zestimate<sup>®</sup>&nbsp;home valuation: </strong></h3>
        <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <table className="w-100">
                <tbody>
                    <tr itemScope itemType="http://schema.org/Organization">
                        <td className="p-1 text-sm-right"><strong itemProp="brand">Zestimate<sup>®</sup> :</strong></td>
                        <td className="p-1"><span itemProp="price">{site_currency} {format(Objzestmate.bundle[0].zestimate)}</span>
                        <img itemProp="image" src="http://www.zillow.com/widgets/GetVersionedResource.htm?path=/static/logos/Zillowlogo_200x50.gif" alt="Zillow demo site Search" width="100" height="25"/></td>
                    </tr>
                   {/* <tr itemScope itemType="http://schema.org/Organization">
                        <td className="p-1 text-success text-sm-right"><strong>Estimated sales range : </strong></td>
                        <td className="p-1 text-success"><strong itemProp="price">{site_currency}{Utility::obj()->PriceFormat(zestimateLower)} - {site_currency}{Utility::obj()->PriceFormat(zestimateUpper)}</strong></td>
                    </tr> */}
                </tbody>
                </table>
                <br/>
                <h3 className="b-title"><strong>Tax history</strong></h3>
                <table className="w-100">
                    <tbody>
                        <tr>
                        <th>Year</th>
                        <th>Property Taxes</th>
                        <th>Tax Assessment</th>
                        </tr>
                    </tbody>
                    <tbody>
                       
                            {(arrZestax.bundle && arrZestax.bundle.length > 0)  &&
                            arrZestax.bundle.map((item,i)=>{
                                return(
                                    <tr key={"zest"+i}>
                                    {(item.year != '' && item.year != null  && item.taxAmount != '' && item.taxAmount != null) &&
                            
                                    <>
                                    <td className="p-1" key={"zestptax"+item}>{item.year}</td>
                                    <td className="p-1">{site_currency}{item.taxAmount ? format(parseInt(item.taxAmount)) : 0} </td>
                                    {(item.totalValue != '' && item.totalValue != null) ?
                                        <td className="p-1" key={"zestaxass"+item}>{site_currency}{item.totalValue ? format(item.totalValue) : 0}</td>
                                    :
                                        <td className="p-1">--</td>}
                                    </>
                                    }
                                   </tr>
                                 )
                            })
                        }
                   </tbody>
                </table>
                <br/>

                <br/>
                <h3 className="b-title" ><strong>Rental value</strong></h3>
                <div itemScope itemType="http://schema.org/Organization" className="text-center">
                    <p><strong>Rent Zestimate<sup>®</sup></strong>
                    <img itemProp="image" src="http://www.zillow.com/widgets/GetVersionedResource.htm?path=/static/logos/Zillowlogo_200x50.gif" alt="Zillow demo site Search" width="100" height="25"/></p>
                    <h2><strong className="font-color-dark" itemProp="price">{site_currency}{Objzestmate.bundle[0].rentalZestimate ? format(Objzestmate.bundle[0].rentalZestimate):0 } /mo</strong></h2>
                </div>


                <br/>
                <div className="p-1" id="">
                    <a itemProp="url" href={Objzestmate.bundle[0].zillowUrl} target="_blank" title = "See more details" rel="nofollow"> See more details for on Zillow </a>
                </div>
                <div itemScope itemType="http://schema.org/Organization">
                    <small>
                        © Zillow, Inc., 2006-2018. Use
                        is subject to the Zillow    <a itemProp="url" href="https://www.zillow.com/corp/Terms.htm" title = "Terms of Use" rel="nofollow">Terms of Use</a>.
                    </small>
                </div>
            </div>
        </div>

    </section>
    </>
}
    </div>
  )
}

export default Zestimate
