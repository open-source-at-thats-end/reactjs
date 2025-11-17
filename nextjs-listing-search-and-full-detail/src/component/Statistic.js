import React from 'react';
import Slider from "react-slick";
import { format } from '../constant';

function Statistic(arr) {
let Arr=arr.arr[0];
//console.log(Arr.statistics_ref_val);


    
    let statistics_median_list_price = 'N/A';
    var site_currency = '$';
    if(Arr.statistics_median_list_price !=  null && Arr.statistics_median_list_price !=  undefined){
        statistics_median_list_price = site_currency + format( Arr.statistics_median_list_price);
    }
    var statistic_avg_price_sqft = 'N/A';
    if(Arr.statistic_avg_price_sqft !== null){
        statistic_avg_price_sqft = site_currency + format(Arr.statistic_avg_price_sqft);
    }
    var statistics_median_sold_price = 'N/A';
    if(Arr.statistics_median_sold_price !== null){
        statistics_median_sold_price = site_currency + format(Arr.statistics_median_sold_price);
    }
    var statistic_avg_sold_price_sqft = 'N/A';
    if(Arr.statistic_avg_sold_price_sqft !== null){
        statistic_avg_sold_price_sqft =  site_currency + format(Arr.statistic_avg_sold_price_sqft);
    }
    var statistic_total_sold_listing = 'N/A';
    if(Arr.statistic_total_sold_listing !== null){
        statistic_total_sold_listing = format(Arr.statistic_total_sold_listing);
    }

    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <button
          {...props}
          className={
            "slick-prev slick-arrow" +
            (currentSlide === 0 ? " slick-disabled" : "")
          }
          aria-hidden="true"
          aria-disabled={currentSlide === 0 ? true : false}
          type="button"
        >
          Previous
        </button>
      );
      const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <button
          {...props}
          className={
            "slick-next slick-arrow" +
            (currentSlide === slideCount - 1 ? " slick-disabled" : "")
          }
          aria-hidden="true"
          aria-disabled={currentSlide === slideCount - 1 ? true : false}
          type="button"
        >
          Next
        </button>
      );
    var settings = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows:true,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                    currentslide:0,
                    slidecount:5
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    currentslide:0,
                    slidecount:5

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    currentslide:0,
                    slidecount:5

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    currentslide:0,
                    slidecount:5

                }
            },
            {
                breakpoint: 414,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    currentslide:0,
                    slidecount:5

                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    currentslide:0,
                    slidecount:5
                }
            }

        ]
    }
  return (
    <>
<div className ="text-center col-12">
    <div className="mb-2">
        <h2 className="m-0">{Arr.statistics_ref_val +" Market At-A-Glance"}</h2>
       {/*  <!--<small>Calculated using the last 6 month</small>--></div> */}
       <div>
        <ul className="m-trend">
            <li><span> Median List Price</span>
            <span> <strong>{statistics_median_list_price}</strong></span>
            </li>
            <li><span> Median List $/Sq Ft</span> 
            <span><strong>{ statistic_avg_price_sqft}</strong></span>
            </li>
            <li><span> Median Sale Price</span>
             <span> <strong>{statistics_median_sold_price}</strong></span>
             </li>
             <li><span> Median Sale $/Sq Ft</span>
             <span><strong>{statistic_avg_sold_price_sqft}</strong></span>
             </li>
             <li><span> Number of Homes Sold</span> 
             <span><strong>{statistic_total_sold_listing}</strong></span>
             </li>
        </ul>
      </div>
    </div>
    
</div>
<div className="row mx-0 slick-slider slick-initialized" id="cz-price">
<Slider {...settings}>  
        
        {(() => {
            let td = [];
            for (var i = 1; i <= 5; i++) {
            //console.log(Arr.statistic_avgprice_bed+i);
            //console.log(Arr['statistic_avgprice_bed'+i]);
            var statistics_avgprice_bed = 'N/A';
            if(Arr['statistic_avgprice_bed'+i] != null){
                statistics_avgprice_bed = site_currency + format(parseInt(Arr['statistic_avgprice_bed'+i]))
            }
            /* if(sold_home_url_json != '' && typeof(sold_home_url_json) != 'undefined'){
                if(typeof(sold_home_url_json[i]) != 'undefined' && sold_home_url_json[i] != ''){
                    var url = Main_Host_Url +"/"+ sold_home_url_json[i];
                }
                else{
                    var url = "#";
                }
            }
            else{
                var url = "#";
            } */
            var url = "#";
                td.push(
            
                <div className="price-card py-2 col-md-6- col-sm-12 col-12" key={"price-card"+i}>
                    <div className="card neighborhoodCard pt-2 pb-2">
                        <h6 className="pt-10 mb-0 f-c-primary"> {i} Bedroom Homes</h6>
                        <div className="mb-1">Average List Price</div>
                        <h6 className="pt-10 mb-0 mt-2 f-c-primary">{statistics_avgprice_bed}</h6>
                        <div>From {site_currency} {format(parseInt(Arr['statistic_minprice_bed'+i])) +' to '+ site_currency + format(parseInt(Arr['statistic_maxprice_bed'+i]))}</div>
                        <div><a href="'+url+'">Explore {format(parseInt(Arr['statistic_total_listing_bed'+i])) } Homes For Sale</a></div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                
                );
            }
            return td;
            })()}
  </Slider>  
</div>
</>
  )
}

export default Statistic
