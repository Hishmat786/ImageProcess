import React, { useState } from "react";

const Navbar = () => {
    const [servicesOpen, setServicesOpen] = useState(false);

    return (
        <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
            {/* Website Name */}
            <div className="font-bold text-lg">ImageProc</div>

            {/* Center Navigation */}
            <div className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-gray-300">Home</a>
                <div className="relative group">
                    <button className="hover:text-gray-300">
                        Services
                    </button>
                    <div className="absolute hidden group-hover:block bg-gray-700 mt-2 rounded shadow-lg">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-600">Gamma Correction</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-600">Histogram Equalization</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-600">Laplacian Filter</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-600">Sobel Operator</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-600">Lowpass Filter</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-600">Highpass Filter</a>
                    </div>
                </div>

                <a href="#" className="hover:text-gray-300">Contact</a>
            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 rounded bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
                />
                <button className="p-2 bg-blue-600 rounded hover:bg-blue-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35m1.52-5.89a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                        />
                    </svg>
                </button>
            </div>
        </nav>
        // <h1 className="text-2xl font-bold">Navbar</h1>
    );
};

export default Navbar;
