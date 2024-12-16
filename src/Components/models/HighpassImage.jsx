import React, { useState } from "react";

const HighpassImage = () => {
  const [image, setImage] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [filteredImage, setFilteredImage] = useState(null);

  // Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          setImage(img);
          setFilteredImage(null);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Apply Highpass filter
  const applyHighpassFilter = (filterType) => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    const toGrayscale = () => {
      for (let i = 0; i < pixels.length; i += 4) {
        const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
        pixels[i] = pixels[i + 1] = pixels[i + 2] = avg;
      }
    };

    const applyKernel = (kernel) => {
      const width = canvas.width;
      const height = canvas.height;
      const output = new Uint8ClampedArray(pixels);
      toGrayscale();

      const getPixel = (x, y) => {
        if (x < 0 || y < 0 || x >= width || y >= height) return 0;
        const i = (y * width + x) * 4;
        return pixels[i];
      };

      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          let sum = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              sum += getPixel(x + kx, y + ky) * kernel[ky + 1][kx + 1];
            }
          }
          const i = (y * width + x) * 4;
          output[i] = output[i + 1] = output[i + 2] = Math.min(Math.max(sum, 0), 255);
        }
      }
      for (let i = 0; i < pixels.length; i++) pixels[i] = output[i];
    };

    let kernel;
    if (filterType === "hpif") {
      kernel = [
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1, -1],
      ];
    } else if (filterType === "hpbf") {
      kernel = [
        [0, -1, 0],
        [-1, 4, -1],
        [0, -1, 0],
      ];
    } else if (filterType === "hpgf") {
      kernel = [
        [-1, -2, -1],
        [-2, 12, -2],
        [-1, -2, -1],
      ];
    }

    applyKernel(kernel);
    ctx.putImageData(imageData, 0, 0);
    setFilteredImage(canvas.toDataURL());
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilterType(selectedFilter);
    applyHighpassFilter(selectedFilter);
  };

  return (
    <div className="h-screen text-center p-8 bg-slate-500">
      <h2 className="text-2xl font-bold mb-4">Highpass Image Filter</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block mx-auto mb-4 border rounded p-2"
      />

      <div className="mb-4">
        <label htmlFor="filter" className="mr-2 text-lg font-medium">
          Select Filter:
        </label>
        <select
          id="filter"
          value={filterType}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">No Filter</option>
          <option value="hpif">Highpass Intensity Filter (HPIF)</option>
          <option value="hpbf">Highpass Band Filter (HPBF)</option>
          <option value="hpgf">Highpass Gaussian Filter (HPGF)</option>
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
              Filtered Image ({filterType.toUpperCase()})
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

export default HighpassImage;
