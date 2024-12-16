import React, { useState } from 'react';

const GammaImage = () => {
  const [image, setImage] = useState(null);
  const [gammaValue, setGammaValue] = useState(1);
  const [filteredImage, setFilteredImage] = useState(null);

  // Apply gamma correction to an image
  const applyGammaCorrection = (imageData, gamma) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.drawImage(imageData, 0, 0);

    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageDataObj.data;
    const invGamma = gamma; // Adjusted for correct behavior

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, Math.pow(data[i] / 255, invGamma) * 255); // Red
      data[i + 1] = Math.min(255, Math.pow(data[i + 1] / 255, invGamma) * 255); // Green
      data[i + 2] = Math.min(255, Math.pow(data[i + 2] / 255, invGamma) * 255); // Blue
    }

    ctx.putImageData(imageDataObj, 0, 0);
    return canvas.toDataURL();
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          setImage(img);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle gamma change and apply filter
  const handleGammaChange = (e) => {
    const selectedGamma = parseFloat(e.target.value);
    setGammaValue(selectedGamma);

    if (image) {
      const result = applyGammaCorrection(image, selectedGamma);
      setFilteredImage(result);
    }
  };

  return (
    <div className="h-screen text-center p-8 bg-slate-500">
      <h2 className="text-2xl font-bold mb-4">Gamma Correction Tool</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block mx-auto mb-4 border rounded p-2"
      />

      <div className="mb-4">
        <label htmlFor="gamma" className="mr-2 text-lg font-medium">
          Select Gamma Value:
        </label>
        <select
          id="gamma"
          value={gammaValue}
          onChange={handleGammaChange}
          className="border rounded p-2"
        >
          <option value="0.5">0.5 (Brighten)</option>
          <option value="0.8">0.8</option>
          <option value="1">1 (No Change)</option>
          <option value="1.2">1.2</option>
          <option value="2">2 (Darken)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {image && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Original Image</h4>
            <img
              src={image.src}
              alt="Original"
              className="max-w-full max-h-80 mx-auto border rounded"
            />
          </div>
        )}

        {filteredImage && (
          <div>
            <h4 className="text-lg font-semibold mb-2">
              Filtered Image (Gamma: {gammaValue})
            </h4>
            <img
              src={filteredImage}
              alt="Filtered"
              className="max-w-full max-h-80 mx-auto border rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GammaImage;
