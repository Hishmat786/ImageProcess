import React, { useState } from "react";

const LowpassImage = () => {
  const [image, setImage] = useState(null);
  const [filterType, setFilterType] = useState("mean");
  const [filteredImage, setFilteredImage] = useState(null);

  const applyLowpassFilter = (imageData, filterType) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.drawImage(imageData, 0, 0);

    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const applyMeanFilter = () => {
      ctx.filter = "blur(3px)"; // Box/Mean filter approximation
      ctx.drawImage(imageData, 0, 0);
      return canvas.toDataURL();
    };

    const applyWeightedAverage = () => {
      ctx.filter = "blur(2px) brightness(1.1)"; // Slightly enhance mean filter
      ctx.drawImage(imageData, 0, 0);
      return canvas.toDataURL();
    };

    const applyGaussianFilter = () => {
      ctx.filter = "blur(4px)"; // Gaussian filter approximation
      ctx.drawImage(imageData, 0, 0);
      return canvas.toDataURL();
    };

    const applyMedianFilter = (imageDataObj) => {
      const { data: pixels, width, height } = imageDataObj;
      const newPixels = new Uint8ClampedArray(pixels.length);

      const getPixel = (x, y, channel) => {
        if (x < 0 || y < 0 || x >= width || y >= height) return 0;
        const index = (y * width + x) * 4 + channel;
        return pixels[index];
      };

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const neighbors = [];
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              neighbors.push(getPixel(x + kx, y + ky, 0));
            }
          }
          neighbors.sort((a, b) => a - b);
          const median = neighbors[Math.floor(neighbors.length / 2)];
          const index = (y * width + x) * 4;
          newPixels[index] = newPixels[index + 1] = newPixels[index + 2] = median;
          newPixels[index + 3] = 255;
        }
      }

      imageDataObj.data.set(newPixels);
      ctx.putImageData(imageDataObj, 0, 0);
      return canvas.toDataURL();
    };

    const applyMinMaxFilter = (imageDataObj, filterType) => {
      const { data: pixels, width, height } = imageDataObj;
      const newPixels = new Uint8ClampedArray(pixels.length);

      const getPixel = (x, y, channel) => {
        if (x < 0 || y < 0 || x >= width || y >= height) return 0;
        const index = (y * width + x) * 4 + channel;
        return pixels[index];
      };

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const neighbors = [];
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              neighbors.push(getPixel(x + kx, y + ky, 0));
            }
          }
          const resultValue =
            filterType === "min" ? Math.min(...neighbors) : Math.max(...neighbors);
          const index = (y * width + x) * 4;
          newPixels[index] = newPixels[index + 1] = newPixels[index + 2] = resultValue;
          newPixels[index + 3] = 255;
        }
      }

      imageDataObj.data.set(newPixels);
      ctx.putImageData(imageDataObj, 0, 0);
      return canvas.toDataURL();
    };

    switch (filterType) {
      case "mean":
        return applyMeanFilter();
      case "weighted":
        return applyWeightedAverage();
      case "gaussian":
        return applyGaussianFilter();
      case "median":
        return applyMedianFilter(imageDataObj);
      case "min":
        return applyMinMaxFilter(imageDataObj, "min");
      case "max":
        return applyMinMaxFilter(imageDataObj, "max");
      default:
        return null;
    }
  };

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

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilterType(selectedFilter);

    if (image) {
      const result = applyLowpassFilter(image, selectedFilter);
      setFilteredImage(result);
    }
  };

  return (
    <div className="h-screen text-center p-8 bg-slate-500">
      <h2 className="text-2xl font-bold mb-4">Lowpass Filter Tool</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block mx-auto mb-4 border rounded p-2"
      />

      <div className="mb-4">
        <label htmlFor="filter" className="mr-2 text-lg font-medium">
          Select Lowpass Filter:
        </label>
        <select
          id="filter"
          value={filterType}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="mean">Mean/Box Filter</option>
          <option value="weighted">Weighted Average Filter</option>
          <option value="gaussian">Gaussian Filter</option>
          <option value="median">Median Filter</option>
          <option value="min">Min Filter</option>
          <option value="max">Max Filter</option>
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

export default LowpassImage;
