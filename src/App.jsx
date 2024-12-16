import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage'
import GammaImage from './Components/models/GammaImage'
import HistogramImage from './Components/models/HistogramImage'
import LowpassImage from './Components/models/LowpassImage'
import LaplacianFilter from './Components/LaplacianFilter'
import LaplacianImage from './Components/models/LaplacianImage'
import SoberImage from './Components/models/SoberImage'
import HighpassImage from './Components/models/HighpassImage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="GammaImage" element={<GammaImage/>} />
          <Route path="HistogramImage" element={<HistogramImage/>} />
          <Route path="LowpassImage" element={<LowpassImage/>} />
          <Route path="LaplacianImage" element={<LaplacianImage/>} />
          <Route path="SoberImage" element={<SoberImage/>} />
          <Route path="HighpassImage" element={<HighpassImage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
