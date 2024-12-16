import React from 'react'
import { useNavigate } from 'react-router-dom';
import Laplacian from '../assets/laplacian.webp'
function LaplacianFilter() {
    const navigate = useNavigate();
    
        const handleShowClick = () => {
          navigate('/LaplacianImage');
        };
  return (
    <div id='LaplacianFilter' className="h-screen flex items-center justify-between bg-gray-500 p-4 rounded-lg shadow-md">
      <div className="w-1/2">
        <h2 className="text-3xl font-semibold">Laplacian Filter</h2>
        <p className="mt-2 text-lg text-white">
          The Laplacian filter is a spatial filter used to emphasize areas of rapid intensity change, typically for edge detection.
        </p>
        <button className="mt-6 px-6 py-3 bg-slate-600 text-white rounded-3xl hover:bg-slate-900 hover:scale-105"
          onClick={handleShowClick}>
            Show
          </button>
      </div>
      <div className="w-1/2 flex justify-center">
        <img
          src={Laplacian}
          alt="Laplacian Filter"
          className="rounded"
        />
      </div>
    </div>
  )
}

export default LaplacianFilter
