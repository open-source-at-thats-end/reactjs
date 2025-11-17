"use client"
import React from 'react'
import dynamic from 'next/dynamic'
import MapSearch from '../../../component/MapSearch'

const MapComponent = dynamic(() => import('../../../component/MapSearch'), {
  loading: () => <p>Loading...</p>,
   ssr: true // Disable server-side rendering for this component
 });
 
export  function ClientPage() {
  return (
    <MapComponent />
  )
}

