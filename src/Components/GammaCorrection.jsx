import React from 'react'
import { useNavigate } from 'react-router-dom';
import Gama from '../assets/Gama.png'
function GammaCorrection() {
    const navigate = useNavigate();

    const handleShowClick = () => {
      navigate('/GammaImage');
    };
  return (
    <div id='GammaCorrection' className="h-screen flex flex-col justify-center items-center bg-gray-700 ">
      <div className="flex items-center justify-between h-screen  bg-gray-500 p-8  shadow-md">
        <div className="w-1/2">
          <h2 className="text-3xl font-semibold">Gamma Correction</h2>
          <p className="mt-4 text-lg text-white">
            Gamma correction is used to adjust the brightness of an image. It helps in enhancing the image by applying a non-linear transformation to the pixel values.
          </p>
          <button className="mt-6 px-6 py-3 bg-slate-600 text-white rounded-3xl hover:bg-slate-900 hover:scale-105"
          onClick={handleShowClick}>
            Show
          </button>
        </div>
        <div className="w-1/2 flex justify-center">
          <img
            src={Gama}
            alt="Gamma Correction"
            className="rounded"
          />
        </div>
      </div>
    </div>
  )
}

export default GammaCorrection
