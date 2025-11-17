import React from 'react';
import PropertyBox from './PropertyBox';
import { useDispatch,useSelector } from 'react-redux';

function PropList ({listData}) {
const {pLoading,totalRecord}=useSelector((state)=>state.propertyList);
  return (
    <div id="lr-result" className="row m-0 mt-md-2" >
    {
        
        (listData.length > 0 ) ?    
            listData.map((item,i)=>{
                scrollRefs.current[item.ListingID_MLS] = createRef();
                return(
                    <div className={"col-12 col-sm-12 "+(toggleGrid?'col-md-4 col-lg-3 col-xl-3':'col-md-12 col-lg-6 col-xl-6')+" -lr-items position-relative"} 
                    key={"prop"+item.ListingID_MLS}
                    ref={scrollRefs.current[item.ListingID_MLS]}>
               
                <PropertyBox data={item} userId={userId} maintype={maintype}/>
            
                </div>
                )
            })
        :
        (!pLoading && totalRecord === 0)?
            <>
        
            <div className="col-12 hidden-md-up">
                <div className="text-right mb-2"></div>
            </div>
            <div className="col-12 text-center h6">
                <br/>Please modify your search criteria and try again.
            </div>
            </>
            :
            
            <>
            
                <div className={"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 lr-items position-relative"} >
                <div className="card- border-0 rounded-0 ls-card">
                    <Shimmer className="card-img img-fluid" width={441.5} height={220}/>
                </div>
                </div>
                <div className={"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 lr-items position-relative"} >
                <div className="card- border-0 rounded-0 ls-card">
                    <Shimmer className="card-img img-fluid" width={441.5} height={220}/>
                </div>
                </div>
                <div className={"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 lr-items position-relative"} >
                <div className="card- border-0 rounded-0 ls-card">
                    <Shimmer className="card-img img-fluid" width={441.5} height={220}/>
                </div>
                </div>
                <div className={"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 lr-items position-relative"} >
                <div className="card- border-0 rounded-0 ls-card">
                    <Shimmer className="card-img img-fluid" width={441.5} height={220}/>
                </div>
                </div>
                <div className={"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 lr-items position-relative"} >
                <div className="card- border-0 rounded-0 ls-card">
                    <Shimmer className="card-img img-fluid" width={441.5} height={220}/>
                </div>
                </div>
                <div className={"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 lr-items position-relative"} >
                <div className="card- border-0 rounded-0 ls-card">
                    <Shimmer className="card-img img-fluid" width={441.5} height={220}/>
                </div>
                </div> 
                
            </> 
    }
</div>
  )
}

export default memo(PropList)
