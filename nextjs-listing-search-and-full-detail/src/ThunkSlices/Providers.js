'use client'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import { useEffect, useState } from 'react';

function Providers({children}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (<>
    {isClient && (
    <div id="root">
    <Provider store={store}>
      {children}
    </Provider>
    
     <a href="https://wa.me/15616145353" target="_blank" className="whatsapp-button">
	   <i className="fa fa-whatsapp whatsapp-icon" aria-hidden="true"></i>
     </a>
     </div>)}
     </>
  )
}

export default Providers
