import React,{useState,useEffect, useRef}  from 'react';
import {converter,format,PriceFormat} from '../../src/constant';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
const phpUnserialize = require('phpunserialize');
function MarketReport({detailObj,cityStcList,zipStcList}) {
    const [chartOptions, setChartOptions] = useState({
        title: {
            text: 'Median Home Prices',
            type:"chart",   
        },

       /*  yAxis: {
            title: {
                text: 'Values'
            },
            tickInterval: 50000,
        }, */

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                fillOpacity: 0.1,
                //pointStart: 2010
            }
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

});
    // If not required then remove this.
    const [chartOptionsCity, setCityChartOptions] = useState({
        title: {
            text: 'Median Home Prices',
            type:"chart"
        },

       /*  yAxis: {
            title: {
                text: 'Values'
            },
            tickInterval: 50000,
        }, */

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false,
                 },
                fillOpacity: 0.1,
                //pointStart: 2010
            }
        },

        
        
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

}); 
    const zipChart = useRef();
  
    ////console.log(zipStcList[0] != null && zipStcList[0]['statistics_monthly_list_price'] ? phpUnserialize(zipStcList[0]['statistics_monthly_list_price']):null);
   
    let citydata = {};
    let citysolddata={};
    
    let city_codedata=[];

useEffect(() => {
    if(zipStcList[0] && zipStcList[0] != null ){
        setZipData(zipStcList)
    }
 }, [zipStcList])  
// Once everything working good change the function name and its variable name, make it common
 const setZipData=(data)=>{
    var zipcodedata ={};
    let zipcodesolddata = {};
    let zip_codedata=[];

    if(data[0] != null && data[0]['statistics_monthly_list_price'] != null){
        zipcodedata = phpUnserialize(data[0]['statistics_monthly_list_price']);
    }
    if(data[0] != null && data[0]['statistics_monthly_sold_price'] != null) {
        zipcodesolddata = phpUnserialize(data[0]['statistics_monthly_sold_price']);
    }
    zip_codedata.push(zipcodedata,zipcodesolddata);
    let zipcodemth = Object.keys(zip_codedata[0]).reverse();
    let zipcode  =  Object.values(zip_codedata[0]).reverse();
    let zipcodesold = Object.values(zip_codedata[1]).reverse();

    var oldChartOpt = chartOptions;
    makeBlankDataToRedrawPoint()
    setTimeout(() => {
        const updatedChartOptions = UpdateChart(
            1,zipcodemth,zipcode,zipcodesold,"Median List price","Median Sold Price"
        )
        setChartOptions({...oldChartOpt, ...updatedChartOptions});
        //console.log(chartOptions);
    }, 50);
   
 }
 const makeBlankDataToRedrawPoint = (month) => {
    
    setChartOptions(oldOptions => ({
        ...oldOptions,
         ['series']:[]
    }))

    setCityChartOptions(oldOptions => ({
        ...oldOptions,
         ['series']:[]
    }))
 }


 // Not in use right now
 const setCityData=(data)=>{
    if(cityStcList[0]  && cityStcList[0]['statistics_monthly_list_price'] != null) {
        citydata = phpUnserialize(cityStcList[0]['statistics_monthly_list_price']);
    }
    if(cityStcList[0] && cityStcList[0]['statistics_monthly_sold_price'] != null) {
        citysolddata = phpUnserialize(cityStcList[0]['statistics_monthly_sold_price']);
    }

    city_codedata.push(citydata,citysolddata);
    let citymth = Object.keys(city_codedata[0]).reverse()
    let citydatas = Object.values(city_codedata[0]).reverse()
    let citysold  = Object.values(city_codedata[1]).reverse()

    const updatedCityChartOptions = UpdateChart(
        2,citymth,citydatas,citysold,"Median List price","Median Sold Price"
    )
    setChartOptions(updatedCityChartOptions);
 }
/*  useEffect(() => {
    setHeighMChart(null);
    setTimeout(() => {
        
    //setHeighMChart(<HighchartsReact highcharts={Highcharts} options={chartOptions} />)
    }, 5);
 }, [chartOptions]) */

    const UpdateChart = (id, month, data, solddata, name, soldname) => {
        let chatrSeries = {
            xAxis: {
                categories: month
            },
            
            yAxis: {
                title: {
                    text: 'Values'
                },
                tickInterval: 50000,
            },
            
            series: [{
                name: name,
                data: data,
                color: '#4586d7',
                tooltip: {
                    pointFormatter: function () {
                        var formatStr = "";
                        formatStr += name + ': <b>$' + format(this.y) + '</b><br/>';
                        return formatStr;
                    }
                }
            }, {
                name: soldname,
                data: solddata,
                color: '#fb9c38',
                tooltip: {
                    pointFormatter: function () {
                        var formatStr = "";
                        formatStr += name + ': <b>$' + format(this.y) + '</b><br/>';
                        return formatStr;
                    }
                }
            }],
            
        }
        return chatrSeries;
        /**
         series: [{
                        name: name,
                        data: data,
                        color: '#4586d7',
                        tooltip: {
                            pointFormatter: function () {
                                var formatStr = "";
                                formatStr += name + ': <b>$' + format(this.y) + '</b><br/>';
                                return formatStr;
                            }
                        }
                    }, {
                        name: soldname,
                        data: solddata,
                        color: '#fb9c38',
                        tooltip: {
                            pointFormatter: function () {
                                var formatStr = "";
                                formatStr += name + ': <b>$' + format(this.y) + '</b><br/>';
                                return formatStr;
                            }
                        }
                    }],
         */
        /* const chartOptions = {
                    title: {
                        text: 'Median Home Prices',
                        type:"chart"
                    },

                    xAxis: {
                        categories: month
                    },

                    yAxis: {
                        title: {
                            text: 'Values'
                        },
                        tickInterval: 50000,
                    },

                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                            fillOpacity: 0.1,
                            //pointStart: 2010
                        }
                    },

                    series: [{
                        name: name,
                        data: data,
                        color: '#4586d7',
                        tooltip: {
                            pointFormatter: function () {
                                var formatStr = "";
                                formatStr += name + ': <b>$' + format(this.y) + '</b><br/>';
                                return formatStr;
                            }
                        }
                    }, {
                        name: soldname,
                        data: solddata,
                        color: '#fb9c38',
                        tooltip: {
                            pointFormatter: function () {
                                var formatStr = "";
                                formatStr += name + ': <b>$' + format(this.y) + '</b><br/>';
                                return formatStr;
                            }
                        }
                    }],
                    
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }
            
            } */
          //return chartOptions;
     };
    
    const _handleSelect = (key) => {
        if(key == 2)
            setZipData(cityStcList)
        else
            setZipData(zipStcList)

    }

    function combine_array(d) {
        console.log(d);
        var keys = Object.keys(Object.assign({}, ...d));
        var key_pair = Object.fromEntries(keys.map(key => [key, 0]));
        var values = d.map(e => Object.assign({}, key_pair, e));
        return values;
    }
    
    const handleSelect = (key) => {
        // TODO : Need logic to re-draw chart
        if(key == 2 && cityStcList[0] && cityStcList[0] != null ){
            //setZipData(cityStcList)
            if(cityStcList[0]  && cityStcList[0]['statistics_monthly_list_price'] != null) {
                citydata = phpUnserialize(cityStcList[0]['statistics_monthly_list_price']);
            }
            if(cityStcList[0]  && cityStcList[0]['statistics_monthly_sold_price'] != null) {
                citysolddata = phpUnserialize(cityStcList[0]['statistics_monthly_sold_price']);
            }

            city_codedata.push(citydata,citysolddata);
            //citydata = combine_array(city_codedata);
            let citymth = Object.keys(city_codedata[0]).reverse()
            let citydatas = Object.values(city_codedata[0]).reverse()
            let citysold  = Object.values(city_codedata[1]).sort()

            //var oldChartOpt = chartOptions;
            makeBlankDataToRedrawPoint()
            setTimeout(() => {
                const updatedCityChartOptions = UpdateChart(
                    2,citymth,citydatas,citysold,"Median List price","Median Sold Price"
                )
                setCityChartOptions({...chartOptionsCity,...updatedCityChartOptions});
                //console.log(chartOptions);
            }, 50);
        
           
        }else{
            setZipData(zipStcList)
            //setHeighMChart(<HighchartsReact highcharts={Highcharts} options={chartOptions} />)
        }
        //console.log(key)
      }
  /*   function highchartsline(id, month, data, solddata, name, soldname ) {

        if(data.length > 0 || solddata.length > 0) {
            jQuery('#'+id).highcharts({
    
                title: {
                    text: 'Median Home Prices'
                },
    
                xAxis: {
                    categories: month
                },
    
                yAxis: {
                    title: {
                        text: 'Values'
                    },
                    tickInterval: 50000,
                },
    
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
    
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        fillOpacity: 0.1,
                        //pointStart: 2010
                    }
                },
    
                series: [{
                    name: name,
                    data: data,
                    color: '#4586d7',
                    tooltip: {
                        pointFormatter: function () {
                            var formatStr = "";
                            formatStr += this.series.name + ': <b>$' + format(this.y) + '</b><br/>';
                            return formatStr;
                        }
                    }
                }, {
                    name: soldname,
                    data: solddata,
                    color: '#fb9c38',
                    tooltip: {
                        pointFormatter: function () {
                            var formatStr = "";
                            formatStr += this.series.name + ': <b>$' + format(this.y) + '</b><br/>';
                            return formatStr;
                        }
                    }
                }],
                
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            });
        }
    }
     */

  return (
    <>
  
    <section className="box-white block market_report_block" id="Chart">
        <h3 className="b-title"><strong>Market Report</strong></h3>
        <div className="col-12">
            <ul className="nav nav-tabs mb-3" id="myTab" >
                <li className="nav-item" id="zipcode-chart"> 
                    <a className="nav-link active mrkr"
                        data-toggle="tab" href="#zipcode" aria-controls="zipcode"  onClick={()=>handleSelect(1)}
                        title="zipcode">{detailObj.ZipCode ? detailObj.ZipCode :""}</a> 
                </li>
                <li className="nav-item" id="city-chart"> 
                    <a className="nav-link mrkr" data-toggle="tab"
                        href="#citychart"  aria-controls="citychart"  onClick={()=>handleSelect(2)} title="citychart" >{detailObj.CityName ? detailObj.CityName:""}</a> 
                </li>
            </ul>
            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="zipcode" ref={zipChart}>
                    <div className="row text-center mb-5">
                        <div className="col-md-4 col-lg-4 col-sm-12 market-report">
                            <div className="font-size-16 font-weight-bold"> ${detailObj.SQFT > 0 ? converter(detailObj.ListPrice/detailObj.SQFT):0}</div> <span>Listing
                                Home Price/Sqft</span>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12  market-report">
                            <div className="font-size-16 font-weight-bold">{(zipStcList[0] && zipStcList[0].statistic_avg_price_sqft != null) ? "$"+(PriceFormat(zipStcList[0].statistic_avg_price_sqft))+"*":"N/A" }</div> <span>Median
                                List Price/Sqft</span>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12  market-report">
                            <div className="font-size-16 font-weight-bold">{(zipStcList[0] && zipStcList[0].statistic_avg_sold_price_sqft != null) ? "$"+(PriceFormat(zipStcList[0].statistic_avg_sold_price_sqft))+"*":"N/A" }</div> <span>Median
                                Sold Price/Sqft</span>
                        </div>
                    </div>
                    { (zipStcList[0] && zipStcList[0] != null )  && 
                    <figure className="highcharts-figure">
                        <div id="zipcode-container">
                       {/*  {chartOptions != null && HeighMChart} */}
                        </div>
                        <HighchartsReact highcharts={Highcharts} options={chartOptions}/> 
                     </figure> }
                </div>
                <div role="tabpanel" className="tab-pane" id="citychart">
                    <div className="row text-center mb-5">
                        <div className="col-md-4 col-lg-4 col-sm-12  market-report">
                            <div className="font-size-16 font-weight-bold"> ${detailObj.SQFT > 0 ? converter(detailObj.ListPrice/detailObj.SQFT):0}</div> <span>Listing
                                Home Price/Sqft</span>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12  market-report">
                            <div className="font-size-16 font-weight-bold">{(cityStcList[0] && cityStcList[0].statistic_avg_price_sqft != null ) ?  "$"+(PriceFormat(cityStcList[0].statistic_avg_price_sqft))+"*":"N/A" }</div> <span>Median
                                List Price/Sqft</span>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12  market-report">
                            {cityStcList[0] && cityStcList[0].statistic_avg_sold_price_sqft != null  ?
                            <div className="font-size-16 font-weight-bold">{ "$"+(PriceFormat(cityStcList[0].statistic_avg_sold_price_sqft))+"*"}</div>:
                            <div className="font-size-16 font-weight-bold">N/A</div>
                            } <span>Median
                                Sold Price/Sqft</span>
                        </div>
                    </div>
                    {(cityStcList[0] && cityStcList[0] != null ) &&
                    <figure className="highcharts-figure">
                        <div id="city-container">
                            {<HighchartsReact highcharts={Highcharts} options={chartOptionsCity}/> }
                            {/*chartOptions != null && HeighMChart*/}
                        </div>
                    </figure>}
                </div>
        
            
                <div className="disclaimer">All calculations are estimates and provided for
                    informational purposes only. Actual amounts may vary.</div>
            </div>
        </div>
    </section> 
    </>
  )
}

export default MarketReport
