"use client";
import React, { useState } from "react";

function Photos({ imageList = [] }) {
  if (!imageList.length) return null;

  const [selectedImage, setSelectedImage] = useState(imageList[0]);

  return (
    <div className="flex flex-col gap-3 w-full h-[500px]">
      {/* Main Image Display */}
      <div className="flex justify-center w-full">
        <img
          className="object-cover h-[350px] md:h-[430px] rounded-lg"
          src={selectedImage}
          alt="Selected"
        />
      </div>

      {/* Thumbnail List */}
      <div className="flex flex-wrap gap-3 justify-center items-center">
        {imageList.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(item)}
            className={`w-[90px] border-2 rounded p-2 cursor-pointer transition-all ${
              selectedImage === item ? "border-blue-500 scale-110" : "border-gray-300"
            }`}
          >
            <img className="object-cover rounded" src={item} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photos;
