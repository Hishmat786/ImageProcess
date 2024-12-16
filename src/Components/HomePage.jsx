import React from 'react'
import Navbar from './Navbar'
import GammaCorrection from './GammaCorrection';
import HistogramEqualization from './HistogramEqualization';
import LaplacianFilter from './LaplacianFilter';
import SobelOperator from './SobelOperator';
import LowpassFilter from './LowpassFilter';
import HighpassFilter from './HighpassFilter';
function HomePage() {
  return (
    <div className="space-y-1">
      <Navbar/>
      
      <GammaCorrection />
      <HistogramEqualization />
      <LaplacianFilter />
      <SobelOperator />
      <LowpassFilter />
      <HighpassFilter />
   
    </div>
  )
}

export default HomePage
