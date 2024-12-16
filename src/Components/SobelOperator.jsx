import React from 'react'
import { useNavigate } from 'react-router-dom';
import Sobel from "../assets/sobel.jpg"

function SobelOperator() {
    const navigate = useNavigate();

    const handleShowClick = () => {
        navigate('/SoberImage');
    };
    return (
        <div id="SobelOperator" className="h-screen flex items-center justify-between bg-gray-500 p-4 rounded-lg shadow-md">
            <div className="w-1/2">
                <h2 className="text-3xl font-semibold">Sobel Operator</h2>
                <p className="mt-2 text-lg text-white">
                    The Sobel operator is used in edge detection and works by finding the gradient of the image intensity.
                </p>
                <button className="mt-6 px-6 py-3 bg-slate-600 text-white rounded-3xl hover:bg-slate-900 hover:scale-105"
          onClick={handleShowClick}>
            Show
          </button>
            </div>
            <div className="w-1/2 flex justify-center">
                <img
                    src={Sobel}
                    alt="Sobel Operator"
                    className="rounded"
                />
            </div>
        </div>
    )
}

export default SobelOperator
