import React, { useState } from 'react';

const HistogramImage = () => {
  const [image, setImage] = useState(null);
  const [filterType, setFilterType] = useState("equalize");
  const [filteredImage, setFilteredImage] = useState(null);

  // Apply histogram-based filter to an image
  const applyHistogramFilter = (imageData, type) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.drawImage(imageData, 0, 0);

    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageDataObj.data;

    if (type === "equalize") {
      const grayScale = [];
      const hist = new Array(256).fill(0);

      for (let i = 0; i < data.length; i += 4) {
        const gray = Math.round((data[i] + data[i + 1] + data[i + 2]) / 3);
        grayScale.push(gray);
        hist[gray]++;
      }

      const cdf = hist.map((sum => value => sum += value)(0));
      const cdfMin = cdf.find(v => v > 0);
      const scaleFactor = 255 / (data.length / 4 - cdfMin);

      for (let i = 0; i < grayScale.length; i++) {
        const equalizedValue = Math.round((cdf[grayScale[i]] - cdfMin) * scaleFactor);
        data[i * 4] = data[i * 4 + 1] = data[i * 4 + 2] = equalizedValue;
      }
    } else if (type === "localEqualize") {
      // Local histogram equalization
      const blockSize = 32; // Define block size for local equalization
      const width = canvas.width;
      const height = canvas.height;

      for (let x = 0; x < width; x += blockSize) {
        for (let y = 0; y < height; y += blockSize) {
          const blockData = ctx.getImageData(x, y, blockSize, blockSize);
          const localHist = new Array(256).fill(0);

          for (let i = 0; i < blockData.data.length; i += 4) {
            const gray = Math.round((blockData.data[i] + blockData.data[i + 1] + blockData.data[i + 2]) / 3);
            localHist[gray]++;
          }

          const localCdf = localHist.map((sum => value => sum += value)(0));
          const localCdfMin = localCdf.find(v => v > 0);
          const localScaleFactor = 255 / (blockData.data.length / 4 - localCdfMin);

          for (let i = 0; i < blockData.data.length; i += 4) {
            const gray = Math.round((blockData.data[i] + blockData.data[i + 1] + blockData.data[i + 2]) / 3);
            const equalizedValue = Math.round((localCdf[gray] - localCdfMin) * localScaleFactor);
            blockData.data[i] = blockData.data[i + 1] = blockData.data[i + 2] = equalizedValue;
          }

          ctx.putImageData(blockData, x, y);
        }
      }
    } else if (type === "lowContrast") {
      // Low contrast adjustment
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 0.7 + 50); // Red
        data[i + 1] = Math.min(255, data[i + 1] * 0.7 + 50); // Green
        data[i + 2] = Math.min(255, data[i + 2] * 0.7 + 50); // Blue
      }
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

  // Handle filter change and apply filter
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilterType(selectedFilter);

    if (image) {
      const result = applyHistogramFilter(image, selectedFilter);
      setFilteredImage(result);
    }
  };

  return (
    <div className="h-screen text-center p-8 bg-slate-500">
      <h2 className="text-2xl font-bold mb-4">Histogram Filter Tool</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block mx-auto mb-4 border rounded p-2"
      />

      <div className="mb-4">
        <label htmlFor="filter" className="mr-2 text-lg font-medium">
          Select Histogram Filter:
        </label>
        <select
          id="filter"
          value={filterType}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="equalize">Histogram Equalization</option>
          <option value="localEqualize">Local Histogram Equalization</option>
          <option value="lowContrast">Low Contrast Adjustment</option>
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
              Filtered Image ({filterType})
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

export default HistogramImage;
