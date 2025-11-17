import React from 'react';
import {format} from '../constant';

function PropInfo_Feature({detailObj}) {
  return (
    <>
       <section itemScope="" itemType="http://schema.org/Property" id="pinfo"
                            className="box-white block prop_info">
                            <h3 itemProp="name" className="b-title"><strong>Property Information</strong></h3>
                            <div className="row">
                                <div className="col-sm-6 col-12" id="Property_Info">
                                    <div className="table-overflow">
                                        <table className="property_info">
                                            <tbody>
											{(detailObj !== false && detailObj !== null && typeof detailObj === 'object' && !("isoffmarket" in detailObj)) &&  
											   <tr itemScope="" itemType="http://schema.org/Property">
                                                    <th className="p-1 caption"><strong>MLS # </strong></th>
                                                    <td className="colon">:</td>
                                                    <td itemProp="number" className="p-1 value"><span>{ detailObj.MLS_NUM}</span></td>
                                                </tr>}
                                                <tr itemScope="" itemType="http://schema.org/Property">
                                                    <th className="p-1 caption"><strong>Community </strong></th>
                                                    <td className="colon">:</td>
                                                    <td itemProp="text" className="p-1 value"><span> {detailObj.Subdivision ?  detailObj.Subdivision :"N/A"}
                                                        </span>
                                                    </td>
                                                </tr>
												{(detailObj !== false && detailObj !== null && typeof detailObj === 'object' && !("isoffmarket" in detailObj)) &&  
												<tr itemScope="" itemType="http://schema.org/Property">
                                                    <th className="p-1 caption"><strong>Status </strong></th>
                                                    <td className="colon">:</td>
                                                    <td itemProp="text" className="p-1 value">{detailObj.ListingStatus==='ActiveUnderContract'?"Active Under Contract":detailObj.ListingStatus}</td>
                                                </tr>}
                                                <tr itemScope="" itemType="http://schema.org/Property">
                                                    <th className="p-1 caption"><strong>Total Acres </strong></th>
                                                    <td className="colon">:</td>
                                                    <td itemProp="number" className="p-1 value"> {detailObj.Acreage ? detailObj.Acreage : "N/A"}</td>
                                                </tr>
                                                <tr itemScope="" itemType="http://schema.org/Property">
                                                    <th className="p-1 caption"><strong>Address </strong></th>
                                                    <td className="colon">:</td>
                                                    <td itemProp="place" className="p-1 value">{(detailObj.StreetNumber !=undefined && detailObj.DisplayAddress == "Y") ? detailObj.StreetNumber +""+ (detailObj.StreetName): "N/A"}  </td>
                                                </tr>
                                                <tr itemScope="" itemType="http://schema.org/Property">
                                                    <th className="p-1 caption"><strong>City </strong></th>
                                                    <td className="colon">:</td>
                                                    <td itemProp="text" className="p-1 value">{detailObj.CityName}</td>
                                                </tr>
												
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-12" id="Property_Info">
                                    <div className="table-overflow">
                                        <table className="property_info">
                                            <tbody>
                                                <tr itemScope="" itemType="http://schema.org/Property">
                                                    <th className="p-1 caption"><strong>Price </strong></th>
                                                    <td className="colon">:</td>
                                                    <td itemProp="price" className="p-1 value">$&nbsp;{format(detailObj.ListPrice)}</td>
                                                </tr>
                                                <tr itemScope="" itemType="http://schema.org/Property">
                                                    <th className="p-1 caption"><strong>Property Type </strong></th>
                                                    <td className="colon">:</td>
                                                    <td itemProp="text" className="p-1 value">{detailObj.PropertyType}</td>
                                                </tr>
                                                <tr itemScope="" itemType="http://schema.org/Property">
                                                    <th className="p-1 caption"><strong>Built In </strong></th>
                                                    <td className="colon">:</td>
                                                    <td itemProp="year" className="p-1 value">{(detailObj.YearBuilt && detailObj.YearBuilt != '') ? detailObj.YearBuilt:"N/A"}</td>
                                                   
                                                </tr>
                                                <tr itemScope="" itemType="https://schema.org/PostalAddress">
                                                    <th className="p-1 caption"><strong>Postal Code </strong></th>
                                                    <td className="colon">:</td>
                                                    <td itemProp="PostalAddress" className="p-1 value">{detailObj.ZipCode}</td>
                                                </tr>
                                                <tr itemScope="" itemType="http://schema.org/Property">
                                                    <th className="p-1 caption"><strong>County </strong></th>
                                                    <td className="colon">:</td>
                                                    <td itemProp="text" className="p-1 value">{detailObj.County ? detailObj.County:"N/A"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
       </section>

                        
		<section itemScope itemType="http://schema.org/Property" id="pinfo" className="box-white block">
			<h3 className="b-title"><strong>Property Features</strong></h3>
			<div className="row property_feature">
				{(detailObj.SQFT > 0) ?
					<div className="col-12 col-lg-6 p_col">
						<div className="row p-2 p_caption">
							<div className="col-4  p-1"><strong>SQFT</strong></div>
							<div className="col-8 p-1">{format(detailObj.SQFT)}</div>
						</div>
					</div>:null}
				
				{(detailObj.SubType ) ?
					<div className="col-12 col-lg-6 p_col">
						<div className="row p-2 p_caption">
							<div className="col-4  p-1"> <strong>Sub Type</strong></div>
							<div className="col-8 p-1">{detailObj.SubType}</div>
						</div>
					</div>:null}
				
				{(detailObj.PropertyStyle ) ?
					<div className="col-12 col-lg-6 p_col">
						<div className="row p-2 p_caption">
							<div className="col-4  p-1"> <strong>Architecture </strong></div>
							<div className="col-8 p-1">{detailObj.PropertyStyle}</div>
						</div>
					</div>:null}
				
				{(detailObj.Stories > 0) ?
					<div className="col-12 col-lg-6 p_col">
						<div className="row p-2 p_caption">
							<div className="col-4  p-1"><strong>Stories </strong></div>
							<div className="col-8 p-1">{parseInt(detailObj.Stories)}</div>
						</div>
					</div>:null}
				

				{(detailObj.Acreage ) ?
					<div className="col-12 col-lg-6 p_col">
						<div className="row p-2 p_caption">
							<div className="col-4  p-1"><strong>Acreage </strong></div>
							<div className="col-8 p-1">{detailObj.Acreage}</div>
						</div>
					</div>:null}
				
				{(detailObj.YearBuiltDescription) ?
				<div className="col-12 col-lg-6 p_col">
					<div className="row p-2 p_caption">
						<div className="col-4  p-1"><strong>YearBuilt Description </strong></div>
						<div className="col-8 p-1">{detailObj.YearBuiltDescription}</div>
					</div>
					</div>:null}
					
					{(detailObj.Amenities && detailObj.Amenities !=undefined) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Amenities </strong></div>
								<div className="col-8 p-1">{detailObj.Amenities.replaceAll(',',', ')}</div>
							</div>
						</div>:null}
					
					{(detailObj.Appliances && detailObj.Appliances !=undefined) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Appliances </strong></div>
								<div className="col-8 p-1">{detailObj.Appliances.replaceAll(',',' ')}</div>
							</div>
						</div>:null}
					
					{(detailObj.Beds > 0) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Bedrooms  </strong></div>
								<div className="col-8 p-1">{detailObj.Beds}</div>
							</div>
						</div>:null}
					
					{(detailObj.BedDescription ) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Bedroom Description </strong></div>
								<div className="col-8 p-1">{detailObj.BedDescription}</div>
							</div>
						</div>:null}
					
					{(detailObj.Baths > 0) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Bathrooms </strong></div>
								<div className="col-8 p-1">{(detailObj.Baths)+".00"}</div>
							</div>
						</div>:null}
					
					{(detailObj.Garage > 0) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Garage </strong></div>
								<div className="col-8 p-1">{detailObj.Garage}</div>
							</div>
						</div>:null}
					
					{(detailObj.GarageDescription ) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Garage Description </strong></div>
								<div className="col-8 p-1">{detailObj.GarageDescription}</div>
							</div>
						</div>:null}
					
					{(detailObj.LotDescription ) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Lot </strong></div>
								<div className="col-8 p-1">{detailObj.LotDescription}</div>
							</div>
						</div>:null}
					
					{(detailObj.LotSize) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Lot Size </strong></div>
								<div className="col-8 p-1">{detailObj.LotSize}</div>
							</div>
						</div>:null}
					
					{(detailObj.Construction) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Construction </strong></div>
								<div className="col-8 p-1">{detailObj.Construction}</div>
							</div>
						</div>:null}
					
					{(detailObj.Cooling)?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Cooling </strong></div>
								<div className="col-8 p-1">{detailObj.Cooling}</div>
							</div>
						</div>:null}
					
					{(detailObj.Dining) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Dining </strong></div>
								<div className="col-8 p-1">{detailObj.Dining}</div>
							</div>
						</div>:null}
					
					{(detailObj.DiningRm_Area) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Dining Room Area </strong></div>
								<div className="col-8 p-1">{detailObj.DiningRm_Area}</div>
							</div>
						</div>:null}
					
					{(detailObj.Den_Area) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Den Area </strong></div>
								<div className="col-8 p-1">{detailObj.Den_Area}</div>
							</div>
						</div>:null}
					
					{(detailObj.DrivingDirections) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Driving Directions </strong></div>
								<div className="col-8 p-1">{detailObj.DrivingDirections}</div>
							</div>
						</div>:null}
					
					{(detailObj.ExteriorFeatures && detailObj.ExteriorFeatures !=undefined) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Exterior </strong></div>
								<div className="col-8 p-1">{detailObj.ExteriorFeatures.replaceAll(',',', ')}</div>
							</div>
						</div>:null}
					
					{(detailObj.InteriorFeatures && detailObj.InteriorFeatures !=undefined) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Interior </strong></div>
								<div className="col-8 p-1">{detailObj.InteriorFeatures.replaceAll(',',', ')}</div>
								
							</div>
						</div>:null}
					
					{(detailObj.ParkingFeatures  && detailObj.ParkingFeatures !=undefined) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Parking </strong></div>
								<div className="col-8 p-1">{detailObj.ParkingFeatures.replaceAll(',',', ')}</div>
							</div>
						</div>:null}
					
					{(detailObj.Flooring) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Flooring </strong></div>
								<div className="col-8 p-1">{detailObj.Flooring}</div>
							</div>
						</div>:null}
					
					{(detailObj.Heating) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Heating </strong></div>
								<div className="col-8 p-1">{detailObj.Heating}</div>
							</div>
						</div>:null}
					
					{(detailObj.Is_REO == 'Yes') ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Foreclosure </strong></div>
								<div className="col-8 p-1">{detailObj.Is_REO}</div>
							</div>
						</div>:null}
					
					{(detailObj.Gas) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Gas </strong></div>
								<div className="col-8 p-1">{detailObj.Gas}</div>
							</div>
						</div>:null}
					
					{(detailObj.GrossOperatingIncome) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Gross Operating Income </strong></div>
								<div className="col-8 p-1">{`${">"}`}{detailObj.GrossOperatingIncome}</div>
							</div>
						</div>:null}
					
					{(detailObj.Is_Pool == 'Yes' && detailObj.PoolDesc !=undefined && detailObj.PoolDesc) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Pool </strong></div>
								<div className="col-8 p-1">{detailObj.PoolDesc.replaceAll(',',', ')}</div>
							</div>
						</div>:null}
					
					{(detailObj !== false && detailObj !== null && typeof detailObj === 'object' && !("isoffmarket" in detailObj) &&  detailObj.HOAFee && detailObj.HOAFrequency) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>HOA Fee / Frequency </strong></div>
								<div className="col-8 p-1">${(format(detailObj.HOAFee)+"/"+detailObj.HOAFrequency)}</div>
							</div>
						</div>:
					(detailObj.HOAFee)?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>HOA Fee </strong></div>
								<div className="col-8 p-1">{`${">"}`} ${format(detailObj.HOAFee)}</div>
							</div>
						</div>:null}
						
					
					{(detailObj.Water ) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Water </strong></div>
								<div className="col-8 p-1">{detailObj.Water}</div>
							</div>
						</div>:null}
					
					{(detailObj.Is_Waterfront == '1') ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Waterfront </strong></div>
								<div className="col-8 p-1">{detailObj.WaterfrontDesc}</div>
							</div>
						</div>:null}
					
					{(detailObj.Frontage > 0) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Frontage </strong></div>
								<div className="col-8 p-1">{detailObj.Frontage}</div>
							</div>
						</div>:null}
					
					{(detailObj.Legal) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Legal </strong></div>
								<div className="col-8 p-1">{detailObj.Legal}</div>
							</div>
						</div>:null}
					
					{(detailObj.Miscellaneous) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Miscellaneous </strong></div>
								<div className="col-8 p-1">{detailObj.Miscellaneous}</div>
							</div>
						</div>:null}
					
					{(detailObj.NetOperatingIncome)?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Net Operating Income </strong></div>
								<div className="col-8 p-1">{detailObj.NetOperatingIncome}</div>
							</div>
						</div>:null}
					
					{(detailObj.PetsAllowed) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong itemProp="text">Pets Allowed </strong></div>
								<div className="col-8 p-1">{detailObj.PetsAllowed}</div>
							</div>
						</div>:null}
					
					{(detailObj.PetRestrictions) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Pet Restrictions </strong></div>
								<div className="col-8 p-1">{`${">"}`}{detailObj.PetRestrictions}</div>
							</div>
						</div>:null}
					
					{(detailObj.Roof) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Roof </strong></div>
								<div className="col-8 p-1">{detailObj.Roof}</div>
							</div>
						</div>:null}
					
					{(detailObj.TotalRooms > 0) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Total Rooms </strong></div>
								<div className="col-8 p-1">{detailObj.TotalRooms}</div>
							</div>
						</div>:null}
					
					{(detailObj.Rooms ) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Rooms </strong></div>
								<div className="col-8 p-1">{detailObj.Rooms}</div>
							</div>
						</div>:null}
					
					{(detailObj.Area) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Area </strong></div>
								<div className="col-8 p-1">{detailObj.Area}</div>{/* //need to check //detailObj.Area|lower|ucwords */}
							</div>
						</div>:null}
					
					{(detailObj.TotalFloor) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Total Floor </strong></div>
								<div className="col-8 p-1">{detailObj.TotalFloor }</div>
							</div>
						</div>:null}
					
					{(detailObj.Sewer) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Sewer </strong></div>
								<div className="col-8 p-1">{detailObj.Sewer}</div>
							</div>
						</div>:null}
					
					{(detailObj.SpaYN =='Yes') ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Spa </strong></div>
								<div className="col-8 p-1">{detailObj.SpaYN}</div>
							</div>
						</div>:null}
					
					{(detailObj.Elementary_School) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Elementary School </strong></div>
								<div className="col-8 p-1">{detailObj.Elementary_School}</div>{/* //need to check //detailObj.Elementary_School|lower|ucwords */}
							</div>
						</div>:null}
					
					{(detailObj.Middle_School) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Middle School </strong></div>
								<div className="col-8 p-1">{detailObj.Middle_School}</div>{/* //need to check //detailObj.Elementary_School|lower|ucwords */}
							</div>
						</div>:null}
					
					{(detailObj.High_School) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>High School </strong></div>
								<div className="col-8 p-1">{detailObj.High_School}</div>{/* //need to check //detailObj.Elementary_School|lower|ucwords */}
							</div>
						</div>:null}
					
					{(detailObj !== false && detailObj !== null && typeof detailObj === 'object' && !("isoffmarket" in detailObj) && detailObj.Tax) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Gross taxes </strong></div>
								<div className="col-8 p-1">{detailObj.Tax}</div>
							</div>
						</div>:null}
					
					{(detailObj.TaxYear) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Tax Year </strong></div>
								<div className="col-8 p-1">{detailObj.TaxYear}</div>
							</div>
						</div>:null}
					
					{(detailObj.View  && detailObj.View !=undefined) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>View </strong></div>
								<div className="col-8 p-1">{detailObj.View.replaceAll(',',', ')}</div>
							</div>
						</div>:null}
					
					{(detailObj.Water) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Water </strong></div>
								<div className="col-8 p-1">{detailObj.Water}</div>
							</div>
						</div>:null}
					
					{(detailObj.SecuritySafety  && detailObj.SecuritySafety !=undefined) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Security & Safety </strong></div>
								<div className="col-8 p-1">{detailObj.SecuritySafety.replaceAll(',',', ')}</div>
							</div>
						</div>:null}
					
					{(detailObj.Zoning ) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Zoning </strong></div>
								<div className="col-8 p-1">{detailObj.Zoning}</div>
							</div>
						</div>:null}
					
					{(detailObj.Specials ) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Specials </strong></div>
								<div className="col-8  p-1">{detailObj.Specials}</div>
							</div>
						</div>:null}
					
					{(detailObj.Utilities =='Yes') ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Utility Room Area </strong></div>
								<div className="col-8 p-1">{detailObj.UtilityRm_Area}</div>
							</div>
						</div>:null}
					
					{(detailObj.Is_ShortSale == 'Yes') ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Short Sale </strong></div>
								<div className="col-8 p-1">{detailObj.Is_ShortSale}</div>
							</div>
						</div>:null}
					
					{(detailObj.OriginalListPrice > 0) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Original List Price </strong></div>
								<div className="col-8 p-1">${format(detailObj.OriginalListPrice)}</div>
							</div>
						</div>:null}
					
					{(detailObj.Price_Diff > 0 || detailObj.Price_Diff < 0) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Price Change </strong></div>
								<div className="col-8 p-1">{detailObj.Price_Diff +"%"} </div>
							</div>
						</div>:null}
					
					{(detailObj.Levels) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Levels </strong></div>
								<div className="col-8 p-1">{detailObj.Levels}</div>
							</div>
						</div>:null}
					
					{(detailObj.Basement) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Basement </strong></div>
								<div className="col-8 p-1">{detailObj.Basement}</div>
							</div>
						</div>:null}
					
					{(detailObj.Age) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Age </strong></div>
								<div className="col-8 p-1">{detailObj.Age}</div>
							</div>
						</div>:null}
					
					{(detailObj.Buildings > 0) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Buildings </strong></div>
								<div className="col-8 p-1">{detailObj.Buildings}</div>
							</div>
						</div>:null}
					
					{(detailObj.LotDimensions) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Lot Dimensions </strong></div>
								<div className="col-8 p-1">{detailObj.LotDimensions}</div>
							</div>
						</div>:null}
					
					{(detailObj.TotalUnits > 0) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Total Units </strong></div>
								<div className="col-8 p-1">{detailObj.TotalUnits}</div>
							</div>
						</div>:null}
					
					{(detailObj.Folio) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Folio# </strong></div>
								<div className="col-8 p-1">{detailObj.Folio}</div>
							</div>
						</div>:null}
					
					{(detailObj.Design) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Design </strong></div>
								<div className="col-8 p-1">{detailObj.Design}</div>
							</div>
						</div>:null}
					

					{(detailObj.DesignDescription && detailObj.DesignDescription != '') ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Design Description </strong></div>
								<div className="col-8 p-1">{detailObj.DesignDescription}</div>
							</div>
						</div>:null}
					
					{(detailObj.SubdivisionInfo) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Subdivision Info </strong></div>
								<div className="col-8 p-1">{detailObj.SubdivisionInfo}</div>
							</div>
						</div>:null}
					

					{(detailObj.DevelopmentName) ?
						<div className="col-12 col-lg-6 p_col">
							<div className="row p-2 p_caption">
								<div className="col-4  p-1"><strong>Development Name </strong></div>
								<div className="col-8 p-1">{detailObj.DevelopmentName}</div>
							</div>
						</div>:null}
					
				</div>
		</section>
                      {/*   <section itemScope="" itemType="http://schema.org/Property" id="pinfo"
                            className="box-white block prop_feat">
                            <h3 className="b-title"><strong>Property Features</strong></h3>
                            <div className="row property_feature">
                            {(detailObj.SQFT >0) ?  <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>SQFT</strong></div>
                                        <div className="col-8 p-1">{format(detailObj.SQFT)}</div>
                                    </div>
                                </div>:null}
                                {(detailObj.SubType && detailObj.SubType != '')?<div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"> <strong>Sub Type</strong></div>
                                        <div className="col-8 p-1">{detailObj.SubType}</div>
                                    </div>
                                </div>:null}
                                {(detailObj.Stories > 0) ?  <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Stories </strong></div>
                                        <div className="col-8 p-1">{detailObj.Stories}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Amenities ?<div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"> <strong>Amenities</strong></div>
                                        <div className="col-8 p-1">{detailObj.Amenities}</div>
                                    </div>
                                </div>:null}
                                {(detailObj.PropertyStyle && detailObj.PropertyStyle != '')? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"> <strong>Architecture</strong></div>
                                        <div className="col-8 p-1">{detailObj.PropertyStyle}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Appliances ?<div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"> <strong>Appliances </strong></div>
                                        <div className="col-8 p-1">{detailObj.Appliances}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Beds ?<div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Bedrooms</strong></div>
                                        <div className="col-8 p-1">{detailObj.Beds}</div>
                                    </div>
                                </div>:null}
                                {detailObj.BedDescription ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Bedroom Description </strong></div>
                                        <div className="col-8 p-1">{detailObj.BedDescription}</div>
                                    </div>
                                </div>:null}
                                <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Bathrooms </strong></div>
                                        <div className="col-8 p-1">{detailObj.Baths+".00"}</div>
                                    </div>
                                </div>
                                {detailObj.Garage ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Garage </strong></div>
                                        <div className="col-8 p-1">{detailObj.Garage}</div>
                                    </div>
                                </div>:null}
                                {detailObj.LotDescription ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Lot </strong></div>
                                        <div className="col-8 p-1">{detailObj.LotDescription}</div>
                                    </div>
                                </div>:null}
                                {detailObj.LotSize ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Lot Size </strong></div>
                                        <div className="col-8 p-1">{detailObj.LotSize}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Construction ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Construction </strong></div>
                                        <div className="col-8 p-1">{detailObj.Construction}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Cooling ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Cooling </strong></div>
                                        <div className="col-8 p-1">{detailObj.Cooling}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Dining ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Dining </strong></div>
                                        <div className="col-8 p-1">{detailObj.Dining}</div>
                                    </div>
                                </div>:null}
                                {detailObj.DrivingDirections ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Driving Directions </strong></div>
                                        <div className="col-8 p-1">{detailObj.DrivingDirections}</div>
                                    </div>
                                </div>:null}
                                {detailObj.ExteriorFeatures ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Exterior </strong></div>
                                        <div className="col-8 p-1">{detailObj.ExteriorFeatures}</div>
                                    </div>
                                </div>:null}
                                {detailObj.InteriorFeatures ?<div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Interior </strong></div>
                                        <div className="col-8 p-1">{IF}</div>
                                    </div>
                                </div>:null}
                                {detailObj.ParkingFeatures ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Parking </strong></div>
                                        <div className="col-8 p-1">{detailObj.ParkingFeatures}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Flooring ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Flooring </strong></div>
                                        <div className="col-8 p-1">{detailObj.Flooring}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Heating ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Heating </strong></div>
                                        <div className="col-8 p-1">{detailObj.Heating}</div>
                                    </div>
                                </div>:null}
                                {(detailObj.PoolDesc  && detailObj.Is_Pool === "Yes")? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Pool </strong></div>
                                        <div className="col-8 p-1">{detailObj.PoolDesc}</div>
                                    </div>
                                </div>:null}
                                {(detailObj.HOAFee && detailObj.HOAFrequency) ?<div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>HOA Fee / Frequency </strong></div>
                                        <div className="col-8 p-1">{(formatter.format(detailObj.HOAFee)+"/"+detailObj.HOAFrequency)}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Water ?<div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Water </strong></div>
                                        <div className="col-8 p-1">{detailObj.Water}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Legal ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Legal </strong></div>
                                        <div className="col-8 p-1">{detailObj.Legal}</div>
                                    </div>
                                </div>:null}
                                {detailObj.PetsAllowed ?<div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong itemProp="text">Pets Allowed </strong></div>
                                        <div className="col-8 p-1">{detailObj.PetsAllowed}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Roof ?<div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Roof </strong></div>
                                        <div className="col-8 p-1">{detailObj.Roof}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Rooms ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Rooms </strong></div>
                                        <div className="col-8 p-1">{detailObj.Rooms}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Area ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Area </strong></div>
                                        <div className="col-8 p-1">{detailObj.Area}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Sewer ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Sewer </strong></div>
                                        <div className="col-8 p-1">{detailObj.Sewer}</div>
                                    </div>
                                </div>:null}
                                {detailObj.SpaYN == "Yes" ?<div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Spa  </strong></div>
                                        <div className="col-8 p-1">{detailObj.SpaYN}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Tax ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Gross taxes </strong></div>
                                        <div className="col-8 p-1">{detailObj.Tax}</div>
                                    </div>
                                </div>:null}
                                {detailObj.View ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>View </strong></div>
                                        <div className="col-8 p-1">{detailObj.View}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Water ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Water </strong></div>
                                        <div className="col-8 p-1">{detailObj.Water}</div>
                                    </div>
                                </div>:null}
                                {detailObj.SecuritySafety ?<div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Security &amp; Safety </strong></div>
                                        <div className="col-8 p-1">{detailObj.SecuritySafety}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Specials ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Specials </strong></div>
                                        <div className="col-8 p-1">{detailObj.Specials}</div>
                                    </div>
                                </div>:null}
                               
                                {detailObj.OriginalListPrice ? <div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Original List Price </strong></div>
                                        <div className="col-8 p-1">{formatter.format(detailObj.OriginalListPrice)}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Zoning ?<div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Zoning  </strong></div>
                                        <div className="col-8  p-1">{detailObj.Zoning}</div>
                                    </div>
                                </div>:null}
                                {detailObj.Price_Diff ?<div className="col-12 col-lg-6 p_col">
                                    <div className="row p-2 p_caption">
                                        <div className="col-4  p-1"><strong>Price Change </strong></div>
                                        <div className="col-8 p-1">{detailObj.Price_Diff+"%"}</div>
                                    </div>
                                </div>:null}
                            </div>
                        </section> */}


    </>
  )
}

export default PropInfo_Feature
