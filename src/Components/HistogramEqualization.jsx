import React from 'react'
import { useNavigate } from 'react-router-dom';
import Histogram from '../assets/histogram.jpg'
function HistogramEqualization() {
  const navigate = useNavigate();

  const handleShowClick = () => {
    navigate('/HistogramImage');
  };
  return (
    <div id='HistogramEqualization' className="h-screen flex items-center justify-between bg-gray-500 p-4 rounded-lg shadow-md">
      <div className="w-1/2">
        <h2 className="text-3xl font-semibold">Histogram Equalization</h2>
        <p className="mt-2 text-lg text-white">
          Histogram equalization improves the contrast of an image by evenly distributing its intensity levels across the histogram.
        </p>
        <button className="mt-6 px-6 py-3 bg-slate-600 text-white rounded-3xl hover:bg-slate-900 hover:scale-105"
          onClick={handleShowClick}>
            Show
          </button>
      </div>
      <div className="w-1/2 flex justify-center">
        <img
          src={Histogram}
          alt="Histogram Equalization"
          className="rounded"
        />
      </div>
    </div>
  )
}

export default HistogramEqualization
