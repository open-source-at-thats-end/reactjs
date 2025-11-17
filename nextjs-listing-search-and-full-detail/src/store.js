import { configureStore } from "@reduxjs/toolkit";
import propertyListReucer from './ThunkSlices/PropertyLIstSlice';
import searchListReducer from './ThunkSlices/AutoSearchSlice';
import filterListReducer from './ThunkSlices/FilterMenuSlice';
import headerFooterListReducer from './ThunkSlices/PostHeaderFooterSlice';
import addFavouriteReducer from './ThunkSlices/PostAddFavouriteSlice';
import removefavReducer from './ThunkSlices/PostRemoveFavSlice';
import getListFavReucer from './ThunkSlices/GetFavouriteSlice';
import postSaveSearchReducer from './ThunkSlices/PostSavesearchSlice';
import getSaveSearchReducer from './ThunkSlices/GetSavesearchSlice';
import postZipStcReducer from './ThunkSlices/ZipStatisticSlice';
import postCityStcReducer from './ThunkSlices/CityStatisticSlice';
import postOfficeIDReducer from './ThunkSlices/PageIDSlice';
import postDetailListReducer from './ThunkSlices/PostDetailSlice';
import postShareReducer from './ThunkSlices/PostShareSlice';
import postSTourReducer from './ThunkSlices/PostStourSlice';
import postContactreducer from './ThunkSlices/PostContactSlice';
import postMarketPriceReducer from './ThunkSlices/PostMedianPriceSlice';
import postDaysSoldReducer from './ThunkSlices/PostDOMSoldSlice';
import postLessexpenseReducer from './ThunkSlices/PostLessExpenceSlice';
import getCitylistReducer from './ThunkSlices/getCityListSlice';
import postrebateCalReducer from './ThunkSlices/PostRebatecalslice';
import getConfigReducer from './ThunkSlices/GetConfigSlice';
import postCensusReducer from './ThunkSlices/postCensusRpSlice';
import getZestimateReducer from './ThunkSlices/GetZestimateSlice';
import postDelpropReducer from './ThunkSlices/PostDeletedPropSlice';
import getZestTaxReducer from './ThunkSlices/GetZestiTaxHistory';
import postNearbyDealsReducer from './ThunkSlices/PostNearByDeals';
import postOnlineBargainReducer from './ThunkSlices/PostOnlineBargain';
import postDealscoreReducer from './ThunkSlices/PostDealScoreSlice';
import getWalscoreReducer from './ThunkSlices/GetWalkscoreSlice';
import getMetaDtaReducer from './ThunkSlices/GetMetaReplace';
import postpredefineIDReducer from './ThunkSlices/PostPredefineIDSlice';
import postCityboundReducer from './ThunkSlices/postCityboundSlice';
import getCoordinatesReducer from './ThunkSlices/GetLanLongSlice';
import postWalkscoreLogReducer from './ThunkSlices/postwalkSlice';
export default configureStore({
    reducer:{
   
        propertyList:propertyListReucer,
        AutoSearchList:searchListReducer,
        MenuFilterList:filterListReducer,
        HeaderFooterList:headerFooterListReducer,
        addToFavouriteList:addFavouriteReducer,
        removefavList:removefavReducer,
        FavouritesList:getListFavReucer,
        saveSearch:postSaveSearchReducer,
        getsave:getSaveSearchReducer,
        zipStcList:postZipStcReducer,
        cityStcList: postCityStcReducer,
        pIDList:postOfficeIDReducer,
        detailData:postDetailListReducer,
        shareForm:postShareReducer,
        sTour:postSTourReducer,
        checkavailability:postContactreducer,
        medianprice:postMarketPriceReducer,
        lessexpenseprice:postLessexpenseReducer,
        domSold:postDaysSoldReducer,
        getcity:getCitylistReducer,
        rebateCalprice:postrebateCalReducer,
        getconfig:getConfigReducer,
        censusRp:postCensusReducer,
        getzestimate:getZestimateReducer,
        deleleprop:postDelpropReducer,
        getzestimatetax:getZestTaxReducer,
        nearbyDeals:postNearbyDealsReducer,
        onlineBargain:postOnlineBargainReducer,
        dealscore:postDealscoreReducer,
        getscore:getWalscoreReducer,
        getmetareplace:getMetaDtaReducer,
        predefID:postpredefineIDReducer,
        ctbound:postCityboundReducer,
        getcoord:getCoordinatesReducer,
        wlkslog:postWalkscoreLogReducer
       },

        middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})
