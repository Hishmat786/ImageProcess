import React from 'react'
import { useNavigate } from 'react-router-dom';
import highpass from '../assets/highpass.png'
function HighpassFilter() {
    const navigate = useNavigate();

    const handleShowClick = () => {
        navigate('/HighpassImage');
    };
    return (
        <div id='HighpassFilter' className="h-screen flex items-center justify-between bg-gray-500 p-4 rounded-lg shadow-md">
            <div className="w-1/2">
                <h2 className="text-3xl font-semibold">Highpass Filter</h2>
                <p className="mt-2 text-lg text-white">
                    A highpass filter enhances the edges and fine details in an image by suppressing low-frequency components.
                </p>
                <button className="mt-6 px-6 py-3 bg-slate-600 text-white rounded-3xl hover:bg-slate-900 hover:scale-105"
          onClick={handleShowClick}>
            Show
          </button>
            </div>
            <div className="w-1/2 flex justify-center">
                <img
                    src={highpass}
                    alt="Highpass Filter"
                    className="rounded"
                />
            </div>
        </div>
    )
}

export default HighpassFilter
