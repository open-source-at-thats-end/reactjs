import React, { useState, useEffect,useRef } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {  format } from '../constant';
import '../styles/cal.style.css';

function MortgageNew({item}) {
    let downpay;
    let a=250000;
    let b=0.20;
    downpay = a * b ;
    const frmCalculate = useRef(null);
    const [chartOptions, setChartOptions] = useState();
    const [HighchartsCmp, setHeighChartCmp] = useState();
    const [reloadHChart, setReloadHChart] = useState(false);
    const [principleInterest, setPrincipleInterest] = useState();
    const [totalMonthly, setTotalMonthly] = useState("");
    const [monthlyPropertyTax, setMonthlyPropertyTax] = useState();
    const [monthlyHomeInsurance, setMonthlyHomeInsurance] = useState();
    const [formData,setFormData]=useState({loan_balance:"$25,0000",down_payment:downpay,down_payment_percent:"20%",loan_interest:"6.75%",loan_year:30,property_tax:"2500",home_insurance:'1350',mortgage_insurance:"0",hoa:"0",loan_principal:""});
  
useEffect(() => {
    if(item.ListPrice != undefined )
    var objData = formData;
    objData.loan_balance ="$"+format(getFloat(item.ListPrice!=undefined && item.ListPrice))
      setFormData({...objData})
      if(frmCalculate.current)
        mortgageCal(objData)
  }, [item, frmCalculate])

useEffect(() => {
    if(reloadHChart){
      setHeighChartCmp(null);
      setTimeout(() => {
        setHeighChartCmp(<HighchartsReact highcharts={Highcharts} options={chartOptions} />)
        setReloadHChart(false);
      }, 50);
    }else{
      setHeighChartCmp(<HighchartsReact highcharts={Highcharts} options={chartOptions} />)
    }
  }, [chartOptions, reloadHChart]);


const UpdateChart = (mPropTax, mHomeInsurance, mPrivateMortgage, hoa, pInterest,mTotal,mloanType) => {
   var data = [
      { name: 'Property Tax', y: getFloat(mPropTax) || 0, color:'#f4e3b7'},
      { name: 'Home Insurance', y: getFloat(mHomeInsurance) || 0, color:'#91f79b' },
      { name: 'Private Mortgage Insurance', y: getFloat(mPrivateMortgage) || 0, color:'#e5a46b' },
      { name: 'HOA', y: getFloat(hoa) || 0, color:"#abaff4" },
      { name: 'loan', y: getFloat(mloanType) || 0, color:"#e3b317" },
      { name: 'Principal & Interest', y: getFloat(pInterest) || 0, color:"#c69b2d"},
    ]
    var title = {
      text: mTotal +"<br> Month",
      align: 'center',
      verticalAlign: 'middle',
      //y: 10,
      style: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: '18px',
        fontFamily: "Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif"
    }
};

  
const chartOptions = {
    chart: {
    type: 'pie',
    startAngle: 0, 
    },
    title: title,
    //subtitle: subtitle,
    plotOptions: {
    pie: {
        innerSize: '70%', // Adjust this to set the size of the donut hole
        dataLabels: {
        enabled: false, // Show data labels
        format: '<b>{point.name}</b>: {point.y:.2f}', // Display data labels with values
        },
    },
    },
    series: [
    {
        name: '$',
        data: data,
        color: "#c69b2d",
        showInLegend: false,
    },
    ],
}
return chartOptions;
}

function Cal_Mortgage_Insurance(down_payment, loan_balance, year)
{
    var m_insurance_per = Math.round(down_payment*100/loan_balance);
    var m_insurance = 0;
    var month = year*12;
    var mortgage_insurance_rate;
    var m_insurance_per = mortgage_insurance_rate/100;
    
    m_insurance = Math.round(m_insurance_per*loan_balance/Math.round(month));
    return m_insurance;
}
function Cal_Principle_Interest(PrinEtInt)
{
var principle_interest = format(parseFloat(Math.round(PrinEtInt)));
if(principle_interest < 0)
    principle_interest= 0;

//jQuery('#principle_interest').html('$'+principle_interest);
setPrincipleInterest('$'+principle_interest)
//jQuery('#principle_interest').data('val',principle_interest);
return principle_interest;
} 

const mortgageCal = (formObj, init_input_name) => {
var objUpFormData = formObj; 
var InterDiv = getFloat(formData.loan_interest); // taux interet

var loan_interest_rate=InterDiv;

if(init_input_name  = 'loan_interest'){
    if(loan_interest_rate == ''){
        loan_interest_rate = 6.75;
    }else if(loan_interest_rate > 100 ){
        loan_interest_rate = 6.75;
    }else{
        loan_interest_rate=InterDiv;
    }
      
    objUpFormData.loan_interest = loan_interest_rate + '%';
    InterDiv=loan_interest_rate;
}

if (InterDiv < 0.3)
{
    InterDiv = InterDiv * 100.0;
}
let InterDiv2 = InterDiv;
InterDiv = InterDiv / 1200;

var radic = 1;
var moy = 1 + InterDiv;


var annees = getFloat(formData.loan_year); 

for (let i=0; i<annees * 12; i++)
{
    radic = radic * moy;
}

var down_payment = getFloat(formData.down_payment);
var loan_balance = getFloat(formData.loan_balance);
if(init_input_name == 'down_payment')
{

    if(down_payment === '')
        down_payment = 0;
    else if(loan_balance <= 0)
        down_payment = 0;
    else if(down_payment > loan_balance)
        down_payment = loan_balance;

  
    objUpFormData.down_payment= '$' + format(down_payment);
    var down_payment_percent = Math.round(down_payment * 100 / loan_balance);
    if(isNaN(down_payment_percent))
        down_payment_percent = 0;

    objUpFormData.down_payment_percent = down_payment_percent+ '%'
}else{

    var down_payment_percent  = getFloat(formData.down_payment_percent);

    if(down_payment_percent === '')
        down_payment_percent = 0;
    else if(down_payment_percent > 100)
        down_payment_percent = 100;

    down_payment_percent  = Math.round(parseFloat(down_payment_percent));

    down_payment  = Math.round(parseFloat(loan_balance * down_payment_percent / 100));
    if(isNaN(down_payment))
        down_payment = 0;

    down_payment_percent = Math.round(down_payment * 100 / loan_balance);
    if(isNaN(down_payment_percent))
        down_payment_percent = 0;

   objUpFormData.down_payment = '$' + format(down_payment)
    objUpFormData.down_payment_percent = down_payment_percent+ '%'

}


objUpFormData.loan_principal = format(Math.round(loan_balance - down_payment))

var emprunte = getFloat(objUpFormData.loan_principal)

var PrinEtInt = emprunte * InterDiv / ( 1 - (1/radic));

PrinEtInt = Math.floor(PrinEtInt*Math.pow(10,2))/Math.pow(10,2);


var year = formData.loan_year;

var m_insurance = Cal_Mortgage_Insurance(down_payment, loan_balance, year);

var principle_interest = Cal_Principle_Interest(PrinEtInt);
var home_insurance = Math.round(getFloat(formData.home_insurance));
PrinEtInt = Math.round(PrinEtInt+m_insurance);

if(down_payment_percent < 20)
{
    var ym_ins =  down_payment * 0.005;
    var  m_ins;

    if(ym_ins > 0){
        m_ins = Math.round(ym_ins/12);

    }
}
else{
    m_ins = 0;
    ym_ins = 0;
}


objUpFormData.mortgage_insurance= '$'+ym_ins
var tax = 0; var home_ins = 0;var hoa = 0;
var data = []; var val = '';

if(getFloat(formData.property_tax) > 0)
{
   
    tax = Math.round((1*(getFloat(formData.property_tax)/12)));
    //objUpFormData.property_tax = '$' + getFloat(objUpFormData.property_tax);
    if(tax > 0) {
          /* data.push({
            name: ' Property Tax ',
            y: parseFloat(tax),
            dataLabels: {
                enabled: false
            },
            color: '#f4e3b7'
        }); */
    }
}

if(getFloat(formData.home_insurance) > 0)
{
  
  home_ins = Math.round((1*getFloat((home_insurance)/12)));
   
}

if(getFloat(formData.hoa) > 0){
   
    hoa = Math.round(getFloat(formData.hoa));
    /* data.push({
        name: 'HOA Dues',
        y: parseFloat(hoa),
        dataLabels: {
            enabled: false
        },
        color: '#abaff4'
    }); */
}



setMonthlyPropertyTax('$'+tax);

setMonthlyHomeInsurance('$'+home_ins)

objUpFormData.mortgage_insurance= '$'+m_ins;
formData.property_tax= '$'+getFloat(formData.property_tax);
objUpFormData.home_insurance= '$'+getFloat(objUpFormData.home_insurance);

objUpFormData.hoa= '$'+hoa;
objUpFormData.loan_year= year;
objUpFormData.loan_balance="$"+format(loan_balance)

var m_pay = parseFloat(Math.round(tax+home_ins+hoa + m_ins));

PrinEtInt = Math.round(getFloat(principle_interest) + m_pay);

var monthly_payment = '$'+format(PrinEtInt);
const updatedChartOptions = UpdateChart(
  '$'+tax,
  '$'+home_ins,
  objUpFormData.mortgage_insurance,
  formData.hoa,
  principle_interest,
  monthly_payment,
  formData.loan_year
);
setChartOptions(updatedChartOptions);
setTotalMonthly(monthly_payment);
setFormData({...objUpFormData})


}
const getFloat = (value) => {
if(typeof value == 'string')
  value = value.replace(/\$|,/g, '');

return parseFloat(value) || 0;
};
const handleFrmInput=(event)=>{
    const {name,value,}=event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]:value }));
}
const handleInputClick=()=>{
    if(formData.loan_balance != ''){
        setReloadHChart(true);
        handleOnselect()
    }
}      
const handleCalculateClick = () => {
    if(formData.loan_balance != '' && formData.loan_balance != '$')
        mortgageCal(formData);
        handleInputClick()
};

const handleOnselect=()=>{
    mortgageCal(formData);
}

  return (
    <>
    <div className="card" id="mortgage" style={{maxWidth:"100%"}}>
    <div className="card-body p-0">
        <p className="mort-header"></p>
        <h2>Mortgage Calculator</h2>
        <hr className="mb-0"/>
        <div className="row">
            <div className="col-lg-5 col-12 mort-cal">
                <form className="m-15" 
                      id="frmCalculator"   
                       type='submit' 
                       ref={frmCalculate}>
                    <div className="form-group">
                        <label className="pull-left pl-10" htmlFor="loan_balance">Home Price</label>
                        <input type="text" 
                                name="loan_balance" 
                                value={formData.loan_balance} 
                                onChange={handleFrmInput}
                                onClick={handleInputClick}
                                id="loan_balance" 
                                className="form-control required font-weight-bold rounded valid"/>
                     </div>
                    <div className="form-group">
                        <label className="text-left w-100 pl-10" htmlFor="down_payment">Down Payment</label>
                        

                        <div className="row down_payment">
                            <div className="col-sm-8 my-1 my-md-0 pr-0">
                            <label className="text-left w-100 " htmlFor="down_payment_percent">
                                <input className="m-0 form-control font-weight-bold rounded valid" 
                                       name="down_payment" 
                                       id="down_payment" 
                                       value={formData.down_payment} 
                                       onChange={handleFrmInput}
                                       onClick={handleInputClick}
                                       type="text"/>
                                        </label>
                            </div>
                            <div className="col-sm-4 my-1 my-md-0 pl-0">
                            <label className="text-left w-100 pl-10" htmlFor="down_payment_percent">
                                <input className="m-0 form-control font-weight-bold rounded valid" 
                                       name="down_payment_percent" 
                                       id="down_payment_percent"
                                       value={formData.down_payment_percent} 
                                       onChange={handleFrmInput}
                                       onClick={handleInputClick}
                                       size="30" 
                                       type="text"/>
                                       </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="pull-left pl-10" htmlFor="loan_interest">Mortgage Interest Rate</label>
                        <input type="text" 
                               name="loan_interest" 
                               id="loan_interest" 
                               className="form-control required font-weight-bold rounded valid" 
                               value={formData.loan_interest} 
                               onChange={handleFrmInput}
                               onClick={handleInputClick} 
                               data-val="6.75"
                               />
                    </div>
                    <div className="form-group">
                        <label className="pull-left pl-10" htmlFor='loan_year'>Loan Type</label>
                        <select id="loan_year" 
                                name="loan_year" 
                                className="form-control required rounded valid" 
                                value={formData.loan_year}
                                onChange={handleFrmInput}
                                onClick={handleInputClick}
                               >
                            <option value="30"> 30 Years </option>
                            <option value="15"> 15 Years </option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="pull-left pl-10">Property Taxes</label>
                        <input type="text" 
                               name="property_tax" 
                               value={formData.property_tax} 
                               onChange={handleFrmInput}
                               onClick={handleInputClick}
                               id="property_tax" 
                               className="form-control required font-weight-bold rounded valid" 
                               placeholder="/year"/>
                        <div className="sublabel">/year</div>
                    </div>
                    <div className="form-group">
                        <label className="pull-left pl-10">Homeowner's Insurance</label>
                        <input type="text" 
                               name="home_insurance" 
                               value={formData.home_insurance} 
                               onChange={handleFrmInput}
                               onClick={handleInputClick}
                               id="home_insurance" 
                               className="form-control required font-weight-bold rounded valid" 
                               placeholder="/year"/>
                        <div className="sublabel">/year</div>
                    </div>
                    <div className="form-group">
                        <label className="pull-left pl-10">Private Mortgage Insurance (PMI)</label>
                        <input type="text" 
                               name="mortgage_insurance" 
                               value={formData.mortgage_insurance} 
                               onChange={handleFrmInput}
                               onClick={handleInputClick}
                               id="mortgage_insurance" 
                               className="form-control required font-weight-bold rounded valid" 
                               placeholder="/year"/>
                        <div className="sublabel">/year</div>
                    </div>
                    <div className="form-group">
                        <label className="pull-left pl-10">HOA</label>
                        <input type="text" 
                               name="hoa" 
                               value={formData.hoa} 
                               onChange={handleFrmInput}
                               onClick={handleInputClick}
                               id="hoa" 
                               className="form-control required font-weight-bold rounded valid" 
                               placeholder="/month"/>
                        <div className="sublabel">/month</div>
                    </div>
                    <input type="hidden" id="loan_principal" name="loan_principal" data-val=""  value={formData.loan_principal} />
                    </form>
                <button className="btn btn-primary mb-3 mr-3 mortgage-btn float-right" 
                        id="mortgage" 
                        onClick={handleCalculateClick}
                        >Calculate
                </button>
               
            </div>
            <div className="col-lg-7 col-12">
                <div className="m-15">
                    <p className="mort-title"><b>Your Mortgage Payment:</b> <span id="monthly_payment">{totalMonthly}</span></p>
                </div>
                <div className="row m-15">
                    <div className="col-sm-3 col-md-2 bar-1 p-0">
                        <p className="mort-color" style={{backgroundColor:"#c69b2d"}}></p>
                        <p id="principle_interest" data-val="" className="mort-val">{principleInterest}</p>
                        <span>
							Principle Interest
						</span>
                    </div>
                    <div className="col-sm-3 col-md-2 bar-1 p-0">
                        <p className="mort-color" style={{backgroundColor:"#f4e3b7"}}
                       ></p>
                        <p id="property_tax_bar" data-val="" className="mort-val">{monthlyPropertyTax}</p>
                        <span>
							Property Tax
						</span>
                    </div>
                    <div className="col-sm-3 col-md-2 bar-1 p-0">
                        <p className="mort-color" style={{backgroundColor:"#91f79b"}}
                        ></p>
                        <p id="home_insurance_bar" data-val="" className="mort-val">{monthlyHomeInsurance}</p>
                        <span>
							Home Insurance
						</span>
                    </div>
                    <div className="col-sm-3 col-md-2 bar-1 p-0">
                        <p className="mort-color" style={{backgroundColor:"#e5a46b"}}
                        ></p>
                        <p id="mort_insurance_bar" data-val="" className="mort-val">{formData.mortgage_insurance}</p>
                        <span>
							Private Mortgage Insurance
						</span>
                    </div>
                    <div className="col-sm-3 col-md-2 bar-1 p-0">
                        <p className="mort-color" style={{backgroundColor:"#abaff4"}}
                        ></p>
                        <p id="hoa_bar" data-val="" className="mort-val">{formData.hoa}</p>
                        <span>
							HOA Dues
						</span>
                    </div>
                </div>
                <hr/>

                <div id="calc" style={{ position: 'relative' }}>
                {HighchartsCmp}
              
                  {/*  <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                      <p style={{ fontWeight: 'bold' }}>{totalMonthly}</p>
                       <p style={{ fontWeight: 'bold' }}>Month</p>
                    </div> */}
                </div>
                {/* <div id="calc">

                </div> */}

            </div>
        </div>
    </div>
</div>
<div className="mortgage-disclaimer">
    <span>Disclaimer: All figures are estimates only and are for informational purposes only. They are not meant to be used as quotes and you should always seek the help of a professional mortgage loan officer to calculate your exact numbers.</span>
</div>
</>
  )
}

export default MortgageNew
