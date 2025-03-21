"use client";  // Add this at the top

import { useState } from "react";
import Image from "next/image";

export default function AquaticLifeClassifier() {
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleClassify = () => {
    setOutput("Dolphin"); // Placeholder classification
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6" style={{ background: "linear-gradient(to bottom right, #88bef1, #5a9bd5)" }}>
  <div className="w-full max-w-4xl bg-opacity-80 bg-white shadow-lg rounded-lg p-6 flex">
    {/* Left Section - Drag & Drop + Upload */}
    <div className="w-1/2 flex flex-col items-center">
      <label className="text-lg font-medium text-gray-900 mb-2">
        Upload an aquatic life image
      </label>
      <div
        className="w-full h-40 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-gray-700">Drag & Drop an image here</p>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mt-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
      <button
        onClick={handleClassify}
        className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 focus:outline-none mt-4"
      >
        Classify
      </button>
    </div>

    {/* Right Section - Output Display */}
    <div className="w-2/5 flex flex-col items-center pt-17 pl-20">
  {image && (
    <div className="w-3/4 mt-3">
      <Image
        src={image}
        alt="Uploaded aquatic life"
        width={250}
        height={180}
        className="rounded-md shadow"
      />
    </div>
      )}
      {/* <button
        onClick={handleClassify}
        className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 focus:outline-none mt-4"
      >
        Classify
      </button> */}
      {output && (
        <div className="mt-4 p-4 bg-blue-100 rounded-lg shadow-md text-center w-full ">
          <p className="text-l font-semibold text-blue-900">Detected: {output}</p>
        </div>
      )}
    </div>
  </div>
</div>

  );
}
