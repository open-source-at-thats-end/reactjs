'use client'
 
import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import a component
const HeavyComponent = dynamic(() => import('../../component/DetailPage'), {
 loading: () => <p>Loading...</p>,
  ssr: true // Disable server-side rendering for this component
});

 
export function ClientOnly({resData}) {
  return(
    <HeavyComponent data={resData}/>
  ) 
}




