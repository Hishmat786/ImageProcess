import React from 'react'
import { useNavigate } from 'react-router-dom';
import lowpass from '../assets/lowpass.png'
function LowpassFilter() {
  const navigate = useNavigate();

  const handleShowClick = () => {
    navigate('/LowpassImage');
  };
  return (
    <div id="LowpassFilter" className="h-screen flex items-center justify-between bg-gray-500 p-4 rounded-lg shadow-md">
      <div className="w-1/2">
        <h2 className="text-3xl font-semibold">Lowpass Filter</h2>
        <p className="mt-2 text-lg text-white">
          A lowpass filter allows low-frequency components of an image to pass through while attenuating high-frequency noise.
        </p>
        <button className="mt-6 px-6 py-3 bg-slate-600 text-white rounded-3xl hover:bg-slate-900 hover:scale-105"
          onClick={handleShowClick}>
            Show
          </button>
      </div>
      <div className="w-1/2 flex justify-center">
        <img
          src={lowpass}
          alt="Lowpass Filter"
          className="rounded"
        />
      </div>
    </div>
  )
}

export default LowpassFilter
