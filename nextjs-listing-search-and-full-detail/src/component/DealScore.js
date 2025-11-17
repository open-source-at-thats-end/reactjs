import React,{useRef} from 'react'

function DealScore({obj,score}) {

  return (
    <>
				<figure itemScope="" itemType="http://schema.org/price" itemProp="PropertyScore" className="circle property_deal_score">
                    <span style={{fontSize: 20}}>
				{score}&nbsp; </span><p className="deal_score_header">Deal Score</p>
				</figure>
				<div id="dealscore">
					<p>
						<span>
						{score}&nbsp;
					</span>
						 DemoSite Property Deal Score indicates how competitive is a property positioned to attract viewers online in a common area on a scale of 0 to 100, where 100 is the most competitive. The Deal Score also incorporates;
					</p>
				</div>
				<div>
					<ul>
						<li>Home property information like square footage, location or the number of bathrooms.</li>
						<li>Current listing data such as listed price, description, comparable homes in the area and days on the market.</li>
						<li>Nearby sold properties market data from publicly and other available records.</li>
						<li>Seasonal demand and local market trends calculated over the last 2-4 months.
							<a target="_blank" href="/property-deal-score/"><span>More info</span></a>
						</li>
					</ul>
					*All calculations are estimates and provided for informational purposes only. Actual amounts may vary.
				</div>
			</>
  )
}

export default DealScore



