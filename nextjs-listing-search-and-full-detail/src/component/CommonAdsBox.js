import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {format } from '../constant'

function CommonAdsBox(props) {
  let Data=props.data;

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
   });


  return (
    <div className='cluster_popup'  style={{width: 330}}>
    
    {Data.map((item,i)=>{
        let urlLink=`https://www.demosite.com/${item.CityName.replaceAll(/\s/g,"-")}-homes-for-sale/${item.StreetNumber}-${item.StreetName.replaceAll(/\s/g,"-")}-${item.CityName.replaceAll(/\s/g,"-")}-${item.State}-${item.ZipCode}-mls-${item.ListingID_MLS}/`
        urlLink=urlLink.toLowerCase()
        return(
            <div className='col-sm-12 col-md-12 col-lg-12 p-1'>
            <a href={urlLink}
            className='popup-modal-custom'
            //data-target="custom" 
            target="_blank"
            data-url={urlLink}
            title={"MLS#" +item.MLS_NUM} 
        >
          
            <div className='row d-flex flex-wrap ml-15 ms-15'  key={"cmnAdrs"+item.MLS_NUM}>
            <div className="col-4 ">    
            <div className="image">  
                {
                    item.Main_Photo_Url ?  
                        <LazyLoadImage src={item.Main_Photo_Url}  className="card-img " alt={item.address} key={"comnadrs"+item.ListingID_MLS} style={{height:80,width:100}} threshold={90}/>
                    : (item.MainPicture)?
                        <LazyLoadImage src={item.MainPicture}  className="card-img " alt={item.address} key={"maincomnadrs"+item.ListingID_MLS} style={{height:80,width:100}} threshold={90}/>
                    :
                        <LazyLoadImage  src="https://www.demosite.com/pictures/property/no-photo/0/0/100/80/"  className="card-img " alt="nophoto" key={"nophoto"} style={{height:80,width:100}} threshold={90}/>
                } 
            </div>
            </div>
            <div className='col-8'>
                <div className="item- p-1" data-id={item.ListingID_MLS}>     
                    <div className="cluster_description m-1- -w-100">          
                        <div className="row">  
                            <div className="col-12"> {formatter.format(item.ListPrice)} </div>  
                                <div className="col-12 mb-0 "> {item.StreetNumber} &nbsp;{item.StreetName} &nbsp;{item.CityName}&nbsp;{item.State} </div>                              
                                    <span className="col-12 mb-0 "> &nbsp;{item.ZipCode}</span> 
                                        <div className="col-12 "> 
                                            <span><i className="fa fa-bed"></i>{" "}{item.Beds}&nbsp; &nbsp;&nbsp;</span> 
                                            <span><i className="fa fa-bath"></i> {" "}{item.Baths}&nbsp; &nbsp;&nbsp;</span>  
                                            <span><i className="fa fa-arrows-alt"></i>{" "}{format(item.SQFT)}&nbsp; &nbsp;&nbsp;</span>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div> 
           
            </a>
            </div>
        )
    })}
       
    
    


 
</div>
   
  )
}

export default CommonAdsBox

